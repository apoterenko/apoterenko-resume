import HistogramStatus from "app/HistogramStatus";

class HistogramColorResolver {

	/**
	 * Resolve histogram color by status
	 * @returns {String}
	 */
	static resolve(status) {
		switch (status) {
			case HistogramStatus.ERROR:
				return '#ce3249';
			case HistogramStatus.OK:
				return '#9ec133';
			case HistogramStatus.WARN:
				return '#f38a36';
			case HistogramStatus.MISS:
				return '#a0a0a0';
		}
	}
}

export default HistogramColorResolver;