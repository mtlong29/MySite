---
layout: tag

permalink: /tag/

title: "Tag Index"

date: 2016-02-08

excerpt: "An archive of posts sorted by tag frequency."
---

{{page.excerpt | markdownify}}

<ul class="tagList">
  {% assign sorted_tags = site.tags | sort_tags_by_name %}
  {% for tag in sorted_tags %}
    <li><a href="/tag/{{tag[0] | replace:' ','-' | downcase}}/" class="tagItem"><span class="tagName">{{tag[0]}}</span> <span class="tagCount">{{ tag[1] }}</span></a></li>
  {% endfor %}
</ul>
