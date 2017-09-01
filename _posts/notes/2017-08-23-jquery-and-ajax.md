---
layout: article

permalink: /notes/jquery-and-ajax/

title: "jQuery and AJAX"

subtitle: "Treehouse - Front End Web Development"

excerpt: "How to greatly simplify the use of AJAX with jQuery."

categories: notes

modified: 2017-08-23
---

{% include /globalSections/toc.html %}

## Four Steps In One Simple Function

Recall the four steps when using AJAX. 

<ol>
  <li>Create an XMLHTTP request object</li>
  <li>Create a callback function</li>
  <li>Open the request</li>
  <li>Send the request</li>
</ol>

## Basic Example Using JavaScript and jQuery

### Vanilla JavaScript

{% highlight javascript linenos %}
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
{% endhighlight %}

### jQuery

{% highlight javascript linenos %}
function sendAJAX() {
  $("#ajax").load("sidebar.html");
}
{% endhighlight %}

### HTML

{% highlight html linenos %}
<button id="load" onclick="sendAJAX()" class="button">Bring it!</button>
{% endhighlight %}

## AJAX jQuery Methods

There are other AJAX methods other than the `.load()` method.

{% highlight javascript linenos %}
var url = "/employees.php";
var data = {
  firstName: "Billy";
  lastName: "Bob";
};
var callback = function (response) {
  // your code here
}
$.get(url, data, callback);
{% endhighlight %}

{% highlight javascript linenos %}
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
{% endhighlight %}

## Posting Data with jQuery

If you have a server set up to receive data the `post` jQuery method will get the job done!

{% highlight javascript linenos %}
$.post(url, data, callback);
{% endhighlight %}

## $.ajax

This is the ultimate AJAX jQuery method. For many occasions using the jQuery shorthand methods will get the job done. However, you will always be able to get the job done using the `$.ajax(url, settings)` method. See the documentation (and the brief example below) for the possible settings. 

{% highlight javascript linenos %}
$.ajax(url, settings);
{% endhighlight %}

{% highlight javascript linenos %}
$.ajax(url, {
  data: formData,
  type: "POST",
  success: function(response) {
  $("#signup").html("<p>Thank you for signing up!</p>");
  }
});
{% endhighlight %}

## Handling Errors

It is good to run a function when an AJAX request fails so that you can give the user some feedback.

$(document).ready(function(){
  $.get("missing.html", function(data){
    $("#myDiv").html(data);
  }).fail(function(jqXHR) {
    alert(jqXHR.statusText);
  });
});

The jQuery `fail` method doesnt work for the `load` method.

## Another Example

{% highlight javascript linenos %}
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
{% endhighlight %}