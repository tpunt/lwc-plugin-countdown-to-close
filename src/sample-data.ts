import type { Time } from 'lightweight-charts';

type CandleData = {
	time: Time;
	open: number;
	high: number;
	low: number;
	close: number;
};

type LineData = {
	time: Time;
	value: number;
};

let randomFactor = 25 + Math.random() * 25;
const samplePoint = (i: number) =>
	i *
		(0.5 +
			Math.sin(i / 10) * 0.2 +
			Math.sin(i / 20) * 0.4 +
			Math.sin(i / randomFactor) * 0.8 +
			Math.sin(i / 500) * 0.5) +
	200;

export function generateLineData(numberOfPoints: number = 500): LineData[] {
	randomFactor = 25 + Math.random() * 25;
	const res = [];
	const date = new Date(Date.UTC(2023, 0, 1, 12, 0, 0, 0));
	for (let i = 0; i < numberOfPoints; ++i) {
		const time = (date.getTime() / 1000) as Time;
		const value = samplePoint(i);
		res.push({
			time,
			value,
		});

		date.setTime(date.getTime() + 1000 * 60);
	}

	return res;
}

export function generateCandleData(numberOfPoints: number = 500): CandleData[] {
	const candleData: CandleData[] = [];
	const date = new Date(Date.UTC(2023, 0, 1, 12, 0, 0, 0));
	let up = true;

	for (let i = 0; i < numberOfPoints; ++i) {
		const time = (date.getTime() / 1000) as Time;

		if (i === 0) {
			candleData.push({
				time,
				open: 1000,
				high: 1100,
				low: 900,
				close: 950,
			});
		} else {
			const previousDataPoint = candleData[candleData.length - 1];
			let closePrice = 0;

			if (up) {
				closePrice = previousDataPoint.close + (2 + (i % 5));
			} else {
				closePrice = previousDataPoint.close - (7 - (i % 5));
			}

			candleData.push({
				time: time,
				open: previousDataPoint.close,
				high: (previousDataPoint.close + (i % 3)),
				low: (previousDataPoint.close - (i % 3)),
				close: closePrice,
			});
		}

		if (i % (i % 5) == 0) {
			up = !up
		}

		date.setTime(date.getTime() + 1000 * 60);
	}

	return candleData;
}
