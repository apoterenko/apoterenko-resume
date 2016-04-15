package qiwi.util.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Constraint(validatedBy = PeriodValidator.class)
@Target({TYPE})
@Retention(RUNTIME)
public @interface Period {

	String message() default "ru.qiwi.validation.constraints.Period.message";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}