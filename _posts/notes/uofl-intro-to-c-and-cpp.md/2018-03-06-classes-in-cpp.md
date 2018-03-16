---
layout: article

permalink: /notes/classes-in-cpp/

title: "Classes in C++"

subtitle: "UofL - Intro to C and C++"

excerpt: "These notes cover classes in C++."

categories: notes

date: 2018-03-06
---

{% include /globalSections/toc.html %}

Picture a programming object just like any normal object in the real world. Each real-world object has its own properties and specific things that you can do with it.

**A class is like a general model from which you can create objects.** For example, if you create a dog class, you describe the characteristics related to the general idea of a dog.

Creating a class is the same as creating a new data type. When you create a class, you tell the computer the kind and amount of data this new type can hold. You also tell the computer what actions the new data type can perform. Then you can use the class to create variables from this new type. These variables are called objects.

**Objects are specific instance of a class.** The class declares what the properties of an object are, whereas the object stores specific values for each of these properties.

**Methods (also known as a member functions or object methods) are functions contained within a class that define how you can use objects of the class.** Methods are like functions, except they're part of the object. The methods enable you to know what the object is capable of, and they are focused primarily on manipulating the objects data (data members).

Data members are the variables that define what kind of data an object of the class can store. 

A class's members are all the methods and data members that are contained within that class.

## Declaring Classes

```cpp
class ClassName {
  memberList
};
```

In the above, `memberList` is the list of class members, and `ClassName` is the name of the class. *Notice it is upper case CamelCase. Also, notice a class ends with a semicolon.*

This list of member declarations can be data member or method declarations. Data member declaration are normal variable declarations. Such as `int x`. Note that you do not initialize them where you declare them. They must be initialized either in a method or outside the class. *The scope of all data members is the same as the scope of the object created from the class.* 

Method declarations are function declarations placed inside a class (*recall that a function declaration can also include the implementation, or you can implement them separately)*. All members can be accessed only through an object of the class (with the exception of static methods).

Two special kinds of methods, the constructor and the destructor, can be in a class. Both are optional, but they provide special functionality that other methods cannot provide. 

**A constructor is executed every time a new instance of the class is created - that is, every time you declare a new object. The constructor is normally used to set initial values for the data members.** 

**A destructor is the opposite of a constructor and is executed when the object is destroyed. The destructor is always named the same as the class, but with a tilde, `~`, at the beginning (`~ClassName()`). The destructor cannot have arguments or a return value. A destructor is often used to perform any necessary cleanup tasks.**

#### Example

```cpp
class Bow {
  // data member declarations
  string color;
  bool drawn;
  int numOfArrows;
  
  Bow(string aColor); // constructor
  ~Bow(); // destructor
  
  // methods
  void draw();
  int fire();
}
```

The `Bow` class has three data members that describe the attributes that each `Bow` object will take on. In addition, the `Bow` class contains four unfinished methods - `Bow()`, `~Bow()`, `draw()`, and `fire()`.

## Creating Methods

**The most common way to declare a method is inside the class declaration and then implement it outside.** The second way is to declare and implement the method at the same time inside the class declaration.

There is special syntax for method implementation. General syntax for a method implementation that occurs outside a class:

```cpp
return_Type ClassName::methodName(argumentList) {
  methodImplementation
}
```

Here `ClassName` is the name of the class, and `methodImplementation` is the code that goes inside the method. The scope resolution operator, `::`, tells the computer to use the class's scope by putting the class's name in front.

```cpp
// draws the bow
void Bow::draw() {
  drawn = true;
  cout << "The " << color << " bow has been drawn.\n";
}

// fires the bow if drawn
int Bow::fire() {
  if(!drawn) {
    cout << color << " has not been drawn " << "and therefore could not fire.\n";
    
    return 0;
  }
  int score;
  
  score = rand() % (10 - 0 + 1) + 0;
  
  if(score == 0) {
    cout << color << " missed the target!!!\n";
  } else {
    cout << color << " scored " << score << " points!!!\n";
  }
  
  return score;
}
```

