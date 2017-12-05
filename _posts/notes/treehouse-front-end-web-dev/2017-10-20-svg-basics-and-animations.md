---
layout: article

permalink: /notes/svg-basics-and-animations/

title: "SVG Basics and SVG Animations"

subtitle: "Treehouse - Front End Web Development"

excerpt: "Scalable Vector Graphics (SVG) is an XML markup language for creating two-dimensional images using vectors. SVG images provice an infinite level of detail, so they look sharp regardless of screen size or pixel density."

categories: notes

date: 2017-10-20
---

{% include /globalSections/toc.html %}

Scalable Vector Graphics (SVG) is an XML markup language for creating two-dimensional images using vectors. SVG images provice an infinite level of detail, so they look sharp regardless of screen size or pixel density.

## Vector Graphics

Graphics that are composed of pixels are known as raster graphics. However, SVG is a series of interconnected points called vectors. These points and lines from shapes that are automatically projected into the pixel grid of a computer screen. The end result is a graphic that has infinite resultion, regardless of how the image is resized.

If an image needs a large varience it would take more data to store it as an SVG than a raster image.

If a graphic doesn't need a large amount of detail such as a photograph it is probably best to use an SVG.

## Creating an SVG

it's possible to create an SVG in a text editor, but the overwhelming majority of web professionals use a vector based drawing applications such as Adobe Illustrator to create SVG files. 

Basically, you draw something using a vector program and then you export it as an SVG.

## Optimizing SVG's

It is a good idea to optimize your SVGs. Use a <a href="https://github.com/svg/svgo-gui">tool to optimize SVG's</a>.

## SVGs as Images

The simplest way to add an SVG to a webpage is to use it just like a normal file.

{% highlight html linenos %}
<div class="graphic">
  <img src="img/star.svg" alt="Star Logo">
</div>
{% endhighlight %}

You can style them with CSS as well:

{% highlight css linenos %}
.graphic {
    margin: 1em auto;
    width: 20%;
}
{% endhighlight %}

You can also add the SVG in by making it a background image:

{% highlight css linenos %}
.graphic {
    margin: 1em auto;
    height: 200px;
    background: transparent url('../img/star.svg') center center no-repeat
}
{% endhighlight %}

## Embedding SVG XML

Embedding an SVG directly into the HTML will allow you to adjust many aspects of the SVG using CSS.

You can 

{% highlight html linenos %}
    <div class="wrapper">
      
      <svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360" enable-background="new 0 0 360 360">
        <path fill="#8361B4" d="M0 0h360v360h-360z"/>
        <circle class="outer-circle" fill="#FDE135" stroke="#fff" stroke-width="8" stroke-miterlimit="10" cx="180" cy="180" r="157"/>
        <circle fill="#CAA61F" stroke="#fff" stroke-width="8" stroke-miterlimit="10" cx="180" cy="180" r="108.3"/>
        <path d="M89.4 276.7c-26-24.2-42.2-58.8-42.2-97.1 0-22.6 5.6-43.8 15.5-62.4m234.7.1c9.9 18.6 15.4 39.7 15.4 62.2 0 38.3-16.2 72.8-42.1 97" stroke="#CAA61F" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" fill="none"/>
        <path fill="#FDE135" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M180 107.8l16.9 52.1h54.8l-44.3 32.2 16.9 52.1-44.3-32.2-44.3 32.2 16.9-52.1-44.3-32.2h54.8z"/>
      </svg>
      
    </div>
{% endhighlight %}

{% highlight css linenos %}
.outer-circle {
  fill: red;
}
{% endhighlight %}

There are benefits and downsides of embedding svgs. Embedding svgs can reduce HTTP requests and potentially speed up the website, but they can't be cached.

It is possible to embed an SVG using the HTML object element, which would allow it to cache and allow you to apply styling. However, if you want to use external style sheets with an object mebeded, they have to be specially linked inside of the SVG file.

## Responsive SVGs

When working with embedded SVGs and styling them with CSS, it's possible to add media queries and create responsive images. This is helpful for SVG's that contain lots of fine detail that might not look good at smaller sizes. In a mobile-first approach, the detail is first removed, and then added back in along the spectrum of large screen sizes.

## Intro to SVG Animations

SVG support for interactivity and animation has been around for some time. Long before CSS transitions, transforms and keyframe animations, SVG had other animations capabilities native to the browser that are still supported and used today.

Other than CSS you can also animate using snap.svg, Velocity.js, and GSAP.

It is only possible to animate inline SVGs.

