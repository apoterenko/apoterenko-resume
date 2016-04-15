package qiwi.jira.plugins.estimate;

import java.util.Date;
import java.util.Iterator;
import java.util.ListIterator;
import java.util.NoSuchElementException;

class TimeResourceIterator implements Iterator<TimeResource> {
	private final ListIterator<TimeResource> cachedTimeResourceIterator;
	private final Iterator<Date> dateIterator;
	private final double dailyResource;

	private TimeResource newTimeResource;

	TimeResourceIterator(
			ListIterator<TimeResource> cachedTimeResourceIterator,
			Iterator<Date> dateIterator,
			double dailyResource) {
		this.cachedTimeResourceIterator = cachedTimeResourceIterator;
		this.dateIterator = dateIterator;

		if (dailyResource <= 0) {
			throw new IllegalArgumentException("dailyResource must be > 0");
		}
		this.dailyResource = dailyResource;
	}

	@Override
	public boolean hasNext() {
		if (newTimeResource != null || cachedTimeResourceIterator.hasNext()) {
			return true;
		}
		if (dateIterator.hasNext()) {
			newTimeResource = new TimeResource(dateIterator.next(), dailyResource);
			cachedTimeResourceIterator.add(newTimeResource);
			return true;
		}
		return false;
	}

	@Override
	public TimeResource next() {
		if (!hasNext()) {
			throw new NoSuchElementException();
		}

		TimeResource timeResource = this.newTimeResource;
		if (timeResource == null) {
			timeResource = cachedTimeResourceIterator.next();
		} else {
			this.newTimeResource = null;
		}
		return timeResource;
	}

	@Override
	public void remove() {
		cachedTimeResourceIterator.remove();
	}
}