**Note that these implementations must be outside the class declaration and placed after the class declaration.**

The second way to declare a method is to declare and implement the method at the same time:

```cpp
class Hello {
 void Display() {
   cout << "Hello World.\n";
 } 
};
```

Declaring a method this way is pretty simple. The catch is that a method declaration this way is defined as an inline method. Because there is no keyword reminding you that it is inline, be on the lookout for methods declared this way.

Note that you can still make a method declared outside a class using the `inline` keyword.

#### Designing Constructors and Destructors

Constructors are called automatically when an object is created, and destructors are called automatically when a function is destroyed. 

>A constructor initializes the data members and performs other required initialization tasks. A destructor performs all necessary cleanup tasks.

Both constructors and destructors are like methods; they can be declared and implemented at the same time or declared and implemented separately.

Declaring and implementing at the same time:

```cpp
class ClassName {
  //constructor
  ClassName(argumentList) {
    implementation
  }
  
  //destructor
  ~ClassName() {
    implementation
  }
  
  //other members
};
```

Declaring and then implementing:

```cpp
class ClassName {
  ClassName(argumentList);
  ~ClassName();
  //other Members
};

ClassName::ClassName(argumentList) {
  implementation
}

ClassName::~ClassName(argumentList) {
  implementation
}
```

Notice that the constructor can have arguments. If you create a constructor with arguments, the user of your class must supply values for these arguments when creating an object. The destructor on the other hand cannot have arguments. It is called automatically, so there isn't a chance for the user to provide arguments. 

Because a constructor can have arguments, it might be necessary to overload the constructor. This is legal in C++ and it is quite common in very large classes.

The destructor cannot be overloaded. Having no return type or arguments, there is nothing with which the destructor can be overloaded.

A convenient and quick way to initialize data members in the constructor is to use an initializer list. An initializer list is a list of the data members you want to initialize, with the values to which you want to initialize them shown in parentheses.

```cpp
ClassName(argumentList) : dataMember1(value1), dataMember2(value2) {
  implementation
}
```

You can have as many initializations as you want in an initializer list, though a great deal of them might make it hard to read. *Note that the syntax `dataMember1(value1)` is equivalent to `dataMember1 = value1` (that is, it does the same thing), but this syntax works only in an initializer list.*

Here would be a constructor and destructor for the `Bow` class:

```cpp
Bow::Bow(string aColor) {
  numOfArrows = 10;
  drawn = false;
  color = aColor;
  //seeds the time (we need the rand() function in the fire() method)
  srand(time(0));
}

Bow::~Bow(){
}
```

#### Playing Safe with Constant Methods

Often methods will not change the value of data members. These methods can be made constant. It is impossible to change the value of data members in a constant method (results in a syntax error).

**To declare a constant method, you place the keyword `const` after the argument list:**

```cpp
return_type methodName(argumentList) const;
```

Note that if you implement a constant method outside the class, the `const` keyword must be placed on both the declaration and the immplementation.

The advantage of constant methods is that if a constant object is created (an object created with the `const` keyword), only constant methods can be accessed.

#### Using Access Specifiers

**C++ allows you to control where the data members of your class can be accessed. An access specifier is a word that controls where the data members in a class can be accessed.**

```cpp
class ClassName {
  classMembers;
accessSpecifier:
  classMembers;
};
```

An access specifier affects all members of the class (including methods) that come after it until another access specifier is encountered or until you reach the end of the class.

A class has two kinds of access specifiers: `public` and `private` (technically theres a third called `protected`):

