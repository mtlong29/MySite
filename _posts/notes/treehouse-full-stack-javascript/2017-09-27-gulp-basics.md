---
layout: article

permalink: /notes/gulp-basics/

title: "Gulp Basics"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Gulp.js is a JavaScript taskrunner that allows you to automate important aspects of your development workflow. With Gulp you can do things like minify and concatenate JavaScript, compile Sass to css, and loads of other common tasks. Additionally, Gulp comes with a built-in development server making it a complete, end to end workflow automation tool for development and deployment."

categories: notes

date: 2017-09-27
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

To install gulp you would type `npm install gulp --save-dev`. The `--save-dev` makes it a devDependency. This would be useful because gulp is only needed in development.

You can install Gulp globally by typing `npm install -g gulp`.

## Your First Gulp Task

You can technically name a gulp file whatever you like. However, it is common for it to be named gulpfile.js because Gulp automatically looks for this file.

The first thing you should add to this file is `use strict`. This statement causes the node engine to run the file in a strict intrepretation of the JavaScript.

Next you should create a gulp variable and require gulp such as `var gulp = require('gulp');`.

The final thing that gulp needs is to define a task. This is done using the gulp task() method. The task manager will recieve the name of a task as the first parameter. The next is an anomoyous function. The anonymous function is where your task is entered. For example, you could log something out to the console. This looks like the following:

{% highlight javascript linenos %}
'use strict';

var gulp = request('gulp');

gulp.task('hello', function() {
  console.log('Hello!');
});
{% endhighlight %}

You would run this task by typing `gulp hello` in the console. However, you can setup a default task enabling you to simply type `gulp` in the console. This looks like the following:

{% highlight javascript linenos %}
'use strict';

var gulp = request('gulp');

gulp.task('hello', function() {
  console.log('Hello!');
});

gulp.task('default', ['hello'], function() {
  console.log('This is the default task!');
})
{% endhighlight %}

Note that the second parameter is an array of all the tasks you want to run. After these run the default task is run.

## Using Third Party Gulp Libraries

There is a ton of community support for Gulp. You can find a Gulp plugin for most of the things you can dream up (and some you never would have imagined..!).

Most of the work you'll do will require you to plugin node modules. In other words you should very rarely have to make a task from scratch.

## Concatenating Files with "gulp-concat"

Gulp concat combines files such as a bunch of CSS or JS files into one file. 

To start you would install gulp-concat. This can be done by typing `npm install gulp-concat --save-dev`.

Once the package is installed you must add the gulp concat module by requiring it by typing `var concat = require('gulp-concat')`.

You will then need to use the `.pipe()` method. This sends the readable stream of data to our concat task. And in this case, the fact that the method is named `.pipe()` is super handy since this is a great way to think about what is happening. The concat task takes a string parameter, which will be the name of the file we create. In this example it is `app.js`. Now finally, this is piped, using `pipe()`, to its destination using the `gulp.dest()` method. The `gulp.dest()` method is the one that takes a readable stream of data and actually writes it. This looks like the following:

{% highlight javascript linenos %}
'use strict';

var gulp = request('gulp'),
  concat = require('gulp-concat');

gulp.task('concatScripts', function() {
  gulp.src([
    'js/jquery.js', 
    'js/sticky/jquery.sticky.js', 
    'js/main.js'])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('js'));
});

gulp.task('default', ['hello'], function() {
  console.log('This is the default task!');
})
{% endhighlight %}

Don't forget that the order of the scripts must be loaded appropriately. For example, jQuery must be loaded before a jQuery plugin.

You would run the above task from the console by typing `gulp concatScripts`.

Question: Concatenating all of a page's JavaScript files into one file, has performance benefits for which of the following reasons:

Answer: Browser's can make a request for one file much faster than multiple requests.

Question: Which of the following is the correct syntax for requiring the gulp-concat node module?

Answer: `var concat = require('gulp-concat');` and `var gulpConcat = require('gulp-concat');`.

Question: The `gulp.src` method can take a string or an `array` as it's first parameter.

Answer: True

Question: The order you provide files to `gulp.src` does not matter.

Answer: False

Question: Gulp plugins are installed with the "gulp plugin manager".

Answer: False

## Minifying JavaScript Files With "gulp-uglify"

Minifying JavaScript files is a process of compression that can make application function faster and better in production environments. With Gulp minification it's easy.

To install the gulp-uglify node module you type `npm install gulp-uglify --save-dev`. Don't forget the `--save-dev` flag.

First, go to your gulp file and require gulp-uglify by typing `var uglify = require('gulp-uglify');`.

Next, you will create a gulp task like before. In the anonymous function you'll create you will choose the `gulp.src()` file. This can be the file that is concatonated using the gulp-concat module. This method will get piped to uglify and then piped to the destination similar to the concatScripts. See below:

