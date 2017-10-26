---
layout: tag

permalink: /tag/

title: "Tag Index"

modified: 2016-02-08T16:17:58-05:00

excerpt: "An archive of posts sorted by tag frequency."

share: false
---

{{page.excerpt | markdownify}}

<ul class="tagList">
  {% assign sorted_tags = site.tags | sort_tags_by_name %}
  {% for tag in sorted_tags %}
    <li><a href="/tag/{{tag[0] | replace:' ','-' | downcase}}/" class="tagItem"><span class="tagName">{{tag[0]}}</span> <span class="tagCount">{{ tag[1] }}</span></a></li>
  {% endfor %}
</ul>
