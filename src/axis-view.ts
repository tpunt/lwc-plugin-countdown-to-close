import { Coordinate, ISeriesPrimitiveAxisView } from 'lightweight-charts';
import { CountdownToCloseDataSource } from './data-source';

abstract class CountdownToClosePriceAxisView implements ISeriesPrimitiveAxisView {
	_source: CountdownToCloseDataSource;
	_pos: Coordinate | null = null;
	_delta: Coordinate;

	constructor(source: CountdownToCloseDataSource, delta: Coordinate) {
		this._source = source;
		this._delta = delta;
	}

	update() {
		if (this._source.lastPrice === null) {
			return;
		}

		this._pos = this._source.series.priceToCoordinate(this._source.lastPrice);

		if (this._pos === null) {
			return;
		}

		this._pos = (this._pos + this._delta) as Coordinate;
	}

	abstract text(): string;

	coordinate() {
		return this._pos ?? -1;
	}

	visible(): boolean {
		return this._source.options.showLabels;
	}

	tickVisible(): boolean {
		return this._source.options.showLabels;
	}

	textColor() {
		return this._source.options.labelTextColor;
	}

	backColor() {
		return this._source.options.labelColor || this._source.lastColor || 'black';
	}
}

export class CountdownToCloseLastPriceOnPriceAxisView extends CountdownToClosePriceAxisView {
	constructor(source: CountdownToCloseDataSource) {
		super(source, 0 as Coordinate);
	}

	text() {
		if (this._source.lastPrice === null) {
			return '';
		}

		return this._source.options.priceLabelFormatter(this._source.lastPrice);
	}
}

export class CountdownToCloseOnPriceAxisView extends CountdownToClosePriceAxisView {
	constructor(source: CountdownToCloseDataSource) {
		super(source, 20 as Coordinate);
	}

	text() {
		if (this._source.lastPrice === null) {
			return '';
		}

		return this._recalculateTtcc();
	}

	_recalculateTtcc(): string {
		let remainder = this._source.options.timeframeInSeconds - (
			Math.floor(Date.now() / 1000) % this._source.options.timeframeInSeconds
		);

		// TODO: figure out historical data later
		// remainder = this._source.options.highestEndTime % this._source.options.priceData.timeframe;

		// if (remainder) {
		// 	remainder = props.priceData.timeframe - remainder;
		// }

		const ttccs = {
			's': 0,
			'm': 0,
			'h': 0,
			'd': 0,
		};
		let ttccNew = '';

		ttccs['d'] = Math.floor(remainder / (60 * 60 * 24));
		remainder = remainder % (60 * 60 * 24);
		ttccs['h'] = Math.floor(remainder / (60 * 60));
		remainder = remainder % (60 * 60);
		ttccs['m'] = Math.floor(remainder / 60);
		remainder = remainder % 60;
		ttccs['s'] = Math.round(remainder);

		if (ttccs['d'] != 0) {
			ttccNew += `${ttccs['d']}d`;
		}

		if (ttccs['h'] != 0) {
			ttccNew += `${ttccs['h']}h`;
		}

		if (ttccs['m'] != 0) {
			ttccNew += `${ttccs['m']}m`;
		}

		if (ttccs['s'] != 0) {
			ttccNew += `${ttccs['s']}s`;
		}

		if (ttccNew === '') {
			ttccNew = '0s';
		}

		return ttccNew;
	}
}
