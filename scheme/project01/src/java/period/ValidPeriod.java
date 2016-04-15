package qiwi.util.validation.period;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Constraint(validatedBy = ValidPeriodValidator.class)
@Target({TYPE})
@Retention(RUNTIME)
public @interface ValidPeriod {

	boolean strict() default true;

	String message() default "qiwi.error.period.valid";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}