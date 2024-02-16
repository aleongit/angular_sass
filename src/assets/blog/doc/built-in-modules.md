## Built-In Modules

Sass provides many built-in modules which contain useful functions (and the occasional mixin). These modules can be loaded with the **@use rule** like any user-defined stylesheet, and their functions can be called like any other module member. All built-in module URLs begin with sass: to indicate that they’re part of Sass itself.

> ⚠️ Heads up!
>Before the Sass module system was introduced, all Sass functions were globally available at all times. Many functions still have global aliases (these are listed in their documentation). The Sass team discourages their use and will eventually deprecate them, but for now they remain available for compatibility with older Sass versions and with LibSass (which doesn’t support the module system yet).<br><br>
A few functions are only available globally even in the new module system, either because they have special evaluation behavior (**if()**) or because they add extra behavior on top of built-in CSS functions (**rgb()** and **hsl()**). These will not be deprecated and can be used freely.


SCSS
```scss
@use "sass:color";

.button {
  $primary-color: #6b717f;
  color: $primary-color;
  border: 1px solid color.scale($primary-color, $lightness: 20%);
}
```

CSS
```css
.button {
  color: #6b717f;
  border: 1px solid #878d9a;
}
```

Sass provides the following built-in modules:

- The **sass:math** module provides functions that operate on numbers.

- The **sass:string** module makes it easy to combine, search, or split apart strings.

- The **sass:color** module generates new colors based on existing ones, making it easy to build color themes.

- The **sass:list** module lets you access and modify values in lists.

- The **sass:map** module makes it possible to look up the value associated with a key in a map, and much more.

- The **sass:selector** module provides access to Sass’s powerful selector engine.

- The **sass:meta** module exposes the details of Sass’s inner workings.
