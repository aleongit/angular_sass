## Style Rules
Style rules are the foundation of Sass, just like they are for CSS. And they work the same way: you choose which elements to style with a selector, and declare properties that affect how those elements look.

SCSS
```scss
.button {
  padding: 3px 10px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid #e1e4e8;
}
```

CSS
```css
.button {
  padding: 3px 10px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid #e1e4e8;
}
```

### Nesting
But Sass wants to make your life easier. Rather than repeating the same selectors over and over again, you can write one style rules inside another. Sass will automatically combine the outer rule’s selector with the inner rule’s.

SCSS
```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

CSS
```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

> ⚠️ **Heads up!**
> Nested rules are super helpful, but they can also make it hard to visualize how much CSS you’re actually generating. The deeper you nest, the more bandwidth it takes to serve your CSS and the more work it takes the browser to render it. Keep those selectors shallow!



#### Selector Lists
Nested rules are clever about handling selector lists (that is, comma-separated selectors). Each complex selector (the ones between the commas) is nested separately, and then they’re combined back into a selector list.


SCSS
```scss
.alert, .warning {
  ul, p {
    margin-right: 0;
    margin-left: 0;
    padding-bottom: 0;
  }
}
```

CSS
```css
.alert ul, .alert p, .warning ul, .warning p {
  margin-right: 0;
  margin-left: 0;
  padding-bottom: 0;
}
```

#### Selector Combinators
You can nest selectors that use combinators as well. You can put the combinator at the end of the outer selector, at the beginning of the inner selector, or even all on its own in between the two.

```scss
SCSS SYNTAX
ul > {
  li {
    list-style-type: none;
  }
}

h2 {
  + p {
    border-top: 1px solid gray;
  }
}

p {
  ~ {
    span {
      opacity: 0.8;
    }
  }
}
```

CSS
```css
ul > li {
  list-style-type: none;
}

h2 + p {
  border-top: 1px solid gray;
}

p ~ span {
  opacity: 0.8;
}
```

#### Advanced Nesting
If you want to do more with your nested style rules than just combine them in order with the descendant combinator (that is, a plain space) separating them, Sass has your back. See the parent selector documentation for more details.

### Interpolation
You can use interpolation to inject values from expressions like variables and function calls into your selectors. This is particularly useful when you’re writing mixins, since it allows you to create selectors from parameters your users pass in.


SCSS
```scss
@mixin define-emoji($name, $glyph) {
  span.emoji-#{$name} {
    font-family: IconFont;
    font-variant: normal;
    font-weight: normal;
    content: $glyph;
  }
}

@include define-emoji("women-holding-hands", "👭");
```

CSS
```css
@charset "UTF-8";
span.emoji-women-holding-hands {
  font-family: IconFont;
  font-variant: normal;
  font-weight: normal;
  content: "👭";
}
```

> 💡  **Fun fact**
> Sass only parses selectors after interpolation is resolved. This means you can safely use interpolation to generate any part of the selector without worrying that it won’t parse.

You can combine interpolation with the parent selector &, the @at-root rule, and selector functions to wield some serious power when dynamically generating selectors. For more information, see the parent selector documentation.
