export default function () {
	return {
		restrict: "A",
		link: function ($scope, element) {
			var stage = new PIXI.Container(),
				graphics = new PIXI.Graphics(),
				renderer = PIXI.autoDetectRenderer(228, 228, {antialias: true, transparent: true}),
				canvas = renderer.view,
				canvasPlaceholder = element[0];

			canvasPlaceholder.appendChild(canvas);

			graphics.lineStyle(6, $scope.desk.color);
			graphics.drawCircle(114, 114, 110);
			graphics.endFill();

			graphics.lineStyle(2, 0x494949);
			graphics.moveTo(116, 7);
			graphics.lineTo(116, 116);

			graphics.moveTo(116, 116);
			graphics.lineTo(24, 172);

			graphics.moveTo(116, 116);
			graphics.lineTo(204, 172);

			stage.addChild(graphics);
			renderer.render(stage);
		}
	};
};