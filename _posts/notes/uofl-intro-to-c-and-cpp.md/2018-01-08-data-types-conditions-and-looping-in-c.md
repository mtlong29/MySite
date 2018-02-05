---
layout: article

permalink: /notes/data-types-conditions-and-looping-in-c/

title: "Data Types, Conditions, and Looping in C"

subtitle: "UofL - Intro to C and C++"

excerpt: "These notes contain an introduction to C programming including primary data types, conditions (if and switch statements), and looping structures(while, do while, and for loops)."

categories: notes

date: 2018-01-08
---

{% include /globalSections/toc.html %}

These notes contain an introduction to C programming including primary data types, conditions (if and switch statements), and looping structures(while, do while, and for loops).

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

### Escape Sequences

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

### Conversion Specifiers

>Conversion specifiers are comprised of two characters: The first character is the percent sign, and the second is a special character that tells the program how to convert the data.

- `%d`: Displays an integer value
- `%f`: Displays a floating-point value
- `%c`: Displays a character (or symbol)
- `%lf`: Displays a double value
- `%%`: Displays a % character

#### Example

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

#### Example

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

#### Example

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

#### Example

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

#### Example

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

---

### Example Problems

#### Example One

Given a = 5, b = 1, x = 10, and y = 5. Output the result of the formula f = (a − b)(x − y) using a single printf() function.

```c
#include <stdio.h>

int main() {
  int a = 5;
  int b = 1;
  int x = 10;
  int y = 5;
  
  printf("%d\n", (a-b)*(x-y));
  
  return 0;
}
```

#### Example Two

Create a program that uses the same formula above to output the result; this time, however, prompt the user for the values a, b, x, and y.

```c
#include <stdio.h>

int main() {
  int a, b, x, y;
  
  printf("Give an integer value for a: ");
  scanf("%d", &a);
  printf("Give an integer value for b: ");
  scanf("%d", &b);
  printf("Give an integer value for x: ");
  scanf("%d", &x);
  printf("Give an integer value for y: ");
  scanf("%d", &y);
  
  printf("The equation (%d-%d)*(%d-%d) evaluates to %d.\n", a, b, x, y, (a-b)*(x-y));
  
  return 0;
}
```

#### Example Three

Create a new program that prompts a user for numbers and determines total revenue using the following formula: Total Revenue = Price * Quantity.

```c
#include <stdio.h>

int main() {
  float price, quantity;
  
  printf("What is the price of the product? ");
  scanf("%f", &price);
  printf("What is the number of products you\'re selling? ");
  scanf("%f", &quantity);
  
  printf("The total revenue equals price times quantitiy.\ntotal revenue = price * quantity = $%.2f * %.0f = $%.2f.\n", price, quantity, price*quantity);
  
  return 0;
}
```

#### Example Four

Build a new program that prompts a user for data and determines a commission using the following formula: Commission = Rate * (Sales Price – Cost).

```c
#include <stdio.h>

int main() {
  float rate, salesPrice, cost;
  
  printf("Commission is calculated by Rate * (Sales Price - Cost).\n");
  printf("Enter the rate: ");
  scanf("%f", &rate);
  printf("Enter the sales price: ");
  scanf("%f", &salesPrice);
  printf("Enter the cost: ");
  scanf("%f", &cost);
  
  printf("The commission for this sale is %.2f * ($%.2f - $%.2f) = $%.2f\n", rate, salesPrice, cost, rate*(salesPrice-cost));
  
  return 0;
}
```

---

## Conditions

>Conditions (often called *program control*, *decisions*, or *expressions*) allow you to make decisions about program directions.

Important conditional topics are

- algorithms for conditions,
- simple `if` structure,
- nested `if` structure,
- boolean algebra,
- compound `if` structures and input validations,
- the `switch` structure, and
- random numbers.

#### Algorithms for Conditions

Algorithms are the foundation for computer science.

Conditional operators are a key factor when building and evaluating expressions in pseudo code, flowcharts, or any programming language. Operators used in C:

- `==`: Equal (two equal signs)
- `!=`: Not equal
- `>`: Greater than
- `<`: Less than
- `>=`: Greater than or equal to
- `<=`: Less than or equal to

>When conditional operators are used to build expressions (conditions), the result is either `true` or `false`.

*Pseudo code* is frequently used by programmers to aid in developing algorithms.

Consider the following problem statement: *Allow a customer to deposit or withdraw money from a bank account, and if a user elects to withdraw funds, ensure that sufficient monies exist*. Pseudo code can be used to assist in solving this problem:

```
if action == deposit
  Deposit funds into account
else
  if balance < withdraw amount
    Insufficient funds for transaction
  else
    Withdraw money
  end if
end if
```

Note that pseudo code may look slightly different based on the programming language that is to be used.

