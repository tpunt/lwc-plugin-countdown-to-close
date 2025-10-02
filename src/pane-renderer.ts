import { CanvasRenderingTarget2D } from 'fancy-canvas';
import { Coordinate, DrawingUtils, IPrimitivePaneRenderer, LineStyle } from 'lightweight-charts';

export class CountdownToClosePaneRenderer implements IPrimitivePaneRenderer {
	_bidPriceCoordinate: Coordinate | null;
	_askPriceCoordinate: Coordinate | null;
	_spreadFillColor: string;
	_spreadLabel: string;
	_spreadTextColor: string;
	_lineFillColor: string;
	_lineWidth: number;
	_lineStyle: LineStyle;

	constructor(
		bidPriceCoordinate: Coordinate | null,
		askPriceCoordinate: Coordinate | null,
		spreadFillColor: string,
		spreadLabel: string,
		spreadTextColor: string,
		lineFillColor: string,
		lineWidth: number,
		lineStyle: LineStyle,
	) {
		this._bidPriceCoordinate = bidPriceCoordinate;
		this._askPriceCoordinate = askPriceCoordinate;
		this._spreadFillColor = spreadFillColor;
		this._spreadLabel = spreadLabel;
		this._spreadTextColor = spreadTextColor;
		this._lineFillColor = lineFillColor;
		this._lineWidth = lineWidth;
		this._lineStyle = lineStyle;
	}

	draw(target: CanvasRenderingTarget2D, utils: DrawingUtils) {
		target.useBitmapCoordinateSpace(scope => {
			if (this._bidPriceCoordinate === null) {
				return;
			}

			const y1 = Math.round(this._bidPriceCoordinate! * scope.verticalPixelRatio);

			if (y1 < 0 || y1 > scope.bitmapSize.height) {
				return;
			}

			const ctx = scope.context;

			ctx.lineCap = 'butt';
			ctx.strokeStyle = this._lineFillColor;
			ctx.fillStyle = this._lineFillColor;
			ctx.lineWidth = Math.floor(this._lineWidth * scope.horizontalPixelRatio);
			utils.setLineStyle(ctx, this._lineStyle);

			ctx.beginPath();
			ctx.moveTo(0, y1);
			ctx.lineTo(scope.bitmapSize.width, y1);

			if (this._askPriceCoordinate !== null) {
				const y2 = Math.round(this._askPriceCoordinate! * scope.verticalPixelRatio);

				if (y2 < 0 || y2 > scope.bitmapSize.height) {
					return;
				}

				ctx.moveTo(0, y2);
				ctx.lineTo(scope.bitmapSize.width, y2);

				if (this._spreadFillColor !== null) {
					ctx.fillStyle = this._spreadFillColor;
					ctx.fillRect(0, y1, scope.bitmapSize.width, y2 - y1);
				}

				if (this._spreadLabel !== '') {
					ctx.fillStyle = this._spreadTextColor;
					ctx.font = `${Math.abs(y2 - y1)}px Arial`;

					const textHeight = ctx.measureText(this._spreadLabel).actualBoundingBoxAscent + ctx.measureText(this._spreadLabel).actualBoundingBoxDescent;

					ctx.fillText(this._spreadLabel, 5, y1 + (y2 - y1) / 2 + textHeight / 2);
				}
			}

			ctx.stroke();
		});
	}
}
