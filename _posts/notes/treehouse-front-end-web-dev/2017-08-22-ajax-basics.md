---
layout: article

permalink: /notes/ajax-basics/

title: "AJAX Basics"

subtitle: "Treehouse - Front End Web Development"

excerpt: "AJAX is an important front-end web technology that lets JavaScript communicate with a web server. It lets you load new content without leaving the current page, creating a better, faster experience for your website's visitors. These notes discuss the basics of AJAX as well as how to use it with vanilla JavaScript as well as jQuery."

categories: notes

date: 2017-08-21
---

{% include /globalSections/toc.html %}

**AJAX is an important front-end web technology that lets JavaScript communicate with a web server.** It lets you load new content without leaving the current page, creating a better, faster experience for your website's visitors.

## Introduction to AJAX

>AJAX stands for Asynchronous JavaScript and XML. 

**Basically, AJAX lets you update HTML without loading a new webpage.** AJAX gives us a faster and more user friendly way to update webpages. 

Instead of jumping to a new webpage every time we want new information, AJAX lets you build webpages that ask for information from a web server. The web server returns data to the web browser, and JavaScript processes that data to selectively change parts of the web page.

The process of asking a server for information is technically called *making a request of the server*. And when the server sends back its answer, that's called *a response*. The web is built upon browsers, also called *clients*, sending requests to web servers, and servers sending responses back.

## How AJAX Works

**AJAX was introduced by Microsoft in 1999 as XMLHttpRequest Object.** It was later shortened to just *XHR*. 

>Put simply, AJAX is the process of using JavaScript to send a request to a web server, and receive a response back, and then do something with that response. 

What you send to a web server with AJAX can be a simple request for a *webpage*, a *text file*, a *search* sent to a database, or a *complete form full of information*.

#### Asynchronous

**Asynchronous refers to how the request is sent to the web server.** When a web browser makes an AJAX request, it doesn't stop everything it's doing and just wait for a response. That would freeze your browser and you wouldn't be able to do anything until the response came back, if the server ever did send a response. Sometimes they don't. **Asynchronous requests are sent without waiting.** The user can keep mousing around the webpage. Your JavaScript program will keep running and only when the response comes back from the web server will your program do something with it. In fact, you can send out multiple AJAX requests, and even though you send each request, one after the other, you won't know which request will come back first. The speed of the server, the complexity of the request, and any internet traffic all play a part in determining when a request returns information to the browser.

#### JavaScript

**JavaScript is the programming language you use to make all this AJAX stuff happen.** You use JavaScript to send out an AJAX request, you use JavaScript to process the incoming response, and you use JavaScript to update your webpage.

#### and XML

**The X stands for XML or Extensible Markup Language.** Originally, XML was seen as the format server responses should be sent in, but it's not the only format you can receive data in. It's not even the most common or preferred format any longer.

#### AJAX In Four Steps

- Create an XMLHTTP Request Object.
- Define a callback function.
- Open a request.
- Send the request.

## Simple AJAX Example Using Vanilla JavaScript

The following example would load a chunk HTML into a page using AJAX. However, **AJAX requests only work through a web server**. In other words, **you can't just preview a local file on your computer and expect your AJAX to work**. You'll need to either set up a *local web server* running on your computer and view your pages through it; or upload your project files to a web server and view those files through the web.

```javascript
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if ( xhr.readyState === 4 ) {
    document.getElementById("ajax").innerHTML = xhr.responseText;
  }
};
xhr.open("GET", "sidebar.html");
function sendAJAX() {
  xhr.send();
  document.getElementById("load").style.display = "none";
}
```

```html
<button id="load" onclick="sendAJAX()">Bring It!</button>
<div id="ajax"></div>
```

#### Simple Example Explained

As mentioned above, AJAX programming is a four-step process. Step one, create an XMLHTTP Request object. This step tells the web browser to get ready for AJAX. You create an XMLHTTP Request object, or XHR object for short. This is seen in the `var xhr = new XMLHttpRequest();` bit. 

For each AJAX request, you should create a new XHR object. For example, if you wanted to use AJAX twice on a page, to request data for a sidebar, and another to process a form submission. You will need to create two variables, each with their own XHR object.

