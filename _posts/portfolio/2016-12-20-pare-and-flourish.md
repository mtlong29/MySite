---
layout: article

permalink: /portfolio/pare-and-flourish/

categories: portfolio

title: "Pare and Flourish"

subtitle: "Web Development"

excerpt: "It has been a dream of two friends of mine, Katie and Skylar, to create a blog. This post documents the journey."

date: 2016-12-20

modified: 2017-08-11

image: 
  header: pandf-site.jpg
  teaser: pandf-site.jpg
  
tags: [web development, web design, html, scss, javascript, jquery, graphic design, photoshop, jekyll, bootstrap]

featured: true
---
{% include /globalSections/toc.html %}

<a href="http://www.pareandflourish.com/">Pare and Flourish</a> is a personal and professional growth blog dedicated to living an authentic lifestyle. Ready to take a realistic approach to self-improvement? Flourish with us!

## Design
Design and development of this site began mid september. Below are screenshots of the site at the times listed.

### Evolution One (October 12, 2016)
At this point the website has been in development for a couple weeks. Katie and Skylar have been writing a few posts ready to go for launch. 

<div class="scroll-box">
    <img src="/assets/images/post-pare-and-flourish-site-evo/evo1.jpg">
</div>

### Evolution Two (December 20, 2016)
The site was launched October 26th. Over the course of the last couple months many changes have been made. Examples of said changes are new background, new google and amazon ads, new metadata, pinterest pins and other social media tools, and updated navigation bar.

<div class="scroll-box">
    <img src="/assets/images/post-pare-and-flourish-site-evo/evo2.jpg">
</div>

### Evolution Three (April 22, 2017)
A lot has happened to both the sites appearance and functionality since evolution two. For starters I now use a combination of "AJAX" and jekylls built in pagination tools to load additional posts when the user clicks the "load more posts" button at the bottom of the page. When the user clicks this button 6 posts are loaded. These six posts actually come from the mentioned built in jekyll pagination system. In other words it loads in the somewhat hidden page `http://www.pareandflourish.com/blog/page2/` followed by `http://www.pareandflourish.com/blog/page3/` and so on. This sped the load speed of the homepage significantly. This is done using the following javascript.

{% highlight javascript %}
$(document).ready(function () {
	$(".loadMore").click(loadMorePosts);
	function loadMorePosts() {
		var _this = this;
		var $blogContainer = $("#blogContainer");
		var nextPage = parseInt($blogContainer.attr("data-page")) + 1;
		var totalPages = parseInt($blogContainer.attr("data-totalPages"));
		$(this).addClass("loading");
		$.get("/blog/page" + nextPage, function (data) {
			var htmlData = $.parseHTML(data);
			var $articles = $(htmlData).find("article");
			$blogContainer.attr("data-page", nextPage).append($articles);
			if ($blogContainer.attr("data-totalPages") == nextPage) {
				$(".loadMore").remove();
			}
			$(_this).removeClass("loading");
		});
	}
});
{% endhighlight %}

Another functionality update i'm quite fond of is the new location for the navbar. The navbar is now located under the header image or the banner image on the home page. This is done using the following javascript.

{% highlight javascript%}
$(document).ready(function () {
	var stickyNavbar = $('.navbar').offset().top;
	$(window).scroll(function () {
		if ($(window).scrollTop() > stickyNavbar) {
			$('.navbar').addClass('navbar-fixed-top');
		} else {
			$('.navbar').removeClass('navbar-fixed-top');
		}
	});
});
{% endhighlight %}

<div class="scroll-box">
    <img src="/assets/images/post-pare-and-flourish-site-evo/evo3.jpg">
</div>

### Evolution Four (May 13, 2017)
Both a lot and not a lot has happened since the last evolution. The main changes are removal of color during our identiy crisis, new images (used all over the site now), and removal of that ugly dark footer. Functionality of the site hasn't changed much either. Therefore, the only updates are styling related.

<div class="scroll-box">
    <img src="/assets/images/post-pare-and-flourish-site-evo/evo4.jpg">
</div>

### Evolution Five (July 9, 2017)
My life had calmed down around this period so I had plenty of time to make changes to the site. As you can see it has gone through drastic changes. Changes such as a new blog tile layout and styling, adding content to the homepage other than said blog tiles such as a reading list and services (more to come), new fully responsive navigation bar, and a new banner image. Oh, and say hello to our new light purple color #e7dff0!

<div class="scroll-box">
    <img src="/assets/images/post-pare-and-flourish-site-evo/evo5.jpg">
</div>

## Development (CSS and HTML)
The source code of www.pareandflourish.com can be found <a href="https://github.com/mtlong29/pareandflourish_site">here</a>.

## What I learned
This site uses Bootstrap, Jekyll, Sass, and others.

<a href="http://getbootstrap.com/">Bootstrap</a> is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web. Basically makes front-end web development faster and easier. In other words bootstrap is meant for web developers of all skill levels. I decided it would be a good idea to gain some more experience using this framework.

<a href="https://jekyllrb.com/">Jekyll</a> is a tool that builds static websites from dynamic components. One of my favorite features is the development environment.

<a href="http://sass-lang.com/">Sass</a>, or Syntactically Awesome StyleSheets,is an extension of CSS. Sass takes what would be a complicated stylesheet and makes it readable. This is mainly done by partials, nesting, and inline imports. In the end of the day you can compile your Sass files to a basic CSS file making it compatible everywhere CSS is.