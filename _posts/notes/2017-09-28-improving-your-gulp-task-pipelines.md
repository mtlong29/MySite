---
layout: article

permalink: /notes/improving-your-gulp-task-pipeline/

title: "Improving Your Gulp Task Pipeline"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "These are notes about ways to make Gulp work even harder. How to run multiple tasks, how to run tasks when files are changed, and difference between using gulp development vs the build pipeline."

categories: notes

modified: 2017-09-28
---

{% include /globalSections/toc.html %}

These are notes about ways to make Gulp work even harder. How to run multiple tasks, how to run tasks when files are changed, and difference between using gulp development vs the build pipeline.

## Original gulpfile.js

{% highlight javascript linenos %}
'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps');

gulp.task('concatScripts', function() {
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

gulp.task('minifyScripts', function() {
	gulp.src('js/app.js')
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

gulp.task("default", ['hello'], function() {
    console.log("the default task!!!!");
});
{% endhighlight %}

## Combining Gulp Tasks

One of the most power aspects of Gulp, is the ability to put multiple tasks together. Doing this allows you, the developer to run a single command, and then have gulp execute multiple tasks for you.

Without combinging tasks you have to type `gulp <taskName>` for every task. Instead you can create a new gulp task naming it build for example. `gulp.task('build', ['concatScripts', 'minifyScripts', 'compileSass']);`. Now, you would run `gulp build` to execute all desired tasks.

{% highlight javascript linenos %}
'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps');

gulp.task('concatScripts', function() {
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

gulp.task('minifyScripts', function() {
	gulp.src('js/app.js')
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

gulp.task('build', ['concatScripts', 'minifyScripts', 'compileSass']);

gulp.task("default", ['hello'], function() {
    console.log("the default task!!!!");
});
{% endhighlight %}

However, there is one major problem! Gulp will run all of these at the same time and some taks that depend on other tasks won't work properly if they aren't done on time.

### Adding a Task as a Dependency

You can add the `concatScripts` task as a dependency for the `minifyScripts` by the following: `gulp.task('minifyScripts', ['concatScripts'], function(){}])`.

You must also add a return statement to the `concatScripts` task or other tasks won't know when it has finished. Without the return statement they will run at the same time still.

Since all of our tasks will be dependencies of oneanother you should add the `return` statement to them all.

Also, since `concatScripts` is a dependency of `minifyScripts` it can be removed from the `build` task.

You can finally add the `build` task to the `default` task and remove the unnecessary anonymous function to clean things up.

{% highlight javascript linenos %}
'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps');

gulp.task('concatScripts', function() {
    return gulp.src([
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
	return gulp.src('js/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
  return gulp.src("scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('css'));
});

gulp.task('build', ['minifyScripts', 'compileSass']);

gulp.task("default", ['build']);
{% endhighlight %}

After all of the above. You can simply run `gulp` in the command line.

Question: Gulp tasks defined as "dependencies" of a task, will run in the order they are defined.

Answer: False

Question: Taks cn depend on other tasks to run.

Answer: True

## Automatically Run Tasks with Gulp's Watch Method

One of the keys to a really efficient development workflow is gulp's built in "watch" method. Gulp can literally watch for files to change. When it detects a fie change, Gulp will run a set of tasks.

To do this you would create a new gulp task. In this example we'll name it `watchSass`. In this function you won't need a `return` statment because it isn't a dependency. 

Next you will use `gulp.watch()` inside your anonymous function. The first argument inside would be the file you want to watch. This could be an array such as `gulp.watch(['sass/app.scss', 'scss/base/_base.scss',...])`. However, this is very time consuming. This is why you would want to use a globbing pattern. This looks like the following: `gulp.watch('scss/**/*.scss')`. This pattern says to look in the sass folder, and all of its sub directories, and then look for any file with the .scss extension.

Finally, the second argument is the tasks that are ran when a change occurs, which needs to be wrapped in an array. This looks like the following: `gulp.watch('scss/**/*.scss', ['compileSass'])`. The full gulpfile will look like the following:

{% highlight javascript linenos %}
'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps');

gulp.task('concatScripts', function() {
    return gulp.src([
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
	return gulp.src('js/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
  return gulp.src("scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('css'));
});

gulp.task('watchSass', function() {
    gulp.watch('scss/**/*.scss', ['compileSass']);
});

gulp.task('build', ['minifyScripts', 'compileSass']);

gulp.task("default", ['build']);
{% endhighlight %}

Question: The "watch" method takes an array of files as a parameter, or which of the following:

Answer: Both a string and an array of globbing patterns

Question: Watch is a gulp task.

Answer: False

## The Build and Development Pipeline

Task runners can do just about anything. Some of the most common uses is for 1) building applications for deployment, and 2) running our application in development.

The last step is to pipe all of the production files into a folder called `dist`. This can be done in the "build" task by adding an anonymous function that returns the source. This looks like the following:

{% highlight javascript linenos %}
'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps');

gulp.task('concatScripts', function() {
    return gulp.src([
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
	return gulp.src('js/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
  return gulp.src("scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('css'));
});

gulp.task('watchSass', function() {
    gulp.watch('scss/**/*.scss', ['compileSass']);
});

gulp.task('build', ['minifyScripts', 'compileSass'], function(){
    return gulp.src(['css/application.css', 'js/app.min.js', 'index.html', 'img/**', 'fonts/**', {base: './'}])
    .pipe(gulp.dest('dist'));
});

gulp.task("default", ['build']);
{% endhighlight %}

Note, without the base option gulp will copy all the files you want into the dist folder however it will not preserve the subdirectories.

## The clean Task

The clean task will clear out files that have been made by gulp that are not needed. To create the clean task you can install the node module del by running `npm install del --save-dev` in the console. Don't forget to require this.

{% highlight javascript linenos %}
'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
   clean = require('del');

gulp.task('concatScripts', function() {
    return gulp.src([
      'js/jquery.js',
      'js/sticky/jquery.sticky.js',
      'js/main.js'
      ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
	return gulp.src('js/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
  return gulp.src("scss/application.scss")
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'));
});

gulp.task('watchSass', function() {
  gulp.watch('scss/**/*.scss', ['compileSass']);
});

gulp.task('clean', function() {
  del(['dist', 'css/application.css*', 'js/app.*.js*']);
});

gulp.task('build', ['minifyScripts', 'compileSass'], function(){
  return gulp.src(['css/application.css', 'js/app.min.js', 'index.html', 'img/**', 'fonts/**', {base: './'}])
  .pipe(gulp.dest('dist'));
});

gulp.task("default", ['clean'], function() {
  gulp.start('build');
});
{% endhighlight %}

Note that the default task has been changed by adding the clean task as the second parameter and creating a anonymous function that contains `gulp.start()`. `gulp.start()` has changed in Gulp 4. See Gulp docs <a href="https://github.com/gulpjs/gulp/tree/4.0">here</a>.

Question: A "clean" task is used to do which of the following:

Answer: Delete files that were created by a previous gulp task.

Question: Development is iterative, and the most important thing for developers is to quickly see their changes. However, in a production environment things like file size, number of files served, and other ____ are incredibly important.

Answer: Optimizations

Question: The `gulp.source` method has a base option, that allows you to preserve the directory structure of the files you are introducing to the stream.

Answer: True

Question: Gulp is great for build and deployment of your application, as well as automating your ____ workflow.

Answer: Development

Question: The `gulp.start` method is a well documented, and wildely used part of gulp.

Answer: False

## The Development Pipeline in Depth

You wouldn't want to combine the files to watch and the tasks to run all in one `gulp.watch` method because many tasks would be running that aren't necessary. Therefore, it's best to break it up like below.

{% highlight javascript linenos %}
'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
   clean = require('del');

gulp.task('concatScripts', function() {
    return gulp.src([
      'js/jquery.js',
      'js/sticky/jquery.sticky.js',
      'js/main.js'
      ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
	return gulp.src('js/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
  return gulp.src("scss/application.scss")
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'));
});

gulp.task('watchFiles', function() {
  gulp.watch('scss/**/*.scss', ['compileSass']);
  gulp.watch('js.main.js', ['concatScripts']);
});

gulp.task('clean', function() {
  del(['dist', 'css/application.css*', 'js/app.*.js*']);
});

gulp.task('build', ['minifyScripts', 'compileSass'], function(){
  return gulp.src(['css/application.css', 'js/app.min.js', 'index.html', 'img/**', 'fonts/**', {base: './'}])
  .pipe(gulp.dest('dist'));
});

gulp.tase('serve', ['watchFiles']);

gulp.task("default", ['clean'], function() {
  gulp.start('build');
});
{% endhighlight %}

## Where to next?

There are many possibilities with Gulp.