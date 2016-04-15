import HistogramModel from "app/HistogramModel";
import HistogramStatus from "app/HistogramStatus";
import HistogramController from "app/HistogramController";

describe('getScaledHistogram tests', function () {

	const HISTOGRAM_WIDTH = 3;

	it('#00 - compressed scaled histogram', function () {
		let originalHistogram = [
				HistogramStatus.ERROR,
				HistogramStatus.OK,
				HistogramStatus.WARN,
				HistogramStatus.OK
			],
			originalHistogramDensity = 1,
			controller = new HistogramController();

		controller.setModel(
			new HistogramModel(
				originalHistogram,
				HISTOGRAM_WIDTH,
				originalHistogramDensity
			)
		);

		expect(
			[[HistogramStatus.ERROR, HistogramStatus.OK],
				[HistogramStatus.WARN, HistogramStatus.OK]]
		).toEqual(controller.getScaledHistogram());
	});
});