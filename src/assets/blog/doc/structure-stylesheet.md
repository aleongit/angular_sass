## Structure of a Stylesheet

Just like CSS, most Sass stylesheets are mainly made up of style rules that contain property declarations. But Sass stylesheets have many more features that can exist alongside these.


### Statements

A Sass stylesheet is made up of a series of statements, which are evaluated in order to build the resulting CSS. Some statements may have *blocks*, defined using **{** and **}**, which contain other statements. For example, a style rule is a statement with a block. That block contains other statements, such as property declarations.

In *SCSS*, statements are separated by semicolons (which are optional if the statement uses a block). In the indented syntax, they’re just separated by newlines.


#### Universal Statements

These types of statements can be used anywhere in a Sass stylesheet:

- *Variable declarations*, like **$var: value**.
- *Flow control at-rules*, like **@if** and **@each**.
- The **@error**, **@warn**, and **@debug** rules.


#### CSS StatementsCSS Statements permalink

These statements produce CSS. They can be used anywhere except within a @function:

- *Style rules*, like **h1 { /* ... */ }**.
- *CSS at-rules*, like **@media** and **@font-face**.
- *Mixin uses* using **@include**.
- The **@at-root** rule.


#### Top-Level Statements

These statements can only be used at the top level of a stylesheet, or nested within a CSS statement at the top level:

- *Module loads*, using **@use**.
- *Imports*, using **@import**.
- *Mixin definitions* using **@mixin**.
- *Function definitions* using **@function**.


#### Other Statements

- *Property declarations* like **width: 100px** may only be used within style rules and some CSS at-rules.
- The **@extend rule** may only be used within style rules.


### Expressions

An *expression* is anything that goes on the right-hand side of a property or variable declaration. Each expression produces a *value*. Any valid CSS property value is also a Sass expression, but Sass expressions are much more powerful than plain CSS values. They’re passed as arguments to *mixins* and *functions*, used for control flow with the *@if rule*, and manipulated using arithmetic. We call Sass’s expression syntax SassScript.


#### Literals
The simplest expressions just represent static values:

- **Numbers**, which may or may not have units, like *12* or *100px*.
- **Strings**, which may or may not have quotes, like *"Helvetica Neue"* or *bold*.
- **Colors**, which can be referred to by their hex representation or by name, like *#c6538c* or *blue*.
- The **boolean** literals *true* or *false*.
- The singleton **null**.
- **Lists of values**, which may be separated by spaces or commas and which may be enclosed in square brackets or no brackets at all, like *1.5em 1em 0 2em, Helvetica, Arial, sans-serif*, or *[col1-start]*.
- **Maps** that associate values with keys, like *("background": red, "foreground": pink)*.


#### Operations
Sass defines syntax for a number of operations:

- **==** and **!=** are used to check if two values are the same.
- **+**, **-**, **_*_**, **/**, and **%** have their usual mathematical meaning for numbers, with special behaviors for units that matches the use of units in scientific math.
- **<, <=, >,** and **>=** check whether two numbers are greater or less than one another.
- **and**, **or**, and **not** have the usual boolean behavior. Sass considers every value "true" except for *false* and *null*.
- **+, -,** and **/** can be used to concatenate strings.
- **( and )** can be used to explicitly control the precedence order of operations.


#### Other Expressions

- **Variables**, like *$var*.
- **Function calls**, like *nth($list, 1)* or *var(--main-bg-color)*, which may call Sass core library functions or user-defined functions, or which may be compiled directly to CSS.
- **Special functions**, like *calc(1px + 100%)* or *url(http://myapp.com/assets/logo.png)*, that have their own unique parsing rules.
- **The parent selector**, *&*.
- The value **!important**, which is parsed as an unquoted string.