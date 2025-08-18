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
		return this._source.options.color || this._source.color;
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

		return this._source.options.timeLabelFormatter(new TimeToClose(this._source.options.timeframeInSeconds));
	}
}

export class TimeToClose {
	timeframeInSeconds: number;
	timestampMilliseconds: number;

	// Broken down timestamp
	seconds: number;
	minutes: number;
	hours: number;
	days: number;

	constructor(timeframeInSeconds: number) {
		this.timeframeInSeconds = timeframeInSeconds;
		this.timestampMilliseconds = Date.now();

		let timeRemainingInSeconds = timeframeInSeconds - (
			Math.floor(this.timestampMilliseconds / 1000) % timeframeInSeconds
		);

		this.days = Math.floor(timeRemainingInSeconds / (60 * 60 * 24));
		timeRemainingInSeconds = timeRemainingInSeconds % (60 * 60 * 24);
		this.hours = Math.floor(timeRemainingInSeconds / (60 * 60));
		timeRemainingInSeconds = timeRemainingInSeconds % (60 * 60);
		this.minutes = Math.floor(timeRemainingInSeconds / 60);
		timeRemainingInSeconds = timeRemainingInSeconds % 60;
		this.seconds = Math.round(timeRemainingInSeconds);
	}
}
