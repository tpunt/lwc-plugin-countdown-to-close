import { BitmapCoordinatesRenderingScope, CanvasRenderingTarget2D } from 'fancy-canvas';
import { Coordinate, DrawingUtils, IPrimitivePaneRenderer } from 'lightweight-charts';
import { CountdownToCloseOptions } from './options';
import { TimeToClose } from './axis-view';

export class CountdownToClosePaneRenderer implements IPrimitivePaneRenderer {
	_priceCoordinate: Coordinate | null;
	_lineFillColor: string;
	_options: CountdownToCloseOptions;

	constructor(
		priceCoordinate: Coordinate | null,
		lineFillColor: string,
		options: CountdownToCloseOptions,
	) {
		this._priceCoordinate = priceCoordinate;
		this._lineFillColor = lineFillColor;
		this._options = options;
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

			ctx.lineCap = 'butt';
			ctx.strokeStyle = this._lineFillColor;
			ctx.fillStyle = this._lineFillColor;
			ctx.lineWidth = Math.floor(this._options.lineWidth * scope.horizontalPixelRatio);
			utils.setLineStyle(ctx, this._options.lineStyle);

			ctx.beginPath();
			ctx.moveTo(0, y1);
			ctx.lineTo(scope.bitmapSize.width, y1);

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
