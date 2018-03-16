---
layout: article

permalink: /notes/managing-memory-in-cpp/

title: "Managing Memory in C++"

subtitle: "UofL - Intro to C and C++"

excerpt: "These notes cover memory management in C++."

categories: notes

date: 2018-03-14
---

{% include /globalSections/toc.html %}

These notes cover memory management in C++.

>To allocate is to acquire memory for.

#### Static Memory

Static memory is where global variables are stored. These are allocated when the program starts up, before `main` starts executing. They last throughout the entire course of the program, being de-allocated only when the program exists, right after `main` ends. Everything in static memory must be decided upon before the program begins memory.

#### Stack Memory

The stack (also called local or automatic memory) is where all of your local variables are allocated. When a program begins executing, space is allocated on the stack for all of `main`'s local variables.

#### Heap

The heap (or free store or dynamic memory). You want memory that you can allocate whenever you need it, but you don't want it to disappear when the function ends. This is how the heap works

## Using Pointers

>A pointer is a variable that holds a memory address.

The memory address that the pointer stores is the address of another variable. **So a pointer is said to "point to point to a variable.:**

```cpp
pointer_type* pointer_name;
```

Here, `pointer_type` is the type of the variable being pointed to, and `pointer_name` is the name of the pointer.

The "address of" operator `&` is placed directly in front of a variable, and it evaluates to the memory address of the variable. This operator is useful for assigning values to a pointer.

```cpp
int myInt;
int* myIntPointer = &myInt;
```

This code makes `myIntPointer` point to `myInt`. Then `myIntPointer` stores the memory address of `myInt`.

Note that if a pointer has a value 0 assigned to it, the pointer does not point to a variable. This case is called a *null pointer* or an undeclared pointer.

#### Example

```cpp
#include <iostream>

int main(void) {

  using std::cout;

  int an_int = 5;
  int* a_pointer = &an_int;

  cout << "The value of an_int is: " << an_int;
  cout << "\nThe address of an_int is: " << &an_int;
  cout << "\nThe value of a_pointer is " << a_pointer;
  cout << "\nThe address of a_pointer is: " << &a_pointer << "\n";

  return 0;
}

// The value of an_int is: 5
// The address of an_int is: 0x7ffee3456a98
// The value of a_pointer is 0x7ffee3456a98
// The address of a_pointer is: 0x7ffee3456a90
```

## Evaluating to the Indirection Operator

The indirection operator `*` is used to refer to the object pointed to by the pointer. You can place the indirection operator right in front of a pointer (or an expression that evaluates to a pointer), and it evaluates to the value of the variable that the pointer points to.

>Don't confuse the indirection operator with the pointer declaration. Even though there is an `*` right before the pointer when you declare it, the pointer is not  actually being dereferenced.

#### Consider the Following

If you declare an integer and a pointer as:

```cpp
int a = 78;
int* pb = &a;
```

You can use the indirection operator to access the value of `a` through `pb` like the following:

```cpp
cout << "The value of a is: " << *pb;;
```

This code displays the number `78` onscreen. You can think of the indirection operator (sometimes called the dereferencing operator) as the opposite of the address of operator.

```cpp
int x = 5;
int* px = &x;
*px = 7;
```

In the second line of the above, the address of `&x` is assigned to `px`. `px` now points to `x`. Note that when you change the value of `*px`, you are changing the value of `x`. After the third line, the value of `x` is `7`.

It is also possible to have pointers to pointers. A declaration of a pointer to a pointer to an integer looks like the following:

```cpp
int** ppi;
```

It can be initialized like the following:

```cpp
int * pi;
ppi = &pi;
```

A pointer to a pointer holds the address of a pointer, which holds the address or a variable. Thus, it is possible to access the value of the variable through the pointer to a pointer. To access this value, you use the indirection operator twice:

```cpp
cout << **ppi;
```

This code displays the value of the integer that `pi` points to.

`*ppi` gives the value of the pointer `pi`; then using the indirection operator again, gives the value that `pi` points to. You could go even further, using it as many times as you want, but doing so isn't practical.

## Using Pointers and Objects

It is also possible to have pointers to objects and structures. For example, you can have a pointer to a string object:

```cpp
string* ps;
```

Pointers to objects are really the same as pointers to any other type of variable. Notice that no object is being created, just a pointer to one. This means you are not calling the strings constructor (C++ calls a constructor when you declare a string because `string` is a class, not a built-in data type.).

#### Example

```cpp
class Point {
public:
  int X,Y;
  Point(int X, int Y) : X(X), Y(Y){}
  void print();
};

void Point::print() {
  cout << "The value of x is: " << X;
  cout << "\nThe value of y is: " << Y << "\n";
}
```

