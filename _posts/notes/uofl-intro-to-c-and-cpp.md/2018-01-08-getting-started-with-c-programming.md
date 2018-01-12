---
layout: article

permalink: /notes/getting-started-with-c-programming/

title: "Getting Started With C Programming"

subtitle: "UofL - Intro to C and C++"

excerpt: "These notes contain an introduction to C programming including primary data types, and conditions."

categories: notes

date: 2018-01-08
---

{% include /globalSections/toc.html %}

These notes contain an introduction to C programming including primary data types, and conditions.

## Getting Started With C Programming

C is a general purpose language which has been closely associated with the UNIX operating system for which it was developed - since the system and most of the programs that run it are written in C.

#### The main() Function

The beginning of every C program is the `main()` function.

>**An *algorithm* is a finite step-by-step process for solving a problem.** It can be as simple as a recipe to bake a cake, or as complicated as the process to implement an autopilot system for a 747 jumbo jet. Algorithms generally start off with a problem statement. It is this problem statement that programmers use to formulate the process for solving the problem. *Keep in mind that the process of building algorithms and algorithm analysis occurs before any program code has been written.*

The `main()` function is like any other programming function in that it groups like activities and can take in parameters (information) and pass back values (again, information). *What makes the `main()` function unique from other functions, however, is that the values it returns are returned to the operating system.*

The below prints "C you later" to the computer screen.

```c
#include <stdio.h> // standard input output library

main() {
  printf("\nC you later\n");
}
```

>Note the style of curly braces with C. The cardinal rule is to stick with the project's existing coding standard. However, the curly brace on a single line style is popular.

Be aware that not all C compilers support single line comments. The multi-line comment `/* */` is typically safer.

#### Program Statements

Many lines in C programs are considered *program statements*, which serve to control program execution and functionality. Many of these program statements must end with a statement terminator, `;`. Common program statements that do not require the the statement terminator are:

- comments,
- preprocessor directives(such as `#include` or `#define`),
- beginning and ending program block identifiers, and
- function definition beginnings (such as `main()`).

#### printf()

`printf()` is a function commonly used to display output to the computer screen. Like most functions, the `printf()` function takes a value as a parameter. Any text you want to display in the standard output must be enclosed by quotation marks.

#### Escape Sequences

>Escape sequences are specially sequenced characters used to format output.

- `\n`: Creates a new line
- `\t`: Moves the cursor to the next tab
- `\r`: Moves the cursor to the beginning of the current line
- `\\`: Inserts a backslash
- `\"`: Inserts a double quote
- `\'`: Inserts a single quote

#### Directives

When the C preprocessor encounters a pound sign, `#`, it performs certain actions depending on the *directive* that occurs prior to compiling. for example, `#include <stdio.h>` includes the library `stdio.h` with the program we're writing.

>The name `stdio.h` is short for **standard input output header file**. It contains links to various standard C library functions, such as `printf()`.

#### GCC Compiler

The gcc compiler is an ANSI standard C compiler. A C program goes through a lot of steps prior to becoming a running or executing program. The gcc compiler performs a number of tasks for you such as the following.

- Preprocesses the program code and looks for various directives.
- Generates error codes and messages, if applicable.
- Compilers program code into an object code and stores it temporarily on disk.
- Links any necessary library to the object code and creates an executable file and stores it on disk.

>Note that ANSI is an abbreviation for **American National Standard for Information Systems**. ANSI's common goal is to provide computing standards for people who use information systems.

#### Common Errors

Compiler errors are generally the result of syntax issues including:

- Missing program block identifiers.
- Missing statement terminators.
- Invalid preprocessor directives.
- Invalid Escape sequences.
- Invalid comment blocks.

A single error at the top of your program can cause cascading errors during compile time. *The best place to start debugging compile errors is with the first error.*

## Primary Data Types

Some primary data types are **integers**, **floating-point numbers**, and **characters**.

#### Integers

Integer data types hold a maximum of four bytes of information and are declared with the `int` (short for integer) keyword. You can also declare more than one variable on the same line using a single `int` declaration, as long as they're separated by commas:

```c
int x, y, z;
```

#### Floating-Point Numbers

Floating-point numbers are all numbers, including signed and unsigned decimal and fractional numbers. Singed numbers include positive and negative numbers whereas unsigned numbers can only include positive values. 

Use the `float` keyword to declare floating-point variable data types called `operand1`, `operand2`, and `result`.

```c
float operand1;
float operand2;
float result;
```

#### Characters

Character data types are representations of integer values known as *character codes*. For example, the character code 90 represents the letter Z, and character code 122 represents the letter z. In C, character variables are created using the `char` (short for character) keyword:

```c
char firstInitial;
char middleInitial;
char lastInitial;
```

#### Initializing Variables and the Assignment Operator

When variables are first declared, the program assigns the variable name (address pointer) to an available memory location. It is never safe to assume that the newly assigned variable location is empty. It's possible that the memory location contains previously used data (or garbage). **To prevent unwanted data from appearing in your newly created variables, initialize the new variables**:

```c
/* Declare variables */
int x;
char firstInitial;

/* Initialize variables */
x = 0;
firstInitial = '\0';
```