Flowcharts are also popular among computing analysts, *flowcharts* use graphical symbols to depict an algorithm or program flow. [Learn more on flowcharts](https://www.edrawsoft.com/explain-algorithm-flowchart.php).

### The If Structures

The if structure in C is similar to the above pseudo code!

```c
#include <stdio.h>

int main() {
  int temperature = 80;
  
  if (temperature >= 80) {
    // Turn AC on
    printf("\nThe AC has been turned on!\n");
  } else {
    // Leave AC off
    printf("\nThe AC will remain off!\n");
  }
 
  return 0;
}
```

Like other languages, the condition is checks to be `true` of `false`. If `false`, the `else` clause is taken.

#### Example

```c
#include <stdio.h>

int main() {
  int response = 0;
  
  printf("\n\tAC Control Unit\n");
  printf("\n1\tTurn the AC on\n");
  printf("2\tTurn the AC off\n");
  printf("\nEnter your selection: ");
  scanf("%d", &response);
  
  if (response == 1) 
    printf("\nAC is now on\n");
  if (response == 2) 
    printf("\nAC is now off\n");
  
  return 0;
}
```

>Note that if there are multiple statements inside the parent condition's `else` clause, curly braces are needed.

#### Boolean Algebra

Like other languages the `&&` operator implements the boolean operator `and`. Both sides must evaluate to `true` before the entire expression becomes `true`. The `||` operator implements the boolean operator `or` Either side of the condition must be `true` for the entire expression becomes `true`. **Note that `&&` is higher precedence than `||`.**

#### Example

Ask for a letter grade using the or operator check if a given response was either en upper or lowercase, A:

```c
#include <stdio.h>

int main() {
  char response = '\0';
  printf("Please enter the letter grade you deserve: ");
  scanf("%c", &response);
  
  if (response == 'A' || response == 'a') {
    printf("The response was either \"a\" or \"A\"!\n");
  } else {
    printf("The response was neither \"a\" or \"A\"!\n");
  }
  
  return 0;
}
```

#### Example

Check that a given response is between a range of 1 and 10:

```c
#include <stdio.h>

int main() {
  int numberValue = 0;
  
  printf("Please enter a number between 1 and 10: ");
  scanf("%d", &numberValue);
  
  if (numberValue > 0 && numberValue < 11) {
    printf("The value you gave was between 1 and 10!\n");
  } else {
    printf("The value you gave was not between 1 and 10!\n");
  }
  
  return 0;
}
```

#### isdigit() Function

>The `isdigit()` function is part of the character-handling library `<ctype.h>` and is a wonder tool for aiding you in validating user input. This function returns `true` if the passed-in value evaluates to a digit, otherwise `false`.

Using the `isdigit()` function:

```c
#include <stdio.h>
#include <ctype.h>

int main() {
  char cResponse = '\0';
  
  printf("\nPlease enter a letter or character not a digit: ");
  scanf("%c", &cResponse);
  
  if ( isdigit(cResponse) == 0 ) printf("That is not a digit!\n");
  else
    printf("\nThat is a digit :(\n");
}
``` 

### The Switch Structure

The `switch` structure is another common language block used to evaluate conditions. It is most commonly implemented when programmers have a specific set of choices they are evaluating from a user's response, much like a menu.

>The `switch` structure requires the use of curly braces.

```c
#include <stdio.h>

int main() {
  switch (x) {
    case 1:
      // x is 1
    case 2:
      // x is 2
    case 3:
      // x is 3
    case 4:
      // x is 4
  }
  
  return 0;
}
```

The number of `case` statements you decide to use depends on how many possibilities your `switch` variable contains.

#### Example

Switch over a menu that has four items, 1. sports, 2. geography, 3. music, and 4. world events.

```c
#include <stdio.h>

int main() {
  int response = 0;
  
  printf("\n1\tSports\n");
  printf("2\tGeography\n");
  printf("3\tMusic\n");
  printf("4\tWorld Events\n");
  printf("\nPlease select a category (1-4): ");
  scanf("%d", &response);

  switch (response) {
    case 1:
      printf("You chose sports!\n");
      break;
    case 2:
      printf("You chose geography!\n");
      break;
    case 3:
      printf("You chose music!\n");
      break;
    case 4:
      printf("You chose world events!\n");
      break;
    default:
      printf("That is not a valid selection..\n");
      break;
  }
  
  return 0;
}
```

>Note that the `break` statement inside a `case` block, stops the `switch` statement from evaluating any further `case` statements. The `default` block can be used to catch any input that does not match the `case` statements.

In addition to evaluating numbers, the `switch` structure is also popular when choosing between other characters, such as letters.

#### Example

Ask the user for a grade and display a statement indicating the grade they selected, using a switch statement.

```c
#include <stdio.h>

int main() {
  char response = '\0';
  
  printf("Please indicate the grade you think you deserve: ");
  scanf("%c", &response);
  
  switch (response) {
    case 'a': case 'A':
      printf("You selected a grade of an A!\n");
      break;
    case 'b': case 'B':
      printf("You selected a grade of a B!\n");
      break;
    case 'c': case 'C':
      printf("You selected a grade of a C!\n");
    default:
      printf("Looks like you want to fail :(\n");
  }
  
  return 0;
}
```

#### Random Numbers

The concept and application of random numbers can be observed in all types of systems, from encryption programs to games. The C standard library offers built-in functions for easily generating random numbers. The most notable is the `rand()` function, which generates a whole number from 0 to a library-defined number, generally at least 23,767.

>To generate a specific random set of numbers, say between 1 and , you need to define a formula using `rand()` function:

```c
randomNumber = (rand() % 6) + 1;
```

`rand() % 6` will generate a random number between 0 and 5.

#### Example

Create a guessing program that will generate a random number between 1 and 10 and then ask for a guess. Inform the user if the guess is correct or not.

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
  
  int randomNumber = 0;
  srand(time(NULL));
  randomNumber = (rand() % 11) + 1;
  
  int userGuess = 0;
  
  printf("A random number has been generated between 1 and 10.\n\tPlease make a guess: ");
  scanf("%d", &userGuess);
  
  if (randomNumber == userGuess) {
    printf("Yes! %d was the correct guess!\n", randomNumber);
  } else {
    printf("Sorry, that was an incorrect guess. The correct number was %d.\n.", randomNumber);
  }
  
  return 0;
}
```

This could have been done with the simple `rand()` function. However, it produces the same sequence of random numbers repeatedly. This is where the `srand()` function comes in play. **`srand()` takes an integer number as its starting point for randomizing.** To give your program a true sense of randomizing, **pass the current time as a function using the `time()` function**. Also, note that the **`time()` function requires an argument, which can be `NULL`**. These functions can be **included from the libraries `<stdlib.h>` and `<time.h>`**.

---
### Example Problems

#### Example One

Build a number guessing game that uses input validation (isdigit() function) to verify that the user has entered a digit and not a non-digit (letter). Store a random number between 1 and 10 into a variable each time the program is run. Prompt the user to guess a number between 1 and 10 and alert the user if he was correct or not.

```c
#include <stdio.h>
#include <stdlib.h> // for rand()
#include <time.h> // for time()
#include <ctype.h> // for isdigit()

