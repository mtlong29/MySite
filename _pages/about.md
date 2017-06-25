---
layout: article

permalink: /about/

title: "About"

date: 2014-06-01

modified: 2016-06-20

excerpt: "Matthew Long is..."

image:
  header: about-me.jpg
---

{% include /globalSections/toc.html %}

## Who Am I?

Hello, my name is Matthew Long, and I don't update this page near as often as I would like. I graduated from the University of Kentucky with an engineering degree and now work as a web developer.

## Contact

You can contact me in a number of ways. The easiest is by email at <a class="fancyLink" href="mailto:long.matthew29@gmail.com">long.matthew29@gmail.com</a>. You can find me on twitter at <a class="fancyLink" href="https://www.twitter.com/MaLong29" target="_blank">@MaLong29</a> and LinkedIn at <a class="fancyLink" href="https://www.linkedin.com/in/mtlong29" target="_blank">mtlong29</a>.

## About the Site

This site began as a little project of mine of which was originally going to take minimal time. However, it quickly became an addiction, and for a while a huge time sink, when I decided to make it a portfolio and/or blog.

### Content

The content on this site is all my own, unless otherwise stated. It can somewhat be broken down into two categories. One focuses on my career and accomplishments (<a class="fancyLink" href="{{site.url}}/portfolio/">portfolio</a> and <a class="fancyLink" href="{{site.url}}/resume/">resume</a>) while the other focuses on blog posts ranging from web development to programming and sometimes (actually.. very rarely) random relevant thoughts (<a class="fancyLink" href="{{site.url}}/blog/">blog</a>). The blog section of this site has remained barren for some time now. It's quite a sad blog, really.

### Jekyll

The first version of this site was created using a WordPress theme. I never feel like I have enough control over a site when using WordPress. So why would I use that for my own site? I then decided to play with the new trend known as <a class="fancyLink" href="http://jekyllrb.com/" target="_blank">Jekyll</a>. Jekyll is a static site generator. Basically, it takes your dynamic content and compiles it into a static site ready to be uploaded.

Jekyll has become incredibly popular for many reasons. One thing I love about jekyll is its built-in development server that allows you to preview the site on a browser locally. This eliminates the need for MAMP or whatever localhost server environment you use. This is done by typing the following command:

{% highlight bash %}
jekyll serve
=> A development server will run at http://localhost:4000/
{% endhighlight %}

If you use the same Jekyll build on different systems, or it's the first time you're using it; you may need to "reinstall" your gems which can be done in one command:

{% highlight bash %}
bundle exec jekyll serve
=> A development server will run at http://localhost:4000/
{% endhighlight %}

In order to build the site so that it's ready to go live (likely by FTP or <a class="fancyLink" href="https://jekyllrb.com/docs/github-pages/" target="_blank">GitHub pages</a>) instead of "building" a server using `serve` (or `s`) you would use `build` (or `b`). This (both do) generates a `_site` folder found inside your Jekyll directory that you would then place in the appropriate web root directory for your web server. The only real difference between `build` and `serve` is that everywhere you have linked to pages within your site using <a class="fancyLink" href="https://shopify.github.io/liquid/" target="_blank">Liquid</a> syntax for `site.url` for example, will go to localhost instead of your live site url creating many broken links. Broken links to stylesheets and scripts will without a doubt break your site or at least make it so that it's pure HTML. I also have a tendency of deleting the `_site` folder before executing `jekyll build`.

Jekyll is highly customizable. Additional information can be found at <a class="fancyLink" href="{{site.url}}/blog/using-jekyll/">Building and Maintaining a Jekyll Site.

### Sass

<a class="fancyLink" href="http://sass-lang.com/" target="_blank">Sass</a>, or Synthetically Awesome StyleSheets (usually SCSS is my preference), wasn't part of this site in its early days; especially back when this was a WordPress site. However, with more and more CSS piling on itself it was time to get organized. I was experienced and familiar with <a class="fancyLink" href="{{site.url}}/tag/scss/">SCSS</a> before using it for this site, but I am VERY comfortable using it at this point. 

