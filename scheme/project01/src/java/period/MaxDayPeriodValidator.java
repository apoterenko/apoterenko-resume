package qiwi.util.validation.period;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class MaxDayPeriodValidator implements ConstraintValidator<MaxDayPeriod, Period> {

	private int maxDay;

	@Override
	public void initialize(MaxDayPeriod constraintAnnotation) {
		maxDay = constraintAnnotation.value();
	}

	@Override
	public boolean isValid(Period period, ConstraintValidatorContext constraintValidatorContext) {
		return period.getDateTill().getTime() - period.getDateFrom().getTime() <= DAY_AT_MILLISECOND * maxDay;
	}

	private static final long DAY_AT_MILLISECOND = 1000 * 60 * 60 * 24;
}