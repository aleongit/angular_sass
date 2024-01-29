## Operators

Doing math in your CSS is very helpful. Sass has a handful of standard math operators like **+**, **-**, **_*_**, **math.div()**, and **%**. In our example we’re going to do some simple math to calculate widths for an *article* and *aside*.

SCSS
```scss
@use "sass:math";

.container {
  display: flex;
}

article[role="main"] {
  width: math.div(600px, 960px) * 100%;
}

aside[role="complementary"] {
  width: math.div(300px, 960px) * 100%;
  margin-left: auto;
}
```

CSS
```css
.container {
  display: flex;
}

article[role=main] {
  width: 62.5%;
}

aside[role=complementary] {
  width: 31.25%;
  margin-left: auto;
}
```

We’ve created a very simple fluid grid, based on 960px. Operations in Sass let us do something like take pixel values and convert them to percentages without much hassle.