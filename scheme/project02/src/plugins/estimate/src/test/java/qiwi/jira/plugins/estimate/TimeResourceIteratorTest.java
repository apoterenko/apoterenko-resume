package qiwi.jira.plugins.estimate;

import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.TimeZone;

import org.testng.Assert;
import org.testng.annotations.Test;

import qiwi.jira.specific.date.DateServiceImpl;
import qiwi.jira.util.DateFunctions;

import com.google.common.base.Function;
import com.google.common.collect.Collections2;
import com.google.common.collect.Iterators;
import com.google.common.collect.Lists;

public class TimeResourceIteratorTest {
	final List<TimeResource> cachedTimeResources = Lists.newLinkedList();
	final Date startDate = new Date();
	final Iterator<Date> dateIterator = Iterators.transform(
			new DateServiceImpl().getDaysFromDate(startDate, TimeZone.getDefault())
					.iterator(),
			DateFunctions.JODATIME_TO_DATE);
	final double dailyResource = 5.8;

	@Test
	public void testTimeResourceIterator() {
		Iterator<TimeResource> timeResourceIterator = new TimeResourceIterator(
				cachedTimeResources.listIterator(),
				dateIterator,
				dailyResource
			);

		final int iterationCount = 5;
		final long millisInDay = 1000 * 60 * 60 * 24;
		final Date[] dateArray = new Date[iterationCount];

		for (int i = 0; i < iterationCount; i++) {
			Assert.assertTrue(timeResourceIterator.hasNext());
			dateArray[i] = timeResourceIterator.next().getDate();
			if (i > 0) {
				Assert.assertEquals(
						new Date(dateArray[i - 1].getTime() + millisInDay),
						dateArray[i]);
			}
		}

		Assert.assertEquals(
				Collections2.transform(
						cachedTimeResources,
						new Function<TimeResource, Date>() {
							@Override
							public Date apply(TimeResource from) {
								return from.getDate();
							}
						}),
				Arrays.asList(dateArray)
			);
	}

	@Test(dependsOnMethods = "testTimeResourceIterator")
	public void printTimeResourceIterations() {
		Iterator<TimeResource> timeResourceIterator = new TimeResourceIterator(
				cachedTimeResources.listIterator(),
				dateIterator,
				dailyResource
			);
		for (int i = 0; i < 10; i++) {
			System.out.println(timeResourceIterator.next().getDate());
		}
	}
}
