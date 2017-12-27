---
layout: article

permalink: /blog/jekyll-search-function/

title: "Jekyll Search Function"

subtitle: "Web Development"

excerpt: "There are numerous methods to create a jekyll search function. This post documents these methods and goes in to detail using the one I chose."

categories: blog

tags: [css, web development, jekyll, javascript, html, jquery]

image:
  header: searching.jpg
  teaser: searching.jpg

date: 2017-08-16

featured: true
---

{% include /globalSections/toc.html %}

Obviously, one *downside of using Jekyll is its lack of server-side scripting*, or communication with a server in general. Therefore, *all searching is done client side*. There are a number of methods people use to accomplish client side searching.

If you host your site somewhere other than [GitHub pages](https://pages.github.com/) then you could process a search with **PHP** or **Node.js** for example.

## Methods 

**Most approaches have you create a JSON file that compiles the content from your pages at build time.** However, this causes issues if your site is extremely large, because the page will have to query a large JSON file before it loads the results. Therefore, this isn't ideal if you already have a very large site. In other words if you have a very large site it might be more reasonable to use server-side searching. The methods (client and server-side) I've discovered are shown below.

- [Tipue Search](http://www.tipue.com/search/) - *jQuery plugin.* Tipue basically reads a JavaScript file and displays the results based on the JSON object.
- [lunr.js](https://lunrjs.com/) - *Client side search made simple.* Designed for web applications with all their data already sitting in the client. Lunr is a bit like [Solr](http://lucene.apache.org/solr/), which is an open source search platform built on Apache, but much lighter.
- [Azure Search](https://azure.microsoft.com/en-us/services/search/) - *Cloud search service for web and mobile app development.* First, create your JSON object using liquid just like you would with other methods in this list. Then create a **Node.js** app to create an index in the Azure Search Service and insert the JSON data. Finally, create a search form using JavaScript that queries the Azure Search Service and displays the results.
- [Google Custom Search](https://cse.google.com/cse/). *With Google Custom Search, add a search box to your site.* This search form will basically open a new tab at google.com that performs your search based solely on that site.

## Example - lunr.js

**lunr.js** is a small, full-text search library for use in the browser. It indexes JSON documents and provides a simple search interface for retrieving documents that best match text queries.

As of August 16th, 2017 I have a working demo using the **lunr.js** method on [Pare and Flourish](http://www.pareandflourish.com/). The files below, as well as the **lunr.min.js** script, are what make it work.

### search.html

The **search.html** file is where the JSON file is generated using liquid templating. Therefore, the file is generated upon site build. This is also the page where your results will be displayed.

```html
---
layout: search
title: Search
permalink: /search/
---

<ul id="search-results"></ul>
{% raw %}
<script>
  window.store = {
    {% for post in site.posts %}
      "{{ post.url | slugify }}": {
        "title": "{{ post.title | xml_escape }}",
        "author": "{{ post.author | xml_escape }}",
        "category": "{{ post.category | xml_escape }}",
        "content": {{ post.content | strip_html | strip_newlines | jsonify }},
        "url": "{{ post.url | xml_escape }}"
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  };
</script>
{% endraw %}
<script src="/assets/javascript/lunr.min.js"></script>
<script src="/assets/javascript/search.js"></script>
```

### JavaScript
Be sure to include the link to the **lunr.js** script above the following. Note that you can easily boost results when adding the data to **lunr.js** as shown in the example below.

```javascript
(function () {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');
    if (results.length) {
      var appendString = '';
      for (var i = 0; i < results.length; i++) {
        var item = store[results[i].ref];
        appendString += '<li><a href="' + item.url + '"><h3>' + item.title + '</h3>';
        appendString += '<p>' + item.content.substring(0, 150) + '...</p></a></li>';
      }
      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }
  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }
  var searchTerm = getQueryVariable('query');
  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);
    var idx = lunr(function () {
      this.field('id');
      this.field('title', {
        boost: 10
      });
      this.field('author');
      this.field('category');
      this.field('content');
    });
    for (var key in window.store) {
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'author': window.store[key].author,
        'category': window.store[key].category,
        'content': window.store[key].content
      });
      var results = idx.search(searchTerm);
      displaySearchResults(results, window.store);
    }
  }
})();
```

### Search Form

You can place this search form wherever you want as long as you set the *action=/search/* to the path your search results page is on.

```html
<form action="/search/" method="get">
  <input type="text" id="search-box" name="query" placeholder="Looking for a specific page or article? Search here..">
  <input type="submit" value="search">
</form>
```