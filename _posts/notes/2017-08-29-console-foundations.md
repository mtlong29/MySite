---
layout: article

permalink: /notes/console-foundations/

title: "Console Foundations"

subtitle: "Notes"

excerpt: "Console Foundations"

categories: notes

image:
  header: filler.jpg
  teaser: filler.jpg

modified: 2017-08-29

featured: true

published: true
---

{% include /globalSections/toc.html %}

## Console Introduction

The console is a text-based interface on your computer. It allows you to interact with files, folders and programs using text commands instead of windows, buttons and menus.

It is impossible for developers to avoid the console. And you shouldn't want to. Every operating system uses some sort of console.

The vast majority of servers online use Unix. Darwin is based off of Unix which run on OSX. POSIX (portable operation system interface). This is why mac is so popular to developers. Mac OSX provides a full POSIX compatible enviornment and a finely tuned graphical interface to go with it.

Microsoft windows is not POSIX compatible. This makes windows a less desirable choice when doing web development because it's not compatible with operating systems that we're likely to use on our web servers.

It is a huge value to run and use Unix. Even if you run Windows as your personal computer.

## Learning New Commands

`ls -l` (list files long)
`pwd` (print working directory)

### Tab Completion

When changing directories you can type the beginning of a known directory and hit tab and the console will auto complete. 
