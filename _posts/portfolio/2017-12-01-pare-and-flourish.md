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

<a href="http://www.pareandflourish.com/">Pare and Flourish</a> is a professional development blog teaching you how to pitch your brand in your career. Go there to read the latest millennial career advice from the job search, to career development, and everything in between.

I am responsible for the design and development of Pare and Flourish.

## Design
The overall design of Pare and Flourish is relatively simple. It basically consists of three different page types: the landing page, blog posts, and subpages. The content of the landing page is basically a shortened version of every subpage aside from the blog posts. The main difference between a blog post page and a "subpage", as it's described here, is a blog post page as a sidebar whereas a subpage does not.

### Pare and Flourish Landing Page

The Pare and Flourish landing page, or home page, contains links to every blog post to date. To access older blog posts you can click a button labeled "Click here to load more blogs!". Once a user clicks there older posts are displayed using a combination of AJAX and Jekylls own pagination system. Learn more about this in the development section. 

In addition to blog posts, the landing page contains brief snippets of most subpages including services, events, and #amReading (what Pare and Flourish like to call currently reading). The services section contains some toggle pannels, which are executed using jQuery, concerning Pare and Flourish events. Next to that is an ordered list describing how a typical Pare and Flourish services goes down. Below the services section is the events section which contains a carousel using the slick.js jQuery plugin. Lastly is the #amReading section which contains images of books that Pare and Flourish members are currently reading. Each book when moused over has a nice transition restoring color and correct orientation.

<div class="macbook-pro-mockup">
  <img src="/assets/images/mockups/macbook-pro-mockup.png" alt="MacBook Pro Container">
  <div class="macbook-pro-mockup-content">
    <img src="/assets/images/post-pare-and-flourish-site-evo/pare-and-flourish-home-page.jpg" alt="Snapshot of the Pare and Flourish home page.">
  </div>
</div>

### Pare and Flourish Blog Post

Blogs are like the heart and soul of the Pare and Flourish website. New blogs are added weekly. The design of the blog page has a header that resembles that of the landing page to create a sense of flow and theme. The body of the blogs are fairly ordinary. The blog posts contain a sidebar which has various information about Pare and Flourish.

<div class="macbook-pro-mockup">
  <img src="/assets/images/mockups/macbook-pro-mockup.png" alt="MacBook Pro Container">
  <div class="macbook-pro-mockup-content">
    <img src="/assets/images/post-pare-and-flourish-site-evo/pare-and-flourish-blog-post-page.jpg" alt="Snapshot of a Pare and Flourish blog post page.">
  </div>
</div>

### Pare and Flourish Subpage

Pare and Flourish pages that aren't blog posts and aren't the landing page fall under this category. There are various designs for each of these pages. For example, the #amReading page is just a larger version of said section on the landing page. But the events and services page are primarily text describing the respective page followed by a way to purchase the service or reserve a seat. Below is a snapshot of the about page titled, Start Here.

<div class="macbook-pro-mockup">
  <img src="/assets/images/mockups/macbook-pro-mockup.png" alt="MacBook Pro Container">
  <div class="macbook-pro-mockup-content">
    <img src="/assets/images/post-pare-and-flourish-site-evo/pare-and-flourish-sub-page.jpg" alt="Snapshot of a Pare and Flourish sub page.">
  </div>
</div>

## Development

You can find the <a href="https://github.com/mtlong29/pareandflourish_site">Pare and Flourish source code</a> on GitHub. There you will find everything needed to get the site up and running. Things that you will need are the basic Jekyll Requirements such as bundler, and various Ruby Gems. You will also need to install the Node Modules specified in the package.json file.