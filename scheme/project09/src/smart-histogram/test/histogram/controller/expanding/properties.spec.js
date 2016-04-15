import HistogramModel from "app/HistogramModel";
import HistogramStatus from "app/HistogramStatus";
import HistogramController from "app/HistogramController";

describe('getHistogramProperties tests', function () {

	const HISTOGRAM_WIDTH = 10;

	it('#00 - one error status', function () {
		let originalHistogramWidth = HISTOGRAM_WIDTH,
			originalHistogram = [HistogramStatus.ERROR],
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
				scaledHistogramUnitWidth: HISTOGRAM_WIDTH,
				scaledHistogramWidth: HISTOGRAM_WIDTH,
				scaledHistogramUnitCount: 1,
				scaledHistogramUnitCapacity: 1,
				isHistogramUnitWidthExpanding: true
			}
		).toEqual(
			controller.getHistogramProperties()
		);
	});

	it('#01 - two error status', function () {
		let originalHistogramWidth = HISTOGRAM_WIDTH,
			originalHistogram = [HistogramStatus.ERROR, HistogramStatus.ERROR],
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
				scaledHistogramUnitWidth: 5,
				scaledHistogramWidth: HISTOGRAM_WIDTH,
				scaledHistogramUnitCount: 2,
				scaledHistogramUnitCapacity: 1,
				isHistogramUnitWidthExpanding: true
			}
		).toEqual(
			controller.getHistogramProperties()
		);
	});

	it('#02 - empty array of status', function () {
		let originalHistogramWidth = HISTOGRAM_WIDTH,
			originalHistogram = [],
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
				scaledHistogramUnitWidth: HISTOGRAM_WIDTH,
				scaledHistogramWidth: HISTOGRAM_WIDTH,
				scaledHistogramUnitCount: 1,
				scaledHistogramUnitCapacity: 1,
				isHistogramUnitWidthExpanding: true
			}
		).toEqual(
			controller.getHistogramProperties()
		);
	});
});