Step two is to create a callback function. This is the most complicated part of the AJAX process. That's because the callbar function is the programming you want the browser to run when the server sends back its response. This is seen in the `xhr.onreadystatechange` bit.

To trigger the call back, we use a special browser event. An event is something that happens in the web browser, an action a user takes like clicking the mouse button or submitting a form. For example, when a user submits a form, you can check to see if they filled it out correctly. There are events for mouse clicks, key presses, scrolling, and even closing a window. AJAX comes with its own set of events. We add programming to response to those events. The most important event is the `onreadystatechange` event. *This event is triggered whenever there's a change in an AJAX request.* Like opening a new request, sending it, or receiving a response.

We create our callback to respond to that request. This programming sets up a function that runs each time there is a change in the state of the AJAX request. Each step in the AJAX process (all four above) triggers a change of state.

For the example above, we're only interested in the final change of state. That's when the server sends back its response. We want to get that response and then update our webpage. The XML http request object keeps track of the state using a special property named ready state. That property contains a number including the current state of the request and that property holds the number four. Then the request is done and the server has sent back a response. 

A conditional statement to test for that state was added. So here, we're checking if the ready state is equal to 4. As seen in `xhr.readyState === 4`. This means we've got the response back. We'll take the full AJAX response and place it into the web page. Pretend for the purposes of this example the data we get back is a chunk of HTML. We'll place that HTML inside the div with the ID of ajax. This can be done with standard document manipluation methods such as `document.getElementById("ajax").innerHTML = xhr.responseText;`.

Step three, is to open a request. An XHR object has a method or function called open which looks like `xhr.open("GET", "sidebar.html");`. As you can see you give this function two pieces of information. The first is the HTTP method that you're going to use. The most common methods are GET and POST. GET is used if you want to send a request for data and POST if you're sending the data such as information from a form, for the server to save in the database. Now the open function just gets the browser ready to make a request, but it doesn't send that request.

Step four is sending the request. The previous three steps gave the browser all the information it needs. So we can finally send off the request to the web server. As seen in `xhr.send();`.

As you can see the function was executed once the button is clicked due to the `onclick="sendAJAX()"` bit. Inside the `sendAJAX()` function is the `xhr.send();` step.

### GET and POST

>An AJAX request requires specifying the method you'll use to send the request and the URL you'll send the request to. The two most common methods are GET and POST.

Easy way to think of GET vs POST: **Use GET when you're only interested in receiving or getting information from a server. Use POST when sending data that's going to be saved like an email address for an email newsletter sign-up form.**

You use the GET method all the time when you open a web browser and type in a web address. The web browser uses a get to request a webpage. The GET method is meant to get a resource, like a webpage, image, or other file from a web server. In other words, all that's requested for a get request is a url. But with AJAX, we frequently want more than just a static file of text of HTML. We're after dynamic, that is, changing information. 

The GET method is a simple way to send data to a web server as well. However, there are some down sides to it. First, all of the data is sent in the URL, which means that if you need to send sensitive information. It will appear in the computer's browser history and show up in the web servers log files. This isn't the most secure solution. Second, there's only so much information you can put into a UTL. For example, Internet Explorer can only handle URLs that are 2083 characters long.

The POST method sends data differently than GET. **Whereas GET puts all its information in the URL, the POST method sends data separate from the URL, in what's called the body of the request.** For example, say you had a sign up form on your site with username and password fields. Using GET to submit that form, you'd see the username and password in the URL.

The POST method does require special encoding, just like GET requests. In addition, you need to set up a special header for the request. That's an instruction, sent to the server, telling it what kind of data it should expect. 

In many cases, you can use either GET or POST, but the basic rule of thumb is that if you're requesting information. Like sarch results, new HTML to add to a page, photos from a photo server and so on; use GET. On the other hand, use POST if you're sending information that's to be stored in a database, if the data is sensitive, like a password, or if you're sending lots of information from a form.

## AJAX Response Formats

**After you send an AJAX request, your callback function waits for a response.** Web servers usually reply to AJAX requests with a text response. This could be a simple message, like okay, or message received. For instance, say you're using AJAX to submit information from a form. A user visits the web page, enters information, and hits a submit button. Instead of exiting the page, as you normally do when you submit a form, you could use AJAX to send the form's information to the server. After the server gets that data and does something with it, like adding it to a database, the web server could send a simple text response. Form submitted successfully, for example.

