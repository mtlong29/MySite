---
layout: article

permalink: /notes/functions-and-arrays-in-c/

title: "Functions and Arrays in C"

subtitle: "UofL - Intro to C and C++"

excerpt: "These notes continue an introduction to C programming including structured programming, functions and arrays."

categories: notes

date: 2018-01-21
---

{% include /globalSections/toc.html %}

These notes continue an introduction to C programming including structured programming, functions and arrays.

## Introduction to Structured Programming

>Structured programming enables programmers to break problems into small and easily understood components that eventually will comprise a complete system.

This section covers:

- structured programming,
- function prototypes,
- function definitions,
- function calls, and
- variable scope.

In C, these broken up manageable components are known as **functions**.

A top-down approach is essentially breaking down a system to gain understanding of its sub-parts. An overview is first formulated identifying subsystems. Each subsystem is then refined in greater detail. This design allows us to reuse code!

#### Code Reusability

In the world of application development, code reusability is implemented as functions in C. Specifically, programmers create user-defined functions for problems that generally need frequently used solutions.

Some existing functions that are reused frequently are:

- `printf()`
- `scanf()`
- `isdigit()`
- `islower()`
- `isupper()`
- `tolower()`
- `toupper()`
- `sqrt()`
- `pow()`
- `abs()`
- `exp()`

#### Information Hiding

Information hiding is a conceptual process by which programmers conceal implementation details into functions. Functions can be seen as black boxes. A black box is simply a component, logical or physical, that performs a task. You don't know how the black box performs (implements) the task; you just know it works when needed.

### Function Prototypes

>Function prototypes tell C how your function will be built and used. **It is a common programming practice to construct your function prototype before the actual function is built.**

The function prototype tells C the following things about the function:

- the data type returned by the function,
- the number of parameters received,
- the data types of parameters, and
- the order of the parameters.

The following example is a function prototype.

```c
void printBalance(int); // function prototype
```

>The `void` keyword tells C that the function `printBalance` will not return a value. In other words, **the function is void of a return value**.

```c
int createRandomNumber(void); // function prototype
```

>The `void` keyword in the parameter list of `createRandomNumber` tells C that this function will not accept any parameters, but will return an integer value. In other words, **the function is void of parameters**.

Function prototypes should be placed outside the `main()` function as well as before the `main()` function starts:

```c
#include <stdio.h>

int addTwoNumbers(int, int); // function prototype

main() {

}
```

#### Example

```c
int addTwoNumbers(int, int); // function prototype
int subtractTwoNumbers(int, int); // function prototype
int divideTwoNumbers(int, int); // function prototype
int multiplyTwoNumbers(int, int); // function prototype

main() {

}
```

### Function Definitions

**Function definitions implement the function prototype.** The first line of the function definition (also known as the header) resembles the function prototype.

#### Example

```c
#include <stdio.h>

// function prototype
int addTwoNumbers(int, int);

main() {

}

// function definition
int addTwoNumbers(int numOne, int numTwo) {
  return numOne + numTwo;
}
```

There are two separate complete functions: the `main()` function and the `addTwoNumbers()` function. The function header contains actual variable names for parameter and the function prototype contains only the data type.

*Sometimes it is not necessary for a function to return any value.*

>To build a program that implements multiple function definitions, build each function definition as stated in each function prototype.

### Function Calls

To put your function to work you have to call it.

```c
#include <stdio.h>

// function prototype
int addTwoNumbers(int, int);

int main() {
  int result;
  
  // function call
  result = addTwoNumbers(2, 3);
  
  printf("%d\n", result);
  
  return 0;
}

// function definition
int addTwoNumbers(int numOne, int numTwo) {
  return numOne + numTwo;
}
```

When C encounters a function call, it redirects program control to the function definition. If the function definition return a value, the entire function call statement is replaced by the return value.

#### Example

