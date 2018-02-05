---
layout: article

permalink: /notes/strings-in-c/

title: "Strings in C"

subtitle: "UofL - Intro to C and C++"

excerpt: "These notes continue an introduction to C programming focused on strings."

categories: notes

date: 2018-02-01
---

{% include /globalSections/toc.html %}

These notes continue an introduction to C programming focused on strings.

Strings use many other concepts in C such as functions, arrays, and pointers. In fact, strings are very closely related to pointers and arrays.

## Introduction to Strings

>C programmers can create and initialize a string using a character array and a terminating `NULL` character

```c
char myString[8] = {'M', 'a', 't', 't', 'h', 'e', 'w', '\0'};
```

When creating character arrays, it is important to allocate enough room for the `NULL` character because many C library functions look for the `NULL` character when processing character arrays. If the `NULL` character is not found, some C library functions may not produce the desired result.

The above variable can also be created and initialized with a **string literal**.

```c
char myString[] = "Matthew";
```

This creates the necessary number of memory elements - in this case it is 8 including the `NULL` character. Note that **string literals are a series of characters surrounded by double quotes**.

It is important to know that strings are implemented as a pointer to a segment of memory. More specifically, string names are really just pointers that point to the first character's memory address in a string. Consider the following:

```c
char *myString = "Matthew";
```

This statement declares a pointer variable and assigns the string literal `"Matthew"` to the first and subsequent memory locations that the pointer variable `myString` points to. In other words, *the pointer variable `myString` points to the first character in the string `"Matthew"`.

#### Example

```c
#include <stdio.h>

int main() {
  char *myString = "Matthew";
  int x;
  
  printf("\nThe pointer variable has value of: %p\n", &*myString);
  printf("\nThe pointer variable points to: %s\n", myString);
  printf("\nThe memory locations for each character are: \n");
  
  // access and print each memory address in hexadecimal format
  for ( x = 0; x < 8; x++ )
    printf("\t%p\n", &myString[x]);
  
  return 0;
}

// The pointer variable has value of: 0x10754df2e

// The pointer variable points to: Matthew

// The memory locations for each character are: 
// 	0x10754df2e
// 	0x10754df2f
// 	0x10754df30
// 	0x10754df31
// 	0x10754df32
// 	0x10754df33
// 	0x10754df34
// 	0x10754df35
```

#### Are Strings Data Types?

The concept of a string is sometimes taken for granted in some high-level languages. This is because some high-level languages implement strings as a data type, just like an integer or double. **C does not identify strings as a data type; rather C strings are simply character arrays.**

## Reading and Printing Strings

To read and print a character array use the `%s` conversion specifier:

```c
#include <stdio.h>

int main() {
  char color[12] = {'\0'};
  
  printf("\nEnter your favorite color: ");
  scanf("%s", color);
  printf("You entered %s as your favorite color!\n\n", color);
  
  return 0;
}

// Enter your favorite color: yellow
// You entered yellow as your favorite color!
```

Note that the above program reads a string into a character array with initialized and allocated memory `char color[12] = {'\0'};`, but what about reading strings from standard input for which you do not know the string length?

It might be natural to assume you can use the standard library's `scanf()` function to capture and assign string data from standard input to a variable. Be aware that this might not work for some compilers. For now, use initialized character arrays with sufficient memory allocated to read strings from standard input.

## String Arrays

You can create an array of strings with a one-dimensional pointer array and assign string literals to it or you can create a two-dimensional pointer array, allowing C to reserve enough memory for each character array.

```c
#include <stdio.h>

int main() {
  char *strNames[5] = {0};
  int x;
  
  strNames[0] = "Matthew";
  strNames[1] = "Billy";
  strNames[2] = "Cassie";
  strNames[3] = "Dean";
  strNames[4] = "Sammy";
  
  printf("\nNames in pointer array of type char:\n\n");
  
  for ( x = 0; x < 5; x++ ) {
    printf("%s\n", strNames[x]);
  }
  
  return 0;
}
```

In the above program, it is very important to note that this *array of strings is really an array of character pointers.* C is able to treat each element in the array as a string due to the use of string literals, *which C places in protected memory*.

## Converting Strings to Numbers

When dealing with ASCII characters, how do you differentiate between numbers and letters?

First, programmers assign like characters to various data types, such as characters (`char`) and integers (`int`), to differentiate between numbers and letters. This is a straightforward and well-understood approach for differentiating between data types. But there are less defined occasions when programmers will need to convert data from one type to another. Such as when you want to convert a string to a number.

Fortunately, the C standard library (`stdlib`) provides a few functions that help convert strings to numbers.

- `atof()`: converts a string to a floating-point number
- `atoi()`: converts a string to an integer

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  char *str1 = "13.42";
  char *str2 = "987";
  float x;
  int y;
  
  printf("\nString 1 is \"%s\"\n", str1);
  printf("String 2 is \"%s\"\n", str2);
  
  x = atof(str1);
  y = atoi(str2);
  
  printf("\nString 1 converted to a float is %.2f\n", x);
  printf("String 2 converted to an integer is %d\n", y);
  
  return 0;
}

// String 1 is "13.42"
// String 2 is "987"

