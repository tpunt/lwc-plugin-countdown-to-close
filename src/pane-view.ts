import { Coordinate, IPrimitivePaneView } from 'lightweight-charts';
import { CountdownToCloseDataSource } from './data-source';
import { CountdownToClosePaneRenderer } from './pane-renderer';
import { SPREAD_TYPE } from './options';

export class CountdownToClosePaneView implements IPrimitivePaneView {
	_source: CountdownToCloseDataSource;
	_bidPriceCoordinate: Coordinate | null = null;
	_askPriceCoordinate: Coordinate | null = null;

	constructor(source: CountdownToCloseDataSource) {
		this._source = source;
	}

	update() {
		if (this._source.lastPrice === null) {
			return;
		}

		if (this._source.options.spread === 0) {
			this._bidPriceCoordinate = this._source.series.priceToCoordinate(this._source.lastPrice);
		} else {
			switch (this._source.options.spreadType) {
				case SPREAD_TYPE.MIDDLE:
					this._bidPriceCoordinate = this._source.series.priceToCoordinate(this._source.lastPrice - this._source.options.spread / 2);
					this._askPriceCoordinate = this._source.series.priceToCoordinate(this._source.lastPrice + this._source.options.spread / 2);
					break;
				case SPREAD_TYPE.FROM_BID:
					this._bidPriceCoordinate = this._source.series.priceToCoordinate(this._source.lastPrice);
					this._askPriceCoordinate = this._source.series.priceToCoordinate(this._source.lastPrice + this._source.options.spread);
					break;
				case SPREAD_TYPE.FROM_ASK:
					this._bidPriceCoordinate = this._source.series.priceToCoordinate(this._source.lastPrice - this._source.options.spread);
					this._askPriceCoordinate = this._source.series.priceToCoordinate(this._source.lastPrice);
					break;
			}
		}
	}

	renderer() {
		return new CountdownToClosePaneRenderer(
			this._bidPriceCoordinate,
			this._askPriceCoordinate,
			this._source.options.spreadFillColor,
			this._source.options.displaySpread ? String(this._source.options.spread) : '',
			this._source.options.displaySpreadTextColor,
			this._source.options.color || this._source.color,
			this._source.options.lineWidth,
			this._source.options.lineStyle,
		);
	}
}
