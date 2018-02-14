---
layout: article

permalink: /notes/data-structures-in-c/

title: "Data Structures in C"

subtitle: "UofL - Intro to C and C++"

excerpt: "These notes continue an introduction to C programming focused on data structures."

categories: notes

date: 2018-02-06
---

{% include /globalSections/toc.html %}

These notes introduce concepts for building and using advanced data types (also known as data structures) such as strictures and unions, and show how these user-defined structures assist programmers in defining a more robust, object-aware type.

## Structures

Structures are an important computer science concept because they are used throughout the programming and IT world in applications such as relational databases, file-processing, and object-oriented programming concepts.

>Considered a data type much like an integer or character, structures are more frequently referred to as *data structures*.

**Structures are a collection of variables related in nature, but not necessarily in data type. Structures are most commonly used to define an object.**

### struct

The first process in creating a structure is to build the structure definition using the `struct` keyword followed by braces, with individual variables defined as members.

```c
struct math {
  int x;
  int y;
  int result;
};
```

The previous program statements create a structure definition called `math` that contains three integer-type members. THe keyword `math` is also known as the structure tag, which is used to create instances of the structure. 

*Members of structures are the individual elements or variables that make up a collection of variables. Structure tags identify the structure and can be used to create instances of the structure.*

>When structure definitions are created using the `struct` keyword, memory is not allocated for the structure until an instance of the structure is created:

```c
struct math aProblem;
```

The previous statement uses the `struct` keyword and the structure tag `math` to create an instance called `aProblem`.

>Creating an instance of a structure is really just creating a variable, in this case a variable of structure type.

You can initialize a structure instance the same way you would initialize an array:

```c
struct math aProblem = {0, 0, 0};
```

Only after an instance of the structure has been created can members of the structure be accessed via the dot operation, `.`, also known as dot notation:

```c
// assign values to members
aProblem.x = 10;
aProblem.y = 10;
aProblem.result = 20;
```

You can also use dot notation to print:

```c
// print the contents of a problem
printf("%d plus %d equals %d.\n", aProblem.x, aProblem.y, aProblem.result);
```

Notice that members of structures are not required to have the same data type:

```c
#include <stdio.h>
#include <string.h>

struct employee {
  char fname[10];
  char lname[10];
  long int id;
  float salary;
};

int main() {
  // create instance of employee structure
  struct employee emp1;
  
  //assign values to members
  strcpy(emp1.fname, "Matthew");
  strcpy(emp1.lname, "Long");
  emp1.id = 29834765390;
  emp1.salary = 90000.00;
  
  // print member contents
  printf("\nFirst Name: %s\n", emp1.fname);
  printf("Last Name: %s\n", emp1.lname);
  printf("Employee ID: %ld\n", emp1.id);
  printf("Salary: $%.2f\n", emp1.salary);
  
  return 0;
}

// First Name: Matthew
// Last Name: Long
// Employee ID: 29834765390
// Salary: $90000.00
```

### typedef

The `typedef` keyword is used for creating **structure definitions to build an alias relationship with the structure tag (structure name)**. It provides a shortcut for programmers when creating instances of the structure. To demonstrate the concept of `typedef`:

```c
#include <stdio.h>
#include <string.h>

typedef struct employee {  // modification here
  char fname[10];
  char lname[10];
  int id;
  float salary;
} emp;  // modification here

int main() {
  // create instance of employee structure using emp
  emp emp1; // modification here
  
  //assign values to members
  strcpy(emp1.fname, "Matthew");
  strcpy(emp1.lname, "Long");
  emp1.id = 123;
  emp1.salary = 90000.00;
  
  // print member contents
  printf("\nFirst Name: %s\n", emp1.fname);
  printf("Last Name: %s\n", emp1.lname);
  printf("Employee ID: %d\n", emp1.id);
  printf("Salary: $%.2f\n", emp1.salary);
  
  return 0;
}

// First Name: Matthew
// Last Name: Long
// Employee ID: 123
// Salary: $90000.00
```

