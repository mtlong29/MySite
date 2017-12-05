---
layout: article

permalink: /notes/using-npm-as-a-task-runner/

title: "Using npm as a Task Runner"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "There are many task running tools such as gulp and grunt, but you can also use npm for running basic tasks. npm is often the better option because it takes far less time to setup."

categories: notes

date: 2017-09-26
---

{% include /globalSections/toc.html %}

There are many task running tools such as gulp and grunt, but you can also use npm for running basic tasks. npm is often the better option because it takes far less time to setup.

## What is a Task?

A task is something that you need to do. If you want to perform that task over and over again, you'll save yourself a lot of time if you automate the process.

Common web development tasks include running test suites. Compiling Sass, TypeScript, and CoffeeScript files. Downloading assets of files from an external source that your package needs. Starting a web server. And starting a worker that goes through a queue of jobs, like sending out emails or push notifications. 

Popular jump script build tool like grunt and gulp are good for complex projects. But you don't alwaks need that power or want to bother with the time consuming setup process that they require. You can always turn to a full feature build system later as your project evolves.

npm tasks are called scripts, and they're added to the scripts property of a project's package.json file. Tasks have a name and a command, which is simply a string that's executed on the operating system's command line when the task is run. For example, you could echo out a message to the terminal, start up a web server, or use a command line command like `mv` to move file, or `cp` to copy files. 

## Creating a Built in Task

npm has a number of built in tasks. One example is `test`. 

You're often encouraged to install test frameworks and build systems globally with the `-g` flag. But that can be a little overkill if you're working on different projects with potentially different versions 

Because `test` is a built-in task, you can simply type `npm test`. If it wasn't a built in task you would have to type `npm run test`.

## Creating Your Own Arbitrary Tasks

npm is flexsible enough to allow you to create your own tasks.

### uglifyjs

Uglifyjs is a JavaScript parser, minifier, compressor or beautifier toolkit. 

To install uglify you would enter `npm install uglify-js` and you would add the `-g`. Learn more about uglify <a href="https://www.npmjs.com/package/uglifyjs">here</a>.

To use uglify in the command line, we type `node_modules/.bin/uglifyjs src/models/* src/<your file> -m -c -o <folder>/<file.js>`. The `-m` flag mangles or reduces the name of some of the variables in the code, and the `-c` flag combines the code into a single file, and the `-o` flag is the output file.

Manually typing in that command every time is time consuming and easily breakable with typos. Therefore, you can enter this into your `"scripts"` key in your package.json file as `"uglify"` and then copy that line there. You can then run the command by typing `npm run uglify`. The package.json file looks like the following:

{% highlight javascript linenos %}
{
"name": "dice_simulator_2015",
"version": "1.0.0",
"description": "",
"scripts": {
  "test": "mocha",
  "uglify": "uglifyjs src/models/* src/<your file> -m -c -o <folder>/<file.js>"
},
  "author": "Matthew Long"
  "license": "MIT",
  ...
}
{% endhighlight %}
  
You can combine tasks by adding a "build" key (for example) to your scripts. 

{% highlight javascript linenos %}
{
"name": "dice_simulator_2015",
"version": "1.0.0",
"description": "",
"scripts": {
  "test": "mocha",
  "uglify": "uglifyjs src/models/* src/<your file> -m -c -o <folder>/<file.js>"
  "build": "npm test && npm run uglify"
},
  "author": "Matthew Long"
  "license": "MIT",
  ...
}
{% endhighlight %}
  
After this you would type `npm run build`.

## npm Default Tasks

There are many more default tasks. You can see them by typing `npm tasks`, or going <a href="https://docs.npmjs.com/misc/scripts">here</a>.