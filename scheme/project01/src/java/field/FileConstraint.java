package qiwi.util.validation.file;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Constraint(validatedBy = FileValidator.class)
@Target({TYPE})
@Retention(RUNTIME)
public @interface FileConstraint {

	String message() default "qiwi.error.validation.file";

	String[] formats();

	int size() default 1024;

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}