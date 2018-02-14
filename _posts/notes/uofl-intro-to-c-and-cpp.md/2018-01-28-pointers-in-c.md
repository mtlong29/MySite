---
layout: article

permalink: /notes/pointers-in-c/

title: "Pointers in C"

subtitle: "UofL - Intro to C and C++"

excerpt: "These notes continue an introduction to C programming focused on pointers."

categories: notes

date: 2018-01-28
---

{% include /globalSections/toc.html %}

These notes continue an introduction to C programming focused on pointers.

>Pointers is what makes C one of the most robust languages in the computing industry for building unparalleled efficient and powerful programs.

## Pointer Fundamentals

>Pointers are very powerful structures that can be used by C programmers to work with variables, functions, and data structures through their memory addresses.

Pointers are variables that most often contain a memory address as their value. In other words, a **pointer variable contains a memory address that points to another variable**.

Say we have an integer variable called `iResult` that contains the value `75` with memory address `0x948311`. Now, say we have a pointer variable called `myPointer`, which does not contain a data value, but instead contains a memory address of `0x948311` , which is the same memory address as `iResult`. This means that `myPointer` indirectly points the the value of `75`. **This concept is known as indirection and is an essential pointer concept.**

>Actually, an array name is nothing more than a pointer to the start of the array.

## Declaring and Initializing Pointer Variables

>Pointer variables must be declared before they can be used.

```c
int x = 0;
int iAge = 30;
int *ptrAge; // this is a pointer but isnt pointing to anything
```

>Simply place the **indirection operator, `*`** in front of the variable name to declare a pointer.

To indirectly reference a value through a pointer, you must assign an address to the pointer:

```c
ptrAge = &iAge;
```

In this statement, the memory address of the `iAge` variable is assigned to the pointer variable `ptrAge`. indirection in this case is accomplished by placing the **unary operator, `&`** in front of the variable `iAge`. This statement is telling C to assign the memory address of `iAge` to my pointer variable `ptrAge`.

>The unary operator, `&`, is often referred to as the "address of" operator because, in the above case, my pointer `ptrAge` is receiving the "address of" `iAge`.

We can also assign a variable to a pointer variable:

```c
x = *ptrAge;
```

**Not initializing your pointer variables can result in invalid data or invalid expression results. Pointer variables should always be initialized with another variables memory address, or with `0`, or with the keyword `NULL`.** The following are valid pointer initializations:

```c
int *ptr1;
int *ptr2;
int *ptr3;

ptr1 = &x;
ptr2 = 0;
ptr3 = NULL;
```

>Remembering that pointer variables can only be assigned **memory addresses**, **`0`**, or **`NULL`** is the first step in learning to work with pointers.

```c
#include <stdio.h>

int main() {
  int x = 5;
  int *myPointer;

  myPointer = 5; // this is wrong
  myPointer = x; // this is wrong

  myPointer = &x; // myPointer is assigned the address of x
  *myPointer = 7; // the value of x is indirectly changed to 7;

  return 0;
}
```

## Printing Pointer Variable Contents

>To verify indirection concepts, print the memory address of pointers and non-pointer variables using the `%p` conversion specifier.

```c
#include <stdio.h>

int main() {
  
  int x = 17;
  int *myPointer;
  
  myPointer = &x;
  
  printf("\nmyPointer has memory address %p, and value %d.", myPointer, *myPointer);
  printf("\nx has memory address %p, and value %d.\n", &x, x);
  
  return 0;
}

// myPointer has memory address 0x7ffee411cb48, and value 17.
// x has memory address 0x7ffee411cb48, and value 17.
```

## Functions and Pointers

One of the greatest benefits of using pointers is the ability to pass arguments to functions by reference. By default, arguments are passed by value in C, which involves making a copy of the incoming argument for the function to use. 

*Depending on the storage requirements of the incoming argument, this may not be the most efficient use of memory.* Consider the following:

```c
#include <stdio.h>

int addTwoNumbers(int, int);

int main() {
  int x = 0;
  int y = 0;
  
  printf("\nEnter first number: ");
  scanf("%d", &x);
  printf("\nEnter second number: ");
  scanf("%d", &y);
  printf("\nResult is %d\n", addTwoNumbers(x, y));
  
  return 0;
  
}

int addTwoNumbers(int x, int y) {
  return x + y;
}
```

In the above two integer arguments are passed to `addTwoNumbers()`. C reserves extra memory space to make a copy of variables `x` and `y` which are sent to the function.

>Passing arguments by value is not the most efficient programming means for programming in C. When C passes arguments by value you are unable to modify the original contents of the incoming parameters.

Making copies of two integer variables may not seem like a lot of work, but in the real world, **C programmers must strive to minimize memory use as much as possible**. This is similar to embedded circuit design where your memory resources are very limited. When C passes arguments by value you are unable to modify the original contents of the incoming parameters. This is because C has made a copy of the original variable and hence only the copy is modified. *This can be good and bad.* For example, you may not want the receiving function modifying the variable's original contents and in this case passing arguments by value is preferred. Moreover, passing arguments by value is one way programmers can implement information hiding.

