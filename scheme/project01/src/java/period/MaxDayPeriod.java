package qiwi.util.validation.period;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Constraint(validatedBy = MaxDayPeriodValidator.class)
@Target({TYPE})
@Retention(RUNTIME)
public @interface MaxDayPeriod {

	String message() default "qiwi.error.period.max.day";

	int value() default 1;

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
