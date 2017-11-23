---
layout: article

permalink: /notes/error-handling-in-swift/

title: "Error Handling in Swift"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "An undeniable fact of software development is that bugs will crop in your code and lead to undesirable outcomes. Error handling is the process of anticipating a certain class of bugs and writing code to handle them. Swift has build in language constructs to handle errors including modeling our own errors, throwing errors from functions and more."

categories: notes

modified: 2017-11-16
---

{% include /globalSections/toc.html %}

An undeniable fact of software development is that bugs will crop in your code and lead to undesirable outcomes. Error handling is the process of anticipating a certain class of bugs and writing code to handle them.

Swift has build in language constructs to handle errors including modeling our own errors, throwing errors from functions and more.

<a href="https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/ErrorHandling.html">Error handling</a> is the process of responding to and recovering from error conditions in your program. Swift provides first-class support for throwing, catching, propagating, and manipulating recoverable errors at runtime.

Some operations aren't guaranteed to always complete execution or produce a useful output. Optionals are used to represent the absence of a value, but when an operation fails, it's often useful to understand what caused the failure, so that your code can respond accordingly.

## Types of Errors

Writing code that is completely free of error is difficult if not impossible. However, we can take steps to ensure that our code contains as few errors as possible. This process is known as <a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ErrorHandling.html">error handling</a>:

<ul>
  <li>Error protocol</li>
  <li>throw/throws</li>
  <li>try</li>
  <li>do</li>
  <li>catch</li>
</ul>

Errors are code that produces an incorrect or unexpected result, or causes your program to behave in an unintended manner.

### Domain Errors

The simplest of errors are domain errors. A common example of when we run into this is when we want to convert between strings and numbers. 

For instance, we could ask customers to input weight or distance into an app. This data may be input as a string in a text field. Swift's `Int` type has an `init` method and we can pass in string values as arguments to convert them into integers:

{% highlight swift linenos %}
Int.init("1")
{% endhighlight %}

The above takes a number represented as a string and converts it to an Integer. 

If you put a string containing a letter then the input is outside the acceptable range of values, or outside the domain. This is called a domain error.

Different languages handle this very differently. Swift deals with domain errors through the use of optionals:

{% highlight swift linenos %}
var optionalInt: Int? = Int.init("1")
{% endhighlight %}

Swift views these types of errors as simple errors, where halting the program execution is a little over the top. So instead Swift deals with domain errors by using optionals.

Through the use of a failable initializer Swift can easily handle this by returning `nil`:

{% highlight swift linenos %}
init?() {}
{% endhighlight %}

From there, we have the use of a variety of constructs like `guard`, `if let` and `optional` chaining to handle the `nil` value appropriately and continus our program execution.

Domain errors occur in many errors.

Domain errors can be consider compiler errors in Swift in some cases. This is because Swift optionals have great compiler support.

### Runtime Errors

There are errors however that the compiler cannot catch and only occur when you run your program and hit a particular line of code. These are called runtime errors, and we can react to them in two ways depending on what kind of error occurred:

<ul>
  <li>recoverable errors, or </li>
  <li>unrecoverable errors.</li>
</ul>

Neither of these errors can be guarded against therefore they usually cause our apps to fail and crash.

## Modeling Errors

In Swift, error types are created by conforming to the `Error protocol`. `enums` are particularly well suited for this task.

Consider the following example:

{% highlight swift linenos %}
struct Friend {
  let name: String
  let age: String
  let address: String?
}

func friend(from dict: [String: String]) -> Friend? {
  guard let name = dict["name"], let age = dict["age"] else { return nil }
  
  let address = dict["address"]
  
  return Friend(name: name, age: age, address: address)
}

{% endhighlight %}

You can model a error where a `Friend` constant was an invalid type. You can model this by creating an `enum` and using the prototype `Error`. When you command click and go to the definition of `Error` you will see that it is an empty prototype.

