import HistogramView from "app/HistogramView";
import HistogramModel from "app/HistogramModel";
import HistogramStatus from "app/HistogramStatus";
import HistogramController from "app/HistogramController";

const histogramZoom = 50;
const histogramCount = 100;
const histogramWidth = 20;
const histogramDensity = 1;

class HistogramGenerator {

	static generate() {
		for (let i = 0; i < histogramCount; i++) {
			HistogramGenerator.generateHistogram();
		}
	}

	static generateHistogram() {
		let originalHistogramWidth = histogramWidth,
			originalHistogramDensity = histogramDensity ,
			originalHistogram = [],
			originalHistogramUnitCount,
			controller = new HistogramController(),
			view = new HistogramView(),
			model = new HistogramModel(
				originalHistogram,
				originalHistogramWidth,
				originalHistogramDensity
			);

		controller.setModel(model);

		view.setController(controller)
			.setModel(model)
			.setZoom(histogramZoom);

		originalHistogramUnitCount = HistogramGenerator.getRandomValue(25);
		if (originalHistogramUnitCount == 0) {
			return;
		}

		for (let i = 0; i < originalHistogramUnitCount; i++) {
			originalHistogram.push(HistogramGenerator.getRandomValue(4));
		}

		$('body').append(view.buildView());
	}

	static getRandomValue(maxValue) {
		return Math.round(Math.random(maxValue) * (maxValue - 1));
	}
}

HistogramGenerator.generate();