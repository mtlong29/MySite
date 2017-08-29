---
layout: article

permalink: /notes/console-foundations/

title: "Console Foundations"

categories: notes

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


`ls -l` - List files long

`pwd` - Print working directory

`less filename.txt` - Reads a file and displays it inside the console. Type `q` to quit out of the `less` program. You can also use `more`, but use `less` instead, because less is more.

`cat filename.txt` - Prints the file out. `cat` will concatonate files together. `cat filename.txt directory/filenametwo.txt` will print the contents of both files.

`nano filename.txt` - `nano` is a very basic text editor program within many consoles. It provides keyboard shortcuts to run at the bottom of the window.

`mv old.txt new.txt` - Moves (or renames) `old.txt` to `new.txt` within the same directory.

`mv filename.txt documents/` - Moves `filename.txt` to the directly `documents/`.

`mv documents/filename.txt .` - Moves `documents/filename.txt` to the current directory out of `documents/`

`cp old.txt new.txt` - Copies `old.txt` to `new.txt`.

`cp -r documents docs` - Will recursively `-r` copy the directory documents to docs and its contents.

`rm -r docs` - Will recursively `-r` remove the docs directory.

`mkdir docs` - Will create a new directory named docs.

`mkdir -p documents/notes/part1` - Will create nested directories `documents/notes/part1`.

`whoami` - Prints out the name of the current user.

`sudo adduser billy` - Adds the user `billy`. You will be required to enter a password followed by other optional information.

`su billy` - Switches to the user `billy`. Billy will be required to enter his information. You can use the `exit` command to switch back to the previous user.

`chmod o+w filename.txt` - Changes the permissions for a user. This gives the users other the ability to write. `-w` would remove the write permissions from everyone.

`chown billy filename.txt` - Changes the ownership of `filename.txt` to the user billy.

`chown billy:billy filename.txt` - Changes the group owner of `filename.txt` to billy.

`!!` - Will execute the previous command. This is very useful when forgetting or not knowing that you need the `sudo` command. `sudo !!`.

### Tab Completion

When changing directories you can type the beginning of a known directory and hit tab and the console will auto complete. 

### Using the rm command

It is not an easy way to recover a file or directory removed using the `rm` command. Use this with caution.

### Creating Users

Managing users is an important aspect on any computer system. It's the foundation upon which the privacy and security controls are built.

### Console Prompt [Y/n]

When a prompt like `[Y/n]` appears with one capital and the other lower case. This means the capital one is the default response so you can just press enter.

### File Permissions

Each file and folder has permissions that define which users can read, write, and run files. Theses are also abbreviated by `r`, `w`, and `x`.Understanding how users and permissions interact is critical when working from the console. 

A file also belongs to a group as well as a user. When you create a file it is also set to a group. Separate levels ov permissions can be set for the user owner as well as the group owner. You can set permissions for other users as well. This would be used for a user who is not the owner or  a member of the owning group of the file. These 3 levels are abbreviated `u`, `g`, and `o` for `user`, `group`, and `other`.

Therefore, there are nine permisions. This is often shown as nine characters such as `drwxrwxrwx`. The `d` represents directory. The first `rwx` is for the user, which the second is for the group, and finally the last is for other. If any of these are not true it will be represented as a dash such as `-rwxrwxr-x`.

### Octal

When counting in octal instead of adding 1 to 9 to get 10 you add 1 to 7 to get 10.

### sudo

Sometimes you need to take on special privileges to perform an action. The `sudo` command allows you to override all permissions temporarily to get things done. 

This command basically switches the users to the root user. It asks that the current user knows their own password. Think of doing something as the super user.

Using `sudo` can cause problems, such as removing all the files on your computer, so use it with caution. `sudo` may not require your password if you use it again within a set amount of time.