- `public` members: can be accessed anywhere that an object of the calss can be accessed and from within the class (that is, in the class's methods).
- `private` members: can be accessed only from within the class itself. An object of the class cannot access the private members, except through `public` methods. If no access specifier is provided in the class, all members default to `private`.

#### Example

```cpp
class MyClass{
  int x;
public:
  int y;
  int z;
private:
  int a;
};
```

In the above, `x` and `a` are private and `y` and `z` are public.

#### Example

```cpp
class Bow {
  // data member declarations
  string color;
  bool drawn;
  int numOfArrows;
public:
  Bow(string aColor); // constructor
  ~Bow(); // destructor

  // methods
  void draw();
  int fire();
};
```

#### Separating Classes into Files

Classes often get pretty big, and having all your code in one file can quickly become unmanageable.

Fortunately, there is a convention for separating classes into files. Normally, the class declaration is placed in one file, and the implementation of all the methods is put in another file. The class declaration file is normally called `ClassName.h` where `ClassName` is the name of the class. The implementation is normally called `ClassName.cpp`. Use `#include "filename"`.

## Class Tactics

- Start every class name with an uppercase letter. This convention is used not only in C++, but also in almost every other object-oriented programming language.
- Add a comment at the beginning of each method and class telling the user what the following member or class does.
- Make sure that each method does only one thing. The general rule is that if a method is more than 20 lines, you are trying to do too much in that method.
- Have each class model only one concept. For example, keep the `Weapon` class separate from the `Soldier` class.
- Test each class to be sure that it works before adding it to the project. Once you know that a class works, debugging a project is simply a matter of making sure that the interaction between the classes work correctly. You will not have to worry about whether the classes themselves work, because you've already ensured that they do.

## Using Objects

#### Using Object Variables

Recall that creating a class is a lot like creating a data type. You can use the name of a class exactly like the name of a primitive data type (the data types that are built into C++). Steps to follow when creating objects:

1. Program the class that will become the template for the object.
2. Create an identifier for the object variable and determine what kind of object will store (from what class it will be created). Similar to declaring a variable.
3. Add the arguments required by the constructor (if needed).

There are two basic syntax forms to create objects:

- `className objectIdentifier(arguments);`
- `className objectIdentifier = className(arguments);`

For the `Bow` object this would be:

```cpp
Bow blue("blue");
Bow red = Bow("red");
```

You can change the object stored in an object variable with the assignment operator, `=`, just as with normal variables.

```cpp
Bow b1("blue");
Bow b2("red");
b1 = b2;
```

`b1` and `b2` will then each store a separate copy of a red bow.

#### Taking the Easy Way Out with Default Constructors

If no arguments are provided when creating an object variable, the computer will execute the default constructor. A default constructor can be one of two things. If the class has no constructor, the default constructor is a blank constructor with no arguments; if you provide a constructor that has no arguments, the default constructor is this constructor.

An empty default constructor is present in all classes until you create a constructor. Unless you create your own default constructor, a default constructor does nothing but create a new object variable that conforms to that object's class declaration.

```cpp
Cpoint3d::Cpoint3d() {

}
```

#### Accessing Members

When a member is public, you can access it from anywhere that an object can be accessed. You can access a public member by using the member access operator, `.`, between the object identifier and the member. To assign a value to a public data member:

```cpp
objectIdentifier.dataMemberName = value;
```

To retrieve the value of a public data member of an object, switch operands:

```cpp
variable = objectIdentifier.variableName;
```

Objects are quite similar to normal variables:

```cpp
class S {
public:
  int x;
};

int main(void) {
  S s;
  s.x = 99;

  return 0;
}
```

The `S` object's data member `x` is public, all code in the program can use or change the `x` member (as long as the code can access the `S` object). As long as an `S` object exists, all code in the program with access to `S` can directly change `S`'s data member `x`.

Public methods are accessed similarly:

```cpp
object.method(arguments);
```

```cpp
class S {
  int x;
public:
  int getValue() {

    return x;
  }
  void setValue(int temp) {
    x = temp;
  }
  S(int temp) : x(temp) {

  }
  ~S() {

  }
};

int main() {
  S s(5);

  cout << s.getValue();

  return 0;
}

// 5
```

Private members cannot be accessed outside a class. However, through public methods, you can usually gain limited access to private data members.

#### Creating a Test Chassis

When you create a class, you must test it. One of the benefits of OOP is the ease with which you can test and debug classes. The idea is to test each class independently of all other classes. If the class does what it is supposed to, it should cause no more errors (in theory) when combined with the rest of the more robust program. To test a class, you create what is called a test chassis.

A test chassis is a program that tests all the capabilities of a class. The test includes all the methods, constructors, and destructors.

Example test chassis for the `Bow` class:

```cpp
#include <iostream>
#include "Bow.h"

void bowTest(void);

int main() {
  bowTest();

  return 0;
}

void bowTest(void) {
  using std::cout

  cout << "Yellow bow created.\n";
  Bow yellow("yellow");

  cout << "Attempting to dire yellow bow\n";
  yellow.fire();

  cout << "Drawing the bow.\n";
  yellow.draw();

  cout << "Attempting to fire yellow bow.\n";
  yellow.fire();
}
```

#### Using Static Members

To declare a single variable that exists across all objects in a class and to make that variable take on OOP's safety properties discussed earlier, use static members. A static member is a variable that will be the same for all instances of that class. The syntax for a static declaration member:

```cpp
class ClassName {
  static variableType variableIdentifier; // declaration
  // other code...
};

// global initialization
variableType ClassName::variableIdentifier = initial_value;
```

*To use a static member, you need to declare a variable in the class and also initialize the variable outside the class. That is, it must be initialized outside a class.*

## Learning the Principles of OOP

The following three aspects of OOP make programs easy to maintain and also make it easy to reuse objects:

- data abstraction
- encapsulation
- polymorphism

#### Understanding Data Abstraction

**Data abstraction is the process of hiding the data members and implementation of a class behind an interface so that the user of the class doesn't corrupt the data.** The idea is that data is hidden inside the implementation for a class. You do access data members through the implementation by accessing the data members through the member function interface. That is, data is no manipulated directly, but through public functions.

>It is often not important to know exactly how a class works, as long as it does what it is designed to do. This is the principle of data abstraction (also known as data hiding).

#### Understanding Encapsulation

>Each class you create should represent one specific thing or concept. Multiple classes then come together to represent combinations of things or concepts.

#### Understanding Polymorphism

>Polymorphism refers to a principle of OOP in which each object can be used in more than one program. The primary principle of polymorphism is that your code will analyze the conditions in which you use it and adjust to those conditions.

## Relating Classes

Recall that classes tend to model concepts or things. However, these concepts or things tend to have certain relationships. **When designing classes for programs, be sure to focus on these relationships, both for convenience and logic. Express these relationships with composition and inheritance.**

### Combining Classes with Composition

Consider a `Weapon` class used in a computer game to represent any weapons that might be encountered:

```cpp
class Weapon {
  int damage;
  int cost;

public:
  Weapon(int theDamage, int theCost);
  // ...other useful methods
};

// Weapon constructor implementation
Weapon::Weapon(int theDamage, int theCost) : damage(theDamage), cost(theCost) {}
```

Another natural class for this game would be a `Player` class which obviously represents a player. First thing you realize is that a player, in this game, needs a weapon. This is a **"has-a" relationship**. *The technique for representing a "has-a" relationship in your code has many names: composition, aggregation, layering, containment, or embedding. Composition is common.* Composition looks like the following:

```cpp
class Player {
  Weapon myWeapon;
  // ...rest of the class
};
```

There is a `Weapon` object contains in the `Player` class.

### Introducing Inheritance

As the computer game expands, it quickly becomes unrealistic and clumsy to represent all the different kinds of weapons with just one class. Each weapon (melee, projectile, magic, etc.) performs a little differently. You could create a new class for the each of the different types of weapons, but this becomes repetitive, and you definitely shouldn't repeat yourself. This solution would be clunky at best. 

We can have a separate class for every weapon type while still maintaining a single weapon class to represent the general concept of a weapon and to keep all the common code. **This concept is called inheritance.**

>Inheritance is used to represent of "kind-of" relationship. For example, projectile weapons are a kind of weapon.

When implementing with inheritance, there will be a general `Weapon` class and the `ProjectileWeapon` class will inherit from it. The `Weapon` class is said to be the parent, base, or super class, and the `ProjectileWeapon` class is said to be the child, derived, or sub class.

#### Writing Code for Inheritance

```cpp
class ProjectileWeapon : public Weapon {
  int range;

public:
  ProjectileWeapon(int theDamage, int theCost, int theRange);
};
```

The key here is `class ProjectileWeapon : public Weapon`. This is how inheritance is denoted in C++. Basically, it says a `ProjectileWeapon` is a kind of `Weapon`. This means that everything in the `Weapon` class is automatically included in the `ProjectileWeapon` class.

The `ProjectileWeapon` constructor isn't made like you would expect. This is because **a child class cannot access its parent's private members**. With this rule, you can ensure that the implementation details of the `Weapon` class are all kept in one place. If you change the name of the `damage` member, you won't need to search through every derived class for uses of this member.

```cpp
// ProjectileWeapon constructor implementation
ProjectileWeapon::ProjectileWeapon(int theDamage, int theCost, int theRange) : Weapon(theDamage, theCost), range(theRange) {}
```

The proper way is to call the parent class's constructor and let it deal with initializing its own private members. In general:

```cpp
class derived_class : scope_modifier base_class
```

Here `derived_class` is the name of the derived class, and `base_class` is the name of the base class. `scope_modifier` can be `public`, `private`, or `protected`.

#### Accessing Class Members through Inheritance

Recall that there are two kinds of access specifiers for members of a class: `public` and `private`. There is a thid kind of access specifier called `protected`, but `protected` only comes into play when inheritance is involved. Without inheritance, it is exactly the same as `private`.

The member functions of a derived class can access the following:

- All global variables.
- The class's own members.
- All `public` and `protected` members of its base class.

A derived class has almost as much access to members as does a base class because the derived class inherits most of the base class's functionality. **The only items that a derived class cannot access are the base class's `private` members.

Consider the following:

```cpp
class Base {
  int private_int;
protected: 
  int getInt() {
    return private_int;
  }
};

class Derived : public Base {
  // error - cannot access private_int
  int myFunc() {
    return private_int;
  }

  // the right way
  int myFunc() {
    return getInt();
  }
};
```

In the above, the `Derived` class cannot access `private_int` because `private_int` is `private`. It can, access the `protected` member function `getInt()`. **Using the base class's `public` and `protected` member functions to access the private data is the proper way to access this data.**

#### Creating Constructors and Destructors in Derived Classes

The constructors and destructors of classes involved in inheritance are a little bit more complicated than normal functions.

The first rule is that if a base class does not have a constructor or one of the base class's constructors does not require arguments, no constructor is needed in the derived class. 

The second rule is that if all the base class's constructors require arguments, the derived class must have a constructor, and the constructor must explicitly invoke the base class's constructor in the initializer list.

The third rule is that the derived class's constructor cannot initialize the variables that it inherits from the base class in an initializer list, even if it has access to those members. It must either use the base class's constructor or initialize the relevant variables in the bases ({ and }).

#### Extending Inheritance

A derived class can also be a base class for another derived class. Through multilevel derivation, you can get an inheritance chain. 

>An inheritance chain is a sequence of derived classes, each of which is also a base to the class below it. The idea here is to begin with a general concept for the base class and then become more specific as you move down the chain.

```cpp
class Vehicle {};
class LandVehicle : public Vehicle {};
class car : public LandVehicle {};
class FordMustang : public Car {};
```

#### Pointers to Base Classes

A pointer to a base class can store the address of a derived object.

```cpp
Base* b;
Derived d;
b = &d; // this is ok
```

This capability of storing two kinds of addresses is an important part of inheritance, and it makes C++ a very powerful language.

Once place where this ability might be useful is in any sort of collection. For example, you could make an array of pointers to `Vehicle` objects, and this array can store any subclass of `Vechicle`.