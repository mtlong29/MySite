---
layout: article

permalink: /notes/npm-basics/

title: "npm Basics"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "npm is a command line tool and package manager for JavaScript. It is a great way to install command line tools and make use of other peoples code. There are many task running tools such as gulp and grunt, but you can also use npm for running basic tasks. npm is often the better option because it takes far less time to setup."

categories: notes

date: 2017-09-19
---

{% include /globalSections/toc.html %}

**npm is a command line tool and package manager for JavaScript.** It is a great way to *install command line tools* and make use of other peoples code. There are many task running tools such as *gulp* and *grunt*, but you can *also use npm for running basic tasks*. npm is often the better option because it takes far less time to setup.

## What is npm?

There are over *150 thousand JavaScript packages* such as express, gulp, browserfy, pm2. Developers and companies release open source software that can be used to accomplish many of the routine things when building websites. **npm is most commonly used for installing packages for node.js.**

#### What are Packages?

>Packages are bundles of software. 

npm packages are mainly JavaScript code. npm packages for Node.js projects are called modules. Package and modules are often used interchangeably. **Packages come in all shapes and sizes and are not just for Node.js.** You can use them for anything from jQuery plugins to Grunt or Gulp. You can install tools to compile sass into css, or CoffeeScript into JavaScript. It can install Cordova, ionic used for building rich mobile rich applications. There are more and more examples that can be installed using npm.

#### What Does npm Stand For?

*npm stands for absolutely nothing.* It used to stand for node package manager. However, it now stands for nothing because it can be used to install way more packages.

## How to Find and Choose Packages

