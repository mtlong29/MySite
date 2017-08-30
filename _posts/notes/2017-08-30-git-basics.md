---
layout: article

permalink: /notes/git-basics/

title: "Git Basics"

categories: notes

modified: 2017-08-30

featured: true

published: true
---

{% include /globalSections/toc.html %}

## Introduction to Git Basics

The VCS, or Version Control System, is necessary for working with other developers on the same project.

## Life Without Version Control

There are many problems someone can run into if they don't use version control.

<ul>
  <li>If you make a change to a code and the client decides to not use that you delete it. Next, the client changes her mind and asks you to add it back in. However, you deleted it and now it's gone.</li>
  <li>Have multiple copies of something will get combersome.</li>
  <li>More than one person working on the same file is nearly impossible.</li>
</ul>

## How Version Control Works

Revision control and source control are all interchangable terms. The terminology version control is used most often.

Each project should have its own repository.

The act of telling your version control something is finished is committing it.

If your commits are stored in your repository you can view your project history. You can view what your project looked like last year. Often with one command.

## Why Git?

There are a lot of version control options out there. It's not the simplest version control, but it's a favorite of many developers.

### History

Linus Torvalds is the inventor of Git. He is the father of the Linux operating system. Still maintains the Linux kernel. The Linux kernel is MASSIVE.. He invented Git so that he and other developers could better work on the Linux kernel.

### GitHub

GitHub is the most popular place to store your project. It's basically a social network for your repository. You can share your projects online. Other people can view your projects and even add comments to suggest changes.

## Git Ready

You can install git using a package manager. For example, `sudo apt-get install git`.

## Working With Git Repositories

You can create a new repository named `my_awesome_project` by running the command `git init my_awesome_project`. This creates a repository (or folder) in the directory you were in and adds a `.git` folder to it. Inside the `.git` folder is all your version control information.

If you have a folder that is already created but is not a git repository you can navigate to that folder and then run the command `git init` without a repository name. It will take the name that the folder has.

If you decide you don't need a git repository or you created it in the wrong directory you can navigate to where the `.git` folder is and recursively remove it by typing `rm -r .git`.

## Committing Changes

Creating an managing repositories is a great first step, but repositories are only good if we use them to store changes.

You can use the command `git add` to add files to the repository so that Git knows to track their changes. For example, if you wanted to track changes to a README file that you created you would type `git add README`. 

Use the command `git commit` to commit all added files to the repository as a change. With the `-a` flag, commits all changes to all tracked files. With the `-m` flag, allows you to specify a commit message directly on teh command line instead of in your default editor. After typing `git commit` you can type a short meaningful description immediately afterward.

If you want to make configuration changes to Git such as changing your user name or email address you would type `git config --local user.name "Your Name"`. The `--local` flag changes it only for your working repository. The `--global` flag changes it across your entire system.

A faster way to commit changes is by using the command `git commit -a -m "Your commit message."`. The `-a` flag commits all changes to all tracked files. The `-m` flag allows you to inset the message in the same command line.