import { CountdownToCloseLastPriceOnPriceAxisView, CountdownToCloseOnPriceAxisView } from './axis-view';
import { CountdownToCloseDataSource } from './data-source';
import { CountdownToCloseOptions, defaultOptions } from './options';
import { CountdownToClosePaneView } from './pane-view';
import { PluginBase } from './plugin-base';

// Re-export types for public API
export type { CountdownToCloseOptions } from './options';
export { TimeToClose } from './axis-view';

export class CountdownToClose
	extends PluginBase
	implements CountdownToCloseDataSource
{
	// CountdownToCloseDataSource
	_options: CountdownToCloseOptions;
	_lastPrice: number | null = null;
	_color: string = 'black';
	_timer: number | null = null;
	_ttcc: string = '0s';

	// Views
	_paneViews: CountdownToClosePaneView[];
	_priceAxisViews: CountdownToCloseLastPriceOnPriceAxisView[];
	_otherLinesPaneViews: CountdownToClosePaneView[] = [];
	_otherLinesPriceAxisViews: CountdownToCloseLastPriceOnPriceAxisView[] = [];

	constructor(
		options: Partial<CountdownToCloseOptions> = {}
	) {
		super();
		this._options = {
			...defaultOptions,
			...options,
		};

		// For label data updating and rendering for the price axis
		this._priceAxisViews = [new CountdownToCloseOnPriceAxisView(this)];

		// For updating the data
		this._paneViews = [];

		// We can either use LWC last price line, or use our own.
		if (this._options.customLastPriceLine) {
			this._priceAxisViews.push(new CountdownToCloseLastPriceOnPriceAxisView(this));
			this._paneViews.push(new CountdownToClosePaneView(this));
		}

		this.setOtherLines();
		this._setTimer();
	}

	private setOtherLines() {
		this._otherLinesPaneViews = [];
		this._otherLinesPriceAxisViews = [];

		if (!this._options.otherLinesVisible) {
			return;
		}

		for (const lastPriceDelta of this._options.otherLines) {
			this._otherLinesPaneViews.push(new CountdownToClosePaneView(this, lastPriceDelta));
			this._otherLinesPaneViews.push(new CountdownToClosePaneView(this, '-' + lastPriceDelta));

			if (this._options.otherLinesShowLabels) {
				this._otherLinesPriceAxisViews.push(new CountdownToCloseLastPriceOnPriceAxisView(this, lastPriceDelta));
				this._otherLinesPriceAxisViews.push(new CountdownToCloseLastPriceOnPriceAxisView(this, '-' + lastPriceDelta));
			}
		}
	}

	updateAllViews() {
		this._updateLastPrice();

		this._paneViews.forEach(pw => pw.update());
		this._priceAxisViews.forEach(pw => pw.update());
		this._otherLinesPaneViews.forEach(pw => pw.update());
		this._otherLinesPriceAxisViews.forEach(pw => pw.update());
	}

	priceAxisViews() {
		//* Labels rendered on the price scale
		return this._priceAxisViews.concat(this._otherLinesPriceAxisViews);
	}

	paneViews() {
		//* rendering on the main chart pane
		return this._paneViews.concat(this._otherLinesPaneViews);
	}

	public get options(): CountdownToCloseOptions {
		return this._options;
	}

	applyOptions(options: Partial<CountdownToCloseOptions>) {
		let otherLinesChanged = false;

		if (options.otherLines !== undefined && JSON.stringify(options.otherLines) !== JSON.stringify(this._options.otherLines)) {
			otherLinesChanged = true;
		} else if (options.otherLinesVisible !== undefined && options.otherLinesVisible !== this._options.otherLinesVisible) {
			otherLinesChanged = true;
		}

		this._options = { ...this._options, ...options };

		if (otherLinesChanged) {
			this.setOtherLines();
		}

		this.requestUpdate();
	}

	public get lastPrice(): number | null {
		return this._lastPrice;
	}

	public get color(): string {
		return this._color;
	}

	public _updateLastPrice() {
		if (!this.series) {
			return;
		}

		const lastValueData = this.series.lastValueData(true);

		if (lastValueData.noData) {
			this._lastPrice = null;
		} else {
			this._lastPrice = lastValueData.price;
			this._color = lastValueData.color;
		}

		// Could also fetch global last datapoint to know if historical last price data is being viewed or not
	}

	public detached() {
		super.detached();

		if (this._timer !== null) {
			window.clearInterval(this._timer);
		}
	}

	_setTimer() {
		setTimeout(() => {
			this._timer = window.setInterval(() => {
				this.requestUpdate();

				if (Date.now() % 1000 > 50) { // Time has skewed too much, so reset the timer
					if (this._timer !== null) {
						window.clearInterval(this._timer);
					}

					this._setTimer();
				}
			}, 1000);
		}, 1000 - (Date.now() % 1000));
	}
}