## Hobbies

I have many hobbies ranging from video games to fishing. 

### Video Games

I'm what you would call an avid gamer. Yes, I am very nerdy. I stick to PC gaming for the most part, but I play Playstation too. 

Most games I play are on steam; sometimes I play blizzard games too. My steam account is <a class="fancyLink" href="http://steamcommunity.com/id/Actionhero29/" target="_blank">Actionhero29</a> and my battle.net account is <a class="fancyLink" href="http://us.battle.net/en/" target="_blank">Actionhero#1100</a>. Also, yes. I am aware the name "Actionhero" is pretty lame. It's one of those things where the middle school version of yourself thinks it's so cool. The mid 20's version of you does not, but that mid 20's guy is also somewhat attached to it. 

<figure class="half">
	<a href="/images/page-about/game1.jpg" title="Steam"><img src="/images/page-about/game1.jpg" alt="steam" /></a>
	<a href="/images/page-about/game2.jpg" title="The Witcher 3"><img src="/images/page-about/game2.jpg" alt=""/></a>
</figure>

Some of my favorite games I currently play are <a class="fancyLink" href="http://store.steampowered.com/app/292030/" target="_blank">The Witcher 3: Wild Hunt</a>, <a class="fancyLink" href="http://store.steampowered.com/app/374320/" target="_blank">DARK SOULS III</a>, and <a class="fancyLink" href="http://store.steampowered.com/app/730/" target="_blank">Counter-Strike: Global Offensive</a>. I also love playing indie  games like <a class="fancyLink" href="http://store.steampowered.com/app/105600/" target="_blank">Terraria</a> and <a class="fancyLink" href="http://store.steampowered.com/app/283640/" target="_blank">Salt and Sanctuary</a>.

<figure class="full">
	<a href="/images/page-about/game3.jpg" title="World of Warcraft"><img src="/images/page-about/game3.jpg" alt="World of Warcraft"/></a>
</figure>

During highschool I played <a class="fancyLink" href="http://us.battle.net/wow/en/" target="_blank">World of Warcraft</a> what some would call a crap ton. I was among the top on my server. I multiclassed as hunter, mage, warlock, druid, and at one point a priest. However, my main was a hunter. Just writing this made me nostalgic for the "glory days" of world of warcraft. Simply hasn't been the same since cataclysm was launched.

### Sports

I'm not the most active person around. In fact I spend a lot of my time in my computer chair. However, I do love watching sports. Mainly the NFL and college basketball.

<figure class="half">
	<a href="/images/page-about/sports1.jpg" title="University of Kentucky Basketball"><img src="/images/page-about/sports1.jpg" alt="University of Kentucky Basketball" /></a>
    <a href="/images/page-about/sports2.jpg" title="Dallas Cowboys"><img src="/images/page-about/sports2.jpg" alt="Dallas Cowboys" /></a>
</figure>

My favorite NFL team is the cowboys (unfortunately) and my favorite college basketball team is obviously the University of Kentucky Wildcats. Go CATS!

### Drawing

By drawing I am referring to Photoshop or AutoCAD not pencil and paper. You can see some of the things I have drawn over at my <a class="fancyLink" href="{{site.url}}/portfolio/">portfolio</a> section. These days a lot of what I "draw" becomes a graphic for a website.

## Doggy Named Harley

In early 2016 I adopted a puppy! His name is Harley, but I call him Harlers most of the time. He is a Schnauzer and Lab mix. 

<figure class="half">
	<a href="/images/page-about/harley1.jpg" title="Harlers"><img src="/images/page-about/harley1.jpg" alt="Harlers" /></a>
    <a href="/images/page-about/harley2.jpg" title="Me and Harlers"><img src="/images/page-about/harley2.jpg" alt="Me and Harlers" /></a>
</figure>

He's pretty much the best ever.