// String 1 converted to a float is 13.42
// String 2 converted to an integer is 987
```

#### Example

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  char *str1 = "37";
  char *str2 = "20";
  int iResult;
  
  iResult = atoi(str1) + atoi(str2);
  printf("\nString 1 (\"%s\") + String 2 (\"%s\") is %d.\n", str1, str2, iResult);
  
  return 0;
}

// String 1 ("37") + String 2 ("20") is 57.
```

## Manipulating Strings

It is common to want to manipulate string data, convert case, and more.

- `strlen()`: The **string length** function (from `<string.h>` library) takes a reference to a string and returns the numeric length up to, but not including, the `NULL` or terminating character.
- `tolower()` and `toupper()`: These functions (from `<ctype.h>` library) provide an easy way to convert a **single character** to either uppercase or lowercase. To convert an array of characters you can use a loop with these functions.
- `strcpy()`: This function copies the contents of one string into another string. It takes two strings as arguments. The first argument is the string to be copied into and the second argument is the string that will be copied from. After copying string two into string one, the function returns the value of string one.
- `strcat()`: This function () takes two strings and concatenates one string to another. After concatenating the two strings, argument one and argument two, the function returns the new value in string one, or the first argument.

#### strlen() Example

```c
#include <stdio.h>
#include <string.h>

int main() {
  char *str1 = "Star Wars";
  char str2[] = "Marvel Cinematic Universe";
  
  printf("\nThe length of string 1 is %lu\n", strlen(str1));
  printf("The length of string 2 is %lu\n", strlen(str2));
  
  return 0;
}

// The length of string 1 is 9
// The length of string 2 is 25
```

#### tolower() / toupper() Example

```c
#include <stdio.h>
#include <ctype.h>
#include <string.h>

//function prototypes
void convertL(char *);
void convertU(char *);

int main() {
  char stringOne[] = "Star Wars";
  char stringTwo[] = "Marvel Cinematic Universe";
  
  convertL(stringOne);
  convertU(stringTwo);
  
  return 0;
}

void convertL(char *str) {
  int x;
  
  for (x = 0; x <= strlen(str); x++)
    str[x] = tolower(str[x]);
  
  printf("\nFirst string converted to lower case is %s\n", str);
}

void convertU(char *str) {
  int x;
  
  for (x = 0; x <= strlen(str); x++)
    str[x] = toupper(str[x]);
  
  printf("Second string converted to upper case is %s\n", str);
}

// First string converted to lower case is star wars
// Second string converted to upper case is MARVEL CINEMATIC UNIVERSE
```

#### strcpy() Example

```c
#include <stdio.h>
#include <string.h>

int main() {
  char str1[11];
  char *str2 = "C Language";
  
  printf("\nString 1 now contains %s\n", strcpy(str1, str2));
  
  return 0;
}

// String 1 now contains C Language
```

#### strcat() Example

```c
#include <stdio.h>
#include <string.h>

int main() {
  char str1[40] = "Computer Science ";
  char str2[] = "is applied mathematics";
  
  printf("\n%s\n", strcat(str1, str2));
  
  return 0;
}

// Computer Science is applied mathematics
```

## Analyzing Strings

The following two functions, from the string-handling library `<string.h>` are used to perform various analyses of strings.

- `strcmp()`: This function is primarily used to compare two strings for equality.
- `strstr()`: This function takes two strings as arguments and searches the first string for an occurrence of the second string.

#### strcmp() Example

```c
#include <stdio.h>
#include <string.h>

int main() {
  char *str1 = "A";
  char *str2 = "A";
  char *str3 = "!";
  
  printf("\nstr1 = %s", str1);
  printf("\nstr2 = %s", str2);
  printf("\nstr3 = %s\n", str3);
  printf("\nstrcmp(str1, str2) = %d", strcmp(str1, str2));
  printf("\nstrcmp(str1, str3) = %d", strcmp(str1, str3));
  printf("\nstrcmp(str3, str1) = %d\n", strcmp(str3, str1));
  
  if ( strcmp(str1, str2) == 0 )
    printf("\nLetter A is equal to letter A\n");

  if ( strcmp(str1, str3) > 0 )
    printf("Letter A is greater than character !\n");
  
  if ( strcmp(str3, str1) < 0 )
    printf("Character ! is less than letter A\n");
  
  return 0;
}

// str1 = A
// str2 = A
// str3 = !

// strcmp(str1, str2) = 0
// strcmp(str1, str3) = 32
// strcmp(str3, str1) = -32

// Letter A is equal to letter A
// Letter A is greater than character !
// Character ! is less than letter A
```

#### strstr() Example

```c
#include <stdio.h>
#include <string.h>

int main() {
  char *str1 = "Analyzing strings with the strstr() function";
  char *str2 = "ing";
  char *str3 = "xyz";
  
  printf("\nstr1 = %s", str1);
  printf("\nstr2 = %s", str2);
  printf("\nstr3 = %s", str3);
  
  if (strstr(str1, str2) != NULL) {
    printf("\n\nstr2 was found in str1");
  } else {
    printf("\nstr2 was not found in str1");
  }
  
  if (strstr(str1, str3) != NULL) {
    printf("\nstr3 was found in str1\n");
  } else {
    printf("\nstr3 was not found in str1\n");
  }
  
  return 0;
}

// str1 = Analyzing strings with the strstr() function
// str2 = ing
// str3 = xyz

// str2 was found in str1
// str3 was not found in str1
```

## Example Problems

---

#### Example One

---