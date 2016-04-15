package qiwi.util.period;

import com.google.common.base.Predicate;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Iterables;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.joda.time.*;

import java.util.*;

import static org.joda.time.DurationFieldType.*;

final class PeriodCreator {

	@NotNull
	static Period create(@NotNull PeriodInfoRequest periodInfoRequest) {
		Support.checkArguments(periodInfoRequest);

		@NotNull Period period = Support.makePeriod(periodInfoRequest);

		final int lastSignificantPosition = Support.findLastSignificantPosition(period);
		if (lastSignificantPosition == -1) {
			/* В периоде все нули, поэтому ничего не делаем */
			return period;
		}

		return prepareWithMinActualFieldPositionRestriction(periodInfoRequest, period, lastSignificantPosition);
	}

	private static Period prepareWithMinActualFieldPositionRestriction(
			@NotNull PeriodInfoRequest periodInfoRequest,
			@NotNull Period period,
			int lastSignificantPosition) {

		final int minActualFieldPosition = getMinActualFieldPosition(periodInfoRequest);

		for (int curPosition = 0; curPosition < Support.getMaxPossibleVisibleFields(); curPosition++) {

			if (curPosition < minActualFieldPosition) {
				/* Округляем слева, пока не встретился минимально значимый разряд справа [MILLIS -> YEAR]*/
				period = Support.roundPeriod(period, Support.extractFieldType(curPosition));
			}

			final int curValue = Support.extractValue(period, Support.extractFieldType(curPosition));
			final int previousPosition = curPosition - 1;

			if (curValue == 0 && previousPosition > 0 && previousPosition < lastSignificantPosition) {

				/* Если встретился ноль в разряде – все что левее обнуляем: идем влево [YEAR -> MILLIS] пока не встретился еще один ноль */
				final MutablePeriod mp = period.toMutablePeriod();
				int backIndex = previousPosition;

				while (backIndex > -1) {
					final DurationFieldType backFieldType = Support.extractFieldType(backIndex);
					if (Support.extractValue(period, backFieldType) == 0) {
						break;
					}

					mp.set(backFieldType, 0);
					backIndex--;
				}
				period = mp.toPeriod();
			}
		}

		return period;
	}

	private static int getMinActualFieldPosition(@NotNull PeriodInfoRequest periodInfoRequest) {
		final PeriodFieldType periodFieldType = periodInfoRequest.getMinActualFieldPosition();

		return periodFieldType != null ?
				periodFieldType.ordinal() :
				0;
	}

	private static class Support {

		static int extractValue(Period period, DurationFieldType durationFieldType) {
			return period.get(durationFieldType);
		}

		static int extractUnNormalizedFieldTypeMinValue(DurationFieldType fieldType) {
			return DURATION_FIELD_TYPE_VALUES.get(fieldType);
		}

		static DurationFieldType extractFieldType(int position) {
			return PERIOD_TYPE_ARRAY[position];
		}

		static int getMaxPossibleVisibleFields() {
			return PERIOD_TYPE_ARRAY.length;
		}

		static int findLastSignificantPosition(final Period period) {
			final int result = Iterables.indexOf(PERIOD_TYPE_COLLECTION, new Predicate<DurationFieldType>() {

				@Override
				public boolean apply(@Nullable DurationFieldType fieldType) {
					return fieldType != null && extractValue(period, fieldType) != 0;
				}
			});
			return result > -1 ? PERIOD_TYPE_ARRAY.length - result - 1 : result;
		}

		static Period roundPeriod(Period period, DurationFieldType fieldType) {
			final int durationValue = extractUnNormalizedFieldTypeMinValue(fieldType);
			final int value = period.get(fieldType);

			final MutablePeriod mutablePeriod = period.toMutablePeriod();

			/* При округлении мы делим максимальное значение максимальной величины разряда на 2 */
			if (value < Math.round(durationValue / 2)) {

				/* Округляем в меньшую сторону */
				mutablePeriod.add(fieldType, -value);
			} else {

				/* Округляем в большую сторону */
				if (fieldType == DurationFieldType.days()) {

					/* API joda.time не нормализует дни, т.к. их количество в месяце не определено */
					mutablePeriod.add(DurationFieldType.months(), 1);
					mutablePeriod.set(fieldType, 0);
				} else {
					mutablePeriod.add(fieldType, durationValue - value);
				}
			}

			/* Затем время нормализуем – то есть, 1 минута 62 секунды превращаются в 2 минуты и 2 секунды */
			return mutablePeriod.toPeriod().normalizedStandard(FULL_PERIOD_TYPE);
		}

		static Period makePeriod(@NotNull PeriodInfoRequest periodInfoRequest) {
			return new Period(
					new DateTime(periodInfoRequest.getStart()),
					new DateTime(periodInfoRequest.getEnd()),
					FULL_PERIOD_TYPE
			);
		}

		static void checkArguments(@NotNull PeriodInfoRequest periodInfoRequest) {
			if (periodInfoRequest.getStart() > periodInfoRequest.getEnd()) {
				throw new IllegalArgumentException("End value must be greater than start value...");
			}
		}

		private static final DurationFieldType[] PERIOD_TYPE_ARRAY = new DurationFieldType[]{
				millis(),
				seconds(),
				minutes(),
				hours(),
				days(),
				months(),
				years()
		};

		private static final Iterable<DurationFieldType> PERIOD_TYPE_COLLECTION;

		static {
			final List<DurationFieldType> list = Arrays.asList(PERIOD_TYPE_ARRAY.clone());
			Collections.reverse(list);
			PERIOD_TYPE_COLLECTION = Collections.unmodifiableList(list);
		}

		private static final PeriodType FULL_PERIOD_TYPE = PeriodType.forFields(PERIOD_TYPE_ARRAY);

		private static final Map<DurationFieldType, Integer> DURATION_FIELD_TYPE_VALUES =
				ImmutableMap.<DurationFieldType, Integer>builder()
						.put(millis(), DateTimeConstants.MILLIS_PER_SECOND)
						.put(seconds(), DateTimeConstants.SECONDS_PER_MINUTE)
						.put(minutes(), DateTimeConstants.MINUTES_PER_HOUR)
						.put(hours(), DateTimeConstants.HOURS_PER_DAY)
						.put(days(), DateTimeConstants.DAYS_PER_WEEK * 4 + 3)
						.put(months(), DateTimeConstants.DECEMBER)
						.build();
	}
}