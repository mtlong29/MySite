---
layout: sitemap

permalink: /sitemap/

title: "Sitemap"

date: 2014-12-26

modified: 2016-08-07

excerpt: "A visual sitemap of all the pages on mtlong.me"
---

A hierarchical breakdown of all the sections and pages (except the secret ones.. <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">of course</a>) found on the site.

<div class="sitemap">

  <ul id="primaryNav" class="col5">
    <li id="home"><a href="/">Home</a></li>
    <li><a href="/about/">About</a></li>
    <li><a href="/resume/">Resume</a></li> 
    <li><a href="/tag/">Posts By Tag</a>
      <ul>
        {% assign tags_list = site.tags | sort %}  
        {% for tag in tags_list %} 
          <li><a href="/tag/{{tag[0] | replace:' ','-' | downcase}}/">{{tag[0]}}</a></li>
        {% endfor %}
      </ul>
    </li>
    <li><a href="/blog/">Blog</a>
      <ul>
        {% for post in site.categories.blog %}
          <li><a href="{{post.url}}">{{post.title}}</a></li>
        {% endfor %}
      </ul>
    </li>
    <li><a href="/portfolio/">Portfolio</a>
      <ul>
        {% for post in site.categories.portfolio %}
          <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endfor %}
      </ul>
    </li>
  </ul>
  
</div>

