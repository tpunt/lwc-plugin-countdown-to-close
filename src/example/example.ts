import { CandlestickSeries, CrosshairMode, LineStyle, createChart } from 'lightweight-charts';
import { generateCandleData } from '../sample-data';
import { CountdownToClose } from '../countdown-to-close';

const chart = ((window as unknown as any).chart = createChart('chart', {
	autoSize: true,
	crosshair: {
		mode: CrosshairMode.Normal,
	},
	timeScale: {
		timeVisible: true,
	},
	rightPriceScale: {
		// invertScale: true,
	},
}));

const candleSeries = chart.addSeries(CandlestickSeries, {
	priceLineVisible: false,
	lastValueVisible: false,
});
const candleData = generateCandleData();
candleSeries.setData(candleData);

const primitive2 = new CountdownToClose({
	timeframeInSeconds: 60,
	customLastPriceLine: true,
	lineStyle: LineStyle.Dashed,
});

candleSeries.attachPrimitive(primitive2);

candleSeries.createPriceLine({
	price: 700,
	color: 'blue',
	lineWidth: 1,
	lineStyle: LineStyle.Dotted,
});
