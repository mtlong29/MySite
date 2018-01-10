---
layout: article

permalink: /notes/html-and-markdown/

title: "HTML and Markdown"

subtitle: "Basic Syntax"

excerpt: "HTML (Hypertext Markup Language) is the code that is used to structure a web page and its content. HTML is not a programming language; it is a markup language, and is used to tell your browser how to display the webpages you visit. Markdown is intended to be as easy-to-read and easy-to-write as is feasible. Readability, is emphasized above all else. A markdown-formatted document should be publishable as-is, as plain text, without looking like it's been marked up with tags or formatting instructions. Markdown's syntax is comprised entirely of punctuation characters, which punctuation characters have been carefully chosen so as to look like what they mean."

categories: notes

date: 2017-10-05
---

{% include /globalSections/toc.html %}

***HTML* (Hypertext Markup Language) is the code that is used to structure a web page and its content.** HTML is not a programming language; it is a markup language, and is used to tell your browser how to display the webpages you visit. ***Markdown* is a lightweight markup language with plain text formatting syntax.** It is designed so that it can be converted to HTML.

## HTML

>Hypertext Markup Language is the standard markup language for creating web pages and web applications.

### Basic Structure of an HTML Document

Individual elements are combined to form an entire HTML page. These are "necessary".

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Basic HTML Structure</title>
    <link rel="stylesheet" type="text/css" href="/assets/main.css">
  </head>
  <body>
    <script type="text/javascript" src="/assets/main.js"></script>
  </body>
</html>
```

The `<link>` and `<script>` tags are not necessary, but this is where they are most often found in the basic HTML structure. The HTML syntax of HTML5 requires a DOCTYPE to be specified to ensure that the browser renders the page in standards mode.

### Common Tags Needing Reference

There are many HTML tags. Below are a few that many need looking up:

#### <link>

**`<link>` tags link to external stylesheets as well as other things.** You can use the `<style>` tag to write CSS directly in an HTML document.

```html
<link rel="stylesheet" type="text/css" href="/assets/main.css">
```

#### <script>

**`<script>` tags can be used to link to external JavaScript.** You can also write JavaScript directly between `<script>` tags.

```html
<script type="text/javascript" src="/assets/main.js"></script>
```

### Learn More about HTML

- [MDN HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)

## Markdown

Markdown is intended to be as *easy-to-read* and *easy-to-write* as is feasible. **Readability, is emphasized above all else.** A markdown-formatted document should be publishable as-is, as plain text, without looking like it's been marked up with tags or formatting instructions. 

>**Markdown's syntax is comprised entirely of punctuation characters**, which punctuation characters have been carefully chosen so as to look like what they mean.

### Headings

The HTML `<h1>` through `<h6>` elements represent six levels of section headings. `<h1>` is the highest section and `<h6>` is the lowest.

#### Markdown

```text
# Heading One
## Heading Two
### Heading Three
#### Heading Four
##### Heading Five
###### Heading Six
```

#### HTML

```html
<h1>Heading One</h1>
<h2>Heading Two</h2>
<h3>Heading Three</h3>
<h4>Heading Four</h4>
<h5>Heading Five</h5>
<h6>Heading Six</h6>
```

### Paragraphs and Line Breaks

To create a paragraph just *type with plain text*. To add a line break without the space between the lines *add two spaces* at the end of the line.

#### Markdown

```text
We create paragraphs by typing the way we would in any other program. Just hit return twice to start another paragraph.

Where you see empty space between blocks of text in your Markdown document, you will see empty space separating those blocks of text in your formatted HTML document.

