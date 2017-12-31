---
layout: article

permalink: /notes/error-handling-in-swift/

title: "Error Handling in Swift"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "An undeniable fact of software development is that bugs will crop in your code and lead to undesirable outcomes. Error handling is the process of anticipating a certain class of bugs and writing code to handle them. Swift has build in language constructs to handle errors including modeling our own errors, throwing errors from functions and more."

categories: notes

date: 2017-11-16
---

{% include /globalSections/toc.html %}

An undeniable fact of software development is that bugs will crop in your code and lead to undesirable outcomes. **Error handling is the process of anticipating a certain class of bugs and writing code to handle them.** Swift has build in language constructs to handle errors including modeling our own errors, throwing errors from functions and more.

[Error handling](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/ErrorHandling.html) is the process of responding to and recovering from error conditions in your program. **Swift provides first-class support for throwing, catching, propagating, and manipulating recoverable errors at runtime.**

Some operations aren't guaranteed to always complete execution or produce a useful output. **Optionals are used to represent the absence of a value, but when an operation fails, it's often useful to understand what caused the failure, so that your code can respond accordingly.**

## Types of Errors

Writing code that is completely free of error is difficult if not impossible. However, we can take steps to ensure that our code contains as few errors as possible. This process is known as [error handling](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ErrorHandling.html):

- Error protocol
- throw/throws
- try
- do
- catch

Errors are code that produces an incorrect or unexpected result, or causes your program to behave in an unintended manner.

### Domain Errors

>The simplest of errors are domain errors. A common example of when we run into this is when we want to convert between strings and numbers. 

For instance, we could ask customers to input weight or distance into an app. This data may be input as a string in a text field. Swift's `Int` type has an `init` method and we can pass in string values as arguments to convert them into integers:

```swift
Int.init("1")
```

The above takes a number represented as a string and converts it to an Integer. If you put a string containing a letter then the input is outside the acceptable range of values, or outside the domain. This is called a domain error. Different languages handle this very differently. **Swift deals with domain errors through the use of optionals**:

```swift
var optionalInt: Int? = Int.init("1")
```

Swift views these types of errors as *simple errors*, where halting the program execution is a little over the top. So instead Swift deals with domain errors by using optionals. Through the use of a failable initializer Swift can easily handle this by returning `nil`:

```swift
init?() {}
```

From there, we have the use of a variety of constructs like `guard`, `if let` and `optional` chaining to handle the `nil` value appropriately and continues our program execution. Domain errors occur in many errors. Domain errors can be consider compiler errors in Swift in some cases. This is because Swift optionals have great compiler support.

### Runtime Errors

There are **errors however that the compiler cannot catch** and only occur when you run your program and hit a particular line of code. These are called **runtime errors**, and we can react to them in two ways depending on what kind of error occurred:

- recoverable errors, or 
- unrecoverable errors.

>Neither of these errors can be guarded against therefore **they usually cause our apps to fail and crash**.

## Modeling Errors

**In Swift, error types are created by conforming to the `Error protocol`.** `enums` are particularly well suited for this task. Consider the following example:

```swift
struct Friend {
  let name: String
  let age: String
  let address: String?
}

func friend(from dict: [String: String]) -> Friend {
  guard let name = dict["name"], let age = dict["age"] else { return nil }
  
  let address = dict["address"]
  
  return Friend(name: name, age: age, address: address)
}

```

You can model a error where a `Friend` constant was an invalid type. You can model this by creating an `enum` and using the prototype `Error`. **When you command click and go to the definition of `Error` you will see that it is an empty prototype.**

```swift
struct Friend {
  let name: String
  let age: String
  let address: String?
}

enum FriendError: Error {
  case invalidData
}

func friend(from dict: [String: String]) -> Friend {
  guard let name = dict["name"], let age = dict["age"] else { return nil }
  
  let address = dict["address"]
  
  return Friend(name: name, age: age, address: address)
}
```

Another example:

```swift
enum NetworkError: Error {
  case invalidURL
}
```

## Throwing Errors

**By default a function doesn't raise or `throw` an error.** And this makes sense because not **all functions contain code that can result in an error condition**. When we specifically **want to indicate that our function contains code that can result in an error, we indicate this in the signature of the function with the keyword `throws`**.

>`throws` is always added to a function after the parameter list and before the return type. **It's important to note that a function cannot throw an error without the `throws` keyword.** The compiler then knows that an error can occur.

```swift
func friend(from dict: [String: String]) throws -> Friend {
  guard let name = dict["name"], let age = dict["age"] else { return nil }
  
  let address = dict["address"]
  
  return Friend(name: name, age: age, address: address)
}
```