{% highlight swift linenos %}
struct Friend {
  let name: String
  let age: String
  let address: String?
}

enum FriendError: Error {
  case invalidData
}

func friend(from dict: [String: String]) -> Friend? {
  guard let name = dict["name"], let age = dict["age"] else { return nil }
  
  let address = dict["address"]
  
  return Friend(name: name, age: age, address: address)
}
{% endhighlight%}

Another example:

{% highlight swift linenos %}
enum NetworkError: Error {
  case invalidURL
}
{% endhighlight %}

## Throwing Errors

By default a function doesn't raise or `throw` an error. And this makes sense because not all functions contain code that can result in an error condition. 

When we specifically want to indicate that our function contains code that can result in an error, we indicate this in the signature of the function with the keyword `throws`.

`throws` is always added to a function after the parameter list and before the return type:

{% highlight swift linenos %}
func friend(from dict: [String: String]) throws -> Friend? {
  guard let name = dict["name"], let age = dict["age"] else { return nil }
  
  let address = dict["address"]
  
  return Friend(name: name, age: age, address: address)
}
{% endhighlight %}

It's important to note that a function cannot throw an error without the `throws` keyword. The compiler then knows that an error can occur.

At any point inside the body of a throwing function, you can return an error by using the keyword `throw`. Note there keyword `throws` vs `throw`.

Inside the `else` clause, we want to `throw` an error and we're going to throw `FriendError.invalidData`:

{% highlight swift linenos %}
func friend(from dict: [String: String]) throws -> Friend? {
  guard let name = dict["name"], let age = dict["age"] else {
    throw FriendError.invalidData
  }
  
  let address = dict["address"]
  
  return Friend(name: name, age: age, address: address)
}
{% endhighlight %}

It's important to note, that like the `return` statement, when you hit a `throw` statement, you exit the current scope. This means everything else in the function does not get compiled.

Because a `throw` function can fail, we need to `try` and call it using the keyword `try`.

{% highlight swift linenos %}
let response = ["name": "Billy", "age": "26", "address": "somewhere"]

let someFriend = try friend(from: response)
print(someFriend)
{% endhighlight %}

If you mess up the response `dictionary` you will somewhat get an error. We can make this better with a description:

{% highlight swift linenos %}
func friend(from dict: [String: String]) throws -> Friend? {
  guard let name = dict["name"] else {
    throw FriendError.invalidData(description: "Invalid name value.")
  }
  
  guard let age = dict["age"] else {
    throw FriendError.invalidData(description: "Invalid age value.")
  }
  
  let address = dict["address"]
  
  return Friend(name: name, age: age, address: address)
}
{% endhighlight %}

Note that the `throw` keyword always takes an argument. You cannot simply throw an error without indicating what you want to throw. If a function is not indicated to be a `throws` function and you try to `throw` one.

#### Another Example

{% highlight swift linenos %}
enum BookError: Error {
  case incorrectTitle
}

func lend() throws {
  throw BookError.incorrectTitle
}
{% endhighlight %}

#### Quiz

Question: Errors that are raised before your code is run is commonly known as a:

Answer: Compiler error

Question: an error that occurs because a result is outside the accepted range of values is known as a ____.

Answer: Domain error

Question: Where do we add the `throws` keyword to indicate that the function can `throw` an error?

Answer: After the parameter list and before the `return` type

Question: To allow an object to model an error, we conform to the ____ protocol

Answer: `Error`

Question: By default all functions `throw` errors.

Answer: False

Question: To call a throwing function we need to mark it with a certain keyword to indicate that this function can `return` an error. What is the keyword?

Answer: `try`

Question: An error is said to occur when you get an incorrect or unexpected result

Answer: True

Question: What landuage construct allow us to easily deal with domain errors in Swift?

Answer: Optionals

Question: The `throw` keyword is a control transfer statement and exists the current scope

Answer: True