Haikus are easy.  
But sometimes they don't make sense.  
Refrigerator.  
```

#### HTML

```html
<p>We create paragraphs by typing the way we would in any other program. Just hit return twice to start another paragraph.</p>
<p>Where you see empty space between blocks of text in your Markdown document, you will see empty space separating those blocks of text in your formatted HTML document.</p>
<p>Haikus are easy.<br>
But sometimes they don’t make sense.<br>
Refrigerator.</p>
```

#### Rendered HTML

We create paragraphs by typing the way we would in any other program. Just hit return twice to start another paragraph.

Where you see empty space between blocks of text in your Markdown document, you will see empty space separating those blocks of text in your formatted HTML document.

Haikus are easy.  
But sometimes they don't make sense.  
Refrigerator.  

### Emphasis and Bolding

**Bold** and *emphasized* text is a must for styling. Note that it is safer to style using a stylesheet.

#### Markdown

```text
This *works*, to emphasize text.

This **works**, to bold text.

This ***works***, to bold and emphasize text.
```

Note that underscores, `_` can be used in place of asterisks, `*`. However, **`*` is best practice**.

#### HTML

```html
<p>This <em>works</em>, to emphasize text.</p>
<p>This <strong>works</strong>, to bold text.</p>
<p>This <strong><em>works</em></strong>, to bold and emphasize text.</p>
```

#### Rendered HTML

This *works*, to emphasize text.

This **works**, to bold text.

This ***works***, to bold and emphasize text.  

### Blockquote

The HTML `<blockquote>` element indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation.

#### Markdown

```
>There are two ways of constructing a software design.
>
>One way is to make it so simple that there are obviously no deficiencies. And the other way is to make it so complicated that there are no obvious deficiencies.
```

Note that to have multiple lined quotes you must use the `>` symbol on blank lines too.

#### HTML

```html
<blockquote>
  <p>There are two ways of constructing a software design.</p>
  <p>One way is to make it so simple that there are obviously no deficiencies. And the other way is to make it so complicated that there are no obvious deficiencies.</p>
</blockquote>
```

#### Rendered HTML

>There are two ways of constructing a software design.
>
>One way is to make it so simple that there are obviously no deficiencies. And the other way is to make it so complicated that there are no obvious deficiencies.

### Horizontal Rule

The `<hr>` element represents a thematic break between paragraph-level elements (for example, a change of scene in a story, or a shift of topic with a section); historically, this has been presented as a horizontal rule or line.

#### Markdown

```text
___
---
***
```

Note that the **hyphens, `-` are preferred** over underscores, `_`, and asterisks, `*`.

#### HTML

```html
<hr>
<hr>
<hr>
```

#### Rendered HTML

___
---
***

### Lists

Lists are used to group together related pieces of information so they are clearly associated with each other and easy to read. Lists are good from a structural point of view as they help create a well-structured, more accessible, easy-to-maintain document.

#### Markdown

```text
1. House Stark
  - Arya Stark
  - Ned Stark
  - Bran Stark
2. House Lannister
  - Tyrion Lannister
  - Jaime Lannister
3. House Targaryen
  - Daenerys Targaryen
```

Note that you don't even have to keep the numbers in order. Markdown will recognize it is a numbered list and fix the numbers for you. However, keeping the numbers in order makes most sense.

Note that depending on what, where how, etc.. the Markdown is being rendered it is possible to go deeper in nesting. Note that you can combine lists with strong and emphasized text too by typing `- Tyrion *Lannister*`, for example.

#### HTML

```html
<ol>
  <li>House Stark
    <ul>
      <li>Arya Stark</li>
      <li>Ned Stark</li>
      <li>Bran Stark</li>
    </ul>
  </li>
  <li>House Lannister
    <ul>
      <li>Tyrion Lannister</li>
      <li>Jaime Lannister</li>
    </ul>
  </li>
  <li>House Targaryen
    <ul>
      <li>Daenerys Targaryen</li>
    </ul>
  </li>
</ol>
```

#### Rendered HTML

1. House Stark
  - Arya Stark
  - Ned Stark
  - Bran Stark
2. House Lannister
  - Tyrion Lannister
  - Jaime Lannister
3. House Targaryen
  - Daenerys Targaryen

### Code

Highlight code is a must whenever adding code snippets to a site. You can highlight code with the backtick character, <code class="highlighter-rouge">`</code>. Code snippets can be added inline and block level.

#### Markdown

