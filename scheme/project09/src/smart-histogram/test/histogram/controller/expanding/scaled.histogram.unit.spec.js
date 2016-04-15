import HistogramModel from "app/HistogramModel";
import HistogramStatus from "app/HistogramStatus";
import HistogramController from "app/HistogramController";

describe('getScaledHistogramUnitValue tests', function () {

	it('#00 - ok', function () {
		expect(HistogramStatus.OK).toEqual(
			HistogramController.getScaledHistogramUnitValue(
				[HistogramStatus.OK]
			)
		);
	});

	it('#01 - warn', function () {
		expect(HistogramStatus.WARN).toEqual(
			HistogramController.getScaledHistogramUnitValue(
				[HistogramStatus.WARN]
			)
		);
	});

	it('#02 - error', function () {
		expect(HistogramStatus.ERROR).toEqual(
			HistogramController.getScaledHistogramUnitValue(
				[HistogramStatus.ERROR]
			)
		);
	});

	it('#03 - miss', function () {
		expect(HistogramStatus.MISS).toEqual(
			HistogramController.getScaledHistogramUnitValue(
				[HistogramStatus.MISS]
			)
		);
	});

	it('#04 - ok and miss', function () {
		expect(HistogramStatus.OK).toEqual(
			HistogramController.getScaledHistogramUnitValue(
				[HistogramStatus.OK, HistogramStatus.MISS]
			)
		);
	});

	it('#05 - warn and miss', function () {
		expect(HistogramStatus.WARN).toEqual(
			HistogramController.getScaledHistogramUnitValue(
				[HistogramStatus.WARN, HistogramStatus.MISS]
			)
		);
	});

	it('#06 - error and miss', function () {
		expect(HistogramStatus.ERROR).toEqual(
			HistogramController.getScaledHistogramUnitValue(
				[HistogramStatus.ERROR, HistogramStatus.MISS]
			)
		);
	});

	it('#07 - ok and warn', function () {
		expect(HistogramStatus.WARN).toEqual(
			HistogramController.getScaledHistogramUnitValue(
				[HistogramStatus.OK, HistogramStatus.WARN]
			)
		);
	});

	it('#08 - ok and error', function () {
		expect(HistogramStatus.ERROR).toEqual(
			HistogramController.getScaledHistogramUnitValue(
				[HistogramStatus.OK, HistogramStatus.ERROR]
			)
		);
	});

	it('#09 - warn and error', function () {
		expect(HistogramStatus.ERROR).toEqual(
			HistogramController.getScaledHistogramUnitValue(
				[HistogramStatus.WARN, HistogramStatus.ERROR]
			)
		);
	});

	it('#10 - ok, ok, error', function () {
		expect(HistogramStatus.ERROR).toEqual(
			HistogramController.getScaledHistogramUnitValue(
				[HistogramStatus.OK, HistogramStatus.OK, HistogramStatus.ERROR]
			)
		);
	});

	it('#11 - warn, ok, error', function () {
		expect(HistogramStatus.ERROR).toEqual(
			HistogramController.getScaledHistogramUnitValue(
				[HistogramStatus.WARN, HistogramStatus.OK, HistogramStatus.ERROR]
			)
		);
	});

	it('#12 - warn, ok, ok', function () {
		expect(HistogramStatus.WARN).toEqual(
			HistogramController.getScaledHistogramUnitValue(
				[HistogramStatus.WARN, HistogramStatus.OK, HistogramStatus.OK]
			)
		);
	});
});