## Grouping and Transforming SVG

You can group parts of an SVG using the `<g>` tag. You can then perform transformations on everything inside the group.

{% highlight html linenos %}
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -50 400 200">
  <g class="heart">
    <circle class="heart-bg" fill="#FF8EB4" cx="200" cy="50" r="90"></circle>
    <path class="heart-icon" fill="#FFFFFF" d="M251.5,45.5c0-17.8-11.1-34.6-28.9-34.6c-9,0-16.6,6.3-22.4,12.7c-5.7-6.3-13-12.7-21.8-12.7 c-17.8,0-29.9,16.8-29.9,34.6c0,24.7,37.2,51.1,52.4,51.1C217.5,96.6,251.5,67.7,251.5,45.5z"></path>
  </g>
</svg>
{% endhighlight %}

{% highlight css linenos %}
.heart-icon {
  transition: transform .4s ease-out;
  transform-origin: 50% 50%;
}
.heart:hover .heart-icon {
  transform: rotate(45deg) scale(1.3);
}
{% endhighlight %}

Note that SVG handles transform origins differently than HTML elements. Default HTML elements are `50%, 50%` however SVGs are `0, 0`. 

Also, the transform origin for firefox is buggy when using percentages. Firefox doesn't honor perfectages as origins. To get it to the ceter you must look at the SVG SML and find the cetner. It will likely look like `cx` and `cy`.

## Creating an SVG Animation Sequence

Many animation sequences can be seen on codepen.

When animating an SVG the first step is to give the different elements of your SVG classes. You can also group various elements using the `<g>` tag.

Create keyframe rules by using `@keyframes{}`.

{% highlight css linenos %}
@keygrams grow {
  0% {
    transform: scale(0);
  }
  30% {
    transform: scale(1.1);
  }
  60% {
    transform scale(0.9);
  }
}
.badge * {
  transform-origin: 180px 180px;
}
.outer,
.inner,
.inline {
  animation: grow 1s ease-out backwards;
}
.inner {
  animation-delay: .1s;
}
.inline {
  animation-delay: .15s;
}
{% endhighlight %}

The backwards fill mode immediately applies the first animation keyframe to the element.

### Using multiple transforms

{% highlight css linenos %}
@keyframes turn {
  0% {
    transform: rotate(0) scale(0);
    opacity: 0;
  }
  60% {
    transform: rotate(375deg) scale(1.1);
  }
  80% {
    transform: rotate(355deg) scale(0.9);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}
.star {
  animation: turn 1.1s .2s ease-out backwards;
}
{% endhighlight %}

You can also use `nth-of-type()` to apply delays to various parts of an element.

## Creating an Animated Line Drawing

To create a drawing animation start with giving the path you want to be drawn a class. Also, if there is a fill color within the SVG HTML change it to transparent.

Now, you can use CSS to accomplish the animation:

{% highlight css linenos %}
.logo {
  stroke: #6fbc6d;
  stroke-width: 2;
  stroke-dasharray: 5;
  stroke-dashoffset: 150;
  animation: offset 5s linear forwards;
}
@keyframes offset {
  100% {
    stroke-dashoffset: 0;
  }
}
{% endhighlight %}

The main thing that creates the drawing effect is taking advantage of the stroke properties `stroke-dasharray` and `stroke-dashoffset`.

The above will create marching ants aound your SVG. In order to create the drawing effect you need the `stroke-dasharray` value to be equal to the paths total length.

You can use JavaScript to figure out this value. Or you can guess and check by entering a number for the `stroke-dasharray` and checking if the stroke completes your SVG.

{% highlight javascript linenos %}
var path = document.querySelector('.logo');
var length = path.getTotalLength();
{% endhighlight %}

The stroke length of this example SVG is `810`. Now your CSS looks like the following:

{% highlight css linenos %}
.logo {
  stroke: #6fbc6d;
  stroke-width: 2;
  stroke-dasharray: 810;
  stroke-dashoffset: 810;
  animation: offset 5s linear forwards;
}
@keyframes offset {
  100% {
    stroke-dashoffset: 0;
  }
}
{% endhighlight %}

Now you culd fill in the background:

{% highlight css linenos %}
.logo {
  stroke: #6fbc6d;
  stroke-width: 2;
  stroke-dasharray: 810;
  stroke-dashoffset: 810;
  animation: offset 5s linear forwards, fill-it .8s 5s forwards;
}
@keyframes offset {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes fill-it {
  100% {
    fill: #6fbc6d;
  }
}
{% endhighlight %}