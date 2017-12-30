---
layout: article

permalink: /notes/swift-basics/

title: "Swift Basics"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "Swift was introduced by Apple in 2014. It's used for macOS, iOS, tvOS, and watchOS. These notes cover the basics on the Swift programming language."

categories: notes

date: 2017-10-28
---

{% include /globalSections/toc.html %}

Swift was introduced by Apple in 2014. It's used for macOS, iOS, tvOS, and watchOS.

## What is Swift?

**Up until 2014 development for applications on these devices was done using *Objective-C*.** This was introduced a very long time ago and was built to program on a very different set of computers than we use today. It is known as legacy tooling and started to show its age.

>Many people called upon Apple to fix *Objective-C*. Instead, they had been working on *Swift*. Developers wanted a programing language that is safe, modern, and more powerful than *Objective-C*.

In addition to being able to program. It is also important to be able to talk like one. It's important to know the terms used by other developers.

>Types are a construct to represent different kinds of data like letters or numbers. Syntax is the commands, special words, and punctuation you use to put together a program.

## An Introduction to Xcode

In order to program in Swift you must have software. When we build apps, we use lots of different tools. There's an editor where we write code. An interface builder to work on the visual components of the app, and a debugger to help fix problems. **Xcode is a combination of these tools and is known as an integrated development environment (or IDE).** Install this through the app store.

## Variables

**Declare a variable using the `var` keyword.** Then use double quotes, integers, booleans, etc like other languages. *Unlike other languages you cannot declare a variable a string and then change its type to an integer, for example.* A variable containing a piece of data is what is known as a **mutable type**. This is because it can be changed. This also makes swift a statically type language.

>Swift is a "statically type language".

## Constants

**The syntax to create a constant in swift is `let`.** This is unlike javascript where `let` can be altered. Here, in swift, `let` cannot be changed. A variable containing a piece of data is what is known as a immutable type. This is because it cannot be changed. **It is the `let` keyword because of english used in math.** Such as "*let x equal this*". Always use `let` unless the variable will need to be changed later.

## Conventions and Rules

Swift uses **camelCase** naming conventions. Constants and variable names cannot start with a number, special character, or space. Spaces cannot be used either. Keywords cannot be used either. It is actually possible to use an emoji as a variable name, but please god dont..

## String Manipulation

>Sting interpolation and concatenation can be done in swift. 

In the following example, `concatAddress` and `interpAddress` are equal. **Interpolation is much more powerful than concatenation.** One limitation of concatenation is you are unable to concatenate a string with an integer. This will cause the compiler to not compile. However, if you place an integer inside of the parentheses of `let number = "\(5)"` then it will compile.

```swift
let country = "United States of America"
let state = "Texas"
let city = "Austin"

// String Concatenation
let concatAddress = country + ", " + state + ", " + city

// String Interpolation
let interpAddress = "\(country), \(state), \(city)"
```

## Type Safety and Type Inference

>Instead of declaring a variable and letting the compiler determine its type you can explicitly set its type. Do this by adding a `:`, followed by a space and the type keyword.

```swift
let name: String = "Matthew Long"
var age: Int = 26
let randomFloatNum: Double = 4.2
let male: Bool = true
```

In *Objective-C* you were required to explicitly set every variable and constants type. However, **swift can infer the type for us**. It is not necessary to add the type explicitly like this. It can however be good indication of what the type is unless you already know them. Therefore, let the compiler do it for you.

>Note that in Swift you cannot perform an operation such as dividing a type `int` by a type `double` or `float`:

```swift
let width = 4
let height = 2
let area = width * height
let randomNum = area/2.5
```

You can *fix* this by one of the two ways:

```swift
let width = 4.0
let height = 2.0
let area = width * height
let randomNum = area/2.5
```

```swift
let width: Double = 4
let height: Double = 2
let area = width * height
let randomNum = area/2.5
```

As you can see **type is fairly picky in *Swift***.

## Unary Operators

You can use the not operator `!` in the following way:

```swift
let on = true
let off = !on
```

There are many uses for this.