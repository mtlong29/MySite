---
layout: article

permalink: /notes/using-templates-in-cpp/

title: "Using Templates in C++"

subtitle: "UofL - Intro to C and C++"

excerpt: "These notes cover templates in C++."

categories: notes

date: 2018-03-15
---

{% include /globalSections/toc.html %}

In C++, templates enable you to generalize a class or function so that it doesn't use a particular data type.

## Creating Class Templates

A class template is a class that utilizes a template in order to make the class more general.

Consider the following:

```cpp
class Storage {
  int* data;
  int numElements;
public:
  Storage();
  Storage(int* array, int num) : data(array), numElements(num) {}
  Storage(int num) {
    data = new int[num];
  }
  void AddElement(int newElement);
  int ElementAt(int location);
  int RemoveElementAt(int location);
  ~Storage();
};
```

This class stores an array of integers and provides methods to add, view, and remove the elements. But what if you wanted to store floats or characters? The best solution to this problem is to use templates. A template version of the `Storage` class can store any kind of data.

>Templates are a simple way to pass the data type as a parameter without the methods becoming complicated and unmanageable.

```cpp
template<class T> class Storage {
  T* data;
  int numElements;
public:
  Storage();
  Storage(T* array, int num) : data(array), numElements(num) {}
  Storage(int num) {
    data = new int[num];
  }
  void ElementAt(T location);
  T ElementAt(int location);
  T RemoveElementAt(int location);
  ~Storage();
};
```

The only thing that has changed is the replacement of `int` with `T` (but not all instances of `int`) and the addition of `template<class T>` immediately before the class.

**The code `template<class T>` tells the computer that this class is using a template and that `T` is being used as a placeholder for the data type being stored.** Even though you write `class T`, `T` doesn't have to be a class. It can be any data type.

>Another way to think about a template is as an argument list.

The preceding example has one argument, `class T`. When the `Storage` class is used, the user passes the type of data to store "almost" as an argument. When `T` is filled with this data type. As you can see, `class T` is much like an argument declaration. **Here, the keyword `class` is used in a different way to mean "data type". This this reason, you can use the keyword `typename` instead of `class`.**

When you create an object from this class template, you must specify which type of data you are going to store.

```cpp
Storage<int> intStore;
```

You can use `Storage<int>` just like you use the name of any other class.

```cpp
Storage<float> floatStore; // stores floats
Storage<string> stringStore; // stores strings
Storage<Shape*> shapeStore; // stores pointers to Shape
```

The general syntax for creating a class template:

```cpp
template<class TypeName> class ClassName {
  ClassDeclaration
};
```

If a method is implemented outside the calss template, you must use the template syntax:

```cpp
template<class TypeName> returnType ClassName<TypeName>::methodName(args) {
  methodImplementation
}
```

Because the constructor implementation uses the name of the class twice (once for the class name and once for the method name), you would normally have to put `<TypeName>` after each use of the class name. However, it is a bit redundant, so for the name of the method, you don't have to (but you can if you like).

```cpp
template<TypeName> ClassName<TypeName>::ClassName<TypeName>(args) {
  constructorImplementation
}
```

Or you could use this, more common, syntax:

```cpp
template<TypeName> ClassName<TypeName>::ClassName(args){
  constructorImplementation
}
```

## Using Template Parameters

>The declaration inside the angle brackets (for example `<class T>`) is a template parameter.

One example of where multiple template parameters are useful is when you are creating an associative array. *An associative array is like a normal array, except that two different objects are at each element.* One of the two might be a string, and the other might be an integer.

>Think of associative arrays as side-by-side arrays with the same number of elements.

```cpp
template<class T, class C> class AssociativeArray;
AssociativeArray<string, int> wordFrequency;
```

**In addition, a template parameter does not have to be a general type. It can be something specific, such as an integer or a float.**

```cpp
template<class T, int i> class Array {
  T delta[i];
  // rest of class...
};

// use it as follows
Array<int, 10> intArray;
```

This creates an array of ten integers. Notice how the array is created with the size given from the template parameter? You can't create dynamic sized arrays from function arguments because an array must be declared with a constant size (except an array on the free store).

>A function argument does not have to be constant, but a template parameter does. A template parameter can be a constant or a pointer.

## Creating Function Templates

>Functions can use templates similar to the way classes use them.

As with class templates, you create a function template with the keyword `template` and the parameter list at the beginning of the function. **Function templates are similar to overloaded functions, except that you can create one function template to handle every case rather than a different function for each case.**

```cpp
template <class T> T add (T a, T b) {
  return a + b;
}
```

Unfortunately, this `add` function is not universal. You cannot provide arguments of two different types. You can do this with *"overloading function templates"*.

You can use template parameters as you do with all other data types within the function:

```cpp
template<class T> void swap(T* a, T* b) {
  T temp = *a;
  *a = *b;
  *b = temp;
}
```

This function exchanges the values of two pointers. 

```cpp
int x = 5;
int y = 6;
swap<int>(&x, &y);
```

`x` now contains the value of `6`, and `y` contains the value of `5`. **`<algorithm>` includes a standard library version of this function called `swap`.**

## Understanding Argument Resolution

With function templates, you do not always have to provide a template parameter when you call the function. Sometimes, the compiler can figure out what the parameters are supposed to be simply from the arguments you pass.

```cpp
add(5, 3);
```

The template `add` function is being called here. Because the arguments are both integers, the compiler can deduce that the parameter `T` is supposed to be `int`.

## Simplifying Template Use

Templates can become annoying to users of your classes and functions. Fortunately, you can hide the fact that templates are being used.

The first and easiest way is to use `typedef`. Because you can use `ClassName <parameters>` just as you use the name of a normal class, you can use `typedef` the name of a class template to something shorter. For example, rather than using `Vector<int>`, use `IntVec`. Users do not have to be aware that `IntVec` is part of a template:

```cpp
typedef Vector<int> IntVec;
```

An example of where `typedef` is used like this is in the standard library string class. The actual name of the class template for a string is `basic_string`. This class template takes one template parameter: the type of character being stored. Here is the `typedef` for this class:

```cpp
typedef basic_string<char> string;
```

A second common method of simplifying template usage is with default template parameters. As with function arguments, template parameters cah have default values.

```cpp
template<class A, class B = int, class C = float> class ABC
```

In this example, `B` and `C` default to `int` and `float` if no type is passed when an object is created.

```cpp
// A is int, B is int, C is float
ABC<int> a1;

// A is int, B is string, C is char
ABC<int, string, char> a2;

// A is double, B is double, C is float
ABC<double, double> a3;
```

>You must place all default template parameters at the end of the list (as you have to with function arguments).

## Overloading Function Templates

