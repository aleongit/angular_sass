## Operators

Sass supports a handful of useful *operators* for working with different values. These include the standard mathematical operators like `+` and `*`, as well as operators for various other types:

- `==` and `!=` are used to check if two values are the same.

- `+`, `-`, `*`, `/`, and `%` have their usual mathematical meaning for numbers, with special behaviors for units that matches the use of units in scientific math.

- `<`, `<=`, `>`, and `>=` check whether two numbers are greater or less than one another.

- `and`, `or`, and `not` have the usual boolean behavior. Sass considers every value **"true"** except for *false* and *null*.

- `+`, `-`, and `/` can be used to concatenate strings.


> ⚠️ **Heads up!**
> Early on in Sass’s history, it added support for mathematical operations on colors. These operations operated on each of the colors’ RGB channels separately, so adding two colors would produce a color with the sum of their red channels as its red channel and so on.<br><br>
This behavior wasn’t very useful, since it channel-by-channel RGB arithmetic didn’t correspond well to how humans perceive color. Color functions were added which are much more useful, and color operations were deprecated. They’re still supported in LibSass and Ruby Sass, but they’ll produce warnings and users are strongly encouraged to avoid them.


### Order of Operations

Sass has a pretty standard order of operations, from tightest to loosest:

1. The unary operators not, +, -, and /.
2. The *, /, and % operators.
3. The + and - operators.
4. The >, >=, < and <= operators.
5. The == and != operators.
6. The and operator.
7. The or operator.
8. The = operator, when it’s available.


SCSS
```scss
@debug 1 + 2 * 3 == 1 + (2 * 3); // true
@debug true or false and false == true or (false and false); // true
```

#### Parentheses
You can explicitly control the order of operations using parentheses. An operation inside parentheses is always evaluated before any operations outside of them. Parentheses can even be nested, in which case the innermost parentheses will be evaluated first.


SCSS
```scss
@debug (1 + 2) * 3; // 9
@debug ((1 + 2) * 3 + 4) * 5; // 65
```


### Single Equals
Sass supports a special = operator that’s only allowed in function arguments, which just creates an *unquoted string* with its two operands separated by =. This exists for backwards-compatibility with very old IE-only syntax.

SCSS
```scss
.transparent-blue {
  filter: chroma(color=#0000ff);
}
```

CSS
```css
.transparent-blue {
  filter: chroma(color=#0000ff);
}
```