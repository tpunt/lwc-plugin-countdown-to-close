import { CandlestickSeries, CrosshairMode, LastPriceAnimationMode, LineSeries, LineStyle, createChart } from 'lightweight-charts';
import { generateCandleData, generateLineData } from '../sample-data';
import { CountdownToClose } from '../countdown-to-close';
import { TimeToClose } from '../axis-view';
import { SPREAD_TYPE } from '../options';

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
// /*
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
	timeframeInSeconds: 60 * 60 * 24 * 7,
	lineStyle: LineStyle.Dotted,
	color: 'red',
	spread: 50,
	spreadType: SPREAD_TYPE.MIDDLE,
	spreadFillColor: 'rgba(255, 0, 0, 0.5)',
	displaySpread: true,
	displaySpreadTextColor: 'blue',
});

lineSeries.attachPrimitive(primitive);

let i = 0;
const interval = 1000;

window.setInterval(() => {
	primitive.applyOptions({
		spread: Math.random() * 100,
	});
}, 2000);

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
}, interval);
// */
/////////// Candlestick data ///////////////
// /*
const candleSeries = chart.addSeries(CandlestickSeries, {
	// lastPriceAnimation: LastPriceAnimationMode.Disabled,
	// crosshairMarkerVisible: false,
	priceLineVisible: false,
	lastValueVisible: false,
});
const candleData = generateCandleData();
candleSeries.setData(candleData);

const primitive2 = new CountdownToClose({
	timeframeInSeconds: 60,
	customLastPriceLine: true,
	lineStyle: LineStyle.Dashed,
	// Similar to TradingView's time to close label
	timeLabelFormatter: (timeToClose: TimeToClose): string => {
		let ttcString = '';

		// If the timeframe is greater than 1 day, show days and hours
		if (timeToClose.timeframeInSeconds > 60 * 60 * 24) {
			ttcString += `${timeToClose.days}d`;

			if (timeToClose.hours > 0) {
				ttcString += ` ${timeToClose.hours}h`;
			}

			return ttcString;
		}

		if (timeToClose.hours > 0) {
			if (timeToClose.hours < 10) {
				ttcString += '0';
			}

			ttcString += `${timeToClose.hours}:`;
		}


		if (timeToClose.minutes > 0) {
			if (timeToClose.minutes < 10) {
				ttcString += '0';
			}

			ttcString += `${timeToClose.minutes}`;
		} else {
			ttcString += '00';
		}

		ttcString += ':';

		if (timeToClose.seconds > 0) {
			if (timeToClose.seconds < 10) {
				ttcString += '0';
			}

			ttcString += `${timeToClose.seconds}`;
		} else {
			ttcString += '00';
		}

		return ttcString;
	}
});

candleSeries.attachPrimitive(primitive2);

let j = 0;
// /*
window.setInterval(() => {
	const last = JSON.parse(JSON.stringify(candleData[candleData.length - 1]));
	let rand = Math.random() * 100;

	last.open = last.close;

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
}, interval);
// */