The `typedef` keyword is used in the first line of the structure definition. The next modification is at the end of the structure which is where C is told what name such as `emp` as the **alias** for the employee structure.

The `struct` keyword is no longer needed when creating instances of the employee structure.

```c
emp emp1; // can do this
struct employee emp1; // instead of this
```

### Arrays of Structures

The process for creating and working with an array of structures is very similar to working with arrays containing other data type, such as integers, characters, or floats.

To create an array of structures, supply the desired number of array elements surrounded by brackets after the structure definition:

```c
typedef struct employee {
  char fname[10];
  char lname[10];
  int id;
  float salary;
} emp;

emp emp1[5];
```

To access individual elements in a structure array, you need to provide the array element number surrounded by brackets. *To access individual structure member name, as revealed in the next segment of code, which uses the `strcpy()` function to copy the text "Matthew" into the memory reserved by the structure member.

```c
strcpy(emp1[0].fname, "Matthew");
```

#### Example

```c
#include <stdio.h>
#include <string.h>

typedef struct scores {
  char name[10];
  int score;
} s;

int main() {
  s highScores[3];
  int x;
  
  // assign values to members
  strcpy(highScores[0].name, "Hunter");
  highScores[0].score = 40768;
  
  strcpy(highScores[1].name, "Kenya");
  highScores[1].score = 38565;
  
  strcpy(highScores[2].name, "Apollo");
  highScores[2].score = 35985;
  
  // print array content
  printf("\nTop 3 High Scores\n");
  
  for (x = 0; x < 3; x++) {
    printf("\n%s\t%d\n", highScores[x].name, highScores[x].score);
  }
}

// Top 3 High Scores
// Hunter	40768
// Kenya	38565
// Apollo	35985
```

## Passing Structures to Functions

To utilize the power of structures, the methods they are passed to function for processing must be understood. Structures can be passed to functions in many ways.

*Passing by value protects an incoming variable's value by sending a copy of the original data rather than the actual variable to the function.*

*Passing by reference sends a variable's memory address to a function, which allows statements in the function to modify the original variable's memory contents.*

### Passing Structures by Value

Like any parameter passed by value, C makes a `copy` of the incoming structure variable for the function to use. Any modifications made to the parameter within the receiving function are not made to the original variable's value. To pass a structure by value to a function, you need only to supply the function prototype and function definition with the structure tag (or the alias if `typedef` is used).

#### Example

```c
#include <stdio.h>
#include <string.h>

typedef struct employee {
  int id;
  char name[10];
  float salary;
} e;

// supply prototype with structure alias name
void processEmp(e);

int main() {
  e emp1 = {0,0,0}; // initialize members
  processEmp(emp1); // pass structure by value
  
  printf("\nID: %d\n", emp1.id);
  printf("Name: %s\n", emp1.name);
  printf("Salary: $%.2f\n", emp1.salary);
  
  return 0;
}

// receives a copy of the structure
void processEmp(e emp) {
  emp.id = 123;
  strcpy(emp.name, "Sheila");
  emp.salary = 65000.00;
}

// ID: 0
// Name: 
// Salary: $0.00
```

In the previous program the structure's members still contain their initial values even though the structure members appear to be updated in the `processEmp()` function. THe structure's original members contents weren't really modified. *Only a copy of the structure's members were accessed and modified.* 

### Passing Structures by Reference

Passing structures by reference requires a bit more knowledge and adherence to C rules and regulations. Before learning how to pass structures by reference, its necessary to learn another means of accessing members of structures. **Members can be accessed via the structure pointer operator, `->`.** The structure pointer operator is a dash followed by the greater-than sign with no spaces in between.

```c
emp->salary = 80000.00;
```

The structure pointer operator is used to access a structure member through a pointer. This form of member access is useful when you have created a pointer of structure type and need to indirectly reference a member's value.

