---
layout: article

permalink: /notes/programming-ajax/

title: "Programming AJAX"

subtitle: "Treehouse - Front End Web Development"

excerpt: "Learn to use callback functions to respond to server responses, how the JSON format worls and how to use JavaScript to parse JSON data. Also in this post is a simple employee status widget for a company."

categories: notes

modified: 2017-08-23
---

{% include /globalSections/toc.html %}

Learn to use callbacks to respond to server responses, how the JSON format works and how to use JavaScript to parse JSON data. Build a simple "employee status" widget for a company.

## Recall How AJAX Works

<ol>
  <li>Create an XMLHTTP request object</li>
  <li>Create a callback function</li>
  <li>Open the request</li>
  <li>Send the request</li>
</ol>

### The Callback Function

Most of the fun and most of the programming happens in the callback function. A callback function is the programming you want to run when the server sends back its response. Each stage of the AJAX process, from creating an XMLHTTP request object, to opening a request, to sending it, involves what's called a ready state.

#### Ready State

You create a callback that responds to a change in that ready state. The XMLHTTP request object's ready state property holds a number from 0 to 4. The number represents each state of the AJAX request. The number 0 to 3 represents the early stages in the AJAX process, from just after the XMLHTTP request object is created (0), all the way to when the response is coming (3). When the web server has sent everything it's going to send, the ready state has the number of 4.

#### Things Could Go Wrong

There are many things that could go wrong when simply checking for a ready state of 4. For example, the web server can't connect to a database, or the web program handling the request crashes, or say the AJAX request pointed to a URL that's no longer around, so you get a file not found error.

If there are errors like these, the web browser won't receive any useful information and we won't be able to update our webpage correctly. To handle possible errors, we can expand on the conditional statement such as the example below.

{% highlight javascript linenos %}
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
{% endhighlight %}

The status property is a number sent from the server. 200 means okay, and is the standard response for a successful HTTP request. Other numbers usually aren't good. 404 is the status for a file not found. 401 response if you're not authorized to access a URL, because it requires some kind of login or other permissions to access. 500 pops up when the server has some kind of error, often the server-side program that's processing the request isn't working.

## Introducing JSON

JSON stands for JavaScript Object Notation. It's a way to use JavaScript to pass information around. It uses basic JavaScript arrays and objects to store data. There are two different ways you can format JSON, using an array notation. 

### Arrays

One way to format JSON is as a JavaScript array. An array is like a shopping list. A shopping list might have just a few items on it, like milk, eggs, and bread. Or it might have undreds of items, maybe a months worth of groceries. In JavaScript, we create an array using an opening bracket to start the lsit of items and a closing bracket to finish the list. Inside the brackets, you add values separated by commas. The problem with arrays is that you don't really know what the data means.

### JavaScript Object Notation

A JavaScript Object is a set of key value pairs, also called property value pairs. The key is a name you can use to identify a property, and a value is the value you want to give that property. 

### JSON Extra Requirement

In regular JavaScript objects keys don't have to be quoted. However, valid JSON requires not only quotes around the property name, but they must also be double quotes.

### JSON Example

In a real world you will likely not create JSON data yourself, but it's something that will be produced programmatically by a web server.

{% highlight text linenos %}
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
{% endhighlight%}

## Parsing JSON Data

JSON is transmitted over the web as plain text. To make it useful for a JavaScript program, you need to parse it, or convert it from a string to JavaScript.

With AJAX the browser sends out a request to the web server and the web server sends a response. The response is just plain text, even though the server sends back information that looks like HTML, XML, or JSON. To a web browser those responses are just a strong of characters, in other words, even though JSON is formatted to look like JavaScript, it isn't JavaScript, it's a plain text string.

In order to use JSON data, we need to take the string and convert it to JavaScript. This is a process known as parsing.

### How to Parse JSON Data

All current browsers can do parse JSON using a single command. `JSON.parse(xhr.responseText)`

## AJAX Example

The following example GETs a local JSON file, parses it using `JSON.parse(xhr.responseText)` and then writes to the page using callback function.

{% highlight javascript linenos %}
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
{% endhighlight %}