int main() {
  int randomNumber;
  char userGuess;
  
  srand(time(NULL)); // set seed for rand()
  randomNumber = (rand() % 5) + 1; // generate random number using rand()

  // get guess from user
  printf("To make a guess, please enter a number between 1 and 10: ");
  scanf("%c", &userGuess);

  // determine if users guess is valid and then if its correct
  if (isdigit(userGuess)) {
    if ((userGuess - '0') == randomNumber) {
      printf("Congratulations, %c is correct.\n", userGuess);
    } else {
      printf("Sorry, %c is incorrect.\n", userGuess);
    }
  } else {
    printf("%c is not a valid guess.\n", userGuess);
  }

  return 0;
}
```

>Note that `userGuess - '0'` is a way to get a number or integer representation of the character. This is because `'0'` is the first number. In other words `('9'-'0')=(57-48)=9`.

#### Example Two

Create a dice game that uses two six-sided dice. Each time the program runs, use random numbers to assign values to each die variable. Output a “player wins” message to the user if the sum of the two dice is 7 or 11. Otherwise output the sum of the two dice and thank the user for playing.

```c
#include <stdio.h>
#include <stdlib.h> // for rand()
#include <time.h> // for time()
#include <ctype.h> // for isdigit()

int main() {
  int diceOne, diceTwo;
  
  srand(time(NULL)); // set seed for rand()
  diceOne = (rand() % 6) + 1; // create first random number between 1 and 6
  diceTwo = (rand() % 6) + 1; // create second random number between 1 and 6
  
  // determine if sum of two random numbers are 7 or 11. if so player wins
  if (diceOne + diceTwo == 7 || diceOne + diceTwo == 11) {
    printf("The player rolled %d and %d. Which sums to %d. Player wins!\n", diceOne, diceTwo, diceOne + diceTwo);
  } else {
    printf("The player rolled %d and %d. Which sums to %d. Player Loses! Thanks for playing.\n", diceOne, diceTwo, diceOne + diceTwo);
  }
  
  return 0;
}
```

---

## Looping Structures

Iteration is a fancy term for loops or looping, or in other words, it's how you build repetition into your programs.

#### Operators

The `++` operator is useful for incrementing number based variables by one, and the `--` operator is useful for decrementing number based variables by one.

You can place the `++` or `--` first or last. Note that the `++x` operation is not guaranteed to occur first before the `x` and `x++` are processed

```c
#include <stdio.h>

