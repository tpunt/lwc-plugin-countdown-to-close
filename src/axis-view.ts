import { Coordinate, ISeriesPrimitiveAxisView } from 'lightweight-charts';
import { CountdownToCloseDataSource } from './data-source';
import { calculatePriceDelta } from './helpers/price-calculation';

abstract class CountdownToClosePriceAxisView implements ISeriesPrimitiveAxisView {
	_source: CountdownToCloseDataSource;
	_pos: Coordinate | null = null;
	_labelPositionDelta: Coordinate;
	_lastPriceDelta: string = '';

	constructor(source: CountdownToCloseDataSource, labelPositionDelta: Coordinate, lastPriceDelta: string = '') {
		this._source = source;
		this._labelPositionDelta = labelPositionDelta;
		this._lastPriceDelta = lastPriceDelta;
	}

	update() {
		if (this._source.lastPrice === null) {
			return;
		}

		this._pos = this._source.series.priceToCoordinate(calculatePriceDelta(this._source.lastPrice, this._lastPriceDelta));

		if (this._pos === null) {
			return;
		}

		this._pos = (this._pos + this._labelPositionDelta) as Coordinate;
	}

	abstract text(): string;

	coordinate() {
		return -100000; // Some random, large negative number to ensure the axis view is not displayed
	}

	fixedCoordinate() {
		if (this._pos === null) {
			return -1;
		}

		return this._pos;
	}

	visible(): boolean {
		return this._source.options.showLabels;
	}

	tickVisible(): boolean {
		return this._source.options.showLabels;
	}

	textColor() {
		return this._lastPriceDelta === '' ? this._source.options.labelTextColor : this._source.options.otherLinesLabelTextColor;
	}

	backColor() {
		return this._lastPriceDelta === '' ? (this._source.options.color || this._source.color) : this._source.options.otherLinesColor;
	}
}

export class CountdownToCloseLastPriceOnPriceAxisView extends CountdownToClosePriceAxisView {
	constructor(source: CountdownToCloseDataSource, lastPriceDelta: string = '') {
		super(source, 0 as Coordinate, lastPriceDelta);
	}

	text() {
		if (this._source.lastPrice === null) {
			return '';
		}

		return this._source.options.priceLabelFormatter(calculatePriceDelta(this._source.lastPrice, this._lastPriceDelta));
	}

	visible() {
		return this._lastPriceDelta === '' ? this._source.options.showLabels : this._source.options.otherLinesShowLabels;
	}
}

export class CountdownToCloseOnPriceAxisView extends CountdownToClosePriceAxisView {
	constructor(source: CountdownToCloseDataSource) {
		super(source, 20 as Coordinate, '');
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

	outputTimeframe() {
		if (this.timeframeInSeconds % (60 * 60 * 24) === 0) {
			return `${this.timeframeInSeconds / (60 * 60 * 24)}d`;
		}

		if (this.timeframeInSeconds % (60 * 60) === 0) {
			return `${this.timeframeInSeconds / (60 * 60)}h`;
		}

		if (this.timeframeInSeconds % 60 === 0) {
			return `${this.timeframeInSeconds / 60}m`;
		}

		return `${this.timeframeInSeconds}s`;
	}
}
