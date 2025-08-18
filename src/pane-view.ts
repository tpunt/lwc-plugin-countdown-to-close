import { Coordinate, IPrimitivePaneView } from 'lightweight-charts';
import { CountdownToClosePaneRenderer } from './pane-renderer';
import { CountdownToCloseDataSource } from './data-source';

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
			this._source.options.fillColor || this._source.lastColor || 'black',
			this._source.options.lineWidth,
			this._source.options.lineStyle,
		);
	}
}