The class above is rather basic and we can declare a point instance, `myPoint`:

```cpp
Point myPoint(5,3);
myPoint.print();
```

We can create a pointer to the `myPoint` object:

```cpp
Point* pointerToPoint = &myPoint;
```

It is possible to access the members of this object through the pointer like this:

```cpp
pointerToPoint -> X = 6;
pointerToPoint -> Y = 5;
```

**We can access these data members only because they are public. If they were private, we could not access them directly, even through a pointer.**

This code introduces a new operator, the member selection operator `->`. It is just like the other member selection operator, `.`, except that it is for pointers to objects rather than member objects. You can also call member functions using this operator:

```cpp
pointerToPoint -> print();
```

This code causes the `print` method to be executed.

All together:

```cpp
#include <iostream>

using namespace std;

class Point {
public:
  int X,Y;
  Point(int X, int Y) : X(X), Y(Y){}
  void print();
};

void Point::print() {
  cout << "The value of x is: " << X;
  cout << "\nThe value of y is: " << Y << "\n";
}

int main(void) {
  Point myPoint(5,3);
  myPoint.print();
  
  // The value of x is: 5
  // The value of y is: 3

  Point* pointerToPoint = &myPoint;
  pointerToPoint -> X = 6;
  pointerToPoint -> Y = 5;
  pointerToPoint -> print();

  // The value of x is: 6
  // The value of y is: 5

  return 0;
}
```

## Allocating from the Heap

*"Majority of bugs in C++ code have to do with the heap!"* It is very important to structure your code carefully so that you can keep track of everything you're allocating and de-allocate it when you're finished with it. With a few simple techniques most of the problems should be avoided.

>**You allocate memory in the heap using the `new` operator.** This operator returns a pointer to the newly allocated memory.

```cpp
new data_type(constructor_args);
```

Here `data_type` is any valid data type or class. **To use this memory, you must assign it to a pointer variable. Keeping track of memory on the heap is where pointers come in really handy.** For example, to create a `Point` object in the heap:

```cpp
Point* myNewPoint = new Point(2, 4);
```

If you are allocating a built-in type, like an `int`, you do not need the brackets:

```cpp
int* myNewInt = new int;
```

>All memory that you allocate with the `new` operator must be de-allocated with the `delete` operator when you are done with it.

If you do not free the memory you use, this memory will not be available to use late in the program. *Forgetting to free heap memory is called a memory leak, and you should always avoid it.*

The `delete` operator acts on a pointer to a section of memory allocated with the `new` operator. If the `delete` operator is used on anything else, it will cause an error.

To free the memory allocated in the preceding examples:

```cpp
delete myNewInt;
myNewInt = 0;
delete myNewPoint;
myNewPoint = 0;
```

**Once you free the memory allocated with `new`, set the value of the pointer to `0`.** This ensures that you will not accidentally try to delete something that you have already deleted.

#### Example

```cpp
class HeapPoint {
public:
  HeapPoint(int x, int y);
  Point* get() {
    return thePoint;
  }
  ~HeapPoint();
private:
  Point* thePoint;
};

HeapPoint::HeapPoint(int x, int y) : thePoint(new Point(x,y)){}

HeapPoint::~HeapPoint() {
  delete thePoint;
  thePoint = 0;
}

void myFunc() {
  HeapPoint myHeapPoint(2,4);
  Point* myPoint = myHeapPoint.get();
  // do stuff with myPoint

  // no need to call delete because its called automatically
}
```

## Using the this Pointer

>Every object of a class has a constant pointer to itself called the `this` pointer.

With a `this` pointer, you can access any of the public data members or functions of the class. The syntax for using the `this` pointer is the same as the syntax for any other pointer to an object.

```cpp
void Point::print() {
  cout << "The value of X is: " << this -> X;
  cout << "\nThe value of Y is: " << this -> Y << "\n";
}
```

## Constructing Constant Pointers and Pointers to Constants

You can have a constant pointer, a pointer that cannot change the memory address it stores. However, with a constant pointer, you can still change the value that the pointer points to. **To create a constant pointer, place the `const` keyword after the `*` operator.

```cpp
char* const p;
```

You can also have pointers to constants. With a pointer to a constant, you can change the memory address the pointers stores, but not the constant pointed to. To declare a pointer to a constant, you add the `const` keyword before the `*` operator.

```cpp
char const* pcc; // pointer to a constant char
const int* pci; // pointer to a constant int
```

## Introducing Pointers and Functions

**Pointers can be very useful as function parameters and return values.** Having a pointer as a function parameter can make your programs much more efficient.

