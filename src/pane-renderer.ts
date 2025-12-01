import { BitmapCoordinatesRenderingScope, CanvasRenderingTarget2D } from 'fancy-canvas';
import { Coordinate, DrawingUtils, IPrimitivePaneRenderer } from 'lightweight-charts';
import { CountdownToCloseOptions } from './options';
import { TimeToClose } from './axis-view';

export class CountdownToClosePaneRenderer implements IPrimitivePaneRenderer {
	_priceCoordinate: Coordinate | null;
	_lineFillColor: string;
	_options: CountdownToCloseOptions;
	_lastPriceDelta: string = '';

	constructor(
		priceCoordinate: Coordinate | null,
		lineFillColor: string,
		options: CountdownToCloseOptions,
		lastPriceDelta: string = '',
	) {
		this._priceCoordinate = priceCoordinate;
		this._lineFillColor = lineFillColor;
		this._options = options;
		this._lastPriceDelta = lastPriceDelta;
	}

	draw(target: CanvasRenderingTarget2D, utils: DrawingUtils) {
		target.useBitmapCoordinateSpace(scope => {
			this.displayCountdownTimersText(scope);

			if (this._priceCoordinate === null) {
				return;
			}

			const y1 = Math.round(this._priceCoordinate! * scope.verticalPixelRatio);

			if (y1 < 0 || y1 > scope.bitmapSize.height) {
				return;
			}

			const ctx = scope.context;
			let lineWidth = this._lastPriceDelta === '' ? this._options.lineWidth : this._options.otherLinesWidth;
			let lineStyle = this._lastPriceDelta === '' ? this._options.lineStyle : this._options.otherLinesStyle;

			ctx.lineCap = 'butt';
			ctx.strokeStyle = this._lineFillColor;
			ctx.fillStyle = this._lineFillColor;
			ctx.lineWidth = Math.floor(lineWidth * scope.horizontalPixelRatio);
			utils.setLineStyle(ctx, lineStyle);

			ctx.beginPath();
			ctx.moveTo(0, y1);
			ctx.lineTo(scope.bitmapSize.width, y1);

			// if lastPriceDelta is not empty, add the text to the line
			if (this._lastPriceDelta !== '') {
				ctx.textAlign = 'right';
				ctx.font = `${this._options.otherLinesTextSize}px Arial`;
				ctx.fillStyle = this._options.otherLinesTextColor;
				ctx.fillText(this._lastPriceDelta, scope.bitmapSize.width - 5, y1);
			}

			ctx.stroke();
		});
	}

	private displayCountdownTimersText(scope: BitmapCoordinatesRenderingScope) {
		if (this._options.countdownTimers.length === 0) {
			return;
		}

		const ctx = scope.context;
		let textFromLeft = this._options.countdownTimersTextFromLeft;
		let textFromTop = this._options.countdownTimersTextFromTop;
		let textAlign: CanvasTextAlign = 'left';
		let textBaseline: CanvasTextBaseline = 'top';

		if (this._options.countdownTimersTextFromTop < 0) {
			textFromTop = scope.bitmapSize.height + this._options.countdownTimersTextFromTop;
			textBaseline = 'bottom';
		}

		if (this._options.countdownTimersTextFromLeft < 0) {
			textFromLeft = scope.bitmapSize.width + this._options.countdownTimersTextFromLeft;
			textAlign = 'right';
		}
		// Save context state to avoid being affected by previous operations
		ctx.save();

		ctx.textAlign = textAlign;
		ctx.textBaseline = textBaseline;
		ctx.font = `${this._options.countdownTimersTextFontSize}px Arial`;
		ctx.fillStyle = this._options.countdownTimersTextColor;

		if (this._options.countdownTimersSameLine) {
			let textParts = [];

			for (const timeframe of this._options.countdownTimers) {
				const timeToClose = new TimeToClose(timeframe);

				textParts.push(`${timeToClose.outputTimeframe()}: ${this._options.timeLabelFormatter(timeToClose)}`);
			}

			ctx.fillText(textParts.join(', '), textFromLeft, textFromTop);
		} else {
			for (const timeframe of this._options.countdownTimers) {
				const timeToClose = new TimeToClose(timeframe);

				ctx.fillText(`${timeToClose.outputTimeframe()}: ${this._options.timeLabelFormatter(timeToClose)}`, textFromLeft, textFromTop);

				if (this._options.countdownTimersTextFromTop < 0) {
					textFromTop -= this._options.countdownTimersTextFontSize;
				} else {
					textFromTop += this._options.countdownTimersTextFontSize;
				}
			}
		}

		// Restore previous context state
		ctx.restore();
	}
}
