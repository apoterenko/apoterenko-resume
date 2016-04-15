import HistogramModel from "app/HistogramModel";
import HistogramStatus from "app/HistogramStatus";

class HistogramController {

	/**
	 * Set model
	 * @param {HistogramModel} histogramModel
	 */
	setModel(histogramModel) {
		this.histogramModel = histogramModel;
		this.histogramProperties = null;
	}

	/**
	 * Get the calculated properties of the histogram
	 * @returns {object}
	 */
	getHistogramProperties() {
		if (this.histogramProperties) {
			return this.histogramProperties;
		}

		let model = this.histogramModel,
			originalHistogramWidth = model.getHistogramWidth(),
			originalHistogramUnitCount = model.getHistogramArray().length,
			scaledHistogramWidth = originalHistogramWidth / model.getHistogramDensity(),
			isHistogramUnitWidthExpanding = (scaledHistogramWidth / originalHistogramUnitCount) >= 1,
			scaledHistogramUnitCount = isHistogramUnitWidthExpanding ? originalHistogramUnitCount : scaledHistogramWidth,
			scaledHistogramUnitCapacity = Math.max(Math.ceil(originalHistogramUnitCount / scaledHistogramUnitCount), 1),
			scaledHistogramUnitWidth = isHistogramUnitWidthExpanding
				? (scaledHistogramWidth * originalHistogramUnitCount) / (scaledHistogramUnitCount * scaledHistogramUnitCount)
				: (scaledHistogramWidth * scaledHistogramUnitCapacity) / originalHistogramUnitCount;

		scaledHistogramUnitWidth = scaledHistogramUnitWidth * model.getHistogramDensity();

		return this.histogramProperties = {
			originalHistogramWidth: originalHistogramWidth,
			originalHistogramUnitCount: originalHistogramUnitCount,
			scaledHistogramUnitWidth: scaledHistogramUnitWidth,
			scaledHistogramWidth: scaledHistogramWidth,
			scaledHistogramUnitCount: scaledHistogramUnitCount,
			scaledHistogramUnitCapacity: scaledHistogramUnitCapacity,
			isHistogramUnitWidthExpanding: isHistogramUnitWidthExpanding
		};
	}

	/**
	 * Get the scaled histogram
	 * @returns {Array}
	 */
	getScaledHistogram() {
		let histogramProperties = this.getHistogramProperties(),
			originalHistogramArray = this.histogramModel.getHistogramArray(),
			scaledHistogramUnitCapacity = histogramProperties.scaledHistogramUnitCapacity,
			scaledHistogramArray = [],
			originalHistogramUnitValue,
			scaledHistogramArrayItem;

		for (let i = 0, k = 0, j; i < histogramProperties.scaledHistogramUnitCount; i++) {
			for (j = 0; j < scaledHistogramUnitCapacity; j++, k++) {
				originalHistogramUnitValue = originalHistogramArray[k];
				if (typeof originalHistogramUnitValue !== "undefined") {
					scaledHistogramArrayItem = scaledHistogramArray[i] = scaledHistogramArray[i] || [];
					scaledHistogramArrayItem.push(originalHistogramUnitValue);
				} else {
					return scaledHistogramArray;
				}
			}
		}
		return scaledHistogramArray;
	}

	/**
	 * Get the scaled histogram unit value
	 * @param {Array} histogramUnit
	 * @returns {HistogramStatus} Scaled histogram status
	 */
	static getScaledHistogramUnitValue(histogramUnit) {
		let status = HistogramStatus.MISS;

		histogramUnit.every(function (histogramUnitValue) {
			if (histogramUnitValue === HistogramStatus.ERROR) {
				status = HistogramStatus.ERROR;
				// Error has higher priority than warn status
				return false;
			} else if (histogramUnitValue === HistogramStatus.WARN) {
				status = HistogramStatus.WARN;
			} else if (histogramUnitValue === HistogramStatus.OK && status !== HistogramStatus.WARN) {
				// Warn has higher priority than ok status
				status = HistogramStatus.OK;
			}
			return true;
		});
		return status;
	}

	/**
	 * Each scaled the histogram unit
	 * @param {Function} callback
	 */
	eachScaledHistogramUnit(callback) {
		let histogramProperties = this.getHistogramProperties(),
			scaledHistogram = this.getScaledHistogram();

		scaledHistogram.forEach(function (scaledHistogramItem) {
			callback({
				isHistogramUnitWidthExpanding: histogramProperties.isHistogramUnitWidthExpanding,
				scaledHistogramUnitWidth: histogramProperties.scaledHistogramUnitWidth,
				scaledHistogramUnitCount: histogramProperties.scaledHistogramUnitCount,
				scaledHistogramUnitCapacity: histogramProperties.scaledHistogramUnitCapacity,
				scaledHistogramUnitValue: HistogramController.getScaledHistogramUnitValue(scaledHistogramItem)
			});
		});
	}
}

export default HistogramController;