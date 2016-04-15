package qiwi.util.bean.converter;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Target({FIELD})
@Retention(RUNTIME)
public @interface DateField {

	DatePattern pattern() default DatePattern.LONG;

	boolean allowUserTimeZone() default false;
}