{% highlight javascript linenos %}
'use strict';

var gulp = request('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify');

gulp.task('concatScripts', function() {
  gulp.src([
    'js/jquery.js', 
    'js/sticky/jquery.sticky.js', 
    'js/main.js'])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', function() {
  gulp.src('js/app.js')
  .pipe(uglify())
  .pipe(gulp.dest('js'));
});

gulp.task('default', ['hello'], function() {
  console.log('This is the default task!');
})
{% endhighlight %}

To run this task you would type `gulp app.js`. As you can see the file was overridden the original app.js. If you want to keep the original you are going to want to rename the file as it's minified, or renaming the file in the same gulp task where i'm minifying it.

There is another plugin for this called `gulp-rename`.

## Renaming Files with "gulp-rename"

First you will want to install it using npm. Don't forget the dev dependency part. 

{% highlight javascript linenos %}
'use strict';

var gulp = request('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

gulp.task('concatScripts', function() {
  gulp.src([
    'js/jquery.js', 
    'js/sticky/jquery.sticky.js', 
    'js/main.js'])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', function() {
  gulp.src('js/app.js')
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('js'));
});

gulp.task('default', ['hello'], function() {
  console.log('This is the default task!');
})
{% endhighlight %}

This will create a new file called app.min.js. Which means you can code on the original app.js file but app.min.js will be used in production.

Question: Gulp won't overwrite files when the file stream is output using gulp.dest.

Answer: False

Question: Picking good variable names for "required" node-modules is not important, since it is obvious what they are named when they are assigned in the top of the file.

Answer: False

## Turn Sass Into CSS, Automatically

The downside of Sass is that it's not read by the browser, and therefore has to be compiled into CSS. Gulp makes this easy, and lightning fast so that you can focus on writing Sass and not wasting your time compiling it.

The gulp module that will do this for us is called gulp-sass. As always to install this run `npm install gulp-sass --save-dev`.

Next, you will require it in your gulp file. You will then include the sass file that has all of your other partials importent. For the following example, that file is called `main.scss`.

{% highlight javascript linenos %}
'use strict';

var gulp = request('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass');

gulp.task('concatScripts', function() {
  gulp.src([
    'js/jquery.js', 
    'js/sticky/jquery.sticky.js', 
    'js/main.js'])
  .pipe(concat(app.js))
  .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', function() {
  gulp.src('js/app.js')
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
  gulp.src(main.scss)
  .pipe(sass())
  .pipe(gulp.dest('css'))
});

gulp.task('default', ['hello'], function() {
  console.log('This is the default task!');
})
{% endhighlight %}

As before, you can run this task by typing `gulp compileSass` in the console.

## Add Source maps to Your Sass Using "gulp-sourcemaps"

When working with Sass, your source files are those individual Sass files -- the ones you edit and change in your text editor. But what you see in the browser, is the finished, compiled CSS file. This means that when you're debugging a CSS problem in the bwoser, you're not looking at the original source file. That's a problem. Fortunately, a "source map" solves this problem by literally mapping output in the compiled file back to the source files it came from.

Baiscally, a source map lets you see Sass in the inspector. It will show you sass even though it's css. Long story short, source maps save you time and frustration.

To use source maps you will use the source maps module which is called gulp-sourcemaps. To install type `npm install gulp-sourcemaps --save-dev`. Next, require it by typing `var maps = require('gulp-sourcemaps');`.

{% highlight javascript linenos %}
'use strict';

var gulp = request('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps');

gulp.task('concatScripts', function() {
  gulp.src([
    'js/jquery.js', 
    'js/sticky/jquery.sticky.js', 
    'js/main.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', function() {
  gulp.src('js/app.js')
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
  gulp.src(main.scss)
  .pipe(maps.init())
  .pipe(sass())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('css'))
});

gulp.task('default', ['hello'], function() {
  console.log('This is the default task!');
})
{% endhighlight %}

The `./` path means it is relative to the `gulp.dest('css')` directory.

## Adding Source maps for JavaScript using "gulp-sourcemaps"

The same thing can be done for JavaScript. This makes it easier to debug your JavaScript in a browser.

{% highlight javascript linenos %}
"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps');

gulp.task("concatScripts", function() {
    gulp.src([
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", function() {
	gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
  gulp.src("scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('css'));
})

gulp.task("default", ["hello"], function() {
    console.log("the default task!!!!");
});
{% endhighlight %}

Question: Gulp can compile Sass using built in method.

Answer: False

Question: In order to add source maps to my Sass, I can use the following node module:

Answer: `gulp-sourcemaps`

Question: The best way to write sass is in as few files as possible.

Answer: False

