import HistogramModel from "app/HistogramModel";
import HistogramStatus from "app/HistogramStatus";
import HistogramController from "app/HistogramController";

describe('getHistogramProperties tests', function () {

	const HISTOGRAM_WIDTH = 3;

	it('#00 - compressing properties', function () {
		let originalHistogramWidth = HISTOGRAM_WIDTH,
			originalHistogram = [
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
				originalHistogramWidth,
				originalHistogramDensity
			)
		);

		expect(
			{
				originalHistogramWidth: originalHistogramWidth,
				originalHistogramUnitCount: originalHistogram.length,
				scaledHistogramUnitWidth: 1.5,
				scaledHistogramWidth: HISTOGRAM_WIDTH,
				scaledHistogramUnitCount: 3,
				scaledHistogramUnitCapacity: 2,
				isHistogramUnitWidthExpanding: false
			}
		).toEqual(
			controller.getHistogramProperties()
		);
	});
});