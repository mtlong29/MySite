---
layout: article

permalink: /notes/gulp-basics/

title: "Gulp Basics"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Gulp.js is a JavaScript taskrunner that allows you to automate important aspects of your development workflow. With Gulp you can do things like minify and concatenate JavaScript, compile Sass to css, and loads of other common tasks. Additionally, Gulp comes with a built-in development server making it a complete, end to end workflow automation tool for development and deployment."

categories: notes

modified: 2017-09-27
---

{% include /globalSections/toc.html %}

Gulp.js is a JavaScript taskrunner that allows you to automate important aspects of your development workflow. With Gulp you can do things like minify and concatenate JavaScript, compile Sass to css, and loads of other common tasks. Additionally, Gulp comes with a built-in development server making it a complete, end to end workflow automation tool for development and deployment.

## Why Gulp?

Gulp is able to automate many common development tasks. In its most basic form it performs tasks for you.

Tasks are typically defined in a JavaScript file, or set of files, this is then called by the Gulp engine. Gulp can run tasks one after the other.

### Quiz:

Question: Gulp is a cool technology, but it has not been adopted by mainstream companies.

Answer: False

Question: Gulp tasks can be defined in multiple files.

Answer: True

Question: Gulp can run tasks serially, one after the other, or a bunch of tasks all at once.

Answer: True

Question: Gulp is a JavaScript task runner.

Answer: True

Question: An example task includes the following:

Answer: compile Sass to CSS, compile CoffeeScript to JavaScript, and concatenate JavaScript.

## Gulp in Action

Gulp can be used to automate any number of common tasks. When you put these tasks together, you are typically doing it in one of two ways, for development or to build your application for deployment.

Obviously, as a developer, you want to focus more on your code and less on the overhead that development involves. Some of this overhead is unavoidable. However, Gulp can automate many of these overheads leaving you with more time to with with what really matters.

Assuming you have Gulp installed on your project you would run the Gulps development server by typing `gulp serve` will start up the Gulp develpment server. You can save yourself time with Gulp by having it automatically refresh the browser when a change is made in your project.

Running `gulp` on its own runs another gulp task that is defined. This is called the default task.

Question: From the console, I use the ____ command to list files in a directory.

Answer: ls

Question: When I run gulp on its own, gulp invokes the ____ task.

Answer: default

Question: As a developer, I want to focus on the following:

Answer: Writing code and solving interesting problems

Question: The ____ is the file that gulp looks for defined tasks in.

Answer: gulpfile.js

Question: Gulp tasks can be defined in multiple files.

Answer: True

## Installing Gulp

Things you need installed:

<ul>
  <li>node</li>
  <li>npm</li>
</ul>

To check if they are installed you can type `which node` and `which npm` in the console. If they are installed it will tell you the path to the node and npm executable. If theyre not installed you can use homebrew (mac) which is an application manager on Mac. To do so simply type `brew install node` in your console.

