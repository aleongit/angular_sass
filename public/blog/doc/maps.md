## Maps

Maps in Sass hold pairs of keys and values, and make it easy to look up a value by its corresponding key. They’re written `<expression>: <expression>, <expression>: <expression>`. The expression before the `:` is the key, and the expression after is the value associated with that key. The keys must be unique, but the values may be duplicated. Unlike lists, maps must be written with parentheses around them. A map with no pairs is written `()`.

> 💡 **Fun fact**<br>
> Astute readers may note that an empty map, **()**, is written the same as an empty list. That’s because it counts as both a map and a list. In fact, all maps count as lists! Every map counts as a list that contains a two-element list for each key/value pair. For example, (1: 2, 3: 4) counts as (1 2, 3 4).

Maps allow any Sass values to be used as their keys. The **==** operator is used to determine whether two keys are the same.

> ⚠️ **Heads up!**
> Most of the time, it’s a good idea to use quoted strings rather than unquoted strings for map keys. This is because some values, such as color names, may look like unquoted strings but actually be other types. To avoid confusing problems down the line, just use quotes!

### Using Maps

Since maps aren’t valid CSS values, they don’t do much of anything on their own. That’s why Sass provides a bunch of functions to create maps and access the values they contain.

#### Look Up a Value

Maps are all about associating keys and values, so naturally there’s a way to get the value associated with a key: the `map.get($map, $key)` function! This function returns the value in the map associated with the given key. It returns *null* if the map doesn’t contain the key.


SCSS

```scss
@use "sass:map";
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.get($font-weights, "medium"); // 500
@debug map.get($font-weights, "extra-bold"); // null
```

#### Do Something for Every Pair

This doesn’t actually use a function, but it’s still one of the most common ways to use maps. The **@each** rule evaluates a block of styles for each key/value pair in a map. The key and the value are assigned to variables so they can easily be accessed in the block.


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

#### Add to a Map

It’s also useful to add new pairs to a map, or to replace the value for an existing key. The `map.set($map, $key, $value)` function does this: it returns a copy of $map with the value at *$key* set to *$value*.


SCSS
```scss
@use "sass:map";

$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.set($font-weights, "extra-bold", 900);
// ("regular": 400, "medium": 500, "bold": 700, "extra-bold": 900)
@debug map.set($font-weights, "bold", 900);
// ("regular": 400, "medium": 500, "bold": 900)
```

Instead of setting values one-by-one, you can also merge two existing maps using `map.merge($map1, $map2)`.


SCSS

```scss
@use "sass:map";

$light-weights: ("lightest": 100, "light": 300);
$heavy-weights: ("medium": 500, "bold": 700);

@debug map.merge($light-weights, $heavy-weights);
// ("lightest": 100, "light": 300, "medium": 500, "bold": 700)
```

If both maps have the same keys, the second map’s values are used in the map that gets returned.


SCSS

```scss
@use "sass:map";

$weights: ("light": 300, "medium": 500);

@debug map.merge($weights, ("medium": 700));
// ("light": 300, "medium": 700)
```

Note that because Sass maps **are immutable**, *map.set()* and *map.merge()* do not modify the original list.

### Immutability

Maps in Sass *are immutable*, which means that the contents of a map value never changes. Sass’s map functions all return new maps rather than modifying the originals. Immutability helps avoid lots of sneaky bugs that can creep in when the same map is shared across different parts of the stylesheet.

You can still update your state over time by assigning new maps to the same variable, though. This is often used in functions and mixins to track configuration in a map.


SCSS

```scss
@use "sass:map";

$prefixes-by-browser: ("firefox": moz, "safari": webkit, "ie": ms);

@mixin add-browser-prefix($browser, $prefix) {
  $prefixes-by-browser: map.merge($prefixes-by-browser, ($browser: $prefix)) !global;
}

@include add-browser-prefix("opera", o);
@debug $prefixes-by-browser;
// ("firefox": moz, "safari": webkit, "ie": ms, "opera": o)
```