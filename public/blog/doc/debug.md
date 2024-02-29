## @debug

Sometimes it’s useful to see the value of a variable or expression while you’re developing your stylesheet. That’s what the **@debug** rule is for: it’s written `@debug <expression>`, and it prints the value of that expression, along with the filename and line number.

SCSS
```scss
@mixin inset-divider-offset($offset, $padding) {
  $divider-offset: (2 * $padding) + $offset;
  @debug "divider offset: #{$divider-offset}";

  margin-left: $divider-offset;
  width: calc(100% - #{$divider-offset});
}
```

The exact format of the debug message varies from implementation to implementation. This is what it looks like in Dart Sass:

```
test.scss:3 Debug: divider offset: 132px
```

> 💡 **Fun fact**<br>
> You can pass any value to *@debug*, not just a string! It prints the same representation of that value as the *meta.inspect()* function.