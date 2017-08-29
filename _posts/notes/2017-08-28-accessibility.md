---
layout: article

permalink: /notes/accessibility/

title: "Accessibility"

categories: notes

modified: 2017-08-27

featured: true

published: true
---

{% include /globalSections/toc.html %}

## Web Accessibility

Web accessibility is typically defined as making web content usable for people with disabilities. This is the definition we'll focus on, however, there are broader considerations to be made.

People typically talk about extremely disabilities, but there are many people who have mild problems with viewing content on the web.

There could be web browsers built on devices that aren't thought of now. For example, there could be a web browser built on refridgerators one day.

Search spiders crawl the web searching for links, keywords, headers, and other symantic tags. This is why it's beneficial to add tags to your markup that you don't initially see benefits from. This is called SEO or search engine optimization.

It's important to create a website that EVERYONE can access.

## Why Accessibility?

There are lots of people in the world and there are many different ways people experience a website.

For example, tabular data can be difficult for screen readers. Screen readers may read these out as a list instead of tabular data.

### Reasons for Accessibility

<ol>
  <li>Accessibility is the right thing to do.</li>
  <li>Accessibility leads to good practice.</li>
  <li>Accessibility helps to avoid legal concens.</li>
</ol>

### Legality

Some countries require that your website be accessible for everyone. There has even been lawsuits where involving someone who couldn't experience a website because it wasn't accessible to them.

## Vision

There are numerous types of vision impairments beyond just blindness. For example, color blindness is mild but extremely common and can be assisted with great design. (red green color blindness affects 7% male population in United States).

Poor eyesight is a disability that can be corrected with corrective glasses. However, there is also low eyesight. Low eyesight cannot be corrected with corrective glasses. Therefore, there are many things that can be avoided or done to help. Such as avoiding scrolling and flashing text, avoiding small text, avoiding text on images that can't be resized, and creating high contrast between text and the background.

### Screen Readers

Users with low vision and complete vision loss will typically rely on a class of software called screen readers. Coding clean and semantic markup makes it easier for users to consume content in this way.

A screen reader is a software that uses a computer animated voice to read text on a page. Screen readers read alt attributes. If there is a caption under the image you should only add `alt` with no value or else it would be redundant.

## Hearing

The explosion of video nad audio content on the web means that consideration need to be made for people with hearing impairments. For example, videos should always be captions, and for audio content, a transcript should be provided.

<ol>
  <li>Your site shouldn't rely on audio</li>
  <li>Set audio levels carefully and consistently</li>
  <li>Allow for mono audio, if possible</li>
</ol>

## Mobility and Cognition

People with various types of motor impairments may have difficulty using a mouse and keyboard. Additionally, young children or people with cognitive disabiltie s may find it easier to navigate a deculttered verson of a web page.

Give people a reasonable amount of time for people to interact with your site.

Minimize the number of steps that are needed for a user to accomplish a task.

## Screen Readers

People with vision impairments ranging from mild conditions to full blindness, may make use of a special class of software known as screen readers. A screen reader synthesizes words on the screen into spoken text.

VoiceOver is a built in OS X screen reader.

## Forms

HTML forms are the primary method of data entry within a web app. This critical component is decent on its own, but there are some enhancements that can be made to make them more accessible.

### Tab Index

`tabindex="integer"` is a attribute for setting what will be tabbed to first.

## Tables, Charts, and Graphs

A typical web app often needs to display data in tabular form. Normal tables can be difficult for screen readers to navigate, but with some extra markup, the accessibility of tables can be improved.

### Caption and Summary

The caption tag `<caption>` can be used to add a "title" for the table. This should always come after the `<table>` tag. The `<summary>` tag won't be displayed but a screen reader will read it as a description or summary of the table data.

### Scope

The `scope` attribute can be used to indicate what the table header is a header for `col` or `row`.

### Charts and Graphs

Sometimes a table doesn't quite tell the whole story, and a chart or graph is necessary. Many charting libraries use images or proprietary plugins. With some HTML and CSS, simple graphcs can be created while still maintaining good markup.
