import { LineStyle } from 'lightweight-charts';
import { TimeToClose } from './axis-view';

export interface CountdownToCloseOptions {
	// Whether to use a custom price line instead of the default LWC last price line. If true, disable the LWC last
	// price line by setting `priceLineVisible` and `lastValueVisible` to false on the series.
	customLastPriceLine: boolean;
	color: string | null; // Line and label color (default is null, which means use the last series point color)
	lineWidth: number; // If customLastPriceLine is true, this is the width of the custom price line
	lineStyle: LineStyle; // If customLastPriceLine is true, this is the style of the custom price line
	labelTextColor: string; // Color of the label text
	showLabels: boolean; // Whether to show the price labels
	priceLabelFormatter: (price: number) => string; // Formatter for the price label
	timeLabelFormatter: (timeToClose: TimeToClose) => string; // Formatter for the time label
	timeframeInSeconds: number; // The timeframe of the series (in seconds)

	// Show countdown timers on the chart
	countdownTimers: number[]; // Timeframes to show countdown timers for (in seconds)
	countdownTimersTextColor: string; // Color of the countdown timer
	countdownTimersTextFontSize: number; // Font size of the countdown timer text
	countdownTimersTextFromTop: number; // If negative, then from bottom
	countdownTimersTextFromLeft: number; // If negative, then from right
	countdownTimersSameLine: boolean; // True for all on the same line, false for each on a new line

	// Show other lines on the chart, relative to the current price
	otherLinesVisible: boolean;
	otherLines: string[]; // E.g. in terms of points or percentages: [20, 40, 0.75%, 1.8%]
	otherLinesColor: string;
	otherLinesWidth: number;
	otherLinesStyle: LineStyle;
	otherLinesTextColor: string;
	otherLinesTextSize: number;
	otherLinesShowLabels: boolean; // Whether to display the price labels
	otherLinesLabelTextColor: string;
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

		return `${timeToClose.seconds}s`;
	},
	timeframeInSeconds: 60,
	customLastPriceLine: false,

	// Countdown timers
	countdownTimers: [],
	countdownTimersTextColor: '#000',
	countdownTimersTextFontSize: 25,
	countdownTimersTextFromTop: 5,
	countdownTimersTextFromLeft: -5,
	countdownTimersSameLine: true,

	// Show other lines on the chart, relative to the current price
	otherLinesVisible: false,
	otherLines: [],
	otherLinesColor: '#000000',
	otherLinesWidth: 1,
	otherLinesStyle: LineStyle.Dashed,
	otherLinesTextColor: '#000000',
	otherLinesTextSize: 12,
	otherLinesShowLabels: false,
	otherLinesLabelTextColor: '#000000',
} as const;
