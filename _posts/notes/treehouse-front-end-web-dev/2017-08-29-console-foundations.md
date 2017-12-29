---
layout: article

permalink: /notes/console-foundations/

title: "Console Foundations"

subtitle: "Treehouse - Front End Web Development"

excerpt: "Notes on using the console. The console is a text-based interface on your computer. It allows you to interact with files, folders, and programs using text commands instead of windows, buttons, and menus."

categories: notes

date: 2017-08-29
---

{% include /globalSections/toc.html %}

## Console Introduction

**The console is a text-based interface on your computer.** It allows you to interact with files, folders and programs using text commands instead of windows, buttons and menus.

It is impossible for developers to avoid the console. And you shouldn't want to. Every operating system uses some sort of console.

The vast majority of servers online use Unix. Darwin is based off of Unix which run on OSX. **POSIX (portable operation system interface)**. This is why mac is so popular to developers. Mac OSX provides a full POSIX compatible environment and a finely tuned graphical interface to go with it.

**Microsoft windows is not POSIX compatible.** This makes windows a less desirable choice when doing web development because it's not compatible with operating systems that we're likely to use on our web servers.

**It is of huge value to run and use Unix.** Even if you run Windows as your personal computer.

## Learning New Commands

---

`ls -l` - List files long

---

`pwd` - Print working directory

---

`less filename.txt` - Reads a file and displays it inside the console. Type `q` to quit out of the `less` program. You can also use `more`, but use `less` instead, because less is more.

---

`cat filename.txt` - Prints the file out. `cat` will concatenate files together. `cat filename.txt directory/filenametwo.txt` will print the contents of both files.

---

`nano filename.txt` - `nano` is a very basic text editor program within many consoles. It provides keyboard shortcuts to run at the bottom of the window.

---

`mv old.txt new.txt` - Moves (or renames) `old.txt` to `new.txt` within the same directory.

---

`mv filename.txt documents/` - Moves `filename.txt` to the directly `documents/`.

---

`mv documents/filename.txt .` - Moves `documents/filename.txt` to the current directory out of `documents/`

---

`cp old.txt new.txt` - Copies `old.txt` to `new.txt`.

---

`cp -r documents docs` - Will recursively `-r` copy the directory documents to docs and its contents.

---

`rm -r docs` - Will recursively `-r` remove the docs directory.

---

`mkdir docs` - Will create a new directory named docs.

---

`mkdir -p documents/notes/part1` - Will create nested directories `documents/notes/part1`.

---

`whoami` - Prints out the name of the current user.

---

`sudo adduser billy` - Adds the user `billy`. You will be required to enter a password followed by other optional information.

---

`su billy` - Switches to the user `billy`. Billy will be required to enter his information. You can use the `exit` command to switch back to the previous user.

---

`chmod o+w filename.txt` - Changes the permissions for a user. This gives the users other the ability to write. `-w` would remove the write permissions from everyone.

---

`chown billy filename.txt` - Changes the ownership of `filename.txt` to the user billy.

---

`chown billy:billy filename.txt` - Changes the group owner of `filename.txt` to billy.

---

`!!` - Will execute the previous command. This is very useful when forgetting or not knowing that you need the `sudo` command. `sudo !!`.

---

`top` - Shows active processes. Press `?` for options. `top` allows you to see the processes in a live-updated, sorted list.

---

`ps` - Shows process statuses. `ps aux` will show all processes that are running as well as their ID for a specific task. You can see this by running two programs at once. `ps` will display a list of all processes and return to the command line immediately.

---

`grep` - Search for a pattern. `ps aux | grep "search pattern"` will search processes with "search pattern" or whatever you enter there.

---

`jobs` - This displays the jobs that are currently in your current session.

---

`fg 1` - Brings `job [1]` to the foreground.

---

`kill 1453` - Kills the process with the ID of 1453. This is a terminate signal. `kill -KILL 1453` or `kill -SIGKILL 1453` will override and kill process 1453 immediately. There is nothing 1453 can do to stop this from happening. Use this with care. It can also be written as `kill -9 1453`. You can also stop the process by using `kill -STOP 1453`. This is the same as control + z.

---

`env` - View environment variables.

---

`echo $HOME` - Prints out the environment variable. When expanding a variable use `$`, but not when you're setting it. `PS1` is what the prompt is set to.

---

`find -name "name.txt"` - Will search for a file named `name.txt`. The manual for `find` can be seen by typing `man find`. Press `q` to exit.

---

`grep "is" hello.txt` - Global Regular Expression Print will search for the pattern "is" in the file `hello.txt`. The manual for `grep` can be seen by typing `man grep`. Press `q` to exit.

---

`sudo apt-get` - Update your computer's catalog of available software.

