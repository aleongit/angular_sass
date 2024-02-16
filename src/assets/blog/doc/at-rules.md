## At-Rules

Much of Sass’s extra functionality comes in the form of new at-rules it adds on top of CSS:

- **@use** loads mixins, functions, and variables from other Sass stylesheets, and combines CSS from multiple stylesheets together.

- **@forward** loads a Sass stylesheet and makes its mixins, functions, and variables available when your stylesheet is loaded with the **@use** rule.

- **@import** extends the CSS at-rule to load styles, mixins, functions, and variables from other stylesheets.

- **@mixin** and **@include** makes it easy to re-use chunks of styles.

- **@function** defines custom functions that can be used in SassScript expressions.

- **@extend** allows selectors to inherit styles from one another.

- **@at-root** puts styles within it at the root of the CSS document.

- **@error** causes compilation to fail with an error message.

- **@warn** prints a warning without stopping compilation entirely.

- **@debug** prints a message for debugging purposes.

Flow control rules like **@if**, **@each**, **@for**, and **@while** control whether or how many times styles are emitted.

Sass also has some special behavior for plain CSS at-rules: they can contain interpolation, and they can be nested in style rules. Some of them, like **@media** and **@supports**, also allow SassScript to be used directly in the rule itself without interpolation.