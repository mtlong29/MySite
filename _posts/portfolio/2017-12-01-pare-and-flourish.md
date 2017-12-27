---
layout: article

permalink: /portfolio/pare-and-flourish/

categories: portfolio

title: "Pare and Flourish"

subtitle: "Web Development"

excerpt: "It has been a dream of two friends of mine, Katie and Skylar, to create a blog. This post documents the journey."

date: 2017-12-01

image: 
  header: pandf-site.jpg
  teaser: pandf-site.jpg
  
tags: [web development, web design, html, scss, javascript, jquery, graphic design, photoshop, jekyll, bootstrap]

featured: true
---

{% include /globalSections/toc.html %}

[Pare and Flourish](http://www.pareandflourish.com/) is a professional development blog teaching you how to pitch your brand in your career. Go there to read the latest millennial career advice from the job search, to career development, and everything in between.

**I am responsible for the design and development of Pare and Flourish.**

## Design

The overall design of Pare and Flourish is relatively simple. *It basically consists of three different page types: the landing page, blog posts, and subpages.* The content of the landing page is basically a shortened version of every subpage aside from the blog posts. The main difference between a blog post page and a "subpage", as it's described here, is a blog post page has a sidebar whereas a subpage does not.

### Pare and Flourish Landing Page

The Pare and Flourish landing page, or home page, contains links to every blog post to date. To access blog posts older than the six shown you can click a button labeled *"Click here to load more blogs!"*. Once a user clicks there older posts are displayed using a combination of AJAX and Jekylls own pagination system using Liquid templating. Learn more about this in the development section. 

In addition to blog posts, the landing page contains brief snippets of most subpages including services, events, and #amReading (books Pare and Flourish are currently reading). The services section contains some toggle pannels, which are accomplished using jQuery, concerning Pare and Flourish services. Next to that is an ordered list describing how a typical Pare and Flourish service goes down. Below the services section is the events section which contains a carousel using the slick.js jQuery plugin. Lastly is the #amReading section which contains images of books that Pare and Flourish members are currently reading. Each book when moused over has a nice transition, restoring color and correct orientation.

<div class="macbook-pro-mockup">
  <img src="/assets/images/mockups/macbook-pro-mockup.png" alt="MacBook Pro Container">
  <div class="macbook-pro-mockup-content">
    <img src="/assets/images/post-pare-and-flourish-site-evo/pare-and-flourish-home-page.jpg" alt="Snapshot of the Pare and Flourish home page.">
  </div>
</div>

### Pare and Flourish Blog Post

**Blogs are like the heart and soul of the Pare and Flourish website.** New blogs are added weekly. The design of the blog page has a header similar to the landing page to create a sense of flow and theme. The body of the blogs are fairly ordinary, sometimes they contain images. The blog posts contain a sidebar which has various information about Pare and Flourish.

<div class="macbook-pro-mockup">
  <img src="/assets/images/mockups/macbook-pro-mockup.png" alt="MacBook Pro Container">
  <div class="macbook-pro-mockup-content">
    <img src="/assets/images/post-pare-and-flourish-site-evo/pare-and-flourish-blog-post-page.jpg" alt="Snapshot of a Pare and Flourish blog post page.">
  </div>
</div>

### Pare and Flourish Subpage

Any Pare and Flourish page that isn't the landing page or a blog post fall under this category. There are various designs for each of these pages. For example, the #amReading page is just a larger version of the #amReading section on the landing page. But the events and services page are primarily text describing the respective page followed by a way to purchase a service or reserve a seat for an event. Below is a snapshot of the about page titled, Start Here.

<div class="macbook-pro-mockup">
  <img src="/assets/images/mockups/macbook-pro-mockup.png" alt="MacBook Pro Container">
  <div class="macbook-pro-mockup-content">
    <img src="/assets/images/post-pare-and-flourish-site-evo/pare-and-flourish-sub-page.jpg" alt="Snapshot of a Pare and Flourish sub page.">
  </div>
</div>

## Development

You can find the [Pare and Flourish source code](https://github.com/mtlong29/pareandflourish_site) on GitHub. *There you will find everything needed to get the site up and running.* Things that you will need are the basic Jekyll Requirements such as bundler, and various Ruby Gems. You will also need to install the Node Modules specified in the package.json file.

One of the biggest features of the Pare and Flourish site I'd like to spotlight here is the ability to load more posts. The load more posts function combines Liquid templating, JavaScript, and [Jekylls own pagination system](https://jekyllrb.com/docs/pagination/). 

One problem I have with Jekyll's pagination is it basically forces you to create a whole new page with a set number of posts on it. This isn't what I had in mind. I wanted to be able to load more posts while staying on the same page. Also, they apparently have an issue that causes pagination to break when you create a pretty permalink.

```html
{% raw %}
{% if paginator.page %} 
  {% assign offset = paginator.page | minus:1 | times:paginator.per_page %} 
  {% assign currentPage = paginator.page %} 
{% else %} 
  {% assign offset = 0 %} 
  {% assign currentPage = 1 %} 
{% endif %}
    
<section class="blogTiles">
  <div class="container">
    <div class="row">
      <!-- code for first tile goes here (the content changes from time to time, most often it's a quote) -->
      <div class="blog-tiles">
        <div id="blogContainer" class="postContainer" data-page="{{currentPage}}" data-totalPages="{{paginator.total_pages}}">
          {% for post in paginator.posts %}
          <article class="post list">
            <!-- code for a blog tiles goes here (including teaser image, title, and excerpt. all of which are templated in using liquid. six are displayed at once) -->
          </article>
          {% endfor %}
        </div>
      </div>
      {% assign postCount = site.posts | size %} 
      {% assign postsCovered = site.paginate | plus:offset %}
      {% if postsCovered < postCount %} 
        <!-- code for last tile goes here (the class "loadMore" is given to this tile) -->
      {% endif %}
    </div>
  </div>
</section>
{% endraw %}
```

The load more posts function isn't complicated at all. The below uses jQuery to select the `loadMode` class (on the last tile) and creates a click event to execute the `loadMorePosts` function. This function basically uses the jQuery `get()` method and calls the subsequent pages created using Jekylls pagination. Upon running out of pages to "get" the last tile is removed.

```javascript
$(document).ready(() => {
  $(".loadMore").click(loadMorePosts);

  function loadMorePosts() {
    let $blogContainer = $("#blogContainer");
    let nextPage = parseInt($blogContainer.attr("data-page")) + 1;
    let totalPages = parseInt($blogContainer.attr("data-totalPages"));

    $(this).addClass("loading");

    $.get("/blog/page" + nextPage, (data) => {
      let htmlData = $.parseHTML(data);
      let $articles = $(htmlData).find("article");

      $blogContainer.attr("data-page", nextPage).append($articles);

      if ($blogContainer.attr("data-totalPages") == nextPage) {
        $(".loading").remove();
      }

      $(this).removeClass("loading");
    });

  }
});
```

Again, *any other features of the Pare and Flourish site can be explored at GitHub.*