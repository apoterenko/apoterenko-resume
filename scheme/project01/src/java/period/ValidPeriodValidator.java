package qiwi.util.validation.period;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ValidPeriodValidator implements ConstraintValidator<ValidPeriod, Period> {

	private ValidPeriod constraintAnnotation;

	@Override
	public void initialize(ValidPeriod constraintAnnotation) {
		this.constraintAnnotation = constraintAnnotation;
	}

	@Override
	public boolean isValid(Period period, ConstraintValidatorContext constraintValidatorContext) {
		final long dateFrom = period.getDateFrom().getTime();
		final long dateTill = period.getDateTill().getTime();

		return constraintAnnotation.strict()
				? dateFrom < dateTill
				: dateFrom <= dateTill;
	}
}