Normally when you pass an argument to a function, a new copy of this argument is made and assigned to the appropriate parameter. However, if you have a pointer as a parameter, only the memory address must be copied, which can save a lot of extra copying for large data types.

Another advantage to having pointers as function parameters is that you are altering the original and not a copy that has been passed.

#### Example

```cpp
#include <iostream>

using namespace std;

class Point {
public:
  int x, y;
  Point() : x(0), y(0) {}
};

void moveUp(Point* p) {
  p -> y += 5;
}

int main(void) {
  Point myPoint;
  moveUp(&myPoint);
  cout << "x: " << myPoint.x << "\ny: " << myPoint.y << "\n";

  return 0;
}

// x: 0
// y: 5
```

>Now instead of making two copies of the `Point` object for each call, one copy is made of the memory address for each call.

## Working with Arrays

Creating arrays is an easy process:

```cpp
data_type array_name[number_of_elements];
```

This creates an array called `array_name` of type `data_type` with `number_of_elements` elements.

You can create arrays of all data types, including user-defined types. If you have a class called `MyClass`, you can create an array of ten `MyClass` objects like this:

```cpp
MyClass my_class_array[10];
```

*The number between the square brackets must be a constant expression, which means that you cannot use a variable to define the number of elements in your array.*

#### Initializing Arrays

You can fill an array with data a couple of ways either by hard coding or loops.

```cpp
array_type array_name[number_of_elements] = {val1, val2, val3, ...};
```

#### Using Arrays

Accessing elements of an array is similar to creating an array. Each element in an array acts as a separate scalar variable. 

#### Relating Arrays to Pointers

Arrays and pointer are closely linked. In fact, in strict definition, *arrays are pointers.* Consider the following array:

```cpp
float f[10];
```

The name of the array, `f`, acts as a pointer to the first element. The following displays the value of the first element:

```cpp
cout << *f;
```

if you declare a pointer to the same type as the array's type, you can assign the pointer to the first element of the array like this:

```cpp
float* pf = f;
```

This code snippet is synonymous to the following one:

```cpp
float* pf = &f[0];
```

Then you can go through every element in the array by incrementing the pointer. **You increment a pointer just like you do any other variable. Because a pointer stores a memory address, incrementing a pointer changes the memory address.** Instead of going up by one, the value of the memory address is increased by the size of the pointer type.

```cpp
float f[] = {5.5, 0.5, 6.7};
float* pf = f;
cout << *pf;
cout << " " << *(++pf); 
cout << " " << *(++pf); 
```

## Strings Revisited

In C, strings are represented as character arrays, instead of objects like they are in C++. Because of this you will commonly see strings represented as character arrays.

```cpp
char s[] = "Hello";
s[0] = "S";
```

The new string is "Sello".

*You don't have to provide the length of the array within the subscripting operator, declaring a string this way is almost as convenient as using the string class from the standard library. C++ will allocate enough characters in the `s` array to hold the null zero that appears at the end of the string.*

You can determine the length of a string using `sizeof`.

```cpp
cout << sizeof(s);
```

The null operator is including in your length.

You can alternatively use the `strlen()` function:

```cpp
cout << strlen(s);
```

This will count elements up to the first null character. The following will be counted as 5.

```cpp
char weirdString = "Hello\0 World!";
```

You can convert strings to numbers using the `atoi()` function.

## Beginning with References

A reference is an alias, or an alternative name, for a variable. You can think of a reference as a constant pointer that is always dereferenced. References are much like constants in that they must be initialized when declared and their value cannot be changed after that.

To create a reference, you use the reference operator, `&`. Don't confuse this operator with the address of operator.

```cpp
data_type& reference_name;
```

#### Example

```cpp
int x;
int& rx = x;
```

The above causes `rx` to be a reference to the variable `x`.

#### Using References in Function Parameters

You can legally make any function parameter a reference. This can be useful if you want to write a function that can change the argument passed to it.

#### Using References as Function Return Values

You can return a reference to a variable in a function.

```cpp
#include <iostream>

using namespace std;

class Point {
public:
  Point(int x, int y) : x(x), y(y){}

  int& getX() {
    return x;
  }

  int& getY() {
    return y;
  }
};

int main(void) {
  Point p(5,3);
  p.getX() = 3;
  p.getY() = 5;
  
  cout << p.getX() << p.getY() << "\n";

  return 0;
}

// 35
```

## Relating Classes

<!-- 173 -->
<!-- 173 -->
<!-- 173 -->
<!-- 173 -->
<!-- 173 -->
<!-- 173 -->
<!-- 173 -->