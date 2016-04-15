import HistogramModel from "app/HistogramModel";
import HistogramStatus from "app/HistogramStatus";
import HistogramController from "app/HistogramController";

describe('getScaledHistogram tests', function () {

	const HISTOGRAM_WIDTH = 10;

	it('#00 - two error status', function () {
		let originalHistogram = [HistogramStatus.ERROR, HistogramStatus.ERROR],
			originalHistogramDensity = 1,
			controller = new HistogramController();

		controller.setModel(
			new HistogramModel(
				originalHistogram,
				HISTOGRAM_WIDTH,
				originalHistogramDensity
			)
		);

		expect([[HistogramStatus.ERROR], [HistogramStatus.ERROR]]).toEqual(controller.getScaledHistogram());
	});

	it('#01 - one error status', function () {
		let originalHistogram = [HistogramStatus.ERROR],
			originalHistogramDensity = 1,
			controller = new HistogramController();

		controller.setModel(
			new HistogramModel(
				originalHistogram,
				HISTOGRAM_WIDTH,
				originalHistogramDensity
			)
		);

		expect([[HistogramStatus.ERROR]]).toEqual(controller.getScaledHistogram());
	});

	it('#02 - empty array of status', function () {
		let originalHistogram = [],
			originalHistogramDensity = 1,
			controller = new HistogramController();

		controller.setModel(
			new HistogramModel(
				originalHistogram,
				HISTOGRAM_WIDTH,
				originalHistogramDensity
			)
		);

		expect([[HistogramStatus.MISS]]).toEqual(controller.getScaledHistogram());
	});
});