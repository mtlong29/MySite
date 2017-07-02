---
layout: article

permalink: /blog/the-journey-to-automated-deployment/

title: "The Journey to Automated Deployment"

subtitle: "Jekyll"

excerpt: "Manual deployment of websites is a waste of time. In fact doing much of anything these days is a waste of time. Lets automate that."

categories: blog

tags: [jekyll, ruby, web development, automated deployment, automatic deployment, deployment, github]

image:
  header: using-jekyll.jpg
  teaser: using-jekyll.jpg

modified: 2017-06-28

featured: true

published: false
---

{% include /globalSections/toc.html %}

Manual deployment of websites seems like a waste of time. Actually, it is a waste of time. On top of that with automated deployment content will be going live much quicker. Right? Yes. Below is the internets top reasons for automated deployment:

<ol>
	<li>You can release more frequently.</li>
	<li>Deployments become much less error-prone and much more repeatable.</li>
	<li>Manual deployments are slow, neither repeatable nor reliable.</li>
	<li>Quick feedback regarding problems.</li>
	<li>Mitigation of the risk of human error.</li>
</ol>

## The Documentation

When "learning" or approaching something new the first place I go is <a class="fancyLink" href="http://lmgtfy.com/?q=jekyll+documentation+deployment" target="_blank">google</a>, but this time I went to the <a class="fancyLink" href="https://jekyllrb.com/docs/deployment-methods/" target="_blank">Jekyll documentation</a> due to the fact that the repository I have on github isn't exactly the content of the site that's going into the appropriate web root directory, as you likely know. That would be the generated `_site` folder using `jekyll build`.

There are many options. Obviously the easiest is <a href="https://jekyllrb.com/docs/github-pages/" target="_blank">GitHub Pages</a>. However, let's do something slightly more fancy. This leaves many many options such as the following:

<ol>
	<li><a class="fancyLinks" href="http://githooks.com/" target="_blank">Git Hooks</a></li>
	<li><a class="fancyLinks" href="https://ruby.github.io/rake/" target="_blank">Rake</a></li>
	<li><a class="fancyLinks" href="https://rsync.samba.org/" target="_blank">rsync</a></li>
	<li><a class="fancyLinks" href="https://www.aerobatic.com/" target="_blank">Aerobatic</a></li>
	<li><a class="fancyLinks" href="https://travis-ci.org/" target="_blank">Travis CI</a></li>
	<li><a class="fancyLinks" href="https://jenkins.io/" target="_blank">Jenkins</a></li>
</ol>

## And the Winner is... Git Hooks..

Some of these services and/or tools cost money. While I'm sure they're great, I would much rather not spend money to do something I know doesn't require money.

## Automated Deployment Using Git Hooks

- why automated deployment
- difficulties with jekyll
- jekyll documentation
- solutions