{% highlight text %}
To install the latest version of NPM, you can type, `npm install npm@latest -g`.

```javascript
let exampleFunction = () => {
  let foo = 'foo';
  let bar = 'bar';

  return foo + bar;
}
```
{% endhighlight %}

Note that you can use `{% raw %}{% highlight javascript linenos %}{% endraw %}` with Jekyll to highlight code. This actually provides you with more control that the Markdown method.

One benefit of using the Markdown method is that it can help text editors recognize code and can even highlight your code inside a text editor. Therefore, in portfolio entries use the Jekyll highlight method, but in notes entries use the markdown highlight method. 

Either way, many code centric sites support Markdown which makes this method of highlight code very common.

#### Rendered HTML

To install the latest version of NPM, you can type, `npm install npm@latest -g` in the console.

```javascript
let exampleFunction = () => {
  let foo = 'foo';
  let bar = 'bar';

  return foo + bar;
}
```

### Links

There are numerous ways to use Markdown to add a link to a page.

#### Markdown

```text
[Google](https://www.google.com/)
[Google](https://www.google.com/ "Reference link to Google")
[Reddit][1]
[Twitter][2]

[1]: https://www.reddit.com/ 
[2]: https://twitter.com/?lang=en "Reference link to Twitter"
```

Note that adding a title is optional.

#### HTML

```html
<p>
  <a href="https://www.google.com/">Google</a>
  <a href="https://www.google.com/" title="Reference link to Google">Google</a>
  <a href="https://www.reddit.com/">Reddit</a>
  <a href="https://twitter.com/?lang=en" title="Reference link to Twitter">Twitter</a>
</p>
```

### Images

Images work a lot like links. Think of images in a Markdown document as being referenced by your document, rather than embedded in your document.

#### Markdown

```text
![Mini "Ant Man"](https://raw.githubusercontent.com/mtlong29/images/master/mini-ant-man.png)

[![Mini "Hulk"](https://raw.githubusercontent.com/mtlong29/images/master/mini-hulk.png)](https://raw.githubusercontent.com/mtlong29/images/master/mini-hulk.png)

![Mini "The Thing"](https://raw.githubusercontent.com/mtlong29/images/master/mini-the-thing.png "Image of a mini Thing")
```

#### HTML

```html
<p>
  <img src="https://raw.githubusercontent.com/mtlong29/images/master/mini-ant-man.png" alt="Mini &quot;Ant Man&quot;">
</p>
<p>
  <a href="https://raw.githubusercontent.com/mtlong29/images/master/mini-hulk.png">
    <img src="https://raw.githubusercontent.com/mtlong29/images/master/mini-hulk.png" alt="Mini &quot;Hulk&quot;">
  </a>
</p>
<p>
  <img src="https://raw.githubusercontent.com/mtlong29/images/master/mini-the-thing.png" alt="Mini &quot;The Thing&quot;" title="Image of a mini Thing">
</p>
```

Note that Markdown puts `<p>` tags around many elements.

#### Rendered HTML

![Mini "Ant Man"](https://raw.githubusercontent.com/mtlong29/images/master/mini-ant-man.png)

[![Mini "Hulk"](https://raw.githubusercontent.com/mtlong29/images/master/mini-hulk.png)](https://raw.githubusercontent.com/mtlong29/images/master/mini-hulk.png)

![Mini "The Thing"](https://raw.githubusercontent.com/mtlong29/images/master/mini-the-thing.png "Image of a mini Thing")

### Markdown Flavors

There are many different versions of Markdown; and there are also many additions to Markdown that various people use. However, vanilla Markdown is generally safe to assume wherever Markdown is used.

Obviously, before writing Markdown somewhere make sure there is a parser to translate the Markdown into HTML tags.

### Learn More About Markdown

- [Daring Fireball Markdown Guide](https://daringfireball.net/projects/markdown/)
- [devhints.io Markdown Page](https://devhints.io/markdown)
- [HTML Syntax Notes](/notes/html/)
- [GitHub Tutorial on Markdown](https://guides.github.com/features/mastering-markdown/)