**At any point inside the body of a throwing function, you can return an error by using the keyword `throw`.** Note there keyword `throws` vs `throw`. Inside the `else` clause, we want to `throw` an error and we're going to throw `FriendError.invalidData`:

```swift
func friend(from dict: [String: String]) throws -> Friend {
  guard let name = dict["name"], let age = dict["age"] else {
    throw FriendError.invalidData
  }
  
  let address = dict["address"]
  
  return Friend(name: name, age: age, address: address)
}
```

**It's important to note, that like the `return` statement, when you hit a `throw` statement, you exit the current scope.** This means everything else in the function does not get compiled. Because a `throw` function can fail, we need to `try` and call it using the keyword `try`.

```swift
let response = ["name": "Billy", "age": "26", "address": "somewhere"]

let someFriend = try friend(from: response)
print(someFriend)
```

If you mess up the response `dictionary` you will somewhat get an error. We can make this better with a description:

```swift
func friend(from dict: [String: String]) throws -> Friend {
  guard let name = dict["name"] else {
    throw FriendError.invalidData(description: "Invalid name value.")
  }
  
  guard let age = dict["age"] else {
    throw FriendError.invalidData(description: "Invalid age value.")
  }
  
  let address = dict["address"]
  
  return Friend(name: name, age: age, address: address)
}
```

**Note that the `throw` keyword always takes an argument.** You cannot simply throw an error without indicating what you want to throw. If a function is not indicated to be a `throws` function and you try to `throw` one.

#### Another Example

```swift
enum BookError: Error {
  case incorrectTitle
}

func lend() throws {
  throw BookError.incorrectTitle
}
```

#### Quiz:

---

**Question**: Errors that are raised before your code is run is commonly known as a:

**Answer**: Compiler error

**Question**: an error that occurs because a result is outside the accepted range of values is known as a ____.

**Answer**: Domain error

**Question**: Where do we add the `throws` keyword to indicate that the function can `throw` an error?

**Answer**: After the parameter list and before the `return` type

**Question**: To allow an object to model an error, we conform to the ____ protocol

**Answer**: `Error`

**Question**: By default all functions `throw` errors.

**Answer**: False

**Question**: To call a throwing function we need to mark it with a certain keyword to indicate that this function can `return` an error. What is the keyword?

**Answer**: `try`

**Question**: An error is said to occur when you get an incorrect or unexpected result

**Answer**: True

**Question**: What language construct allow us to easily deal with domain errors in Swift?

**Answer**: Optionals

**Question**: The `throw` keyword is a control transfer statement and exists the current scope

**Answer**: True

---

## Handling Errors

>Now that we've thrown an error we need to be able to handle it gracefully so that our program execution does not halt.

In Swift the [error handling](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ErrorHandling.html) process involves first catching the error and then handling it. This is done with a `do catch` statement.

**To use a `do catch` statement you start with the `do` and then open a pair of curly braces.** Everything that goes inside this pair of curly braces is what happens if there are no errors to catch and everything works perfectly. 

>To `catch` an error you use the keyword `catch` directly after the `do` closing curly brace. You can then assign the error to a local constant with `let error`. This looks like `catch let error {}`. Note that `let error` is default so technically you can simply write `catch {}`. However, this isn't extremely readable for someone trying to understand what you are trying to catch so always use `let error`. 

It is not great to simply catch every error either. **This is when you would add the error `enum` you've created.** In this example it was called `FriendError`. The `FriendError` tested for invalid data which had a description of type `String` so `catch FriendError.invalidData(let description)`. Next, open a pair of curly braces and do what you want when this error occurs such as printing something (for the developers benefit) or sending an alert to the screen (for the users benefit). All together this looks like the following:

```swift
struct Friend {
  let name: String
  let age: String
  let address: String?
}

enum FriendError: Error {
  case invalidData(description: String)
}

func friend(from dict: [String: String]) throws -> Friend {
  guard let name = dict["name"] else {
    throw FriendError.invalidData(description: "Invalid name value.")
  }
  
  guard let age = dict["age"] else {
    throw FriendError.invalidData(description: "Invalid age value.")
  }
  
  let address = dict["address"]
  
  return Friend(name: name, age: age, address: address)
}

func send(message: String, to friend: Friend) {}

let response = [
  "name": "Billy",
  "ag": "26",
  "address": "somewhere"
]

do {
  let myFriend = try friend(from: response)
  send(message: "Test", to: myFriend)
} catch FriendError.invalidData(let description) {
  // Inform the user that they passed in invalidData
  print(description)
}

// Invalid age value
```