---

`sudo apt-get install build-essential` - Install the tools needed to build the software from source code.

---

`curl -O` - Download the file at the URL. Curl is a program used when making requests from the internet.

---

`tar -xvf FILENAME.tar.gz` - A .tar file is much like a .zip file. Decompress the `tar.gz` file to the current directory. It will then list all the files that it created.

---

`./configure` - Run the configure script that comes with the source code. This creates a Makefile. A Makefile is a file the specifies how to build the program. The configure script is what builds the Makefile so that it is compatible with out system.

---

`sudo make install` - Run the install script from the Makefile. This installs the program. This could take a while depending on the size of the program.

---

`apt-cache search PATTERN` - Search the available packages for a pattern.

---

`apt-get install PACKAGE` - Install one or more packages.

---

`apt-get upgrade` - Upgrade to the latest version of all the packages installed.

---

`apt-get remove Package` - Remove or uninstall package from your computer.

## Tab Completion

When changing directories you can type the beginning of a known directory and hit tab and the console will auto complete. 

## Using the rm command

It is not an easy way to recover a file or directory removed using the `rm` command. Use this with caution.

## Creating Users

Managing users is an important aspect on any computer system. It's the foundation upon which the privacy and security controls are built.

## Console Prompt [Y/n]

When a prompt like `[Y/n]` appears with one capital and the other lower case. This means the capital one is the default response so you can just press enter.

## File Permissions

Each file and folder has permissions that define which users can read, write, and run files. Theses are also abbreviated by `r`, `w`, and `x`.Understanding how users and permissions interact is critical when working from the console. 

A file also belongs to a group as well as a user. When you create a file it is also set to a group. Separate levels ov permissions can be set for the user owner as well as the group owner. You can set permissions for other users as well. This would be used for a user who is not the owner or  a member of the owning group of the file. These 3 levels are abbreviated `u`, `g`, and `o` for `user`, `group`, and `other`.

Therefore, **there are nine permissions. This is often shown as nine characters such as `drwxrwxrwx`.** The `d` represents directory. The first `rwx` is for the user, which the second is for the group, and finally the last is for other. If any of these are not true it will be represented as a dash such as `-rwxrwxr-x`.

## Octal

>When counting in octal instead of adding 1 to 9 to get 10 you add 1 to 7 to get 10.

## sudo

Sometimes you need to take on special privileges to perform an action. 

>**The `sudo` command allows you to override all permissions temporarily to get things done.** 

This command basically *switches the users to the root user*. It asks that the current user knows their own password. Think of doing something as the super user. **Using `sudo` can cause problems, such as removing all the files on your computer, so use it with caution.** `sudo` may not require your password if you use it again within a set amount of time.

## Processes

**Processes are instances of running programs on your computer.** You can run multiple instances of a single program by creating multiple processes. Understanding how processes work is crucial for using the console effectively.

## Pausing and Resuming

If you run `nano` for example and wish to run a new command you could exit out of the program, but this is really inconvenient. You could also open a new tab and run it there. However, the best solution is to pause this job. A job is a process that belongs to you in your session. They can have job numbers like 1, 2, or 3. In order to do that hold the control key and hit zs.

## Killing Processes

Sometimes a process gets out of control and you have to kill it yourself. There are several options available when killing processes and great care must be taken whenever you use the kill command. However, be careful because this may cause your computer to shut down and even data corruption.

To do this you have to send a signal to the process. This can be done using control and c.

If the process isn't in your terminal (such as in a different tab) you can kill it by finding the process. This is best done by using `ps aux | grep "the process"`. This will give you a list and in that list you'll find the process you wish to kill. Say its 1453. `kill 1453` will kill process with the ID of 1453.

## Environment Variables

Environment variables store configuration information on our computers.


## Find and Grep

If you're searching for a file on your computer you should use teh command `find`. If you're searching for something specific in a file use the command `grep`.

## Pipes and Redirection

Being able to manipulate the input and output of programs means you can construct some very useful commands by using the simple commands you know in new and interesting ways.

You can take the output of one process and make it the input of another process. This is called piping. Use the `|` character.

`somecommand < iputfile` run somecommand with input from inputfile, instead of the keyboar.

`somecommand > outputfile` run somecommand with output to outputfile instead of the terminal screen.

`command1 | command2` pipe the output of command1 to the input of command2.

## Building Software From Source

There are two main ways to install software from the console: building from source, and installing from a package manager. 

The basic steps to manually install a program is as follows:

- Download source file
- Untar file
- Run ./configure script
- Run make command
- Run sudo make install

If you try to run a program that isn't installed often times it will tell you how.

>If you wanted to install git you can type `sudo apt-get install git`.