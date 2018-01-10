---
layout: article

permalink: /notes/css-and-scss/

title: "CSS and SCSS"

subtitle: "Basic Syntax"

excerpt: "Sassy Cascading Style Sheets (SCSS) is an extension of CSS that adds power and elegance to the basic language. It allows you to use variables, nested rules, mixins, inline imports, and more, all with a fully CSS-compatible syntax. Sass helps keep large stylesheets well-organized, and get small stylesheets up and running quickly. You can also write vanilla CSS inside a SCSS file with no issue."

categories: notes

date: 2017-10-15
---

{% include /globalSections/toc.html %}

**Sassy Cascading Style Sheets (SCSS) is an extension of CSS that adds power and elegance to the basic language.** It allows you to use variables, nested rules, mixins, inline imports, and more, all with a fully CSS-compatible syntax. Sass helps keep large stylesheets well-organized, and get small stylesheets up and running quickly. **You can also write vanilla CSS inside a SCSS file with no issue.**

## Nesting

**General rule is to "try" not to go more than three levels deep.** It is best to use good class names and not have to nest very far.

```scss
h1 {
  color: $accent;
  span {
    font-weight: bold;
  }
}
```

#### Nesting Parent Selectors

Sass allows you to reference the current parent selector(s) using the ampersand character, `&`.

```scss
a {
  color: #beedee;
  &:hover {
    color: #cbbebb;
  }
}
```

It is also possible to a combine strings using the ampersand character.

```scss
.module {
  &-child {
    margin-bottom: 1em;
  }
}
```

```scss
.module-modifier {
  display: inline;
}
```

## Math and Color Utilities

Sass comes with built in math and color utilities.

```scss
abs($num)
ceil($num)
floor($num)
percentage($num)
round($num)
max($list)
min($list) 
```

```scss
rgba($hex, $alpha) 
lighten($color, $percent)
darken($color, $percent)
saturate($color, $percent)
desaturate($color, $percent)
mix($color1, $color2)
grayscale($color)
invert($color)
complement($color)
```

## Mixins

While variables let you reuse single values. Mixins let you reuse blocks of styles.

```scss
@mixin font-size($n) {
  font-size: $n * 1.2em;
}
body {
  @include font-size(2);
}
```

You can also set default values for your mixins. You can choose to use them or not:

```scss
@mixin rounded-corners($radius: 5px) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  border-radius: $radius;
}
.header {
  @include rounded-corners;
}
.footer {
  @include rounded-corners(10px);
}
```

Comma separated order matters:

```scss
@mixin rounded-box($radius, $padding) {
  border-radius: $radius;
  padding: $padding;
}
.header {
  @include rounded-box(5px, 20px);
}
```

```scss
.header {
  border-radius: 5px;
  padding: 20px;
}
```

**Note that if an argument is optional, has a default, it must be last.** Also, if you add keywords the order does not matter:

```scss
@mixin rounded-box($radius: 5px, $padding: 20px) {
  border-radius: $radius;
  padding: $padding;
}
.header {
  @include rounded-box($padding: 10px, $radius: 10px);
}
```

## Extends

Any CSS class can be extended. **Reference a class to be extended with `@extend`.**

```scss
.message {
  border: 2px solid;
  margin-bottom: 1em;
  padding: 1em;
}
.message-alert {
  @extend .message;
  text-align: center;
}
```

```scss
.message,
.message-alert {
  border: 2px solid;
  margin-bottom: 1em;
  padding: 1em;
}
.message-alert {
  text-align: center;
}
```

>However, if you don't need the class you are extending then you can use it as a placeholder using, `%`. This means they can be extended but will never compile to the CSS.

```scss
%message {
  border: 2px solid;
  margin-bottom: 1em;
  padding: 1em;
}
.message-alert {
  @extend %message;
  text-align: center;
}
```

```scss
.message-alert {
  border: 2px solid;
  margin-bottom: 1em;
  padding: 1em;
  text-align: center;
}
```

## Learn More About SCSS

- [Getting Sassy with Sass (slideshow "course" of SCSS basics)](http://www.sassshop.com/#/)
- [Sass Documentation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
- [Convert CSS to SCSS](http://css2sass.herokuapp.com/)
- [devhints.io](https://devhints.io/sass)