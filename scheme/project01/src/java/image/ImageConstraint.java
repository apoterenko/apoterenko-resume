package qiwi.util.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Constraint(validatedBy = ImageValidator.class)
@Target({FIELD})
@Retention(RUNTIME)
public @interface ImageConstraint {

	String message() default "qiwi.image.validation.failure";

	String[] formats() default {"jpg", "jpeg"};

	int size() default 1024;

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