```c
#include <stdio.h>

// function prototype
int addTwoNumbers(int, int);

int main() {
  int firstVal, secondVal, result;
  
  // function call
  printf("please enter the first value: ");
  scanf("%d", &firstVal);
  printf("please enter the second value: ");
  scanf("%d", &secondVal);
  result = addTwoNumbers(firstVal, secondVal);
  
  printf("%d + %d = %d\n", firstVal, secondVal, result);
  
  return 0;
}

// function definition
int addTwoNumbers(int numOne, int numTwo) {
  return numOne + numTwo;
}
```

#### Variable Scope

>Variable scope identifies and determines the life span of any variable in any programming language. When a variable loses its scope, it means its data value is lost.

#### Local Scope

>Local variables are defined in functions, and lose their scope each time the function is executed.

#### Global Scope

Locally scoped variables can be reused in other functions without harming one anothers contents. At times, however, you might want to share data between and across functions. To support the concept of sharing data, you can create and use *global variables*.

>Global variables are created and defined outside any function. Not a good idea to use global variables because you lose control when everyone has access.

## Arrays

>Arrays allow you to build collections of like variables.

Arrays in C are created in similar fashion to other variables:

```c
int myArray[10];
```

The preceding declaration creates a single-dimension, integer-based array called myArray, which contains 10 elements. 

Arrays can be declared to contain other data types as well:

```c
float avengers[30]; // float data type array with 30 elements
double results[3]; // double data type array with 3 elements
short salaries[9]; // short data type array with 9 elements
char name[19]; // char array with 18 character elements and one null character
```

>In C, memory spaces are not cleared from their previous value when variables or arrays are created. Because of this, **it is generally good programming practice to not only initialize your variables by also initialize your arrays.**

There are two ways to *initialize your arrays*: within the array declaration and outside of the array declaration. The first way, you simply assign one or more comma-separated values within braces to the array in the array's declaration.

```c
int someArray[5] = {0, 1, 2, 3, 4}
```

>You can **quickly initialize your arrays** with a single default value such as `int someArray[5] = {0};`.

Another way to initialize your array elements is to use looping structures:

```c
#include <stdio.h>

int main() {
  int x;
  int myArray[5];

  for (x = 0; x < 5; x++) {
    myArray[x] = 0;
  }

  return 0;
}
```

In the preceding program, two variables, one integer called `x`, which is used in the foor loop, and one integer array called `myArray`. Five iterations take place and each iteration the number `0` is assigned to each element of the array, which are easily accessed with the counter variable `x`.

There are times when only a single element of an array is needed. This can be accomplished in one of two manners: hard-coding a number value for the index or using variables. Hard-coding a number value for the index would look like:

```c
printf("\nThe value of index 4 is %d\n.", myArray[3]);
```

A more dynamic way of accessing a single element is to use variables.

```c
#include <stdio.h>

int main() {
  int x;
  int iIndex = -1;
  int iArray[5];
  
  for (x = 0; x < 5; x++) {
    iArray[x] = (x + 5);
  } // creates an array {5, 6, 7, 8, 9}
  
  do {
    printf("\nEnter a valid index (0-4): ");
    scanf("%d", &iIndex);
  } while(iIndex<0||iIndex>4);
  
  printf("\nThe value of index %d is %d.\n", iIndex, iArray[iIndex]);
 
  return 0;
}

// Enter a valid index (0-4): 3
// The value of index 3 is 8.
```

Character arrays should also be initialized before using them. **Elements in a character array hold characters plus a special null termination character, which represented by the character constant '/0'.** Character arrays can be initialized in a number of ways such as the following:

```c
char name[] = {'M', 'a', 't', 't', 'h', 'e', 'w', '\0'};
```

The other way:

```c
char name[] = {"Matthew"};
```

The above way initializes a character array with a character sequence surrounded by **double quotes**, which **appends the null character automatically**.

#### Searching One-Dimensional Arrays

The concept of searching an array using a for loop:

