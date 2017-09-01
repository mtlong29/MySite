---
layout: article

permalink: /notes/ajax-and-apis/

title: "AJAX and APIs"

subtitle: "Treehouse - Front End Web Development"

excerpt: "Using APIs, or Application Programming Interfaces. Notes on what APIs generally are. And that an API defines what you can get from a web server and how to use it. This post beiefly documents the API Flickr offers."

categories: notes

modified: 2017-08-26
---

{% include /globalSections/toc.html %}

## What Is an API?

Many websites let you access their content using an API (or Application Programming Interface). An API defines what you can get from a web server and how to use it. 

## Flickr's API

Flickr is one of the most popular photo-sharing sites on the web. Flickr offers an API for searching its huge catalog of photos.

To use this API you need to apply for an API key. During your application it will request information about yourself and your project and/or reason for needing to use an api.

There is a trimmed down version of their API as well. You can view the JSON data at <a href="https://api.flickr.com/services/feeds/photos_public.gne?format=json" target="_blank">https://api.flickr.com/services/feeds/photos_public.gne?format=json</a>.

### JSONP

JSON with Padding. JSONP is used to request data from a server residing in a different domain than the client. JSONP enables sharing of data bypassing the same-origin policy. That policy disallows running JavaScript to read media DOM elements or XHR data fetched from outside the page's origin. 

The HTML `<script>` element is allowed to execute content retrieved from foreign origins. Services replying with pure JSON data were not able to share the data across domain before the adoption of CORS> For example, a request to a foreign service may return a record for a person Foo in the JSON format, which, by definition, conforms to JavaScript's object initializer syntax.

### Example

{% highlight javascript linenos %}
$(document).ready(function() {
 $('form').submit(function (evt) {
    evt.preventDefault();
    var searchTerm = $('#search').val();
    // the AJAX part
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var flickrOptions = {
      tags: searchTerm,
      format: "json"
    };
    function displayPhotos(data) {
      var photoHTML = '<ul>';
      $.each(data.items,function(i,photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      }); // end each
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);
  }); // end click
}); // end ready
{% endhighlight %}