## Lists

*Lists* contain a sequence of other values. In Sass, elements in lists can be separated by **commas** (Helvetica, Arial, sans-serif), **spaces** (10px 15px 0 0), or **slashes** as long as it’s consistent within the list. Unlike most other languages, lists in Sass don’t require special brackets; any expressions separated with spaces or commas count as a list. However, you’re allowed to write lists with square brackets `([line1 line2])`, which is useful when using grid-template-columns.

Sass lists can contain one or even zero elements. A single-element list can be written either `(<expression>,)` or `[<expression>]`, and a zero-element list can be written either `()` or `[]`. Also, all list functions will treat individual values that aren’t in lists as though they’re lists containing that value, which means you rarely need to explicitly create single-element lists.

> ⚠️ **Heads up!**
> Empty lists without brackets aren’t valid CSS, so Sass won’t let you use one in a property value.

### Slash-Separated Lists

Lists in Sass can be separated by *slashes*, to represent values like the font: 12px/30px shorthand for setting *font-size* and *line-height* or the `hsl(80 100% 50% / 0.5)` syntax for creating a color with a given opacity value. However, slash-separated lists can’t currently be written literally. Sass historically used the **/** character to indicate division, so while existing stylesheets transition to using *math.div()* slash-separated lists can only be written using **list.slash()**.

For more details, see Breaking Change: Slash as Division.

### Using Lists

Sass provides a handful of functions that make it possible to use lists to write powerful style libraries, or to make your app’s stylesheet cleaner and more maintainable.

#### Indexes

Many of these functions take or return numbers, called indexes, that refer to the elements in a list. The index **1** indicates the first element of the list. Note that this is different than many programming languages where indexes start at **0**! Sass also makes it easy to refer to the end of a list. The index **-1** refers to the last element in a list, **-2** refers to the second-to-last, and so on.


#### Access an Element

Lists aren’t much use if you can’t get values out of them. You can use the `list.nth($list, $n)` function to get the element at a given index in a list. The first argument is the list itself, and the second is the index of the value you want to get out.


SCSS

```scss
@use 'sass:list';

@debug list.nth(10px 12px 16px, 2); // 12px
@debug list.nth([line1, line2, line3], -1); // line3
```

#### Do Something for Every Element

This doesn’t actually use a function, but it’s still one of the most common ways to use lists. The *@each* rule evaluates a block of styles for each element in a list, and assigns that element to a variable.

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

#### Add to a List

It’s also useful to add elements to a list. The `list.append($list, $val)` function takes a list and a value, and returns a copy of the list with the value added to the end. Note that because Sass lists are immutable, it doesn’t modify the original list.


SCSS

```scss
@debug append(10px 12px 16px, 25px); // 10px 12px 16px 25px
@debug append([col1-line1], col1-line2); // [col1-line1, col1-line2]
```

#### Find an Element in a List

If you need to check if an element is in a list or figure out what index it’s at, use the `list.index($list, $value)` function. This takes a list and a value to locate in that list, and returns the index of that value.


SCSS

```scss
@use 'sass:list';

@debug list.index(1px solid red, 1px); // 1
@debug list.index(1px solid red, solid); // 2
@debug list.index(1px solid red, dashed); // null
```

If the value isn’t in the list at all, **list.index()** returns *null*. Because null is falsey, you can use *list.index()* with *@if* or *if()* to check whether a list does or doesn’t contain a given value.

SCSS

```scss
@use "sass:list";

$valid-sides: top, bottom, left, right;

@mixin attach($side) {
  @if not list.index($valid-sides, $side) {
    @error "#{$side} is not a valid side. Expected one of #{$valid-sides}.";
  }

  // ...
}
```

### Immutability

Lists in Sass **are immutable**, which means that the contents of a list value never changes. Sass’s list functions all return new lists rather than modifying the originals. Immutability helps avoid lots of sneaky bugs that can creep in when the same list is shared across different parts of the stylesheet.

You can still update your state over time by assigning new lists to the same variable, though. This is often used in functions and mixins to collect a bunch of values into one list.


SCSS

```scss
@use "sass:list";
@use "sass:map";

$prefixes-by-browser: ("firefox": moz, "safari": webkit, "ie": ms);

@function prefixes-for-browsers($browsers) {
  $prefixes: ();
  @each $browser in $browsers {
    $prefixes: list.append($prefixes, map.get($prefixes-by-browser, $browser));
  }
  @return $prefixes;
}

@debug prefixes-for-browsers("firefox" "ie"); // moz ms
```

### Argument Lists

When you declare a mixin or function that takes arbitrary arguments, the value you get is a special list known as an argument list. It acts just like a list that contains all the arguments passed to the mixin or function, with one extra feature: if the user passed keyword arguments, they can be accessed as a map by passing the argument list to the **meta.keywords()** function.


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