#### Example

```c
#include <stdio.h>
#include <string.h>

typedef struct employee {
  int id;
  char name[10];
  float salary;
} emp;

void processEmp(emp *);

int main() {
  emp emp1 = {0, 0, 0};
  emp *ptrEmp;
  
  ptrEmp = &emp1;
  processEmp(ptrEmp);
  
  printf("\nID: %d\n", ptrEmp->id);
  printf("Name: %s\n", ptrEmp->name);
  printf("Salary: $%.2f\n", ptrEmp->salary);
  
  return 0;
}

void processEmp(emp *e) {
  e->id = 123;
  strcpy(e->name, "Sheila");
  e->salary = 65000.00;
}
```

### Passing Arrays of Structures

Unless otherwise specified, passing arrays of structures to functions is automatically passing by reference; it is also known as passing by address. This is true because an array name is really nothing more than a pointer!

## Unions

Unions are similar to structures in design and use, unions provide a more economical way to build objects with attributes (members) that are not required to be in use at the same time. 

>Whereas structures reserve separate memory segments for each member when they are created, a union reserves a single memory space for its largest member, thereby providing a memory-saving feature for members to share the same memory space.

Unions are created with the keyword `union` and contain member definitions similar to that of structures:

```c
union phoneBook {
  char *name;
  char *number;
  char *address;
};
```

Like structures, union members are accessed via the dot operator.

#### Example

```c
#include <stdio.h>

union phoneBook {
  char *name;
  char *number;
  char *address;
};

struct magazine {
  char *name;
  char *author;
  int isbn;
};

int main() {
  union phoneBook aBook;
  struct magazine aMagazine;
  
  printf("\nUnion Details\n");
  printf("Address for aBook.name: %p\n", &aBook.name);
  printf("Address for aBook.number: %p\n", &aBook.number);
  printf("Address for aBook.address: %p\n", &aBook.address);
  printf("\nStructure Details\n");
  printf("Address for aMagazine.name: %p\n", &aMagazine.name);
  printf("Address for aMagazine.author: %p\n", &aMagazine.author);
  printf("Address for aMagazine.isbn: %p\n", &aMagazine.isbn);
  
  return 0;
}

// Union Details
// Address for aBook.name: 0x7ffeece4db40
// Address for aBook.number: 0x7ffeece4db40
// Address for aBook.address: 0x7ffeece4db40

// Structure Details
// Address for aMagazine.name: 0x7ffeece4db28
// Address for aMagazine.author: 0x7ffeece4db30
// Address for aMagazine.isbn: 0x7ffeece4db38
```

Notice the memory output in the previous example.

## Type Casting

Although it is not supported by all high-level programming languages, type casting is a powerful feature of C. **Type casting enables C programmers to force one variable of a certain type to be another type, an important consideration especially when dealing with integer division.**

```c
int x = 12;
int y = 5;
float result = 0;

result = (float) x / (float) y;
```

#### Example

```c
#include <stdio.h>

int main() {
  int x = 12;
  int y = 5;
  
  printf("\nWithout Type-Casting\n");
  printf("12 \\ 5 = %d\n", x/y);
  printf("\nWith Type-Casting\n");
  printf("12 \\ 5 = %.2f\n", (float) x / (float) y);
  
  return 0;
}

// Without Type-Casting
// 12 \ 5 = 2
// With Type-Casting
// 12 \ 5 = 2.40
```

>Type casting is not limited to numbers. You can also type cast numbers to characters and characters to numbers.

#### Example

```c
#include <stdio.h>

int main() {
  int number = 86;
  char letter = 'M';
  
  printf("\n86 type-casted to char is: %c\n", (char) number);
  printf("\n'M' type-casted to int is: %d\n ", (int) letter);
  
  return 0;
}

// 86 type-casted to char is: V
// 'M' type-casted to int is: 77
```

## Example Problems 

---

#### Example One

---