The below code attempts to modify the incoming parameter by increasing it by five. The argument appears to be modified when it's contents is printed in `demoPassByValue()`'s `printf()` function. However, when `x` is printed in the `main()` function it has not been modified.

```c
#include <stdio.h>

void demoPassByValue(int);

int main() {
  int x = 0;
  
  printf("\nEnter a number: ");
  scanf("%d", &x);
  demoPassByValue(x);
  printf("The original value of x did not change: %d\n", x);
  
  return 0;
}

void demoPassByValue(int x) {
  x += 5;
  printf("The value of x is: %d\n", x);
}

// Enter a number: 5
// The value of x is: 10
// The original value of x did not change: 5
```

**To solve this problem, you use pointers to pass arguments by reference.** You can pass the address of the variable (argument) to the function using **indirection**:

```c
#include <stdio.h>

void demoPassByReference(int *);

int main() {
  int x = 0;
  
  printf("\nEnter a number: ");
  scanf("%d", &x);
  demoPassByReference(&x);
  printf("\nThe original value of x is: %d\n", x);
  
  return 0;
}

void demoPassByReference(int *ptrX) {
  *ptrX += 5;
  printf("\nThe value of x is now: %d\n", *ptrX);
}
```

To pass arguments by reference, you need to be aware of a few subtle differences in the previous code. The first noticeable difference is in the function prototype:

```c
void demoPassByReference(int *);
```

C is told that the function will take a pointer as an argument by the `*` operator after the data type. The next slight difference is in the function call, which passes the memory address of the variable `x` by placing the unary `&` operator in front of the variable:

```c
demoPassByReference(&x);
```

The other indirection activities are preformed in the function implementation where I tell the function header to expect an incoming parameter (pointer) that points to an integer value. **This is known as passing by reference!**

```c
void demoPassByReference(int *ptrX) {}
```

To modify the original contents of the argument, the indirection operator, `*`, must be used, which tells C to access the contents of the memory location contained in the pointer variable.

```c
*ptrX += 5;
```

Lastly, the `printf()` function prints the pointers contents:

```c
printf("\nThe value of x is now: %d\n", *ptrX);
```

If the indirection operator `*`, isn't placed in front of a pointer in a print statement that displays a number with the `%d` conversion specifier, C will print a numeric representation of the pointer address.

```c
printf("\nThe value of x is now: %d\n", ptrX); //this is wrong 
printf("\nThe value of x is now: %d\n", *ptrX); //this is right
```

Note that it is necessary to place an ampersand, `&` ("address of" operator), in front of variables in the `scanf()` functions, because the address operator provides the `scanf()` function the memory address to which C should write the data type in from the user.

## Passing Arrays to Functions

Arrays are groupings of contiguous memory segments and the array name itself is a pointer to the first memory location in the contiguous memory segment.

>Arrays and pointers are closely related in C.

Passing an array name to a pointer assigns the first memory location of the array to the pointer variable. To demonstrate this concept:

```c
#include <stdio.h>

int main() {
  int iArray[5] = {42,2,3,4,5};
  int *iPtr = iArray;
  
  printf("\nAddress of pointer: %p\n", iPtr);
  printf("First address of array: %p\n", &iArray[0]);
  printf("Pointer points to: %d\n", *iPtr);
  printf("First element of array contains: %d\n", iArray[0]);
  
  return 0;
}

// Address of pointer: 0x7ffedfd11b30
// First address of array: 0x7ffedfd11b30
// Pointer points to: 42
// First element of array contains: 42
```

Knowing that an array name contains a memory address that points to the first element in the array, you can surmise that array names can be treated much like a pointer when passing arrays to functions.

>It is not necessary to deal with unary `&` or indirection `*` operators when passing arrays to functions. More importantly, **arrays passing as arguments are passed by reference automatically.**

To pass an array to a function, you need to define your function prototype and define so that they expect to receive an array as an argument. Consider the following:

```c
#include <stdio.h>

int nameLength(char []);

int main() {
  char aName[20] = {'\0'};
  
  printf("\nEnter your first name: ");
  scanf("%s", aName);
  printf("Your first name contains ");
  printf("%d characters\n", nameLength(aName));
  
  return 0;
}

int nameLength(char name[]) {
  int x = 0;
  
  while (name[x] != '\0') {
    x++;
  }
  
  return x;
}
// Enter your first name: Matthew
// Your first name contains 7 characters
```

You can build your function prototype to receive an array as an argument by placing empty brackets in the argument list:

```c
int nameLength(char []);
```

This function prototype tells C to expect an array as an argument, and the function will receive the first memory address in the array. When calling the function, only pass the array name:

```c
printf("%d characters\n", nameLength(aName));
```

Note the "address of" operator, `&` is not used in front of the array name in the `scanf()` function. *This is because an array name in C already contains a memory address, which is the address of the first element in the array.*

#### Example

