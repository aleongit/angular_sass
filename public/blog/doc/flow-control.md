## Flow Control Rules

Sass provides a number of at-rules that make it possible to control whether styles get emitted, or to emit them multiple times with small variations. They can also be used in mixins and functions to write small algorithms to make writing your Sass easier. Sass supports four flow control rules.

- **@if** controls whether or not a block is evaluated.

- **@each** evaluates a block for each element in a list or each pair in a map.

- **@for** evaluates a block a certain number of times.

- **@while** evaluates a block until a certain condition is met.


### @if and @else

The **@if** rule is written `@if <expression> { ... }`, and it controls whether or not its block gets evaluated (including emitting any styles as CSS). The expression usually returns either true or false—if the expression returns true, the block is evaluated, and if the expression returns false it’s not.

SCSS
```scss
@use "sass:math";

@mixin avatar($size, $circle: false) {
  width: $size;
  height: $size;

  @if $circle {
    border-radius: math.div($size, 2);
  }
}

.square-av {
  @include avatar(100px, $circle: false);
}
.circle-av {
  @include avatar(100px, $circle: true);
}
```

CSS
```css
.square-av {
  width: 100px;
  height: 100px;
}

.circle-av {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
```


### @else

An *@if* rule can optionally be followed by an **@else** rule, written `@else { ... }`. This rule’s block is evaluated if the *@if* expression returns *false*.


SCSS
```scss
$light-background: #f2ece4;
$light-text: #036;
$dark-background: #6b717f;
$dark-text: #d2e1dd;

@mixin theme-colors($light-theme: true) {
  @if $light-theme {
    background-color: $light-background;
    color: $light-text;
  } @else {
    background-color: $dark-background;
    color: $dark-text;
  }
}

.banner {
  @include theme-colors($light-theme: true);
  body.dark & {
    @include theme-colors($light-theme: false);
  }
}
```

CSS
```css
.banner {
  background-color: #f2ece4;
  color: #036;
}
body.dark .banner {
  background-color: #6b717f;
  color: #d2e1dd;
}
```

Conditional expressions may contain *boolean operators* (**and**, **or**, **not**).

### @else if

You can also choose whether to evaluate an *@else* rule’s block by writing it `@else if <expression> { ... }`. If you do, the block is evaluated only if the preceding @if’s expression returns *false* and the *@else if’s* expression returns *true*.

In fact, you can chain as many *@else ifs* as you want after an *@if*. The first block in the chain whose expression returns true will be evaluated, and no others. If there’s a plain @else at the end of the chain, its block will be evaluated if every other block fails.


SCSS
```scss
@use "sass:math";

@mixin triangle($size, $color, $direction) {
  height: 0;
  width: 0;

  border-color: transparent;
  border-style: solid;
  border-width: math.div($size, 2);

  @if $direction == up {
    border-bottom-color: $color;
  } @else if $direction == right {
    border-left-color: $color;
  } @else if $direction == down {
    border-top-color: $color;
  } @else if $direction == left {
    border-right-color: $color;
  } @else {
    @error "Unknown direction #{$direction}.";
  }
}

.next {
  @include triangle(5px, black, right);
}
```

CSS
```css
.next {
  height: 0;
  width: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 2.5px;
  border-left-color: black;
}
```



### Truthiness and Falsiness

Anywhere *true* or *false* are allowed, you can use other values as well. The values *false* and *null* are **falsey**, which means Sass considers them to indicate falsehood and cause conditions to fail. Every other value is considered **truthy**, so Sass considers them to work like *true* and cause conditions to succeed.

For example, if you want to check if a string contains a space, you can just write string.*index($string, " ")*. The *string.index()* function returns null if the string isn’t found and a number otherwise.

> ⚠️ **Heads up!**<br>
> Some languages consider more values **falsey** than just *false* and *null*. Sass isn’t one of those languages! Empty strings, empty lists, and the number 0 are all **truthy** in Sass.


### @each

The **@each** rule makes it easy to emit styles or evaluate code for each element of a list or each pair in a map. It’s great for repetitive styles that only have a few variations between them. It’s usually written `@each <variable> in <expression> { ... }`, where the expression returns a list. The block is evaluated for each element of the list in turn, which is assigned to the given variable name.


SCSS
```scss
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
```

CSS
```css
.icon-40px {
  font-size: 40px;
  height: 40px;
  width: 40px;
}

.icon-50px {
  font-size: 50px;
  height: 50px;
  width: 50px;
}

.icon-80px {
  font-size: 80px;
  height: 80px;
  width: 80px;
}
```

### With Maps

You can also use *@each* to iterate over every key/value pair in a map by writing it `@each <variable>, <variable> in <expression> { ... }`. The key is assigned to the first variable name, and the element is assigned to the second.

SCSS
```scss
$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
  }
}
```

CSS
```css
.icon-eye:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "\f112";
}

.icon-start:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "\f12e";
}

.icon-stop:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "\f12f";
}
```

### Destructuring

If you have a list of lists, you can use *@each* to automatically assign variables to each of the values from the inner lists by writing it `@each <variable...> in <expression> { ... }`. This is known as *destructuring*, since the variables match the structure of the inner lists. Each variable name is assigned to the value at the corresponding position in the list, or null if the list doesn’t have enough values.

SCSS
```scss
$icons:
  "eye" "\f112" 12px,
  "start" "\f12e" 16px,
  "stop" "\f12f" 10px;

@each $name, $glyph, $size in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
    font-size: $size;
  }
}
```

CSS
```css
.icon-eye:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "\f112";
  font-size: 12px;
}

.icon-start:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "\f12e";
  font-size: 16px;
}

.icon-stop:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "\f12f";
  font-size: 10px;
}
```

> 💡 **Fun fact**<br>
> Because *@each* supports destructuring and maps count as lists of lists, *@each*’s map support works without needing special support for maps in particular.


### @for

The **@for** rule, written `@for <variable> from <expression> to <expression> { ... }` or `@for <variable> from <expression> through <expression> { ... }`, counts up or down from one number (the result of the first expression) to another (the result of the second) and evaluates a block for each number in between. Each number along the way is assigned to the given variable name. If to is used, the final number is excluded; if through is used, it’s included.


SCSS
```scss
$base-color: #036;

@for $i from 1 through 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
```

CSS
```css
ul:nth-child(3n+1) {
  background-color: #004080;
}

ul:nth-child(3n+2) {
  background-color: #004d99;
}

ul:nth-child(3n+3) {
  background-color: #0059b3;
}
```


### @while

The **@while** rule, written `@while <expression> { ... }`, evaluates its block if its expression returns *true*. Then, if its expression still returns true, it evaluates its block again. This continues until the expression finally returns *false*.


SCSS
```scss
@use "sass:math";

/// Divides `$value` by `$ratio` until it's below `$base`.
@function scale-below($value, $base, $ratio: 1.618) {
  @while $value > $base {
    $value: math.div($value, $ratio);
  }
  @return $value;
}

$normal-font-size: 16px;
sup {
  font-size: scale-below(20px, 16px);
}
```

CSS
```css
sup {
  font-size: 12.3609394314px;
}
```

> ⚠️ **Heads up!**
> Although *@while* is necessary for a few particularly complex stylesheets, you’re usually better of using either *@each* or *@for* if either of them will work. They’re clearer for the reader, and often faster to compile as well.
