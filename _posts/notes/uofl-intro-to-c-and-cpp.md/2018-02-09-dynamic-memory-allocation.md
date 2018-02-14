---
layout: article

permalink: /notes/dynamic-memory-allocation-in-c/

title: "Dynamic Memory Allocation in C"

subtitle: "UofL - Intro to C and C++"

excerpt: "These notes continue an introduction to C programming focused on dynamic memory allocation."

categories: notes

date: 2018-02-09
---

{% include /globalSections/toc.html %}

There are many important memory concepts such as allocating, reallocating, and freeing memory.

Software programs, including operating systems, use a variety of memory implementations, including virtual memory and RAM. RAM provides a volatile solution for allocating, storing, and retrieving data. Virtual memory is also volatile.

Virtual memory increases the perception of more memory by using hard-disk space for swapping memory segments.

## Stack and Heap

Using a combination of RAM and virtual memory, all software programs use their own area of memory called the *stack*. Every time a function is called in a program, the function's variables and parameters are pushed onto the program's memory stack and then pushed off or "popped" when the function has completed or returned.

Used for storing variable and parameter contents, memory stacks are dynamic groupings of memory that grow and shrink as each program allocates and deallocates memory.

After software programs have terminated, memory is returned for reuse for other software and system properties. Moreover, the operating system is responsible for managing this realm of unallocated memory, known as the *heap*. Software programs that can leverage memory-allocating functions like `malloc()`, `calloc()`, and `realloc()` use the heap. The heap is an area of unused memory managed by the operating system.

Once a program frees memory, it is returned to the heap for further use by the same program or other programs.

>Memory allocating functions and the heap are extremely important to C programmers because they allow you to control a program's memory consumption and allocation. 

## sizeof()

There will be occasions when you need to know how large a variable or data type is. This is especially important in C, because C allows programmers to create memory resources dynamically.

The `sizeof` operator takes a variable name or data type as an argument and returns the number of bytes required to store the data in memory.

```c
#include <stdio.h>

int main() {
  int x;
  float f;
  double d;
  char c;
  
  typedef struct employee {
    int id;
    char *name; float salary;
  } e;
  
  printf("\nSize of integer: %lu bytes\n", sizeof(x));
  printf("Size of float: %lu bytes\n", sizeof(f));
  printf("Size of double %lu bytes\n", sizeof(d));
  printf("Size of char %lu byte\n", sizeof(c));
  printf("Size of employee structure: %lu bytes\n", sizeof(e));
  
  return 0;
  
}

// Size of integer: 4 bytes
// Size of float: 4 bytes
// Size of double 8 bytes
// Size of char 1 byte
// Size of employee structure: 24 bytes
```

>The `sizeof` operator can take either a variable name or a data type.

```c
printf("\nSize of integer: %lu bytes\n", sizeof(int));

// Size of integer: 4 bytes
```

>The `sizeof` operator can also be used to determine the memory requirements of arrays.

## malloc()

Sometimes it is impossible to know how much memory your program will need for a given function. C provides a few functions for creating dynamic memory, one of which is the `malloc()` function. The `malloc()` function is part of the standard library `<stdlib.h>` and takes a number as an argument. When executed, `malloc()` attempts to retrieve designated memory segements from the heap and returns a pointer that is the starting point for the memory reserved. It's also important to note that some C compilers may require that you perform type casting when assigning dynamic memory to a variable. On tope of that it should be even more specific when creating dynamic memory by explicitly telling the system the size of the data type for requesting memory. In other words, the `sizeof()` operator should be used. 

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  char *name;
  
  name = (char *) malloc(80 * sizeof(char));
  
  return 0;
}
```

The above tells the system that we want 80 bytes of type `char`, which happens to be a 1-byte type on most systems.

It is also important to check that `malloc()` was successful before attempting to use the memory. To test the `malloc()` function's outcome, simply use an `if` condition to test for a `NULL` pointer.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  char *name;
  
  name = (char *) malloc(80 * sizeof(char));
  
  if ( name == NULL )
    printf("\nOut of memory!\n");
  else
    printf("\nMemory allocated.\n");
  
  return 0;
}

// Memory allocated.
```

>Failure to test the pointer returned by memory allocating functions such as `malloc()` can result in abnormal software or system behavior.

#### Managing Strings with malloc()

Strings dynamic memory allocation allows programmers to create and use strings when reading information from standard input. To do so, simply use the `malloc()` function and assign its results to a pointer of `char` type prior to reading information from the keyboard.

## Freeing Memory

**Good programming practice dictates that you free memory after using it.** For this reason, the C standard library offers the `free()` function, which takes a pointer as an argument and frees the memory the pointer refers to. This allows your system to reuse the memory for other software applications or other `malloc()` function calls.

Freeing memory allocated by functions such as `malloc()` is an important housekeeping duty of C programmers. Even with today's memory-rich systems it's a good idea to free memory as soon as you no longer need it because the more memory you consume the less that is available for other processes. *If you forget to release allocated or used memory in your programs, most operating systems will clean up for you.*

## Working with Memory Segments

Individual memory segments acquired by `malloc()` can be treated much like array members; these memory segments can be referenced with indexes.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  int *numbers;
  int x;
  
  numbers = (int *) malloc(5 * sizeof(int));
  
  if ( numbers == NULL )
    return 0; // return if malloc is not successful
  
  numbers[0] = 100;
  numbers[1] = 200;
  numbers[2] = 300;
  numbers[3] = 400;
  numbers[4] = 500;
  
  printf("\nIndividual memory segments initialized to:\n");
  
  for ( x = 0; x < 5; x++ )
    printf("numbers[%d] = %d\n", x, numbers[x]);
  
  return 0;
}
```

Simply supply the pointer name with an index to initialize and access segments of memory.

## calloc() and realloc()

Another memory allocating tool is the C standard library function `calloc()`. `calloc()` attempts to grab contiguous segments of memory from the heap. The `calloc()` function takes two arguments: the first determines the number of memory segments needed and the second is the size of the data type.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  int *numbers;
  
  numbers = (int *) calloc(10, sizeof(int));
  
  if ( numbers == NULL )
    return 0 ; // return if calloc is not successful
  
  return 0;
}
```

>The main benefit of using `calloc()` rather than `malloc()` is `calloc()`'s ability to initialize each memory segment allocated. This is important because `malloc()` requires that the programmer be responsible for initializing memory before using it.

The `realloc()` function provides a way to expand contiguous blocks of memory while preserving the original contents. The `realloc()` function takes two arguments for parameters and returns a pointer as an output.

```c
newPointer = realloc(oldPointer, 10 * sizeof(int));
```