The first place to look is the [npm website](https://www.npmjs.com/).

- Popularity on npm (the number of downloads)
- Release Date (the more recent the better)
- Number of Releases (the more frequent the better)
- Passing Tests (if there's tests passing)
- Number of Open Issues (the less the better)
- Popularity on GitHub (the more stars, forks, and watches the better)
- Number of Contributors on GitHub (the more eyes on the code the better)

#### Installing Local Packages

npm is a command line tool so most of the time is spent in the console or *terminal*.  If you ever need help with an npm command such as `install` you can type `npm install -h`. You can install a package locally such as `bcrypt` by typing `npm install bcrypt`. **Packages will often install other necessary packages.** It is perfectly fine to have no idea what they do. All that is needed to know is that they're needed for the package you're interested in. The packages often install into a directory known as `node_modules`. You will almost always leave this directory alone and let npm manage it. If you are working without internet at some point you can look at the readme that is installed for the package you're interested in found in the `node_modules` directory. There is often a special file inside a packages folder known as the `package.json`. **This file tells node which file to include when including this module.**

>Type `npm` and it will show you all the commands you can use with npm.

#### Globally Available Packages

npm packages have more utility than being included locally in a project. There are other packages that can be installed as command line utilities. You can install a package such as *http-server* by typing `npm install http-server -g`. You may run into permission issues, but if you install npm properly you shouldn't get any issues. On a side note, *http-server* is a super handy command line too that can be used to startup a http server gaining access to server tools such as AJAX etc.

## Managing Dependencies in the package.json File

A package.json file is the standard way to manage your dependencies in a project. If you want to share your project on github you wouldn't want to upload all of the packages. Instead you want to upload the package.json dependency manager file. Therefore add `node_modules/` to your `.getignore` file. You create a package.json file by typing `npm init`. It will then walk you through a list of options. Many of which will have default settings found inside `()`. If you type `npm install` without a package it will look for your `package.json` file and install accordingly. You can add development dependencies as well. Development dependencies are dependencies for development but not for actually running the application. For example, to install mocha as a dev dependency you would type `npm install mocha --save-dev`. This will show up in your `package.json` as a different object than your dependencies.

#### Updating Packages with npm

**Everything changes especially with open source packages.** Semantic versioning such as `3.4.2`. **Major releases** would be going from `1.0.2` to `2.0.0`. A **minor release** would be going from `2.5.2` to `2.6.0`. **Patches** such as bug fixes would be going from `1.0.1` to `1.0.2`. A **caret** character `^` in front of a version number instructs npm to install all the future versions that are not considered major versions.  A **tilde** character, `~` in front of a version number instructs npm to install all patch releases up until a minor release. 

#### Uninstalling Packages with npm

To **uninstall** a package such as colors you would type `npm uninstall colors`. However, if you type `npm install` it will reinstall it because it is in your npm dependencies file in package.json. If you want to get rid of it permanently you would use the save flag by typing `npm uninstall colors --save` and finally if you wanted to uninstall it from a dev dependency you would type `npm uninstall colors --save-dev`. If you wanted to uninstall a package globally you would type `npm uninstall colors -g`.

#### Quiz

---

**Question**: Given the following package.json npm could theoretically install which of the following versions of express.

```javascript
{
  "name": "my_awesome_website",
  "version": "1.0.0",
  "description": "My awesome dynamic site",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/chalkers/my_awesome_site.git"
  },
  "keywords": [
    "website"
  ],
  "author": "Andrew Chalkley  (https://teamtreehouse.com/)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/chalkers/my_awesome_site/issues"
  },
  "homepage": "https://github.com/chalkers/my_awesome_site#readme",
  "dependencies": {
    "express": "^4.0.0"
  },
  "devDependencies": {
    "mocha": "~2.2.1"
  }
}
```

**Answer**: 4.5.0

**Question**: Given the following package.json nmp will install the latest _____ release of express.

```javascript
{
  "name": "my_awesome_website",
  "version": "1.0.0",
  "description": "My awesome dynamic site",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/chalkers/my_awesome_site.git"
  },
  "keywords": [
    "website"
  ],
  "author": "Andrew Chalkley  (https://teamtreehouse.com/)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/chalkers/my_awesome_site/issues"
  },
  "homepage": "https://github.com/chalkers/my_awesome_site#readme",
  "dependencies": {
    "express": "^4.0.0"
  },
  "devDependencies": {
    "mocha": "~2.2.1"
  }
}
```

**Answer**: Minor

**Question**: Can you guess the command to check which of the global packages are out of date?

**Answer**: `npm outdated -g`

**Question**: Given the following package.json npm will install the latest ____ release of mocha.

```javascript
{
  "name": "my_awesome_website",
  "version": "1.0.0",
  "description": "My awesome dynamic site",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/chalkers/my_awesome_site.git"
  },
  "keywords": [
    "website"
  ],
  "author": "Andrew Chalkley  (https://teamtreehouse.com/)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/chalkers/my_awesome_site/issues"
  },
  "homepage": "https://github.com/chalkers/my_awesome_site#readme",
  "dependencies": {
    "express": "^4.0.0"
  },
  "devDependencies": {
    "mocha": "~2.2.1"
  }
}
```

**Answer**: Patch

**Question**: Which command will ignore developer dependencies when you install?

**Answer**: NODE_ENV=production npm install

**Question**: What npm command would I use to see if there are any packages that need updating without installing updates.

**Answer**: Outdated

**Question**: Which of these commands could result in the most system wide issues?

**Answer**: `npm update -g`

**Question**: Which npm command do you use to install all dependencies if you have a package.json file?

**Answer**: `install`

**Question**: Given the following package.json npm could theoretically install which of the following versions of mocha.

```javascript
{
  "name": "my_awesome_website",
  "version": "1.0.0",
  "description": "My awesome dynamic site",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/chalkers/my_awesome_site.git"
  },
  "keywords": [
    "website"
  ],
  "author": "Andrew Chalkley  (https://teamtreehouse.com/)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/chalkers/my_awesome_site/issues"
  },
  "homepage": "https://github.com/chalkers/my_awesome_site#readme",
  "dependencies": {
    "express": "^4.0.0"
  },
  "devDependencies": {
    "mocha": "~2.2.1"
  }
}
```

**Answer**: 2.2.2

**Question**: What flag do you use to save devDependencies to your package.json file?

**Answer**: `--save-dev`

---

## Using npm as a Task Runner

**There are many task running tools such as gulp and grunt, but you can also use npm for running basic tasks.** However, npm is often the better option because it *takes far less time to setup.*

### What is a Task?

**A task is something that you need to do.** If you want to perform that task over and over again, you'll save yourself a lot of time if you automate the process.

Common web development tasks include **running test suites**, **compiling Sass**, **compiling TypeScript**, and ** compiling CoffeeScript** files, **downloading assets** of files from an external source that your package needs, **starting a web server**, and **starting a worker that goes through a queue of jobs**, like sending out emails or push notifications. 

Popular jump script build tool like **grunt** and **gulp** are good for *complex projects*. But you don't always need that power or want to bother with the time consuming setup process that they require. You can always turn to a full feature build system later as your project evolves.

>npm tasks are called scripts, and they're added to the scripts property of a project's package.json file. 

Tasks have a *name and a command*, which is a string that's executed on the operating system's command line when the task is run.

## Creating a Built-in Task

>npm has a number of built in tasks. One example is `test`. 

**You're often encouraged to install test frameworks and build systems globally with the `-g` flag.** But that can be a little *overkill* if you're working on different projects with potentially different versions. Because `test` is a *built-in task*, you can simply type `npm test`. If it *wasn't a built-in task* you would have to type `npm run test`.

>npm is flexible enough to allow you to create your own tasks.

#### uglifyjs

Uglifyjs is a JavaScript parser, minifier, compressor or beautifier toolkit. 

To install uglify you would enter `npm install uglify-js` and you would add the `-g`. Learn more about uglify [here](https://www.npmjs.com/package/uglifyjs).

To use uglify in the command line, we type `node_modules/.bin/uglifyjs src/models/* src/<your file> -m -c -o <folder>/<file.js>`. The `-m` flag mangles or reduces the name of some of the variables in the code, and the `-c` flag combines the code into a single file, and the `-o` flag is the output file.

**Manually typing in that command every time is time consuming and easily breakable with typos.** Therefore, you can enter this into your `"scripts"` key in your package.json file as `"uglify"` and then copy that line there. You can then run the command by typing `npm run uglify`. The package.json file looks like the following:

```javascript
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
```
  
You can combine tasks by adding a "build" key (for example) to your scripts. 

```javascript
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
```
  
>After this you would type `npm run build`.

## npm Default Tasks

There are many more default tasks. You can see them by typing `npm tasks`, or going [here](https://docs.npmjs.com/misc/scripts).