>You can also use AJAX to request a static file, meaning a file just sitting on your web server.

### Structured Data Format

Sometimes you get a lot of information from the server. **For dealing with lots of data, it's a good idea to have a structured data format. By structured, I mean data that is ordered consistently, has identifiers that indicate what the data is, and is easy for JavaScript to analyze and use.** Two common data interchange formats are XML and **JSON**.

XML is the X in AJAX. It is very similar to HTML, and like HTML, XML uses tags to structure data. In HTML we have tags like head, title, body, div, and ul, but XML doesn't limit you to just a handful of tags. You can create your own tags. See the example below:

```xml
<contact>
  <name>Billy</name>
  <phone>1234567890</phone>
  <email>email@example.com</email>
</contact>
```

Most server side languages handle XML easily. However, using XML data and JavaScript isn't so easy. It involves several steps, including analyzing or parsing the XMl document, then going through each of its notes to extract data from the tags. Form many AJAX applications, there's a better, more JavaScript like data format called JSON. In fact, JSON has become the most popular way to exchange data using AJAX.

## AJAX Security Limitation

AJAX can make requests of a web server and get responses back, but there are limitations to how you can use AJAX. **AJAX is normally limited by a web browser's same origin policy which controls how JavaScript can access content from a web server.**

In general, you can use AJAX to communicate from one page to another on the same web server but not to access other web servers.

For example, your AJAX code is on http://www.myserver.com. You can use AJAX to talk to a PHP file on that server. You can also talk to files on the same server within sub-folders. However, you'll run into problems in the following cases, requesting data from another website if it's not from the same server, then it's not from the same origin, and it's forbidden. Switching from HTTP to HTTPS isn't allowed. Switching port numbers isn't allowed. Going from www.myserver.com to db.myserver.com isn't allowed, because www and db are different hosts.

### Circumvent the Same Origin Policy

If you want to embed a Google Map, your tweets, or photos from Flickr all of which are in different domains than your own. Fortunately there are a few ways to circumvent the same origin policy.

First, you can create a Web Proxy. **Web servers aren't limited by same origin policy, so a web server can request data from servers at other domains.** Because of this, you can set up a script in PHP, or Ruby on Rails for example on your server, which asks for information from another web server. Then you can use AJAX to talk to the script on your site, which talks to the other site, and returns the data to your page. This makes sure that the AJAX part stays within the same website, and obeys the same origin policy.

**Second, another common technique uses something called JSONP, which stands for JSON Padding.** It's not traditional AJAX. It actually relies on the ability to link to JavaScript files across domains. Browsers actually do allow many types of cross domain links. In fact, linking to JavaScript files across domains is a common technique when working with popular JavaScript libraries like jQuery. In fact, this is how CDNs, or Content Delivery Networks, work. There are a few techniques for using JSONP. And as you'll see, jQuery provides a really easy way to use JSONP.

>Finally, there's a new method for making AJAX requests across domains, it's called CORS or Cross-Origin Resource Sharing. 

It's a W3C recommendation and is already implemented in most current browsers. It does require some set up on the servers part. But allows the server to accept requests from other domains. **It even allows for more complex types of authentication that require the web browser to supply credentials before the web server will provide any information.**

One last AJAX limitation. **AJAX doesn't work unless you're viewing your page through a web server.** For example, if you build a webpage on your computer that uses AJAX and open that page right up in your browser the AJAX won't work. If you set up a local development environment using something like MAMP or WAMP you'll be okay as long as you view your AJAX enables pages through that web server.

## Basic Example Using JavaScript and jQuery

#### Vanilla JavaScript

```javascript
var xhr = new XMLHttpRequest();
xhr.open('GET', 'sidebar.html');
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    document.getElementById('ajax').innerHTML = xhr.responseText;
  }
};
function sendAJAX() {
  xhr.send();
  document.getElementById('load').style.display = 'none';
}
```

#### jQuery

```javascript
function sendAJAX() {
  $("#ajax").load("sidebar.html");
}
```

#### HTML

```html
<button id="load" onclick="sendAJAX()" class="button">Bring it!</button>
```

