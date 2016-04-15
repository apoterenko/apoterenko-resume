package qiwi.util.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PeriodValidator implements ConstraintValidator<Period, PeriodRequest> {

	public void initialize(Period constraint) {
	}

	public boolean isValid(PeriodRequest request, ConstraintValidatorContext constraintValidatorContext) {
		return request.getFrom() < request.getTo();
	}

}