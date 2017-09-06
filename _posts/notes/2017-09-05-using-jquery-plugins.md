---
layout: article

permalink: /notes/using-jquey-plugins/

title: "Using jQuery Plugins"

subtitle: "Treehouse - Beginner JavaScript"

excerpt: "Notes about jQuery plugins. jQuery plugins let you add interactive pages, engaging user interfaces, and eye grabbing additions to your web pages. It is important to know how to find and use these free and easy to use programs that take advantage of the power of jQuery."

categories: notes

modified: 2017-09-05
---

{% include /globalSections/toc.html %}

jQuery plugins let you add interactive page elements like sliders, popup photo galleries, animated navigation bars, calculators, video backgrounds, and more to your web pages. All of theis without doing a lot of programming yourself.

## Some jQuery Plugins:

There are MANY useul jQuery Plugins. Some examples are as follows:

<ul>
  <li><a class="fancyLink" href="http://codepen.io/mariusbalaj/pen/bGqhI" target="_blank">jCalculator</a></li>
  <li><a class="fancyLink" href="http://www.thepetedesign.com/demos/adaptive-modal_demo.html" target="_blank">jQuery Adaptive Modal</a></li>
  <li><a class="fancyLink" href="http://ericsteinborn.com/jquery-listnav" target="_blank">jQuery ListNav</a></li>
  <li><a class="fancyLink" href="http://vodkabears.github.io/vide/" target="_blank">Vide</a></li>
  <li><a class="fancyLink" href="http://lokeshdhakar.com/projects/lightbox2/" target="_blank">Lightbox 2</a></li>
  <li><a class="fancyLink" href="https://jqueryui.com/" target="_blank">jQuery UI</a></li>
</ul>

It can be difficult finding a good plugin and is still maintained by the person who made it.

<a class="fancyLink" href="http://plugins.jquery.com/" target="blank">The jQuery Plugin Registry</a> is a good place to look for plugins. However, they are shutting it down. The places to go now are <a class="fancyLink" href="http://www.sitepoint.com/jquery-popular-plugins-list/" target="_blank">sitepoint</a> and <a class="fancyLink" href="http://www.unheap.com/" target="_blank">unheap</a>. They provide the source and a demo. 

### Is This Plugin Any Good?

It is important that a plugin provides a clear and easy to read documentation. It is also important to make sure the plugin is still actively maintained. You can check this by looking at the source code on GitHub. Also, look for plugins that are responsive and mobile friendly (touch and pinches).

## Plugin Files

Most plugins include the following:

<ul>
  <li>A CSS file</li>
  <li>A JavaScript file</li>
  <li>Images</li>
</ul>

### Distribution Folder

When browsing a project on GitHub you may see a `dist` folder. This is the folder that the author of the project is distributing and these are where the files you want are kept. 

However, this is obviously not the only way a project is organized.

## Animsition (.. or The Animated Transition jQuery Plugin)

<a class="fancyLink" href="http://git.blivesta.com/animsition/" target="_blank">Animisition</a> is a simple and easy jQuery plugin for CSS animated page transitions. It contains many different styles such as flip in, flip out, zoom, rotate, fade, etc. 

The process of getting this up and running is extremely simple. See below:

<ol>
  <li>Link required files.</li>
  <li>Add HTML Markup.</li>
  <li>Call the animsition.</li>
</ol>

The animsition call looks like the following:

{% highlight javascript linenos %}
$(document).ready(function() {
  $(".animsition").animsition({
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 1500,
    outDuration: 800,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });
});
{% endhighlight %}

A large majority of jQuery plugins will require a JavaScript object similar to the above. Many of the options can be removed if not needed.

## Sticky Navigation Bar

Adding a "sticky" navigation bar to a site can be done in a number of ways. This method uses the jQuery plugin <a class="fancyLink" href="http://stickyjs.com/" target="_blank">stickjs</a>.

Stickyjs will let you stick any HTML element to the top of the browser window.

### Plugin Events 

Sometimes plugin creators will add events that you can use to further customize how the plugin works. For example, the stickyjs plugin adds the `sticky-start` and `sticky-end` events.

Using these events you can change things such as the text in a navbar.

{% highlight javascript linenos %}
$('.header').on('sticky-start', function(){
  $('.description').html('We build <strong>GREAT</strong> apps');
});

$('.header').on('sticky-end', function(){
  $('.description').html('We build apps');
});
{% endhighlight %}

## Carousel Plugin - Slick

<a class="fancyLink" href="http://kenwheeler.github.io/slick/" target="_blank">Slick</a> is an interactive carousel jQuery plugin that has tons of customization possibilities.