int main() {
  int x = 0;
  
  printf("%d\n", x++ * 4); // 0
  
  x = 0; // reset x to 0
  printf("%d\n", ++x * 4); // 4
  
  return 0;
}
```

Like other languages the `+=` operator can be used to add a new value plus its current value. Also, the `-=` operator can used to subtract a new value from an existing one.

### The While Loop

The `while` loop structure is used to create iteration (loops) in your programs:

```c
#include <stdio.h>

int main() {
  int x = 0;
  
  while ( x < 10 ) {
    printf("The value of x is %d\n", x);
    x++;
  }
  
  return 0;
}
```

The while loop uses a condition (in the above case `x < 10`) that evaluates to either `true` or `false`. As long as the condition is `true`, the contents of the loop are executed.

>Note that the **braces for any loop are required only when more than one statement is included in the loop's body**. If your `while` loop contains only one statement, no braces are required.

**Infinite loops are loops that never end.** They are created when a loop's expression is never set to exit the loop.

### The Do While Loop

Similar to the `while` loop, the `do while` loop is used to build iteration in your programs. However, the `do while` loop's condition is at the bottom of the loop rather than the top. This means the content of the loop will be executed at least once.

```c
#include <stdio.h>

int main() {
  int x = 0;

  do {
    printf("The value of x is %d\n", x);
    x++;
  } while(x < 10);
  
  return 0;
}
```

>In a `do while` loop's last statement, the ending brace comes before the `while` statement, and the `while` statement must end with a semicolon.

### The For Loop

The `for` loop is an important iteration technique in any programming language. 

```c
#include <stdio.h>

int main() {
  int x;
  
  for (x = 10; x > 5; x--)
    printf("The value of x is %d\n", x);
  
  return 0;
}
```

#### Example

Quiz a user over basic multiplication problems, and let the user decide how many questions they want to answer.

```c
#include <stdio.h>
#include <stdlib.h> // for rand()
#include <time.h> // for time()
#include <ctype.h> // for isdigit()

int main() {
  int x, numQuestions, response, randNum1, randNum2, product;
  
  srand(time(NULL)); // set random seed
  
  // ask user how many multiplication questions they want to answer
  printf("\nEnter number of questions to ask: ");
  scanf("%d", &numQuestions);
  
  // loop over numQuestions number of multiplication questions
  for ( x = 0; x < numQuestions; x++ ) {
    
    randNum1 = rand() % 10 + 1; // generate first random number
    randNum2 = rand() % 10 + 1; // generate second random number
    product = randNum1 * randNum2; // multiple first and second number
    
    // ask user multiplication question
    printf("\nWhat is %d x %d: ", randNum1, randNum2);
    scanf("%d", &response);
    
    // determine if user answered the multiplication question correctly
    if (response == product)
      printf("\nCorrect!\n");
    else
      printf("\nThe correct answer was %d \n", product);
  } // end for loop
  
  return 0;
}
```

#### Break and Continue Statements

The `break` and `continue` statements are used to manipulate program flow in structures such as loops. **When a `break` statement is executed in a loop, the loop is terminated** and program control returns to the next statement following the end of the loop. **When the `continue` statement is executed, any remaining statements in the loop are passed over and the next iteration of the loop begins.**

#### System Calls

Many programming languages provide at least one utility function for accessing operating system commands. C provides one such function, called `system()`.

>The `system()` function can be used to call all types of UNIX or DOS commands from within C program code.

Example commands:

- `ls`: Lists the contents of a directory
- `man`: Displays manual pages for various shell commands
- `ps`: Displays process information
- `pwd`: Prints working directory

A good command to use is the `clear` command. This will clear the console each time your program is ran.

```c
#include <stdlib.h> // for system()

int main() {
  system("clear");
  
  return 0;
}
```

---
### Example Problems 

#### Example One

Create a counting program that counts backward from 100 to 1 in increments of 10.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  system("clear");

  for (int i = 100; i >= 0; i -= 5) {
    printf("%d\n", i);
  }
}
```

#### Example Two

Create a counting program that prompts the user for three inputs (1. beginning number to start counting from, 2. ending number to stop counting at, and 3. increment number) that determine how and what to count. Use the acquired data to build your counting program with a for loop and display the results to the user.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  system("clear");

  int startNum, incNum, lastNum;

  printf("Please enter the starting number: ");
  scanf("%d", &startNum);
  printf("Please enter the last number: ");
  scanf("%d", &lastNum);
  printf("Please enter the increment number: ");
  scanf("%d", &incNum);

  for (int i = startNum; i <= lastNum; i += incNum) {
    printf("%d\n", i);
  }

  return 0;
}
```

---