```c
#include <stdio.h>

int main() {
  int x, usersValue, iFound = -1; // initialize values
  
  // create array that will be searched
  int myArray[5] = {4, 3, 2, 1, 0};
  
  // get value to search for from user
  printf("\nEnter value to search for: ");
  scanf("%d", &usersValue);
  
  // search through myArray
  for (x = 0; x < 5; x++) {
    if (myArray[x] == usersValue) {
      iFound = x;
      break;
    }
  }
  
  // check if the found value has changed from -1 to an index in myArray
  if (iFound > -1) {
    printf("\nI found your search value in element with index %d!\n", iFound);
  } else {
    printf("\nSorry, your search value was not found.\n");
  }
  
  return 0;
}

// Enter value to search for: 4
// I found your search value in element with index 0!
// Enter value to search for: 1
// I found your search value in element with index 3!
// Enter value to search for: 5
// Sorry, your search value was not found.
```

### Two-Dimensional Arrays

Two-dimensional arrays are even more interesting structures. *The **easiest** way to understand or think about two-dimensional arrays is to visualize a table with rows and columns.*

Two dimensional arrays are created similar to one-dimensional arrays, but with one exception: **two-dimensional arrays must be declared with two separate element numbers** (number of columns and number of rows) such as:

```c
int myTwoDimensionalArray[3][3];
```

#### Initializing Two-Dimensional Arrays

You can initialize a two-dimensional array in a couple of ways. The most obvious:

```c
int someTwoDimensionalArray[3][3] = {% raw %}{{0, 1, 2}, {3, 4, 5}, {6, 7, 8}};{% endraw %}
```

Each grouping of braces initializes a single row of elements. Meaning `someTwoDimensionalArray[0][0]` gets `0`, `someTwoDimensionalArray[1][2]` gets `5`, and `someTwoDimensionalArray[2][0]` gets `6`.

You can also use looping structures such as a `for` loop to initialize your two-dimensional arrays. Essentially, you must create a nested looping structure for searching or accessing each element.

```c
#include <stdio.h>

int main() {
  int twoDArray[3][3];
  int x, y;
  
  // create two-dimensional array
  for (x = 0; x <= 2; x++) {
    for (y = 0; y <= 2; y++) {
      twoDArray[x][y] = (x + y);
    }
  }
  
  // "search" two-dimensional array
  for (x = 0; x <= 2; x++) {
    for (y = 0; y <= 2; y++) {
      printf("twoDArray[%d][%d] = %d\n", x, y, twoDArray[x][y]);
    }
  }
  
  return 0;
}

// twoDArray[0][0] = 0
// twoDArray[0][1] = 1
// twoDArray[0][2] = 2
// twoDArray[1][0] = 1
// twoDArray[1][1] = 2
// twoDArray[1][2] = 3
// twoDArray[2][0] = 2
// twoDArray[2][1] = 3
// twoDArray[2][2] = 4
```

When searching two-dimensional arrays you must use the nested looping techniques. The above architecture of the nested looping structure is a recurring theme when dealing with two-dimensional arrays. More specifically, **you must your two loops to search a two-dimensional array: one loop to search the rows and an inner loop to search each column for the outer loop's row**.

---

### Example Problems

#### Example One

Build a program that uses a single-dimension array to store 10 numbers input by a user.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  system("clear"); // clear console on mac
  
  // initialize variables
  int i, x, order;
  
  // initialize one dimensional array
  int yourArray[10];
  
  printf("\n-----------------------------");
  printf("\nLets built an array together!");
  printf("\n-----------------------------\n\n");
  
  // get ten numbers from user
  for(i = 0; i < 10; i++) {
    printf("Please enter the %d index value (integer only) for your array: ", i);
    scanf("%d", &yourArray[i]);
  }
  
  // display the array to the user!
  printf("\nYour array of ten integers: ");
  
  for (i = 0; i < 10; i++) {
    printf("%d ", yourArray[i]);
  }
  
  printf("\n\n");
  
  return 0;
}
```
---