## AJAX jQuery Methods

>There are other AJAX methods other than the `.load()` method.

```javascript
var url = "/employees.php";
var data = {
  firstName: "Billy";
  lastName: "Bob";
};
var callback = function (response) {
  // your code here
}
$.get(url, data, callback);
```

```javascript
$(document).ready(function(){
  var url="../data/employees.json";
  $.getJSON(url, function(response ){
    var statusHTML = "<ul class='bulleted'>";
    $.each(response, function(index, employee) {
      if (employee.inoffice === true) {
        statusHTML += "<li class='in'>" + employee.name + "</li>";
      } else {
        statusHTML += "<li class='out'>" + employee.name + "</li>";
      }
    });
      $("#employeeList").html(statusHTML + "</ul>");
  });
});
```

#### Posting Data with jQuery

>If you have a server set up to receive data the `.post()` jQuery method will get the job done!

```javascript
$.post(url, data, callback);
```

#### $.ajax

This is the ultimate AJAX jQuery method. **For many occasions using the jQuery shorthand methods will get the job done.** However, you will **always be able to get the job done using the `$.ajax(url, settings)` method**. See the [documentation](http://api.jquery.com/jquery.ajax/) (and the brief example below) for the possible settings. 

```javascript
$.ajax(url, settings);
```

```javascript
$.ajax(url, {
  data: formData,
  type: "POST",
  success: function(response) {
  $("#signup").html("<p>Thank you for signing up!</p>");
  }
});
```

## Handling Errors

It is good to run a function when an AJAX request fails so that you can **give the user some feedback**.

```javascript
$(document).ready(function(){
  $.get("missing.html", function(data){
    $("#myDiv").html(data);
  }).fail(function(jqXHR) {
    alert(jqXHR.statusText);
  });
});
```

The jQuery `.fail()` method doesn't work for the `.load()` method.

#### Another Example

```javascript
$(document).ready(function () {
  $.getJSON('../data/employees.json', function (data) {
    var statusHTML = '<ul class="bulleted">';
    $.each(data,function (index, employee) {
      if (employee.inoffice === true) {
        statusHTML +='<li class="in">';
      } else {
        statusHTML +='<li class="out">';
      }
      statusHTML += employee.name + '</li>';
    });
    statusHTML += '</ul>';
    $('#employeeList').html(statusHTML)
  }); // end getJSON
  $.getJSON('../data/rooms.json', function(data){
    var roomsHTML = '<ul class="rooms">';
    console.log(data);
    $.each(data, function(index, room){
      if (room.available === true) {
        roomsHTML += '<li class="full">' + room.room + '</li>';
      } else {
        roomsHTML += '<li class="empty">' + room.room + '</li>';
      }
      $('#roomList').html(roomsHTML + '</ul>');
    });
  });
}); // end ready
```

## Programming AJAX

Learn to use callbacks to respond to server responses, how the JSON format works and how to use JavaScript to parse JSON data. Build a simple "employee status" widget for a company.

### The Callback Function

Most of the fun and most of the programming happens in the callback function. A callback function is the programming you want to run when the server sends back its response. Each stage of the AJAX process, from creating an XMLHTTP request object, to opening a request, to sending it, involves what's called a ready state.

#### Ready State

You create a callback that responds to a change in that ready state. The XMLHTTP request object's ready state property holds a number from 0 to 4. The number represents each state of the AJAX request. The number 0 to 3 represents the early stages in the AJAX process, from just after the XMLHTTP request object is created (0), all the way to when the response is coming (3). When the web server has sent everything it's going to send, the ready state has the number of 4.

#### Things Could Go Wrong

There are many things that could go wrong when simply checking for a ready state of 4. For example, the web server can't connect to a database, or the web program handling the request crashes, or say the AJAX request pointed to a URL that's no longer around, so you get a file not found error.

If there are errors like these, the web browser won't receive any useful information and we won't be able to update our webpage correctly. To handle possible errors, we can expand on the conditional statement such as the example below.

```javascript
var new xhr = xhrhttprequest();
xhr.onreadystatechange = function() {
  if ( xhr.readyState === 4 ) {
    if ( xhr.status === 200 ) {
    document.getElementById().innerHTML = xhr.responseText;
    } else {
      console.log("xhr.statusText");
    }
  }
};
xhr.open("GET", "sidebar.html");
xhr.send();
```

**The status property is a number sent from the server.** **200 means okay**, and is the standard response for a successful HTTP request. Other numbers usually aren't good. **404 is the status for a file not found**. **401 response if you're not authorized** to access a URL, because it requires some kind of login or other permissions to access. **500 pops up when the server has some kind of error**, often the server-side program that's processing the request isn't working.

## Introducing JSON

>JSON stands for JavaScript Object Notation.

It's a way to use JavaScript to pass information around. It uses basic JavaScript arrays and objects to store data. There are two different ways you can format JSON, using an array notation. 

#### Arrays

**One way to format JSON is as a JavaScript array.** An array is like a shopping list. A shopping list might have just a few items on it, like milk, eggs, and bread. Or it might have hundreds of items, maybe a months worth of groceries. In JavaScript, we create an array using an opening bracket to start the list of items and a closing bracket to finish the list. Inside the brackets, you add values separated by commas. The problem with arrays is that you don't really know what the data means.

#### JavaScript Object Notation

>A JavaScript Object is a set of key value pairs, also called property value pairs. The key is a name you can use to identify a property, and a value is the value you want to give that property. 

#### JSON Extra Requirement

In regular JavaScript objects keys don't have to be quoted. However, **valid JSON requires not only quotes around the property name, but they must also be double quotes**.

#### JSON Example

In a real world you will likely not create JSON data yourself, but it's something that will be produced programmatically by a web server.

```text
[
  {
    "name": "billy",
    "age": 35,
    "children": true
  },
  {
    "name": "sara",
    "age": 25,
    "children": false
  }
]
```

## Parsing JSON Data

**JSON is transmitted over the web as plain text.** To make it useful for a JavaScript program, **you need to parse it**, or convert it from a string to JavaScript.

**With AJAX the browser sends out a request to the web server and the web server sends a response.** The response is just plain text, even though the server sends back information that looks like HTML, XML, or JSON. To a web browser those responses are just a strong of characters, in other words, even though JSON is formatted to look like JavaScript, it isn't JavaScript, it's a plain text string.

>In order to use JSON data, we need to take the string and convert it to JavaScript. This is a process known as parsing.

#### How to Parse JSON Data

All current browsers can do parse JSON using a single command. `JSON.parse(xhr.responseText)`

#### AJAX Example

The following example GETs a local JSON file, parses it using `JSON.parse(xhr.responseText)` and then writes to the page using callback function.

```javascript
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if(xhr.readyState === 4) {
    var employees = JSON.parse(xhr.responseText);
    var statusHTML = "<ul class='bulleted'>";
    for (var i = 0; i < employees.length; i++) {
      if (employees[i].inoffice === true) {
        statusHTML += "<li class='in'>";
      } else {
        statusHTML += "<li class='out'>";
      }
      statusHTML += employees[i].name + "</li>";
    }
    statusHTML += "</ul>";
    document.getElementById("employeeList").innerHTML = statusHTML;
  }
}
xhr.open("GET", "data/employees.json");
xhr.send();
```

## What Is an API?

>Many websites let you access their content using an API (or Application Programming Interface). An API defines what you can get from a web server and how to use it. 

#### Flickr's API

Flickr is one of the most popular photo-sharing sites on the web. Flickr offers an API for searching its huge catalog of photos. **To use this API you need to apply for an API key.** During your application it will request information about yourself and your project and/or reason for needing to use an api.

[There is a trimmed down version of their API as well](https://api.flickr.com/services/feeds/photos_public.gne?format=json).

#### JSONP

JSON with Padding. **JSONP is used to request data from a server residing in a different domain than the client. JSONP enables sharing of data bypassing the same-origin policy.** That policy disallows running JavaScript to read media DOM elements or XHR data fetched from outside the page's origin. 

The HTML `<script>` element is allowed to execute content retrieved from foreign origins. Services replying with pure JSON data were not able to share the data across domain before the adoption of CORS> For example, a request to a foreign service may return a record for a person Foo in the JSON format, which, by definition, conforms to JavaScript's object initializer syntax.

#### Example

```javascript
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
```