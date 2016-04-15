import HistogramStatus from "app/HistogramStatus";

class HistogramModel {

	histogramArray;
	histogramWidth;
	histogramDensity;

	/**
	 * @param {Array} histogramArray
	 * @param {Number} histogramWidth
	 * @param {Number} histogramDensity
	 */
	constructor(histogramArray, histogramWidth, histogramDensity) {
		this.histogramArray = histogramArray;
		this.histogramWidth = histogramWidth;
		this.histogramDensity = histogramDensity;
		!this.histogramArray.length && this.histogramArray.push(HistogramStatus.MISS);
	}

	/**
	 * Get histogram width
	 * @returns {Number}
	 */
	getHistogramWidth() {
		return this.histogramWidth;
	}

	/**
	 * Get histogram array
	 * @returns {Array}
	 */
	getHistogramArray() {
		return this.histogramArray;
	}

	/**
	 * Get histogram density
	 * @returns {Number}
	 */
	getHistogramDensity() {
		return this.histogramDensity;
	}
}

export default HistogramModel;