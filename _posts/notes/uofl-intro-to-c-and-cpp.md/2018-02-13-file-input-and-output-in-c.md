---
layout: article

permalink: /notes/file-input-and-output-in-c/

title: "File Input and Output in C"

subtitle: "UofL - Intro to C and C++"

excerpt: "These notes continue an introduction to C programming focused on file input and output."

categories: notes

date: 2018-02-13
---

{% include /globalSections/toc.html %}

Data files are often text-based and are used for storing and retrieving related information like that stored in a database. It's important to understand the breakdown and hierarchy of data files, because each component (parent) and sub component (child) are used together to create the whole. Without each component and its hierarchical relationships, building more advanced data file systems such as relational databases would be difficult.

#### Bits and Bytes

Bits are the smallest unit of measurement in computer systems, they provide an easy mechanism for electrical circuits to duplicate 1s and 0s with patterns of *off* and *on* electrical states.

Bytes provide the next step in the data file food chain. Bytes are made up of eight bits and are used to store a single character, such as a number, a letter, or any other character found in a character set.

#### Fields, Records, and Files

In database or data-file lingo, groupings of characters are most commonly referred to as *fields*. **Fields are often recognized as placeholders on a graphical user interface (GUI), but are really a data concept that groups characters in a range of sizes and data types to provide meaningful information.**

**Records are logical groupings of fields that comprise a single row of information.** Each field in a record describes the record's attributes.

Data files are comprised of one or more records and are at the top of the data file food chain. **Each record in a file typically describes a unique collection of fields.**

#### File Streams

**C programmers use pointers to manage streams that read and write data.** Understanding streams is quite easy. In fact, streams are just file or hardware devices, such as a monitor or printer, which can be controlled by C programmers using pointers to the stream.

To point to and manage a file stream in C, simply use an internal data structure called `FILE`. Pointers of type `FILE` are created just like any other variable.

```c
#include <stdio.h>

int main() {
  //create 3 file pointers
  FILE *pRead;
  FILE *pWrite;
  FILE *pAppend;
  
  return 0;
}
```

#### Opening and Closing Files

The basic components for file processing involves opening, processing, and closing data files. Opening a data file should involve error handling. To open a data file, use the standard input/output library function `fopen()`. The `fopen()` function is used in an assignment statement to pass a `FILE` pointer to a previously declared `FILE` pointer.

```c
#include <stdio.h>

int main() {
  FILE *pRead;
  
  pRead = fopen("file1.dat", "r");
  
  return 0;
}
```

This program uses the `fopen()` function to open a data file, called `file1.dat`, in a read-only manner (more on this in a moment). The `fopen()` function returns a `FILE` pointer back to the `pRead` variable.

After opening a file, you should always check to ensure that the `FILE` pointer was returned successfully. In other words, you want to check for occasions when the specified file name cannot be found.

```c
#include <stdio.h>

int main() {
  FILE *pRead;
  
  pRead = fopen("file1.dat", "r");
  
  if ( pRead == NULL )
    printf("\nFile cannot be opened\n");
  else
    printf("\nFile opened for reading\n");
  
  return 0;
}
```

After successfully opening and processing a file, you should close the file using a function called `fclose()`. The `fclose()` function uses the `FILE` pointer to flosh the stream and close the file.

```c
fclose(pRead);
```

#### Reading Data

You can easily create your own data files using common text editors such as vi, nano, or even Notepad. To read a data file, you will need to investigate a few new functions. 

```c
#include <stdio.h>

int main() {
  FILE *pRead;
  
  char name[10];
  
  pRead = fopen("names.dat", "r");
  
  if (pRead == NULL)
    printf("\nFile cannot be opened\n");
  else
    printf("\nContents of names.dat\n\n");
  
  fscanf(pRead, "%s", name);
  
  while (!feof(pRead)) {
    printf("%s\n", name);
    fscanf(pRead, "%s", name);
  }
  
  return 0;
}
```

After successfully opening `names.dat`, `fscanf()` is used to read a single field within the file. The `fscanf()` function is similar to `scanf()` but works with `FILE` streams and takes three arguments: a `FILE` pointer, a data type, and a variable to store the retrieved value in.

Most data files contain more than one record. To read multiple records, it is common to use a looping structure that can read all records until a condition is met. If you want to read all records until the end-of-file is met, the `feof()` function provides a nice solution.

#### Writing Data

Writing information to a data file is just as easy as reading data. You use a function similar to `printf()` called `fprintf()` that uses a `FILE` pointer to write data to a file. The `fprintf()` function takes a `FILE` pointer, a list of data types, and a list of values I(or variables) to write information to a data file.

