import { CanvasRenderingTarget2D } from 'fancy-canvas';
import { Coordinate, DrawingUtils, IPrimitivePaneRenderer, LineStyle } from 'lightweight-charts';

export class CountdownToClosePaneRenderer implements IPrimitivePaneRenderer {
	_priceCoordinate: Coordinate | null;
	_lineFillColor: string;
	_lineWidth: number;
	_lineStyle: LineStyle;

	constructor(
		priceCoordinate: Coordinate | null,
		lineFillColor: string,
		lineWidth: number,
		lineStyle: LineStyle,
	) {
		this._priceCoordinate = priceCoordinate;
		this._lineFillColor = lineFillColor;
		this._lineWidth = lineWidth;
		this._lineStyle = lineStyle;
	}

	draw(target: CanvasRenderingTarget2D, utils: DrawingUtils) {
		target.useBitmapCoordinateSpace(scope => {
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
			ctx.lineWidth = Math.floor(this._lineWidth * scope.horizontalPixelRatio);
			utils.setLineStyle(ctx, this._lineStyle);

			ctx.beginPath();
			ctx.moveTo(0, y1);
			ctx.lineTo(scope.bitmapSize.width, y1);

			ctx.stroke();
		});
	}
}
