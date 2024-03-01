## Numbers

Numbers in Sass have *two components*: the **number** itself, and its **units**. For example, in *16px* the number is *16* and the unit is *px*. Numbers can have no units, and they can have complex units. See Units below for more details.


SCSS
```scss
@debug 100; // 100
@debug 0.8; // 0.8
@debug 16px; // 16px
@debug 5px * 2px; // 10px*px (read "square pixels")
```

Sass numbers support the same formats as CSS numbers, including scientific notation, which is written with an e between the number and its power of 10. Because support for scientific notation in browsers has historically been spotty, Sass always compiles it to fully expanded numbers.


SCSS
```scss
@debug 5.2e3; // 5200
@debug 6e-2; // 0.06
```

> ⚠️ **Heads up!**<br>
> Sass doesn’t distinguish between whole numbers and decimals, so for example *math.div(5, 2)* returns *2.5* rather than *2*. This is the same behavior as JavaScript, but different than many other programming languages.

### Units

Sass has powerful support for manipulating units based on how real-world unit calculations work. When two numbers are multiplied, their units are multiplied as well. When one number is divided by another, the result takes its numerator units from the first number and its denominator units from the second. A number can have any number of units in the numerator and/or denominator.


SCSS
```scss
@use 'sass:math';

@debug 4px * 6px; // 24px*px (read "square pixels")
@debug math.div(5px, 2s); // 2.5px/s (read "pixels per second")

// 3.125px*deg/s*em (read "pixel-degrees per second-em")
@debug 5px * math.div(math.div(30deg, 2s), 24em);

$degrees-per-second: math.div(20deg, 1s);
@debug $degrees-per-second; // 20deg/s
@debug math.div(1, $degrees-per-second); // 0.05s/deg
```


> ⚠️ **Heads up!**
> Because CSS doesn’t support complex units like square pixels, using a number with complex units as a property value will produce an error. This is a feature in disguise, though; if you aren’t ending up with the right unit, it usually means that something’s wrong with your calculations! And remember, you can always use the **@debug** rule to check out the units of any variable or expression.

Sass will automatically convert between compatible units, although which unit it will choose for the result depends on which implementation of Sass you’re using. If you try to combine incompatible units, like 1in + 1em, Sass will throw an error.


SCSS
```scss
// CSS defines one inch as 96 pixels.
@debug 1in + 6px; // 102px or 1.0625in

@debug 1in + 1s;
//     ^^^^^^^^
// Error: Incompatible units s and in.
```

As in real-world unit calculations, if the numerator contains units that are compatible with units in the denominator like *math.div(96px, 1in)*, they’ll cancel out. This makes it easy to define a ratio that you can use for converting between units. In the example below, we set the desired speed to one second per 50 pixels, and then multiply that by the number of pixels the transition covers to get the time it should take.


SCSS
```scss
@use 'sass:math';

$transition-speed: math.div(1s, 50px);

@mixin move($left-start, $left-stop) {
  position: absolute;
  left: $left-start;
  transition: left ($left-stop - $left-start) * $transition-speed;

  &:hover {
    left: $left-stop;
  }
}

.slider {
  @include move(10px, 120px);
}
```

CSS
```css
.slider {
  position: absolute;
  left: 10px;
  transition: left 2.2s;
}
.slider:hover {
  left: 120px;
}
```



> ⚠️ **Heads up!**<br>
> If your arithmetic gives you the wrong unit, you probably need to check your math. You may be leaving off units for a quantity that should have them! Staying unit-clean allows Sass to give you helpful errors when something isn’t right.<br><br> You should especially avoid using interpolation like `#{$number}px`. This doesn’t actually create a number! It creates an unquoted string that looks like a number, but won’t work with any number operations or functions. Try to make your math unit-clean so that `$number` already has the unit `px`, or write `$number * 1px`.

> ⚠️ **Heads up!**<br>
> Percentages in Sass work just like every other unit. They are not interchangeable with decimals, because in CSS decimals and percentages mean different things. For example, 50% is a number with **%** as its unit, and Sass considers it different than the number 0.5.<br><br> You can convert between decimals and percentages using unit arithmetic. `math.div($percentage, 100%)` will return the corresponding decimal, and `$decimal * 100%` will return the corresponding percentage. You can also use the `math.percentage()` function as a more explicit way of writing `$decimal * 100%`.

### Precision

Sass numbers are represented internally as *64-bit floating point* values. They support up to *10 digits* of precision after the decimal point when serialized to CSS and for the purposes of equality. This means a few different things:

Only the first ten digits of a number after the decimal point will be included in the generated CSS.

Operations like **==** and **>=** will consider two numbers equivalent if they’re the same up to the tenth digit after the decimal point.

If a number is less than *0.0000000001* away from an integer, it’s considered to be an integer for the purposes of functions like *list.nth()* that require integer arguments.


SCSS
```scss
@debug 0.012345678912345; // 0.0123456789
@debug 0.01234567891 == 0.01234567899; // true
@debug 1.00000000009; // 1
@debug 0.99999999991; // 1
```

> 💡 **Fun fact**
> Numbers are rounded to 10 digits of precision lazily when they’re used in a place where precision is relevant. This means that math functions will work with the full number value internally to avoid accumulating extra rounding errors.