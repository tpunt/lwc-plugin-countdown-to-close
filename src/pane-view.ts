import { Coordinate, IPrimitivePaneView } from 'lightweight-charts';
import { CountdownToCloseDataSource } from './data-source';
import { CountdownToClosePaneRenderer } from './pane-renderer';

export class CountdownToClosePaneView implements IPrimitivePaneView {
	_source: CountdownToCloseDataSource;
	_priceCoordinate: Coordinate | null = null;

	constructor(source: CountdownToCloseDataSource) {
		this._source = source;
	}

	update() {
		if (this._source.lastPrice === null) {
			return;
		}

		this._priceCoordinate = this._source.series.priceToCoordinate(this._source.lastPrice);
	}

	renderer() {
		return new CountdownToClosePaneRenderer(
			this._priceCoordinate,
			this._source.options.color || this._source.color,
			this._source.options.lineWidth,
			this._source.options.lineStyle,
		);
	}
}
