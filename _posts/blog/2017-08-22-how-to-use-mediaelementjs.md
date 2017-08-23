---
layout: article

permalink: /blog/how-to-use-mediaelementjs/

title: "How to Use MediaElement.js"

subtitle: "JavaScript"

excerpt: "MediaElement.js is a dependable HTML media framework."

categories: blog

tags: [css, web development, javascript, html, jquery]

image:
  header: media-elements.jpg
  teaser: media-elements.jpg

modified: 2017-08-22

featured: true
---

{% include /globalSections/toc.html %}

There is a very indepth <a class="fancyLink" href="https://github.com/mediaelement/mediaelement/blob/master/docs/installation.md" target="_blank">installation guide</a> found on their <a class="fancyLink" href="https://github.com/mediaelement" target="_blank">GitHub</a>. In this article I will go over the basics of getting up and running using MediaElement.js. 

## Why Use MediaElement.js?
First, why bother using MediaElement.js when there is a `<video>` tag introduced in HTML5? The <a class="fancyLink" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video" target="_blank">video</a> tag is very limited; see the reasons to use MediaElement.js instead below.

<ul>
  <li>Your videos will look different across browsers due to inconsistent browser styling if you choose to just use the video tag. In other words, MediaElement.js provides a consistent experience across browsers.</li>
  <li>MediaElement.js allows you to style video player elements, such as a play button, volume control, etc. to match the theme of your site. This cannot be done with the browser's native player because these controls don't exist as elements.</li>
  <li>You are also unable to change the way controls appear. With MediaElement.js you can change the order of the controls, as well as specify which controls show or hide.</li>
</ul>

## Basic Video Setup

The most basic default media player (note that the audio player would look similar except obviously no video) is shown below. It hasn't been customized except for sizing and selecting features to be shown.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.5/mediaelementplayer.min.css">

<style>
  #basicExample video {
    width: 100%;
    height: 100%;
  }
</style>

<video style="width:100%;height:100%;" id="basicExample">
  <source type="video/mp4" src="{{site.url}}/images/post-use-mediaelementjs/stock-video-drawing-layout.mp4">
</video>

<script src="https://code.jquery.com/jquery-3.2.1.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.5/mediaelement-and-player.min.js"></script>

<script>
  $(document).ready(function($) {
    $("#basicExample").mediaelementplayer();
  });
</script>

### HTML
The basic HTML needed can be seen below. As you can see, MediaPlayer.js comes with its own css as well. It also, requires jQuery.

{% highlight html linenos %}
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.5/mediaelementplayer.min.css">
<link rel="stylesheet" href="main.css">

<video style="width:100%;height:100%;" id="basicExample">
  <source type="video/mp4" src="{{site.url}}/images/post-use-mediaelementjs/stock-video-drawing-layout.mp4">
</video>

<script src="https://code.jquery.com/jquery-3.2.1.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.5/mediaelement-and-player.min.js"></script>
<script src="main.js"></script>
{% endhighlight %}

### CSS
It is very easy to style any element on the video player. For example, you can change the play button in the middle of the player by changing the background-image of the class `.mejs__overlay-button` to the image of your choice. The below is there to make sure the video stays within the parent element.

{% highlight css linenos %}
#basicExample video {
  width: 100%;
  height: 100%;
}
{% endhighlight %}

### JavaScript
JavaScript is used for many purposes with MediaElement.js. For example, it is used below to show a list of features/plugins to use in the player. For more see the api documentation <a class="fancyLink" href="https://github.com/mediaelement/mediaelement/blob/master/docs/api.md" target="_blank">here</a>.

{% highlight javascript linenos %}
$(document).ready(function($) {
  $("#basicExample").mediaelementplayer();
});
{% endhighlight %}