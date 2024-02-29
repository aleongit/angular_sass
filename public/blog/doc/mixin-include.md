## @mixin and @include

Mixins allow you to define styles that can be re-used throughout your stylesheet. They make it easy to avoid using non-semantic classes like *.float-left*, and to distribute collections of styles in libraries.

Mixins are defined using the **@mixin** at-rule, which is written `@mixin <name> { ... }` or `@mixin name(<arguments...>) { ... }`. A mixin’s name can be any Sass identifier, and it can contain any statement other than top-level statements. They can be used to encapsulate styles that can be dropped into a single style rule; they can contain style rules of their own that can be nested in other rules or included at the top level of the stylesheet; or they can just serve to modify variables.

Mixins are included into the current context using the **@include** at-rule, which is written `@include <name>` or `@include <name>(<arguments...>)`, with the name of the mixin being included.


SCSS
```scss
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin horizontal-list {
  @include reset-list;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: 2em;
    }
  }
}

nav ul {
  @include horizontal-list;
}
```

CSS
```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav ul li {
  display: inline-block;
  margin-left: -2px;
  margin-right: 2em;
}
```


> 💡 **fun fact**<br>
> Mixin names, like all Sass identifiers, treat hyphens and underscores as identical. This means that *reset-list* and *reset_list* both refer to the same mixin. This is a historical holdover from the very early days of Sass, when it only allowed underscores in identifier names. Once Sass added support for hyphens to match CSS’s syntax, the two were made equivalent to make migration easier.


### Arguments

Mixins can also take arguments, which allows their behavior to be customized each time they’re called. The arguments are specified in the **@mixin** rule after the mixin’s name, as a list of variable names surrounded by parentheses. The mixin must then be included with the same number of arguments in the form of SassScript expressions. The values of these expression are available within the mixin’s body as the corresponding variables.


SCSS
```scss
@mixin rtl($property, $ltr-value, $rtl-value) {
  #{$property}: $ltr-value;

  [dir=rtl] & {
    #{$property}: $rtl-value;
  }
}

.sidebar {
  @include rtl(float, left, right);
}
```

CSS
```css
.sidebar {
  float: left;
}
[dir=rtl] .sidebar {
  float: right;
}
```

> 💡 **fun fact**<br>
> Argument lists can also have trailing commas! This makes it easier to avoid syntax errors when refactoring your stylesheets.


#### Optional Arguments

Normally, every argument a mixin declares must be passed when that mixin is included. However, you can make an argument optional by defining a default value which will be used if that argument isn’t passed. Default values use the same syntax as variable declarations: the variable name, followed by a colon and a SassScript expression. This makes it easy to define flexible mixin APIs that can be used in simple or complex ways.


SCSS
```scss
@mixin replace-text($image, $x: 50%, $y: 50%) {
  text-indent: -99999em;
  overflow: hidden;
  text-align: left;

  background: {
    image: $image;
    repeat: no-repeat;
    position: $x $y;
  }
}

.mail-icon {
  @include replace-text(url("/images/mail.svg"), 0);
}
```

CSS
```css
.mail-icon {
  text-indent: -99999em;
  overflow: hidden;
  text-align: left;
  background-image: url("/images/mail.svg");
  background-repeat: no-repeat;
  background-position: 0 50%;
}
```

> 💡 **fun fact**<br>
> Default values can be any SassScript expression, and they can even refer to earlier arguments!


#### Keyword Arguments

When a mixin is included, arguments can be passed by name in addition to passing them by their position in the argument list. This is especially useful for mixins with multiple optional arguments, or with boolean arguments whose meanings aren’t obvious without a name to go with them. Keyword arguments use the same syntax as variable declarations and optional arguments.


SCSS
```scss
@mixin square($size, $radius: 0) {
  width: $size;
  height: $size;

  @if $radius != 0 {
    border-radius: $radius;
  }
}

.avatar {
  @include square(100px, $radius: 4px);
}
```

CSS
```css
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 4px;
}
```

> ⚠️ **Heads up!**<br>
> Because any argument can be passed by name, be careful when renaming a mixin’s arguments… it might break your users! It can be helpful to keep the old name around as an optional argument for a while and printing a warning if anyone passes it, so they know to migrate to the new argument.



#### Taking Arbitrary Arguments

Sometimes it’s useful for a mixin to be able to take any number of arguments. If the last argument in a **@mixin** declaration ends in `...`, then all extra arguments to that mixin are passed to that argument as a list. This argument is known as an argument list.


SCSS
```scss
@mixin order($height, $selectors...) {
  @for $i from 0 to length($selectors) {
    #{nth($selectors, $i + 1)} {
      position: absolute;
      height: $height;
      margin-top: $i * $height;
    }
  }
}

@include order(150px, "input.name", "input.address", "input.zip");
```

