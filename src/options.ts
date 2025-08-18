import { LineStyle, Time, isBusinessDay } from 'lightweight-charts';

export interface CountdownToCloseOptions {
	//* Define the options for the primitive.
	fillColor: string | null;
	lineWidth: number;
	lineStyle: LineStyle;
	labelColor: string | null;
	labelTextColor: string;
	showLabels: boolean;
	priceLabelFormatter: (price: number) => string;
	timeLabelFormatter: (time: Time) => string;
	timeframeInSeconds: number;
	customLastPriceLine: boolean;
}

export const defaultOptions: CountdownToCloseOptions = {
	//* Define the default values for all the primitive options.
	fillColor: null,
	lineWidth: 1,
	lineStyle: LineStyle.Dashed,
	labelColor: null,
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
	timeframeInSeconds: 60,
	customLastPriceLine: false,
} as const;