**You can catch multiple errors as well. This is done by adding subsequent `catch` clauses.** This is necessary because unlike other languages Swift's error handling mechanism doesn't preserve the type or error thrown.

```swift
enum FriendError: Error {
  case invalidData(description: String)
  case someError
}

do {
  let myFriend = try friend(from: response)
  send(message: "Test", to: myFriend)
} catch FriendError.invalidData(let description) {
  // Inform the user that they passed in invalidData
  print(description)
} catch FriendError.someError {
  // Inform user of this error
}
```

Therefore, it is important for Swift developers to determine the types of errors that can occur because it is not "done for us".

#### Another Example:

```swift
enum ParserError: Error {
  case emptyDictionary
  case invalidKey
}

struct Parser {
  var data: [String : String?]?
  
  func parse() throws {
    if (data == nil) {
      throw ParserError.emptyDictionary
    } else if (data?.keys.contains("someKey") == false) {
      throw ParserError.invalidKey
    }
  }
}

let data: [String : String?]? = ["someKey": nil]
let parser = Parser(data: data)

do {
  let parsedData = try Parser.parse(parser)
} catch ParserError.emptyDictionary {
  print("The dictionary is empty.")
} catch ParserError.invalidKey {
  print("The key is invalid.")
}
```

## Cleaning Up With Defer

>As we exit the current scope, we may want to execute some code that "cleans up" behind us. Swift has a handy construct for this called the `defer` statement.

**In other words regardless of the error that is raised we may still need to execute some code.** A great example of this, is if we were working with some files on disk, that is a file in local storage. Here we have a function that takes a path to a file name, checks if the file exists, opens it, and does some work with it.

The implementation details of the function aren't really important. What is important is that regardless of what happens, whether we successfully execute our code, we need to close the file that we opened.

The best time to close this file, is when we leave the scope of this function since that indicates that we've either successfully completed work. Or an error has been thrown. But there are several points where we transfer control and exit our current scope in this function. So in this contrived example, there are three points of exit. We have two throwing statements. One of which doesn't matter because we haven't opened the file just yet. And one where we have opened the file and we may throw in there. 

And when we're done with the body of the function. We've successfully completed our work and now we need to close this file. To make sure that regardless of the path we take to exit the current scope, we always close the file. We can use a `defer` statement.

>A `defer` statement executes code within the statement when the program execution leave the current scope. 

The above example in code:

```swift
func process(file name: String) throws {
  guard isValidFile(withName: name) else {
    throw ReadError.invalidFile
  }
  
  let file = open(fileName: name)
  
  guard let line = try file.readLine() else {
    ReadError.unableToReadLine
  }
}
```

Note that the above code is theoretical.

Adding the `defer` statement:

```swift
func process(file name: String) throws {
  guard isValidFile(withName: name) else {
    throw ReadError.invalidFile
  }
  
  let file = open(fileName: name)
  defer {
    close(fileName: name)
  }
  
  guard let line = try file.readLine() else {
    ReadError.unableToReadLine
  }
  
  // close (fullName: name) is called here, at the end of scope
}
```

The above guarantees that the file will be closed. Note that the close file is actually called at the bottom of the function. This is because we want it to be at the end of the current scope.

**Also important to know that the `defer` statement is not tied to error handling. You can use the `defer` statement at any point you want to defer execution.** But in most cases, you will be using it along with your error handling statements. **You can also add multiple `defer` statements in a single function and they're executed in reverse order.** For example, let's say we added a `defer` statement at the bottom to close off a second hypothetical file that we've opened. So the second file here is closed before the first file, because `defer` statements are executed bottom to top of the current scope.

#### Quiz:

---

**Question**: In Swift, you can indicate what kind of error is being thrown from a function, i.e., the function preserves type information of thrown errors.

**Answer**: False

**Question**: How are `defer` statements executed?

**Answer**: In reverse order of which they are written

**Question**: `catch` clauses cannot pattern match on different error cases like a `switch` statement.

**Answer**: False

**Question**: When an error is thrown from inside a `do` clause, what happens?

**Answer**: The error is propagated to its outer scope and handled by a `catch` clause.

**Question**: Where are errors thrown from a function handled?

**Answer**: `catch` clause

**Question**: To execute statements as we leave the current scope we use a ____ statement.

**Answer**: `defer`

**Question**: The call to a throwing function along with the happy path of code is encapsulated in a `do` clause.

**Answer**: `do`

---