```c
#include <stdio.h>

int main() {
  FILE *pWrite;
  
  char fName[20];
  char lName[20];
  char id[15];
  float gpa;
  
  pWrite = fopen("students.dat", "w");
  
  if ( pWrite == NULL )
    printf("\nFile not opened\n");
  else {
    printf("\nEnter first name, last name, id and GPA\n\n");
    printf("Enter data separated by spaces: ");
    //store data entered by the user into variables
    scanf("%s%s%s%f", fName, lName, id, &gpa);
    //write variable contents separated by tabs
    fprintf(pWrite, "%s\t%s\t%s\t%.2f\n", fName, lName, id, gpa);
    fclose(pWrite);
  }
  
  return 0;
}
```

#### Appending Data

Appending data is a common process among Information Technology (IT) professionals because it allows programmers to continue building upon an existing file without deleting or removing previously stored data.

Appending information to a data file involves opening a data file for writing using the `a` attribute in an `fopen()` function and writing records or data to the end of an exiting file. If the file does not exist, a new data file is created as specified in the `fopen()` statement.

```c
#include <stdio.h>

void readData(void);

int main() {
  FILE *pWrite;
  char name[10];
  char hobby[15];
  
  printf("\nCurrent file contents:\n");
  readData();
  printf("\nEnter a new name and hobby: ");
  scanf("%s%s", name, hobby);
  //open data file for append
  pWrite = fopen("hobbies.dat", "a");
  if ( pWrite == NULL )
    printf("\nFile cannot be opened\n");
  else {
    //append record information to data file
    fprintf(pWrite, "%s %s\n", name, hobby);
    fclose(pWrite);
    readData();
  }
  
  return 0;
}

void readData(void) {
  FILE *pRead;
  
  char name[10];
  char hobby[15];
  
  //open data file for read access only
  pRead = fopen("hobbies.dat", "r");
  if ( pRead == NULL )
    printf("\nFile cannot be opened\n");
  else {
    printf("\nName\tHobby\n\n");
    fscanf(pRead, "%s%s", name, hobby);
    //read records from data file until end of file is reached
    while ( !feof(pRead) ) {
      printf("%s\t%s\n", name, hobby);
      fscanf(pRead, "%s%s", name, hobby);
    }
  }
  fclose(pRead);
}
```

#### goto and Error Handling

When your program interacts with the outside world, you should provide some form of error handling to counteract unexpected inputs or outputs. One way of providing error handling is to write your own error-handling routines.

Error-handling routines are the traffic control for your program. Such routines should ideally consider the multitude of programming and human-generated error possibilities, resolve issues if possible, and at the very least exit the program gracefully after an error.

The `goto` keyword is old school coming from BASIC, COBOL, and even C. A `goto` was regularly used for designing and building modularized programs. Ti break programs into manageable pieces, programmers would create modules and link them together using the keyword `goto` in hopes of simulating function calls.

After years of programming with `goto`, programmers began to realize that this created messy code, which at times became nearly impossible to debug. Fortunately, improvements to the structured programming paradigm and event-driven and object-oriented programming techniques have virtually eliminated the need for `goto`.

However, because of the lack of built-in exception handling within the C language, it is acceptable to use the once infamous `goto` keyword. Specifically, if you'd like to separate our error handling from each routine and save yourself from writing repetitive error handlers, then `goto` may be a good alternative for you.

Using `goto` is simple: first include a label (a descriptive name) followed by a colon (:) above where you want your error-handling routine to run (begin). To call your error-handling routine (where you want to check for an error), simply use a keyword `goto` followed by the label name.

```c
int myFunction() {
  int iReturnValue = 0; // 0 for success
  
  // process something
  if(error) {
    goto ErrorHandler; // go to the error-handling routine
  }
  
  // do some more processing
  if(error) {
    ret_val = [error];
    goto ErrorHandler; // go to the error-handling routine
  }
  
ErrorHandler:
  // error-handling routine
  return iReturnValue ;
}
```

The label in the preceding code is `ErrorHandler`.

>The `exit()` function, part of the `<stdlib.h>` library, terminates a program as if it were exited normally. 

The `exit()` function takes a single parameter, a constant of either `EXIT_SUCCESS` or `EXIT_FAILURE`, both of which return a pre-defined value for success or failure, respectively.

The `perror()` function sends a message to standard output describing the lat error encountered. The `perror()` function takes a single string argument, which is printed first, followed by a colon and a blank, then the system generated error message and a new line is shown.