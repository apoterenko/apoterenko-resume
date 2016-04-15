import HistogramColorResolver from "app/HistogramColorResolver";

class HistogramView {

	static HISTOGRAM_UNIT = "<div class='histogram-unit' style='width: %dpx; background-color: %s;'></div>";

	static HISTOGRAM_BLOCK = "<div class='histogram'><div class='histogram-compressing'>Compressing</div>" +
		"Scaled histogram unit capacity: %d<br/>" +
		"Scaled histogram unit count: %d<br/>%s" +
		"</div>";

	zoom = 1;

	/**
	 * Set controller
	 * @param {HistogramController} controller
	 * @returns {HistogramView}
	 */
	setController(controller) {
		this.controller = controller;
		return this;
	}

	/**
	 * Set model
	 * @param {HistogramModel} model
	 * @returns {HistogramView}
	 */
	setModel(model) {
		this.model = model;
		return this;
	}

	/**
	 * Set zoom
	 * @param {Number} zoom
	 * @returns {HistogramView}
	 */
	setZoom(zoom) {
		this.zoom = zoom;
		return this;
	}

	/**
	 * Build histogram body
	 * @returns {String} Histogram body template
	 */
	buildBody() {
		let me = this,
			htmlBlock = [],
			histogramProperties = this.controller.getHistogramProperties(),
			isHistogramUnitWidthExpanding = false;

		this.controller.eachScaledHistogramUnit(function (item) {
			htmlBlock.push(
				s.sprintf(
					HistogramView.HISTOGRAM_UNIT,
					item.scaledHistogramUnitWidth * me.zoom,
					HistogramColorResolver.resolve(item.scaledHistogramUnitValue)
				)
			);
			isHistogramUnitWidthExpanding = item.isHistogramUnitWidthExpanding;
		});

		if (!this.controller.getHistogramProperties().isHistogramUnitWidthExpanding) {
			return s.sprintf(
				HistogramView.HISTOGRAM_BLOCK,
				histogramProperties.scaledHistogramUnitCapacity,
				histogramProperties.scaledHistogramUnitCount,
				htmlBlock.join("")
			);
		}
		return htmlBlock.join("");
	}

	/**
	 * Build histogram view
	 * @returns {String} Histogram view template
	 */
	buildView() {
		var histogramArray = this.model.getHistogramArray();

		return [
			'Histogram: [', histogramArray.join(', '), ']',
			'<br>',
			'Histogram size:' + histogramArray.length,
			'<br>',
			this.buildBody(),
			'<br><br><br><br>'
		].join("");
	}
}

export default HistogramView;