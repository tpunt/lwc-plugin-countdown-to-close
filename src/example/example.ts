import { CandlestickSeries, CrosshairMode, LastPriceAnimationMode, LineSeries, createChart } from 'lightweight-charts';
import { generateCandleData, generateLineData } from '../sample-data';
import { CountdownToClose } from '../countdown-to-close';

const chart = ((window as unknown as any).chart = createChart('chart', {
	autoSize: true,
	crosshair: {
		mode: CrosshairMode.Normal,
	},
}));
/*
const lineSeries = chart.addSeries(LineSeries, {
	color: '#000000',
	lastPriceAnimation: LastPriceAnimationMode.Disabled,
	crosshairMarkerVisible: false,
	priceLineVisible: false,
	lastValueVisible: false,
});
const data = generateLineData();
lineSeries.setData(data);

const primitive = new CountdownToClose({
	customLastPriceLine: true,
});

lineSeries.attachPrimitive(primitive);

let i = 0;

window.setInterval(() => {
	const last = JSON.parse(JSON.stringify(data[data.length - 1]));
	let rand = Math.random() * 100;

	if (i % 2 === 0) {
		// Make it harder to go down when the price is "low"

		if (rand > 50) {
			if (last.value > 800) {
				rand -= 50;
			}
		}

		if (rand > 25) {
			if (last.value > 900) {
				rand -= 25;
			}
		}

		if (rand > 10) {
			if (last.value > 950) {
				rand -= 10;
			}
		}

		if (rand > 5) {
			if (last.value > 975) {
				rand -= 5;
			}
		}

		last.value += rand;
	} else {
		// Make it harder to go down when the price is "low"

		if (rand > 50) {
			if (last.value < 200) {
				rand -= 50;
			}
		}

		if (rand > 25) {
			if (last.value < 100) {
				rand -= 25;
			}
		}

		if (rand > 10) {
			if (last.value < 50) {
				rand -= 10;
			}
		}

		if (rand > 5) {
			if (last.value < 25) {
				rand -= 5;
			}
		}

		last.value -= rand;
	}

	last.time = last.time + 100;

	data.push(last);

	lineSeries.update(last);

	i++;
}, 200);
// */
/////////// Candlestick data ///////////////

const candleSeries = chart.addSeries(CandlestickSeries, {
	// lastPriceAnimation: LastPriceAnimationMode.Disabled,
	// crosshairMarkerVisible: false,
	// priceLineVisible: false,
	// lastValueVisible: false,
});
const candleData = generateCandleData();
candleSeries.setData(candleData);

const primitive2 = new CountdownToClose({
	fetchLastDataPoint: (point: any) => {
		return point.close;
	},
	customLastPriceLine: false,
});

candleSeries.attachPrimitive(primitive2);

let j = 0;
// /*
window.setInterval(() => {
	const last = JSON.parse(JSON.stringify(candleData[candleData.length - 1]));
	let rand = Math.random() * 100;

	last.open = last.close

	if (j % 2 === 0) {
		// Make it harder to go down when the price is "low"

		if (rand > 50) {
			if (last.value > 800) {
				rand -= 50;
			}
		}

		if (rand > 25) {
			if (last.value > 900) {
				rand -= 25;
			}
		}

		if (rand > 10) {
			if (last.value > 950) {
				rand -= 10;
			}
		}

		if (rand > 5) {
			if (last.value > 975) {
				rand -= 5;
			}
		}

		last.close += rand
	} else {
		// Make it harder to go down when the price is "low"

		if (rand > 50) {
			if (last.value < 200) {
				rand -= 50;
			}
		}

		if (rand > 25) {
			if (last.value < 100) {
				rand -= 25;
			}
		}

		if (rand > 10) {
			if (last.value < 50) {
				rand -= 10;
			}
		}

		if (rand > 5) {
			if (last.value < 25) {
				rand -= 5;
			}
		}

		last.close -= rand
	}

	last.high = Math.max(last.open, last.close) + rand / 2;
	last.low = Math.min(last.open, last.close) - rand / 2;
	last.time = last.time + 100;

	candleData.push(last);

	candleSeries.update(last);

	j++;
}, 200);
// */