import { CanvasRenderingTarget2D } from 'fancy-canvas';
import { Coordinate, DrawingUtils, IPrimitivePaneRenderer, LineStyle } from 'lightweight-charts';

export class CountdownToClosePaneRenderer implements IPrimitivePaneRenderer {
	_priceCoordinate: Coordinate | null;
	_fillColor: string;
	_lineWidth: number;
	_lineStyle: LineStyle;

	constructor(priceCoordinate: Coordinate | null, fillColor: string, lineWidth: number, lineStyle: LineStyle) {
		this._priceCoordinate = priceCoordinate;
		this._fillColor = fillColor;
		this._lineWidth = lineWidth;
		this._lineStyle = lineStyle;
	}

	draw(target: CanvasRenderingTarget2D, utils: DrawingUtils) {
		target.useBitmapCoordinateSpace(scope => {
			if (this._priceCoordinate === null) {
				return;
			}

			const ctx = scope.context;
			// scope.verticalPixelRatio
			// const horizontalPositions = Math.round(scope.horizontalPixelRatio * this._priceCoordinate);

			const y = Math.round(this._priceCoordinate * scope.verticalPixelRatio);

			if (y < 0 || y > scope.bitmapSize.height) {
				return;
			}

			ctx.lineCap = 'butt';
			ctx.strokeStyle = this._fillColor;
			ctx.fillStyle = this._fillColor;
			ctx.lineWidth = Math.floor(this._lineWidth * scope.horizontalPixelRatio);
			utils.setLineStyle(ctx, this._lineStyle);

			ctx.beginPath();
			const correction = (ctx.lineWidth % 2) ? 0.5 : 0;
			ctx.moveTo(0, y + correction);
			ctx.lineTo(scope.bitmapSize.width, y + correction);
			ctx.stroke();

		});
	}
}