>Note that the character set `\0` is known as the `null` character. Single quotes are required when assigning data to the character data type.

The `null` data types are a commonly used to initialize memory locations in programming languages, such as C, and relational databases, such as Oracle and SQL Server. Null data is undefined.

You can also initialize your variables while declaring them:

```c
int x = 0;
char firstInitial = '\0';
```

#### Printing Variable Contents

To print the contents of variables, use the `printf()` function with a few new formatting options. Consider the following:

```c
#include <stdio.h>

main() {
  //variable declarations 
  int x;
  float y;
  char c;

  //variable initializations 
  x = -4443;
  y = 554.21;
  c = 'M';

  //printing variable contents to standard output 
  printf("\nThe value of integer variable x is %d", x);
  // The value of integer variable x is -4443
  printf("\nThe value of float variable y is %f", y); 
  // The value of float variable y is 554.21
  printf("\nThe value of character variable c is %c\n", c);
  // The value of character variable c is M
}
```

After initializing the variables, the `printf()` function and *conversion specifiers* are used to output each variable's contents to the screen.

#### Conversion Specifiers

>Conversion specifiers are comprised of two characters: The first character is the percent sign, and the second is a special character that tells the program how to convert the data.

- `%d`: Displays an integer value
- `%f`: Displays a floating-point value
- `%c`: Displays a character (or symbol)
- `%lf`: Displays a double value
- `%%`: Displays a % character

#### Another Example:

```c
float result;
result = 3.123456;
printf("The value of result is %f", result);
```

Note that you can adjust the conversion specifier using numbering schemes between the % and the f character:

```c
printf("%.1f", 3.123456); 
// 3.1
printf("\n%.2f", 3.123456); 
// 3.12
printf("\n%.3f", 3.123456); 
// 3.123
printf("\n%.4f", 3.123456); 
// 3.1234
printf("\n%.5f", 3.123456); 
// 3.12345
printf("\n%.6f", 3.123456);
// 3.123456
```

Note the included escape sequence `\n` in each preceding print statement so that the output isn't all on one line.

#### Another Example:

```c
char firstInitial, middleInitial, lastInitial; firstInitial = 'M';
middleInitial = 'T';
lastInitial = 'L';
printf("My Initials are %c.%c.%c.", firstInitial, middleInitial, lastInitial);
// My Initials are M.T.L.
```

#### Constants

>Often referred to as read-only variables, constant data types cannot lose their data values during program execution. They are most commonly used when you need to reuse a common data value without changing it. The keyword `const` precedes the data-type name, signaling that this is a read-only variable or constant.

```c
const int x = 20;
const float PI = 3.14;

printf("\nConstant values are %d and %.2f\n", x, PI);
// Constant values are 20 and 3.14
```

#### Programming Conventions and Styles

>Once you pick or become comfortable with a programming style, the name of the game is **consistency**.

#### White Space

Compilers ignore white space, so you're free to treat it as you may.

#### Curly Braces

The choice is yours with where curly braces are placed too! The important thing is balancing style and what is comfortable as well as staying consistent with what others are using on your team.

#### Variable Naming Convention

Use uppercase and lowercase lettters appropriately. Such as camelCase.

#### The scanf() Function

The `scanf()` function is a way to receive input from users. It is another built in function provided by the standard input output library, `<stdio.h>`; it reads standard input from the keyboard and stores it in previously declared variables. It takes two arguments: `scanf("conversion specifier", variable);`.

The "conversion specifier" argument tells the `scanf()` function how to convert the incoming data. Recall, these are `%d`, `%f`, and `%c`.

#### Example:

```c
#include <stdio.h>

main() {
  int iOperand1 = 0;
  int iOperand2 = 0;

  printf("Enter first operand: ");
  scanf("%d", &iOperand1);
  printf("Enter second operand: ");
  scanf("d", &iOperand2);
  printf("The result is %d\n, iOperand1 + iOperand2");
}
```

Note that the second operator is an address operator, `&`, followed by the name of the variable.

Essentially, the address operator contains a pointer to the location in memory where your variable is located.

>Forgetting to place the address operator, `&`, in front of your variable in a `scanf()` function will not always generate compile errors, but it will cause problems with memory access during program execution.

#### Arithmetic in C

C enables programmers to perform all types of arithmetic. This includes the basics:

- `*`: multiplication.
- `/`: division.
- `%`: modulus (remainder).
- `+`: addition.
- `-`: subtraction.

#### Another Example:

```c
#include <stdio.h>

main(){
   float fRevenue, fCost;

   fRevenue = 0;
   fCost = 0;

  /* profit = revenue - cost */
  printf("\nEnter total revenue: ");
  scanf("%f", &fRevenue);
  printf("\nEnter total cost: ");
  scanf("%f", &fCost);
  printf("\nYour profit is $%.2f\n", fRevenue - fCost);
}
```

#### Another Example:

```c
#include <stdio.h>

int main() {
  float cent, inch;

  printf("Please enter length in centimeters: ");
  scanf("%f", &cent);
  printf("%.2f centimeters is equal to %.2f inches!\n", cent, cent/2.5);

  return 0;
}
```

## Conditions