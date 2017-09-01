---
layout: article

permalink: /notes/sorting-tables/

title: "Sorting Tables"

subtitle: "Treehouse - Front End Web Development"

excerpt: "Example of how to sort tables using the jQuery dataTables.js plugin. This doesn't include a working example in this post, but all the required HTML, CSS, and jQuery are available here."

categories: notes

modified: 2017-08-21
---

{% include /globalSections/toc.html %}

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Information</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link href='http://fonts.googleapis.com/css?family=Nunito:400,300' rel='stylesheet' type='text/css'>
<!--    <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.15/css/jquery.dataTables.css">-->
    <link rel="stylesheet" href="css/main.css">
  </head>
  <body>

    <table id="myTable">
      <caption>Employee Information</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Job Role</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td colspan="3">Data is updated every 15 minutes</td>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <th scope="row">Matthew Long</th>
          <td>long.matthew29@gmail.com</td>
          <td>Web Developer</td>
        </tr>
        <tr>
          <th scope="row">Nick Pettit</th>
          <td>nick@example.com</td>
          <td>Web Designer</td>
        </tr>
        <tr>
          <th scope="row">Billy</th>
          <td>billy@gmail.com</td>
          <td>Road Liner</td>
        </tr>
        <tr>
          <th scope="row">Tommy</th>
          <td>tommy9@gmail.com</td>
          <td>Clothes Designer</td>
        </tr>
        <tr>
          <th scope="row">Andy David</th>
          <td>davvvy@gmail.com</td>
          <td>Streamer</td>
        </tr>
        <tr>
          <th >Philly</th>
          <td>phil@gmail.com</td>
          <td>Vending Machine Dude</td>
        </tr>
      </tbody>
    </table>
  
  <script
			  src="https://code.jquery.com/jquery-3.2.1.min.js"
			  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
			  crossorigin="anonymous"></script>
  <script type="text/javascript" charset="utf8" src="//cdn.datatables.net/1.10.15/js/jquery.dataTables.js"></script>
  <script src="main.js" type=""></script>
  </body>
</html>
{% endhighlight %}

{% highlight css %}
*, *:before, *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  font-family: 'Nunito', sans-serif;
  color: #384047;
}

table {
  max-width: 960px;
  margin: 10px auto;
}

caption {
  font-size: 1.6em;
  font-weight: 400;
  padding: 10px 0;
}

thead th {
  font-weight: 400;
  background: #8a97a0;
  color: #FFF;
}

tr {
  background: #f4f7f8;
  border-bottom: 1px solid #FFF;
  margin-bottom: 5px;
}

tr:nth-child(even) {
  background: #e8eeef;
}

th, td {
  text-align: left;
  padding: 20px;
  font-weight: 300;
}

tfoot tr {
  background: none;
}

tfoot td {
  padding: 10px 2px;
  font-size: 0.8em;
  font-style: italic;
  color: #8a97a0;
}
{% endhighlight %}

{% highlight javascript %}
$(document).ready(function(){
  $("#myTable").DataTable({
    paging: false,
    searching: false,
    select: true
  });
  $("#myTable_info").remove();
});
{% endhighlight %}
