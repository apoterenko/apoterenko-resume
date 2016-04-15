### An example of specific guice scope.

The application shows how you can create your own specific scope using Google Guice Framework.

#### Use case example:

```java
@Provides
@SpecificScope
@Named("specific-scope-data")
protected Map<String, String> getData() {
    return ImmutableMap.<String, String>builder()
            .put("resource-url", "http://resource.com")
            .build();
}
```