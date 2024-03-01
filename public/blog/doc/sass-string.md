## sass:string

```
string.quote($string)
quote($string) //=> string
```

Returns *$string* as a quoted string.


SCSS
```scss
@use "sass:string";

@debug string.quote(Helvetica); // "Helvetica"
@debug string.quote("Helvetica"); // "Helvetica"
```

```
string.index($string, $substring)
str-index($string, $substring) //=> number
```

Returns the first index of *$substring* in *$string*, or null if *$string* doesn’t contain *$substring*.


SCSS
```scss
@use "sass:string";

@debug string.index("Helvetica Neue", "Helvetica"); // 1
@debug string.index("Helvetica Neue", "Neue"); // 11
```

```
string.insert($string, $insert, $index)
str-insert($string, $insert, $index) //=> string
```

Returns a copy of *$string* with *$insert* inserted at *$index*.


SCSS
```scss
@use "sass:string";

@debug string.insert("Roboto Bold", " Mono", 7); // "Roboto Mono Bold"
@debug string.insert("Roboto Bold", " Mono", -6); // "Roboto Mono Bold"
```

If *$index* is higher than the length of *$string*, *$insert* is added to the end. If *$index* is smaller than the negative length of the string, *$insert* is added to the beginning.


SCSS
```scss
@use "sass:string";

@debug string.insert("Roboto", " Bold", 100); // "Roboto Bold"
@debug string.insert("Bold", "Roboto ", -100); // "Roboto Bold"
```

```
string.length($string)
str-length($string) //=> number
```

Returns the number of characters in *$string*.

SCSS
```scss
@use "sass:string";

@debug string.length("Helvetica Neue"); // 14
@debug string.length(bold); // 4
@debug string.length(""); // 0
```

```
string.slice($string, $start-at, $end-at: -1)
str-slice($string, $start-at, $end-at: -1) //=> string
```

Returns the slice of *$string* starting at index *$start-at* and ending at index *$end-at* (both inclusive).


SCSS
```scss
@use "sass:string";

@debug string.slice("Helvetica Neue", 11); // "Neue"
@debug string.slice("Helvetica Neue", 1, 3); // "Hel"
@debug string.slice("Helvetica Neue", 1, -6); // "Helvetica"
```

```
string.split($string, $separator, $limit: null) //=> list
```

Returns a bracketed, comma-separated list of substrings of *$string* that are separated by *$separator*. The *$separators* aren’t included in these substrings.

If *$limit* is a number 1 or higher, this splits on at most that many *$separators* (and so returns at most *$limit* + 1 strings). The last substring contains the rest of the string, including any remaining *$separators*.


SCSS
```scss
@use "sass:string";

@debug string.split("Segoe UI Emoji", " "); // ["Segoe", "UI", "Emoji"]
@debug string.split("Segoe UI Emoji", " ", $limit: 1); // ["Segoe", "UI Emoji"]
```

```
string.to-upper-case($string)
to-upper-case($string) //=> string
```

Returns a copy of *$string* with the ASCII letters converted to upper case.

SCSS
```scss
@use "sass:string";

@debug string.to-upper-case("Bold"); // "BOLD"
@debug string.to-upper-case(sans-serif); // SANS-SERIF
```

```
string.to-lower-case($string)
to-lower-case($string) //=> string
```

Returns a copy of *$string* with the ASCII letters converted to lower case.

SCSS
```scss
@use "sass:string";

@debug string.to-lower-case("Bold"); // "bold"
@debug string.to-lower-case(SANS-SERIF); // sans-serif
```

```
string.unique-id()
unique-id() //=> string
```

Returns a randomly-generated unquoted string that’s guaranteed to be a valid CSS identifier and to be unique within the current Sass compilation.

SCSS
```scss
@use "sass:string";

@debug string.unique-id(); // uabtrnzug
@debug string.unique-id(); // u6w1b1def
```

```
string.unquote($string)
unquote($string) //=> string
```

Returns *$string* as an unquoted string. This can produce strings that aren’t valid CSS, so use with caution.

SCSS
```scss
@use "sass:string";

@debug string.unquote("Helvetica"); // Helvetica
@debug string.unquote(".widget:hover"); // .widget:hover
```