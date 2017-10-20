---
layout: article

permalink: /notes/css-transitions-and-transformations/

title: "CSS Transitions and Transforms"

subtitle: "Treehouse - Front End Web Development"

excerpt: "CSS transitions and transforms can create simple animations that enhance user interactions in websites and apps."

categories: notes

modified: 2017-10-20
---

{% include /globalSections/toc.html %}

CSS transitions allow you to transition one CSS propert to another by a user event. CSS transforms allow you to move objects with the same user events.

## Transitining CSS Properties

In order to use a transition you need a start value and an end value. In other words:

{% highlight css linenos %}
.class {
  background: #4189ca;
}
.class:hover{
  background: #d36a62;
}
.class:hover{
  background: #a33830;
}
{% endhighlight %}

You need `transition-duration`. The default duration is 0 seconds. You can use seconds or milliseconds.

You also need the `transition-property` value. The default is the keyword `all`. This means that anything that can transition will. This isn't recrommended because anything that can be transitioned will. It can also cause latency in the browser.

{% highlight css linenos %}
.class {
  background: #4189ca;
  transition-duration: .4s;
  transition-property: background;
}
.class:hover{
  background: #d36a62;
}
.class:hover{
  background: #a33830;
}
{% endhighlight %}

You can add additional `transition-properties` and `transition-durations` using commas.

{% highlight css linenos %}
.class {
    transition-duration: .4s, .5s;
    transition-property: background, border-radius;
}
{% endhighlight %}
## Animatable CSS Properties

All animatable properties can be seen <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties">here</a>. Basically, there has to be a middle value available for something to animate. For example, there is many values for `opacity` between `0` and `1`. However, there are not middle values between `display: inline` and `display: block`.

## Transition Delay

There is also a `transition-delay` property that can allow for animation steps. Short delays are usually best.

## Timing Functions

The speed of a transition can vary over its duration. The speed can accelerate and decelerate rapidly, or slowly, all based on a time function that is set. There are kewords that can be use: `ease`, `linear`, `ease-in`, `ease-out`, and `ease-in-out`. To use these use the `transition-time-function` property.

A timing function establishes the acceleation curve and defines the intervals where a transition speeds up and slows down.

### Custom Timing Functions

Timing functions get a whole lot more exciting once you add CSS transforms and custom timing functions into the mix.

Each transition-timing-function keyword value is equivalent to a specific `cubic-bezier()`.

It takes four values which create start/end points and control points of the accelerated curve.

See examples of <a href="https://codepen.io/Guilh/full/ZQxoOX">here</a>.

You can create and experiement with custom functions <a href="http://cubic-bezier.com/#.17,.67,.83,.67">here</a>.

## Transition Shorthand

You can combine the transition properties into one transition declaration.

{% highlight css linenos %}
transition: <transition-property> <transition-duration> <transition-timing-function> <transition-delay>;
{% endhighlight %}

You can also, combine your transitions in a list such as:

{% highlight css linenos %}
transition: opacity .3s .2s, background .4s .3s, box-shadow .5s 0s;
{% endhighlight %}

## Transformations

Learn more about transformations <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms">here</a>.

### Rotating Elements

The `rotate()` transform function rotates an element from 0 to 360 degrees clockwise or counterclockwise.

The most common unit developers use to for rotations is `deg`.

Rotations do not affect the position of nearby elements.

An example: 

{% highlight css linenos %}
img {
  transform: rotate(45deg);
}
{% endhighlight %}

### Skewing Elements

When you skew an element, it gives the transformed element a slanted appearance.

`skewX()` applies a horizontal skew to an element. `skewY()` applies a vertical skew to an element. A negative value skews in the opposite direction. The skew functions, like other transforms will transform all the children of an element.

{% highlight css linenos %}
img {
  transform: skewX(10deg);
}
{% endhighlight %}

### Scaling Elements

To apply a basic scale transformation, define a number that instructs the browser how large to scale an element. The default value for `scale()` is `1`: `scale('1')` which applies no scale. `scale()` accepts a second number value for `X`, `Y` direction.

### Translating Elements

Translation is the process of moving something from one place to another. `translateX()` changes horizontal position and `translateY()` changes vertical position. The value inside can be a unit of distance such as px or percent. You can also use the shorthand `translate()` property which would take `x` and `y` as its values.

Translate functions can take advantage of a browser feature called hardware acceleration to help the transition run smoother than a transition made with positioning offsets.

## Animating a CSS Transform

Transforms are not animated by default. Transforms do not need to be triggered by an event like transitions do. By combining transforms with transitions, you're able to create interesting visual effects with CSS. 

{% highlight css linenos %}
img {
  transition: transform .5s;
}
img:hover {
  transform: rotate(45deg);
}
{% endhighlight %}

You can use the `turn` angle unit to create one, or several, full rotations.

## Changing Transform Position

The default transform origin of an HTML element is its center, so the transform functions we apply move elements according to this center point.

You can set a custom spot using `transform-origin`. It takes two values each are percentages. The defaul is `transform-origin: 50%, 50%`.

This can help you with things like hinge effects.

You can also use the `overflow: hidden` property to create a zoom in effect that doesnt extent beyond an overlay.

## Combining Transforms

It is common to combine transforms:

{% highlight css linenos %}
img {
  transition: transform .5s;
}
img:hover {
  transform: rotate(-5deg) scale(1.1) translateY(-20px);
}
{% endhighlight %}

Notice you have to add them all to the same declaration.

## Understanding 3D Transforms

With 3D transforms you can give depth to an element. 3D introduces the `z`axis.

You activate 3D space with perspective. To define 3D space use the `perspecive` property. It accepts one value. Either pixels, rems, or ems. Values are typically betwen 500 and 1500.

The perspective property alone doesn't add any 3D effects. You then apply a transformation to its child elements. For example:

{% highlight css linenos %}
.content {
  perspective: 700px;
}
.photo {
  transform: rotateX(-20deg);
}
{% endhighlight %}