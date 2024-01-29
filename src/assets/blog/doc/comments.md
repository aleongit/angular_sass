## Comments

The way Sass comments work differs substantially between SCSS and the indented syntax. Both syntaxes support two types of comments: comments defined using **/_*_ _*_/** that are (usually) compiled to CSS, and comments defined using **//** that are not.


### In SCSS

Comments in SCSS work similarly to comments in other languages like JavaScript. *Single-line comments* start with **//**, and go until the end of the line. Nothing in a single-line comment is emitted as CSS; as far as Sass is concerned, they may as well not exist. They’re also called silent comments, because they don’t produce any CSS.

*Multi-line comments* start with **/_*_** and end at the next **_*_/**. If a multi-line comment is written somewhere that a statement is allowed, it’s compiled to a CSS comment. They’re also called *loud comment*, by contrast with silent comments. A multi-line comment that’s compiled to CSS may contain *interpolation*, which will be evaluated before the comment is compiled.

By default, multi-line comments will be stripped from the compiled CSS in *compressed mode*. If a comment begins with **/*!**, though, it will always be included in the CSS output.

SCSS
```scss
// This comment won't be included in the CSS.

/* But this comment will, except in compressed mode. */

/* It can also contain interpolation:
* 1 + 1 = #{1 + 1} */

/*! This comment will be included even in compressed mode. */

p /* Multi-line comments can be written anywhere
  * whitespace is allowed. */ .sans {
  font: Helvetica, // So can single-line comments.
        sans-serif;
}
```

CSS
```css
/* But this comment will, except in compressed mode. */
/* It can also contain interpolation:
* 1 + 1 = 2 */
/*! This comment will be included even in compressed mode. */
p .sans {
  font: Helvetica, sans-serif;
}

```

### Documentation Comments

When writing style libraries using Sass, you can use comments to document the *mixins*, *functions*, *variables*, and *placeholder selectors* that your library provides, as well as the library itself. These comments are read by the *SassDoc tool*, which uses them to generate beautiful documentation. Check out *the Susy grid engine’s* documentation to see it in action!

Documentation comments are silent comments, written with three slashes (**///**) directly above the thing you’re documenting. SassDoc parses text in the comments as *Markdown*, and supports many useful *annotations* to describe it in detail.

SCSS
```scss
/// Computes an exponent.
///
/// @param {number} $base
///   The number to multiply by itself.
/// @param {integer (unitless)} $exponent
///   The number of `$base`s to multiply together.
/// @return {number} `$base` to the power of `$exponent`.
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}
```