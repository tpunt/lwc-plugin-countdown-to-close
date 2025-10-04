import { CountdownToCloseLastPriceOnPriceAxisView, CountdownToCloseOnPriceAxisView } from './axis-view';
import { CountdownToCloseDataSource } from './data-source';
import { CountdownToCloseOptions, defaultOptions } from './options';
import { CountdownToClosePaneView } from './pane-view';
import { PluginBase } from './plugin-base';

// Re-export types for public API
export type { CountdownToCloseOptions } from './options';
export { SPREAD_TYPE } from './options';

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

			if (this._options.displaySpread) {
				this._priceAxisViews.push(new CountdownToCloseLastPriceOnPriceAxisView(this));
			}
		}

		this._setTimer();
	}

	updateAllViews() {
		this._updateLastPrice();

		this._paneViews.forEach(pw => pw.update());
		this._priceAxisViews.forEach(pw => pw.update());
	}

	priceAxisViews() {
		//* Labels rendered on the price scale
		return this._priceAxisViews;
	}

	paneViews() {
		//* rendering on the main chart pane
		return this._paneViews;
	}

	public get options(): CountdownToCloseOptions {
		return this._options;
	}

	applyOptions(options: Partial<CountdownToCloseOptions>) {
		this._options = { ...this._options, ...options };
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