```c
#include <stdio.h>

void squareNumbers(int []);

int main() {
  int x;
  int iNumbers[3] = {2, 4, 6};
  
  printf("\nThe current array values are: ");
  
  for (x = 0; x < 3; x++) {
    printf("%d ", iNumbers[x]); // print contents of array
  }
  
  printf("\n");
  squareNumbers(iNumbers);
  printf("\nThe modified array values are: ");
  
  for (x = 0; x < 3; x++) {
    printf("%d ", iNumbers[x]); // print modified array contents
  }
  
  printf("\n");
  
  return 0;
}

void squareNumbers(int num[]) {
  int x;
  
  for (x = 0; x < 3; x++) {
    num[x] = num[x] * num[x]; // modify the array contents
  }
}

// The current array values are: 2 4 6 
// The modified array values are: 4 16 36 
```

## The Const Qualifier

There are times when you will want the power and speed of passing arguments by reference without the security risk of changing a variable's (argument) contents. C programmers can accomplish this with the `const` qualifier.

Recall, that the `const` qualifier allows you to create read-only arguments while still achieving the pass by reference capability:

```c
#include <stdio.h>

void printArgument(const int *);

int main() {
  int iNumber = 5;
  
  printArgument(&iNumber); //pass read-only argument
  
  return 0;
}

void printArgument(const int *num) {
  printf("Read Only Argument is: %d \n", *num);
}

// Read Only Argument is: 5 
```

Remembering that arrays are passed to functions by reference, you should know that function implementations can alter the original array's contents. *To prevent an array argument from being altered in a function, use the `const` qualifier.

You can pass an array to a function as read-only by using the `const` qualifier. To do so, use `const` in the function prototype and function definition.

```c
#include <stdio.h>

void modifyArray(const int []);

int main() {
  int iNumbers[3] = {2, 4, 6};
  
  modifyArray(iNumbers);
  
  return 0;
}

void modifyArray(const int num[]) {
  int x;
  
  for (x = 0; x < 3; x++) {
    num[x] = num[x] * num[x]; // this will not work because it's a read only array
  }
}

// error: read-only variable is not assignable
```

## Example Problems 

---

#### Example One

Build a program that performs the following operations:
  - Declares three pointer variables called iPtr of type int, cPtr of type char, and fPtr of type float
  - Declares three new variables called iNumber of int type, fNumber of float type, and cCharacter of char type
  - Assigns the address of each non-pointer variable to the matching pointer variable
  - Prints the value of each non-pointer variable
  - Prints the value of each pointer variable
  - Prints the address of each non-pointer variable
  - Prints the address of each pointer variable

```c
 #include <stdio.h>

 int main() {

   // Declares three pointer variables called iPtr of type int, cPtr of type char, and fPtr of type float
   int *iPtr;
   float *fPtr;
   char *cPtr;

   // Declares three new variables called iNumber of int type, fNumber of float type, and cCharacter of char type
   int iNumber;
   float fNumber;
   char cCharacter;

   // Assigns the address of each non-pointer variable to the matching pointer variable
   iPtr = &iNumber;
   fPtr = &fNumber;
   cPtr = &cCharacter;
  
   // Prints the value of each non-pointer variable
   printf("%d\n", iNumber);
   printf("%f\n", fNumber);
   printf("%c\n", cCharacter);

   // Prints the value of each pointer variable
   printf("%d\n", *iPtr);
   printf("%f\n", *fPtr);
   printf("%c\n", *cPtr);

   // Prints the address of each non-pointer variable
   printf("%p\n", &iNumber);
   printf("%p\n", &fNumber);
   printf("%p\n", &cCharacter);

   // Prints the address of each pointer variable
   printf("%p\n", iPtr);
   printf("%p\n", fPtr);
   printf("%p\n", cPtr);

   return 0;
 }
```

#### Example Two

Create a dice rolling game. The game should allow a user to toss up to six dice at a time. Each toss of a die  will be stored in a six- element integer array. The array will be created in the main() function, but passed to a new function called TossDie(). The TossDie() function will take care of generating random numbers from one to six.

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int tossDie(void);

int main() {
  system("clear"); // clear console each time program is ran
  srand(time(0)); // seed random generator in tossDie()

  int tossNum, i;
  int dieRolls[6];

  // get number of dice the user wants to throw 
  printf("Enter how many dice would you like to roll (1-6): ");
  scanf("%d", &tossNum);

  // check that user entered at least one die but fewer than seven
  if (tossNum >= 1 && tossNum < 7) {

    // call tossDie() function once for every die thrown and add value to the array dieRolls
    for (i = 0; i < tossNum; i++) {
      dieRolls[i] = tossDie();
    }

    printf("Your dice rolls are: ");

    for (i = 0; i < tossNum; i++) {
      printf("\n\t%d ", dieRolls[i]);
      printf("(with address %p)", &dieRolls[i]);
    }

    printf("\n\n");

  } else {
    printf("\nThat is an invalid number of dice :(\n\n");
  }

  return 0;
}

/// toss die function
int tossDie(void) {
  int randomNum = 0;

  randomNum = (rand() % 6) + 1;

  return randomNum;
}
```

---