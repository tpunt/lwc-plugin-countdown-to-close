import { IChartApi, ISeriesApi, SeriesOptionsMap } from 'lightweight-charts';
import { CountdownToCloseOptions } from './options';

export interface CountdownToCloseDataSource {
	chart: IChartApi;
	series: ISeriesApi<keyof SeriesOptionsMap>;
	options: CountdownToCloseOptions;
	lastPrice: number | null;
	lastColor: string | null;
}
