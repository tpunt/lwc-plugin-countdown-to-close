import { LineStyle } from 'lightweight-charts';
import { TimeToClose } from './axis-view';

export interface CountdownToCloseOptions {
	//* Define the options for the primitive.
	color: string | null;
	lineWidth: number;
	lineStyle: LineStyle;
	labelTextColor: string;
	showLabels: boolean;
	priceLabelFormatter: (price: number) => string;
	timeLabelFormatter: (timeToClose: TimeToClose) => string;
	timeframeInSeconds: number;
	customLastPriceLine: boolean;
}

export const defaultOptions: CountdownToCloseOptions = {
	//* Define the default values for all the primitive options.
	color: null,
	lineWidth: 1,
	lineStyle: LineStyle.Dashed,
	labelTextColor: 'white',
	showLabels: true,
	priceLabelFormatter: (price: number) => price.toFixed(2),
	timeLabelFormatter: (timeToClose: TimeToClose) => {
		let ttcString = '';

		// If the timeframe is greater than 1 day, show days and hours
		if (timeToClose.timeframeInSeconds > 60 * 60 * 24) {
			ttcString += `${timeToClose.days}d`;

			if (timeToClose.hours > 0) {
				ttcString += ` ${timeToClose.hours}h`;
			}

			return ttcString;
		}

		// If the timeframe is greater than 1 hour, show hours and minutes
		if (timeToClose.timeframeInSeconds > 60 * 60) {
			ttcString += `${timeToClose.hours}h`;

			if (timeToClose.minutes > 0) {
				ttcString += ` ${timeToClose.minutes}m`;
			}

			return ttcString;
		}

		// If the timeframe is greater than 1 minute, show minutes and seconds
		if (timeToClose.timeframeInSeconds > 60) {
			ttcString += `${timeToClose.minutes}m`;

			if (timeToClose.seconds > 0) {
				ttcString += ` ${timeToClose.seconds}s`;
			}

			return ttcString;
		}

		return ` ${timeToClose.seconds}s`;
	},
	timeframeInSeconds: 60,
	customLastPriceLine: false,
} as const;
