---
layout: article

permalink: /notes/svg-basics-and-animations/

title: "Sass Basics"

subtitle: "Treehouse - Front End Web Development"

excerpt: "These are notes regarding aspects of Sass I didn't already have a strong understanding of."

categories: notes

date: 2017-10-23
---

{% include /globalSections/toc.html %}

## Why SCSS Over Sass

The main reason to choose SCSS over Sass is because ordinary CSS is directly compatible with SCSS but not Sass. This means you can copy and paste CSS into an SCSS file without any issues what so ever.

## Mixins Content

If you have content that is unique for each time you call a mixin you can use the `@content` selector in the mixin then write SCSS like you would before:

{% highlight css linenos %}
@mixin skewed {
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 50px;
    position: absolute;
    transform: skewY(-2deg);
    @content;
  }
}
.header {
  @include skewed {
    background-color: $white;
    bottom: -25px;
  }
}
{% endhighlight %}

## Extend Placeholder Selectors

It's easy to "extend" properties made in one selector to another. It is also very useful to create placeholder selectors because they may not be needed. This is done with the `%` symbol. This is considered best practice in SCSS.

{% highlight css linenos %}
%btn {
  color: $white;
  display: inline-block;
  text-decoration: none;
  padding: 1rem;
  &:hover {
    color: $white;
    opacity: 0.8;
  }
  &:active {
    opacity: initial;
  }
}
.btn {
  &-callout {
    @extend %btn;
    background-color: $color-secondary;
  }
  &-info {
    @extend %btn;
    background-color: $color-primary;
  }
}
{% endhighlight %}

You can also nest selectors that are to be extended.

It is possible to overextend however. For example, you will not want to add the extended in a ton of places. If you find yourself doing this is might be more useful to create a mixin instead. Basically you should avoid writing SCSS that is difficult to read.

## Organizing Partials

Parials can be organized in any way you wish. My favorite way I've seen is `/base`, `/components`, `/layout`, and `/utilities`.

Base consists of base styles and resets. Components are buttons, icons, images, etc. Layouts card styles, containers, footer, header, etc. And utilities are functions, helpers, mixins, and variables.

You can import these styles in your main.scss file like:

{% highlight css linenos %}
@import '/utilities/variables',
        '/utilities/mixins',
        '/utilities/functions';
@import '/base/reset',
        '/base/base';
{% endhighlight %}

## Nest Media Queries

You can nest media queries directly inside a selector.

{% highlight css linenos %}
.img-feature {
  width: 165px;
  border: 4px solid $white;
  @media (max-width: 575px) {
    .img-feature {
      display: none;
    }
  }
}
{% endhighlight %}

## Custom Functions

Besides providing a collecion of built-in functions, Sass lets you write your own functions to reuse logic in your code.

You define a function with the `@function name() {}` declaration.

Inside the parantheses you can include parameters separated by a comma.

{% highlight css linenos %}
@function divide($a, $b) {
  @return ($a / $b);
}
.test {
  line-height: divide(32px, 16px);
}
// line-height: 2;
{% endhighlight %}

This isn't the most useful function, but functions can be very complex.

You could make a function that converts pixel values to percents:

{% highlight css linenos %}
$max-width: 1000px;
@function px-to-pc($target, $context: $max-width) {
  @return ($target / $context) * 100%;
}
.test {
  width: px-to-pc(400px);
}
// width: 40%;
{% endhighlight %}

Note, that you can set default values for your parameters as seen in the previous example. You can override this value by passing a second parameter in your function call like `px-to-pc(400px, 1200px);`.

You can also create a function for flexbox layout:

{% highlight css linenos %}
$gutter: 10px;
@function per-line($items) {
  $g-pct: px-to-pc($gutter) * 2;
  $g-total: $items * $g-pct;
  @return (100% / $items) - $g-total;
}
{% endhighlight %}

As you can see you can create variables inside of functions. These are local variables.

## Optional Mixin Parameters

You can create optional parameters in mixins by making the default value of the parameter `null`.

{% highlight css linenos %}
@mixin roundy($dim, $brdr: null) {
  width: $dim;
  height: $dim;
  border: $brdr;
  border-radius: 50%;
}
img {
  @include roundy(20px);
}
{% endhighlight %}

## Add Conditional Logic

You can add conditional logic to your stylesheets using `@if`. You can also use `@else if`.

{% highlight css linenos %}
@mixin mq($break) {
  @if $break == 'xs' {
    @media (max-width: $break-xs) {
      @content;
    }
  }
  @else if $break == 'sm' {
    @media (max-width: $break-sm) {
      @content;
    }
  }
  @else if $break == 'md' {
    @media (max-width: $break-md) {
      @content;
    }
  }
  @else if $break == 'lg' {
    @media (max-width: $break-lg) {
      @content;
    }
  }
}
.img-feature {
  //
  @include md('xs') {
    //
  }
}
{% endhighlight %}

This makes SCSS smarter and leaner.

## Storing Values in Maps

Sass maps provide a flexible way to keep track of data by associating a name with a particular value.

{% highlight css linenos %}
// not using Sass maps
$break-xs: 575px;
$break-sm: 576px;
$break-md: 768px;
$break-lg: 992px;
// using Sass maps
$breakpoints: (
  'xs': 575px,
  'sm': 576px,
  'md': 768px,
  'lg': 992px
);
// Calling Sass maps
@media (max-width: map-get($breakpoints, 'sm')) {
  //
}
{% endhighlight %}

## Write Loops

Loops simplify repetive tasks by cycling through lists of items or values and performing an action on each. Developers commonly use for-loops to repeat a block of styles a certain number of times.

### For Loops 

For loops use the `@for` keyword:

{% highlight css linenos %}
@for $i 1 through 10 {
  .box-#{$i} {
    background-color: adjust-hue(tomato, $i * 5);
  }
}
{% endhighlight %}

You can also use `to` instead of `through`. The `through` keyword includes the end value and the `to` keyword does not.

### Loop Through Lists Using @each

While `@for` loops are incremental and run for a particular number of repetitions, `@each` loops iterate through collections of data, like a lists or map, and perform an action on each item:

{% highlight css linenos %}
$names: ('andrew', 'matthew', 'timmy', 'billy', 'katie');
@each $name in $names {
  .name-#{name} {
    background-image: url('img/#{name}.jpg');
  }
}
{% endhighlight %}

You can use this to loop through data in a map.

Using interpolation is a very powerful feature of SCSS. Use the `#{}` syntax for interpolation.

## Handling Errors

Providing feedback to developers when something goes wrong in their code is important. Sass offers directives that provide feedback to the compiler and help you avoid mistakes. You can do this using the `@error` and `@warn` keywords. 

Error message will stop the compiler but the warn will let it keep running.