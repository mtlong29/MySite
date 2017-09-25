---
layout: article

permalink: /notes/npm-basics/

title: "npm Basics"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "npm is a command line tool and package manager for JavaScript. It is a great way to install command line tools and make use of other peoples code."

categories: notes

modified: 2017-09-19
---

{% include /globalSections/toc.html %}

npm is a command line tool and package manager for JavaScript. It is a great way to install command line tools and make use of other peoples code.

## What is npm?

There are over 150 thousand JavaScript packages such as express, gulp, browserfy, pm2.

Developers and companies release open source software that can be used to accomplish many of the routine things when building websites. 

npm is most commonly used for installing packages for node.js.

### What are Packages?

Packages are bundles of software. npm packages are mainly JavaScript code. npm packages for Node.js projects are called modules. Package and modules are often used interchangably.

Packages come in all shapes and sizes and are not just for Node.js. You can use them for anything from jQuery plugins to Grunt or Gulp. You can install tools to compile sass into css, or CoffeeScript into JavaScript. It can install Cordova, ionic used for building rich mobile rich applications. There are more and more examples that can be installed using npm.

### What Does npm Stand For?

npm stands for absolutely nothing. It used to stand for node package manager. However, it now stands for nthing because it can be used to install way more packages.

## How to Find and Choose Packages

The first place to look is the <a href="https://www.npmjs.com/">npm website</a>.

<ol>
  <li>Popularity on npm (the number of downloads)</li>
  <li>Release Date (the more recent the better)</li>
  <li>Number of Releases (the more frequent the better)</li>
  <li>Passing Tests (if there's tests passing)</li>
  <li>Number of Open Issues (the less the better)</li>
  <li>Popularity on GitHub (the more stars, forks, and watches the better)</li>
  <li>Number of Contributors on GitHubt (the more eyes on the code the better)</li>
</ol>

## Installing Local Packages

npm is a command line too so most of the time is spent in the console or terminal.

Type `npm` and it will show you all the commands you can use with npm. If you ever need help with an npm command such as `install` you can type `npm install -h`.

You can install a package locally such as `bcrypt` by typing `npm install bcrypt`.

Packages will often install other necessary packages. It is perfectly fine to have no idea what they do. All that is needed to know is that they're needed for the package you're interested in.

The packages often install into a directory known as `node_modules`. You will almost always leave this directory alone and let npm manage it. If you are working without internet at some point you can look at the readme that is installed for the package you're interested in found in the `node_modules` directory.

There is often a special file inside a packages folder known as the `package.json`. This file tells node which file to include when incuding this module.

## Globally Available Packages

npm packages have more utility than being included locally in a project. THere are other packages that can be installed as command line utilities.

You can install a package such as http-server by typing `npm install http-server -g`. 

You may run into permission issues, but if you install npm properlly you shouldn't get any issues.

On a side note. http-server is a super handy command line too that can be used to startup a http server gaining access to server tools such as AJAX etc.

## Managing Dependencies in the package.json File

A package.json file is the standard way to manage your dependencies in a project.

If you want to share your project on github you wouldn't want to upload all of the packages. Instead you want to upload the package.json dependency manager file. Therefore add `node_modules/` to your `.getignore` file.

You create a package.json file by typing `npm init`. It will then walk you through a list of options. Many of which will have default settings found inside `()`.

If you type `npm install` without a package it will look for your `package.json` file and install accordingly.

You can add development dependencies as well. Development dependencies are dependencies for development but not for actually running the application. For example, to install mocha as a dev dependency you would type `npm install mocha --save-dev`. This will show up in your `package.json` as a different object than your dependencies.

## Updating Packages with npm

Everything changes especially with open source packages.

Semantic versioning such as `3.4.2`. Magor releases would be going from `1.0.2` to `2.0.0`. A minor release would be going from `2.5.2` to `2.6.0`. Patches such as bug fixes would be going from `1.0.1` to `1.0.2`.

A caret character `^` in front of a version number instructs npm to install all the future versions that are not considered major versions. 

A `~` in front of a version number instructs npm to install all patch releases up until a minor release. 

## Uninstalling Packages with npm

To uninstall a package such as colors you would type `npm uninstall colors`. However, if you type `npm install` it will reinstall it because it is in your npm dependencies file in package.json. If you want to get rid of it permantely you would use the save flag by typing `npm uninstall colors --save` and finally if you wanted to uninstall it from a dev dependency you would type `npm uninstall colors --save-dev`. If you wanted to uninstall a package globally you would type `npm uninstall colors -g`.

## Quiz

Question: Given the following package.json npm could theoretically install which of the following versions of express.

{% highlight javascript linenos %}
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
{% endhighlight %}

Answer: 4.5.0

Question: Given the following package.json nmp will install the latest _____ release of express.

{% highlight javascript linenos %}
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
{% endhighlight %}

Answer: Minor

Question: Can you guess the command to check which of the global packages are out of date?

Answer: npm outdated -g

Question: Given the following package.json npm will install the latest ____ rpease of mocha.

{% highlight javascript linenos %}
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
{% endhighlight %}

Answer: Patch

Question: Which command will ignore developer dependencies when you install?

Answer: NODE_ENV=production npm install

Question: What npm command would I use to see if there are any packages that need updating without installing updates.

Answer: Outdated

Question: Which of these commands could result in the most system wide issues?

Answer: npm update -g

Question: Which npm command do you use to install all dependencies if you have a package.json file?

Answer: install

Question: Given the following package.json npm could theoretically install which of the following versions of mocha.

{% highlight javascript linenos %}
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
{% endhighlight %}

Answer: 2.2.2

Question: What flad do you use to save devDependencies to your package.json file?

Answer: --save-dev