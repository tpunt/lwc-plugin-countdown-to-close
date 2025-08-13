import { LineStyle, Time, isBusinessDay } from 'lightweight-charts';

export interface CountdownToCloseOptions {
	//* Define the options for the primitive.
	fillColor: string;
	lineWidth: number;
	lineStyle: LineStyle;
	labelColor: string;
	labelTextColor: string;
	showLabels: boolean;
	priceLabelFormatter: (price: number) => string;
	timeLabelFormatter: (time: Time) => string;
	fetchLastDataPoint: (point: any) => number; // Used for working with any types of series data
	timeframeInSeconds: number;
	customLastPriceLine: boolean;
}

export const defaultOptions: CountdownToCloseOptions = {
	//* Define the default values for all the primitive options.
	fillColor: 'rgba(200, 50, 100, 0.75)',
	lineWidth: 1,
	lineStyle: LineStyle.Dashed,
	labelColor: 'rgba(200, 50, 100, 1)',
	labelTextColor: 'white',
	showLabels: true,
	priceLabelFormatter: (price: number) => price.toFixed(2),
	timeLabelFormatter: (time: Time) => {
		if (typeof time == 'string') return time;
		const date = isBusinessDay(time)
			? new Date(time.year, time.month, time.day)
			: new Date(time * 1000);
		return date.toLocaleDateString();
	},
	fetchLastDataPoint: (point: any) => {
		return point.value;
	},
	timeframeInSeconds: 60,
	customLastPriceLine: false,
} as const;
