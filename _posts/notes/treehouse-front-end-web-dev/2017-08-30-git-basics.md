---
layout: article

permalink: /notes/git-basics/

title: "Git Basics"

subtitle: "Treehouse - Front End Web Development"

excerpt: "Introduction to Git and GitHub. Notes on how to use Git from the command line."

categories: notes

date: 2017-08-30
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

## The Staging Area

The command `git status` shows the current status of the git repository, including if there are any uncommitted changes and whether or not any of our changes have been put in the staging area.

The command `git add` also adds changes to the staging area.

The command `git commit` without any flags will default to committing everything that's currently in the staging area.

## Looking Back on What We've Done

`git log` will show us a chronological log of all of our commits to the current repository.

`git checkout` checks out a different version of the code from the one you're currently looking at.

`git diff` will create a "diff" view to demonstrate what has changed between two different versions of your repository.

## Branching Out

One of the most powerful features that version control systems have to offer is the concept of branching.

Branches are like alternate realities for your project. You can work on different versions that are branched off of the main branch.

`git branch branchname` creates a new branch named branchname. `git checkout branchname` switches to the branch named branchname. `git checkout -b branchname` creates a new branch named branchname and switches to that branch.

The master branch can be thought of as the trunk.

Don't be confused by the use of `checkout`. It's basically the same, because we are still checking out different version of the project.

### Managing Our Branches

`git branch` lists all branches in the current repository and indicate which branch you're currently in. `git branch -D branchname` will delete the branch named branchname from the repository.

## Introduction to Merging

Branching may be one of the most powerful features that version control has to offer, but it really shines in conjunction with another concept: mergin.

Mergins can be thought of as the opposite of branching. It combines the changes and all their respective commits into one cohesive timeline.

## Merge Conflicts

Git does everything it can to resolve merge conflicts for you. There are some occasions when it cannot merge things on it own so you will have to do it manually from time to time.

If you don't have any changes in the same files in different branches merging is typically very smooth. If you do have changes in different branches for the same file Git can often times resolve these merges on their own.

`git merge branchname` merges the history from branchname into the current branch.

If Git can't handle a merge for us automatically, it generates what we call a "merge conflict" that we have to resolve on our own.

When a conflit appears it will look something like the following.

{% highlight text linenos %}
<<<<<<< HEAD
your conflicting code here..
=======
your conflicting code here too..
>>>>>>> branchname
{% endhighlight %}

This is when you manually fix the code. You can start by removing the `<<<<<<<HEAD`, `=======`, and the `>>>>>>> branchname` portions of the code. Those basically show you where the conflicting code is. You then either write new code or choose between the two or use a combination of both. It is up to you. Once the changes have been made you have to commit these changes. Git will name the commit merge etc by default.

## Working With Remotes

If you're managing a personal project you have everything you need in Git. 
However, remote repositories are useful when working with multiple versions of a repository. You can add remotes to a remote repository such as GitHub. People pushing and pulling each others work as needed. The officialy version of the code is placed on the remote repository. This is how you can make it so that everyone is working on the most up to date version of a project.

## Cloning

The first step in working with a remote repository is often to create a local copy of it. In Git, this is called "cloning".

`git clone` creates a new repository that is a clone of a remote repository. `git remote` lists all the repositories associated with the current repository. `git remote add` adds a new remote repository to the current repository.

## Pushing and Pulling

Once we've got a clone of a remote repository, you can send changes back and forth to keep everyone in sync using push and pull. `git push` pushes your latest changes to a remote repository. `git pull` pulls the latest changes from a remote repository to your repository.

If you have enabled the two step verification you will need to generte an access token instead of using you password. See <a href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/">https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/</a> for more information.

## Git-Flow

<a href="https://github.com/nvie/gitflow">Git-Flow</a> is a collection of Git extensions to provide high-level repository operations. 

This is a very opinionated extension. Some people love it others prefer not to use it.