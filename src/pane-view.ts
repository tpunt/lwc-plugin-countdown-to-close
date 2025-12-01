import { Coordinate, IPrimitivePaneView } from 'lightweight-charts';
import { CountdownToCloseDataSource } from './data-source';
import { CountdownToClosePaneRenderer } from './pane-renderer';
import { calculatePriceDelta } from './helpers/price-calculation';

export class CountdownToClosePaneView implements IPrimitivePaneView {
	_source: CountdownToCloseDataSource;
	_priceCoordinate: Coordinate | null = null;
	_lastPriceDelta: string = '';

	constructor(source: CountdownToCloseDataSource, lastPriceDelta: string = '') {
		this._source = source;
		this._lastPriceDelta = lastPriceDelta;
	}

	update() {
		if (this._source.lastPrice === null) {
			return;
		}

		this._priceCoordinate = this._source.series.priceToCoordinate(calculatePriceDelta(this._source.lastPrice, this._lastPriceDelta));
	}

	renderer() {
		return new CountdownToClosePaneRenderer(
			this._priceCoordinate,
			this._lastPriceDelta === '' ? (this._source.options.color || this._source.color) : this._source.options.otherLinesColor,
			this._source.options,
			this._lastPriceDelta,
		);
	}
}