CSS
```css
input.name {
  position: absolute;
  height: 150px;
  margin-top: 0px;
}

input.address {
  position: absolute;
  height: 150px;
  margin-top: 150px;
}

input.zip {
  position: absolute;
  height: 150px;
  margin-top: 300px;
}
```


#### Taking Arbitrary Keyword Arguments

Argument lists can also be used to take arbitrary keyword arguments. The **meta.keywords()** function takes an argument list and returns any extra keywords that were passed to the mixin as a *map* from argument names (not including *$*) to those arguments’ values.


SCSS
```scss
@use "sass:meta";

@mixin syntax-colors($args...) {
  @debug meta.keywords($args);
  // (string: #080, comment: #800, variable: #60b)

  @each $name, $color in meta.keywords($args) {
    pre span.stx-#{$name} {
      color: $color;
    }
  }
}

@include syntax-colors(
  $string: #080,
  $comment: #800,
  $variable: #60b,
)
```

CSS
```css
pre span.stx-string {
  color: #080;
}

pre span.stx-comment {
  color: #800;
}

pre span.stx-variable {
  color: #60b;
}
```


> 💡 **fun fact**<br>
> If you don’t ever pass an argument list to the **meta.keywords()** function, that argument list won’t allow extra keyword arguments. This helps callers of your mixin make sure they haven’t accidentally misspelled any argument names.



#### Passing Arbitrary Arguments

Just like argument lists allow mixins to take arbitrary positional or keyword arguments, the same syntax can be used to pass positional and keyword arguments to a mixin. If you pass a list followed by `...` as the last argument of an include, its elements will be treated as additional positional arguments. Similarly, a map followed by `...` will be treated as additional keyword arguments. You can even pass both at once!


SCSS
```scss
$form-selectors: "input.name", "input.address", "input.zip" !default;

@include order(150px, $form-selectors...);
```

> 💡 **fun fact**<br>
> Because an argument list keeps track of both positional and keyword arguments, you use it to pass both at once to another mixin. That makes it super easy to define an alias for a mixin!


SCSS
```scss
@mixin btn($args...) {
  @warn "The btn() mixin is deprecated. Include button() instead.";
  @include button($args...);
}
```

### Content Blocks
In addition to taking arguments, a mixin can take an entire block of styles, known as a content block. A mixin can declare that it takes a content block by including the **@content** at-rule in its body. The content block is passed in using curly braces like any other block in Sass, and it’s injected in place of the **@content** rule.


SCSS
```scss
@mixin hover {
  &:not([disabled]):hover {
    @content;
  }
}

.button {
  border: 1px solid black;
  @include hover {
    border-width: 2px;
  }
}
```

CSS
```css
.button {
  border: 1px solid black;
}
.button:not([disabled]):hover {
  border-width: 2px;
}
```

> 💡 **fun fact**<br>
> A mixin can include multiple *@content* at-rules. If it does, the content block will be included separately for each *@content*.

> ⚠️ **Heads up!**<br>
> A content block is lexically scoped, which means it can only see local variables in the scope where the mixin is included. It can’t see any variables that are defined in the mixin it’s passed to, even if they’re defined before the content block is invoked.



#### Passing Arguments to Content Blocksk


A mixin can pass arguments to its content block the same way it would pass arguments to another mixin by writing `@content(<arguments...>)`. The user writing the content block can accept arguments by writing `@include <name> using (<arguments...>)`. The argument list for a content block works just like a mixin’s argument list, and the arguments passed to it by `@content` work just like passing arguments to a mixin.

> ⚠️ **Heads up!**<br>
If a mixin passes arguments to its content block, that content block must declare that it accepts those arguments. This means that it’s a good idea to only pass arguments by position (rather than by name), and it means that passing more arguments is a breaking change.

If you want to be flexible in what information you pass to a content block, consider passing it a map that contains information it may need!


SCSS
```scss
@mixin media($types...) {
  @each $type in $types {
    @media #{$type} {
      @content($type);
    }
  }
}

@include media(screen, print) using ($type) {
  h1 {
    font-size: 40px;
    @if $type == print {
      font-family: Calluna;
    }
  }
}
```

CSS
```css
@media screen {
  h1 {
    font-size: 40px;
  }
}
@media print {
  h1 {
    font-size: 40px;
    font-family: Calluna;
  }
}
```


### Indented Mixin Syntax

The indented syntax has a special syntax for defining and using mixins, in addition to the standard **@mixin** and **@include**. Mixins are defined using the character `=`, and they’re included using `+`. Although this syntax is terser, it’s also harder to understand at a glance and users are encouraged to avoid it.


SASS
```scss
=reset-list
  margin: 0
  padding: 0
  list-style: none

=horizontal-list
  +reset-list

  li
    display: inline-block
    margin:
      left: -2px
      right: 2em

nav ul
  +horizontal-list
```

CSS
```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav ul li {
  display: inline-block;
  margin-left: -2px;
  margin-right: 2em;
}
```

