## Special Functions

CSS defines many functions, and most of them work just fine with Sass’s normal function syntax. They’re parsed as function calls, resolved to plain CSS functions, and compiled as-is to CSS. There are a few exceptions, though, which have special syntax that can’t just be parsed as a SassScript expression. All special function calls return unquoted strings.


### url()

The *url() function* is commonly used in CSS, but its syntax is different than other functions: it can take either a quoted or unquoted URL. Because an unquoted URL isn’t a valid SassScript expression, Sass needs special logic to parse it.

If the url()’s argument is a valid unquoted URL, Sass parses it as-is, although *interpolation* may also be used to inject SassScript values. If it’s not a valid unquoted URL—for example, if it contains *variables* or *function calls*—it’s parsed as a normal plain CSS function call.

SCSS
```scss
$roboto-font-path: "../fonts/roboto";

@font-face {
    // This is parsed as a normal function call that takes a quoted string.
    src: url("#{$roboto-font-path}/Roboto-Thin.woff2") format("woff2");
    font-family: "Roboto";
    font-weight: 100;
}

@font-face {
    // This is parsed as a normal function call that takes an arithmetic
    // expression.
    src: url($roboto-font-path + "/Roboto-Light.woff2") format("woff2");
    font-family: "Roboto";
    font-weight: 300;
}

@font-face {
    // This is parsed as an interpolated special function.
    src: url(#{$roboto-font-path}/Roboto-Regular.woff2) format("woff2");
    font-family: "Roboto";
    font-weight: 400;
}
```

CSS
```css
@font-face {
  src: url("../fonts/roboto/Roboto-Thin.woff2") format("woff2");
  font-family: "Roboto";
  font-weight: 100;
}
@font-face {
  src: url("../fonts/roboto/Roboto-Light.woff2") format("woff2");
  font-family: "Roboto";
  font-weight: 300;
}
@font-face {
  src: url(../fonts/roboto/Roboto-Regular.woff2) format("woff2");
  font-family: "Roboto";
  font-weight: 400;
}
```


### element(), progid:...(), and expression()

The *element()* function is defined in the CSS spec, and because its IDs could be parsed as colors, they need special parsing.

*expression()* and functions beginning with *progid*: are legacy Internet Explorer features that use non-standard syntax. Although they’re no longer supported by recent browsers, Sass continues to parse them for backwards compatibility.

Sass allows *any text* in these function calls, including nested parentheses. Nothing is interpreted as a SassScript expression, with the exception that *interpolation* can be used to inject dynamic values.

SCSS
```scss
$logo-element: logo-bg;

.logo {
  background: element(##{$logo-element});
}
```

CSS
```css
.logo {
  background: element(#logo-bg);
}
```
