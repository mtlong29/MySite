---
layout: article

permalink: /notes/protocols-in-swift/

title: "Protocols in Swift"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "Called interfaces in other languages, protocols define a blueprint of methods, properties, and other requirements that suit a particular task or piece of functionality. Protocols allow us to build flexible, decoupled objects without the limitations of inheritance."

categories: notes

modified: 2017-11-16
---

{% include /globalSections/toc.html %}

Called interfaces in other languages, protocols define a blueprint of methods, properties, and other requirements that suit a particular task or piece of functionality. Protocols allow us to build flexible, decoupled objects without the limitations of inheritance.

## What is a Protocol?

When building software, one of the cornerstones of object-oriented programming is being able to define a set of behaviors expected of objects in a particular situation. 

Just like a coffee shop (you know upfront that a particular business will serve you a cup of coffee), it would be great to have some way to guarantee that our objects model the attributes and behaviors, that is, have the properties and methods, that we expect them to have. This is where protocols come in.

Protocols define a blueprint of methods, properties, and other requirements that suit a particular task or piece of functionality. It allows us to define a set of expected behaviors.

Consider an app that allows some sort of social network. We have different models that represent people in some way. User model, a friend model, and so on. For each of these models, we want to be able to get the user or friends full name.

{% highlight swift linenos %}
protocol FullNameable {
  var fullName: String { get }
}
{% endhighlight %}

Note that with a `protocol` you use upper case CamelCase. Unlike a `class` or `struct`, it doesn't actually provide an implementation. Inside a set of braces after the `fullName` declaration the word `get` is used to indicate that the `fullName` property is only gettable it cannot be used to set after we've given it an initial state. This line of code says that whatever type adobts this protocol must have a stored property called `fullName` that is of type `String`.

## Creating a Protocol

You can create a `struct` and after the name add a colon and followed by the name of the `protocol`. This looks a lot like how a class specified a superclass or base in its inheritance hierarchy, but that's not what this is. 

{% highlight swift linenos %}
protocol FullNameable {
  var fullName: String { get }
}

struct User: FullNameable {
  var fullName: String
}

let user = User(fullName: "Billy Bob")
{% endhighlight %}

The `FullNameable` protocol states that the `struct` `user` must contain the property `fullName` and it must be of type `String`. If it didn't exist or was a different type you would get an error.

Note that it does not matter how the property `fullName` exists. It can either be assigned a value to it or do you computer it from other properties:

{% highlight swift linenos %}
protocol FullNameable {
  var fullName: String { get }
}

struct Friend: FullNameable {
  let firstName: String
  let middleName: String
  let lastName: String
  
  var fullName: String {
    return "\(firstName) \(middleName) \(lastName)"
  }
}

let friend = Friend(firstName: "Timmy", middleName: "Boo", lastName: "Willy")
friend.fullName
{% endhighlight %}

As you can see this is a new way to computer something. It looks much like a function.

Another example:

The protocol defines two requirements: a gettable property named name of type String, and a gettable/settable property named age of type Int To declare a property as gettable, add `{ get }` after the type. For settable add `{ set }` and combine both to get a gettable and settable property `{ get set }`.


{% highlight swift linenos %}
protocol User {
  var name: String { get }
  var age: Int { get set }
}
{% endhighlight %}

In the following, `Person` needs to conform to `User`.

{% highlight swift linenos %}
protocol User {
  var name: String { get }
  var age: Int { get set }
}

struct Person: User {
  var name: String
  var age: Int
}

let somePerson = Person(name: "Billy", age: 25)
{% endhighlight %}

## Why Are Protocols Useful?

Typically when we want to share behavior among a closely related group of objects, we use inheritance. This isn't always the right tool for the job though. Below is a situation where an inheritance hierarchy can be limiting.

Consider an employee database for a particular company:

{% highlight swift linenos %}
import Foundation

enum EmployeeType {
  case manager
  case traditional
}

struct Paycheck {
  let base: Double
  let benefits: Double
  let deductions: Double
  let vacation: Double
}

class Employee {
  let name: String
  let address: String
  let startDate: Date
  let type: EmployeeType
  
  init(name: String, address: String, startDate: Date, type: EmployeeType) {
    self.name = name
    self.address = address
    self.startDate = startDate
    self.type = type
  }
  
  func pay() -> Paycheck {
    return Paycheck(base: 0, benefits: 0, deductions: 0, vacation: 0)
  }
  
}

class HourlyEmployee: Employee {
  var hourlyWage = 15.0
  var hoursWorked = 0.0
  var vacation = 0
  
  override func pay() -> Paycheck {
    let base = hourlyWage * hoursWorked
    return Paycheck(base: base, benefits: 0, deductions: 0, vacation: 0)
  }
}

class SalariedEmployee: Employee {
  var salary = 50000.00
  var benefits = 1000.00
  var deductions = 0.0
  var vacation = 2
}

func pay(employee: Employee) {
  employee.pay()
}
{% endhighlight %}

In the above using `class` inheritance a paycheck may be sent out to hourly employees with 0 dollars. What if the company grew and hourly employees can now be broken down into part time and full time? Inheritance does not work well for this example. This is where `protocols` can come in handy.

Every subclass of `Employee` has to have a `pay()` method. This method also has to have a very specific return value. 

We need to centrally enforce this design and we can do that using a protocol.

## Modeling Behavior With Protocols

Whem you have a set of closely related classes, as the two hourly and salaried employee classes that implements methods which define similar behavior, which in our case is the pay method, but end up having different implementations, protocols lead to better code:

{% highlight swift linenos %}
import Foundation

enum EmployeeType {
  case manager
  case traditional
}

protocol Payable {
  func pay() -> Paycheck
}

struct Paycheck {
  let base: Double
  let benefits: Double
  let deductions: Double
  let vacation: Double
}

class Employee {
  let name: String
  let address: String
  let startDate: Date
  let type: EmployeeType
  
  init(name: String, address: String, startDate: Date, type: EmployeeType) {
    self.name = name
    self.address = address
    self.startDate = startDate
    self.type = type
  }
}

class HourlyEmployee: Employee, Payable {
  var hourlyWage = 15.0
  var hoursWorked = 0.0
  var vacation = 0
  
  func pay() -> Paycheck {
    let base = hoursWorked * hourlyWage
    return Paycheck(base: base, benefits: 0, deductions: 0, vacation: 0)
  }
}

class SalariedEmployee: Employee, Payable {
  var salary = 50000.00
  var benefits = 1000.00
  var deductions = 0.0
  var vacation = 2.0
  
  func pay() -> Paycheck {
    let monthly = salary/12
    return Paycheck(base: monthly, benefits: benefits, deductions: deductions, vacation: vacation)
  }
}

func pay(employee: Payable) {
  employee.pay()
}

let employee = SalariedEmployee(name: "MAtthew", address: "someAddress", startDate: Date(), type: .traditional)
pay(employee: employee)
{% endhighlight %}

We do not have to define some placeholder type in the base class employee to get it to work. Note that Swift protocols are also first class types on their own.

Another example:

{% highlight swift linenos %}
protocol ColorSwitchable {
  func switchColor(_ color: Color)
}

enum LightState {
  case on, off
}

enum Color {
  case rgb(Double, Double, Double, Double)
  case hsb(Double, Double, Double, Double)
}

class WifiLamp: ColorSwitchable {
  let state: LightState
  var color: Color
  
  init() {
    self.state = .on
    self.color = .rgb(0,0,0,0)
  }
  
  func switchColor(_ color: Color) {
    self.color = color
  }
}
{% endhighlight %}

## Protocols as Types

On the flip side, we can have loosely related objects that share some functionality in common.

{% highlight swift linenos %}
protocol Blendable {
  func blend()
}

class Fruit: Blendable {
  var name: String
  init(name: String) {
    self.name = name
  }
  func blend() {
    print("I'm mush!")
  }
}

class Dairy {
  var name: String
  init(name: String) {
    self.name = name
  }
}

class Cheese: Dairy {}

class Milk: Dairy, Blendable {
  func blend() {
    print("I haven't changed at all! I'm still milk!")
  }
}

func makeSmoothie(with ingredients: [Blendable]) {
  for ingredient in ingredients {
    ingredient.blend()
  }
}
{% endhighlight %}

With different food components that conform to `Blendable`, we can define a `makeSmoothie` function. This is iterated over each `ingredient.blend()`, that's it..

Any `protocol` created in Swift becomes a fully fledged type that we can use. Because it is a type, we can use a `protocol` in many places where other types are allowed.

<ol>
  <li>As a parameter type or return type</li>
  <li>Type of a constant, variable, or property</li>
  <li>The underlying type of a collection</li>
</ol>

See instances:

{% highlight swift linenos %}
let strawberry = Fruit(name: "Strawberry")
let cheddar = Cheese(name: "Cheddar")
let chocolateMilk = Milk(name: "Chocolate")

let ingredients: [Blendable] = [strawberry, chocolateMilk]

makeSmoothie(with: ingredients)
{% endhighlight %}

Note that if you removed the type `[Blendable]` from `ingredients` then your code wont compile. It is then an array of mixed type. Also, if you added `cheddar` to the array it would give an error because it is not `Blendable`.

Note that protocols is a pretty big part of Swift. In fact some Swift creators call it the Protocol Oriented Language.

#### Quiz

Question: What is a `protocol`?

Answer: A contract of methods, properties, and other requirements.

Question: Protocols describe what should be implemented but does not require a specific implementation.

Answer: True

Question: Protocols can require that conforming types have specific instance properties, instance methods and type methods.

Answer: True

Question: If a stored property requirement in a protocol is declared as gettable and settable, the property cannot be implemented as?

Answer: constant, because they are not settable

Question: Protocols are fully fledged in Swift. Given this detail, where can protocols be used?

Answer: As a parameter type or return type in a function, method, or initializer. As the type of a constant, variable, or property. As the type of items in an array, dictionary, or other container.

## Protocol Inheritance

Like classes, protocols can inherit from other protocols. But where classes are limited to a single superclass, protocols can inherit from many different protocols.

#### Clearing Up Confusion:

Creating objects through composition that is using different protocols to implement functionality. Offer us a certain level of flexibility that inheritance doesn't, but it can be hard to determine when we need composition vs inheritance. A simple way to think about this is to ask if the relationship between the objects is a `is a` or `has a` relationship.

Consider a classed called `Airplane` that modeled an airplane. Now we want to model a `Jetplane`. Well, a `Jetplane` is a type of `Airplane`. So in this case, since it;s an `is a` relationship, `Jetplane` inherits from the `Airplane`. When we have an `is a` type relationship, inheritance is best suited as our design pattern.

If a class wants to model the exact same behavior and attributes of another class and perhaps add to it, then we want inheritance. In the example a `Jetplane`, will do everything an `Airplane` can, plus some, so we use inheritance.

On the flip side, if you only want to model a particular aspect, a limited subset of this behavior then we use composition.

Let's say we're modeling a `Bird`. Well, a `Bird` is not an `Airplane`, but it has a feature that the `Airplane` does as well: they both can fly. This makes it a `has a` relationship, it makes sense to extract that common behavior out, and create a specific protocol for it. So in this case, we can create a `Fly` protocol that both the `Airplane` and `Bird` can conform to.

There's an aspect of protocols that makes them more useful, when it comes to constructing our object hierarchies, and that is protocols can inherit from other protocols.

#### Example

Consider the following example: 

{% highlight swift linsnoe %}
protocol Printable {
  func description() -> String
}

struct User: Printable {
  let name: String
  let age: Int
  let address: String
  
  func description() -> String {
    return "\(name), \(age), \(address)"
  }
}

let user = User(name: "Billy", age: 26, address: "somewhere")
print(user.description())
// Billy, 26, somewhere
{% endhighlight %}

The above works but it would be nice to see a text representation, that's formatted nicely, and a lot more readable. As you can see `"Billy, 26, somewhere"` isn't super readable. Especially if this was more complex, there'd be a lot of information, we could modify the description function, but this isn't the desired method, because sometimes, we may not want a formatted description. The description string as it is now could be useful on its own at some point.

Instead of modifying the current description, we could create a new protocol. Name it `PrettyPrintable`.

{% highlight swift linenos %}
protocol Printable {
  func description() -> String
}

protocol PrettyPrintable: Printable {
  func prettyDescription() -> String
}

struct User: PrettyPrintable {
  let name: String
  let age: Int
  let address: String
  
  func description() -> String {
    return "\(name), \(age), \(address)"
  }
  
  func prettyDescription() -> String {
    return "name: \(name)\nage: \(age)\naddress: \(address)"
  }
}

let user = User(name: "Billy", age: 26, address: "somewhere")
print(user.prettyDescription())
// name: Billy
// age: 26
// address: somewhere
{% endhighlight %}

With the above if you remove the `description` function from the `User` struct then an error will arise because `User` doesn't conform to the protocol `Printable`.

With protocol inheritance you must first satisfy the requirements of the top most protocol.

Unlike classes protocols can inherit from many other protocols.

{% highlight swift linenos %}
protocol Printable {
  func description() -> String
}

protocol NotSoPrettyPrintable {
  func notSoPrettyDescripton() -> String
}

protocol PrettyPrintable: Printable, NotSoPrettyPrintable {
  func prettyDescription() -> String
}
{% endhighlight %}

This can be used to create a protocol chain. This is actually how Swift is meant to be used!

#### Another Example

{% highlight swift linenos %}
protocol Animal {
  var numberOfLegs: Int { get }
}

protocol Pet: Animal {
  var cuddlyName: String { get }
}

struct Dog: Pet {
  var numberOfLegs: Int
  var cuddlyName: String
}
{% endhighlight %}

## Swift's Standard Library Protocols

The Swift language itself is built on a foundation of protocols.

Standard libraries are part of programming languages, and the Swift standard library contains the basic types and collections we've been working with, along with different sorts of protocols, methods, and many other things.

A good place to understand how Swift uses protocols is to look at what they're used for in the standard library.

The Swift standard library contains several primary protocols, and they can be grouped into three main sections:

<ul>
  <li>Can Do,</li>
  <li>Is A, and</li>
  <li>Can Be.</li>
</ul>

#### Can Do

The first group of protocols, "Can Do", are used to represent behavior, where "an object can do something". 

For example, to compare one object to another of the same type, we encapsulate this behavior in a protocol called `Equatable`.

The public definition of `Equatable`:

{% highlight swift linenos %}
public protocol Equatable {

    /// Returns a Boolean value indicating whether two values are equal.
    ///
    /// Equality is the inverse of inequality. For any values `a` and `b`,
    /// `a == b` implies that `a != b` is `false`.
    ///
    /// - Parameters:
    ///   - lhs: A value to compare.
    ///   - rhs: Another value to compare.
    public static func ==(lhs: Self, rhs: Self) -> Bool
}
{% endhighlight %}

This says that any object that conforms to `Equatable` is required to provide an implementation for the double equals operator as a static function.

{% highlight swift linenos %}
protocol Printable {
  func description() -> String
}

protocol PrettyPrintable {
  func prettyDescription() -> String
}

struct User: PrettyPrintable, Equatable {
  let name: String
  let age: Int
  let address: String
  
  func description() -> String {
    return "\(name), \(age), \(address)"
  }
  
  func prettyDescription() -> String {
    return "name: \(name)\nage: \(age)\naddress: \(address)"
  }
  
  static func ==(lhs: User, rhs: User) -> Bool {
    return lhs.name == rhs.name && lhs.age == rhs.age && lhs.address == rhs.address
  }
}

let user = User(name: "Billy", age: 26, address: "somewhere")
let anotherUser = User(name: "Billy", age: 26, address: "somewhere")

user == anotherUser
// true
{% endhighlight %}

In the above `rhs` is right hand side, and `lhs` is left hand side. The function name is `==`.

Note that if your protocol models behavior about something your object can do, they can be compared or hashed or equated, then we add the `able` suggix. Our first protocol indicated that objects can provide a full name, so we called it `FullNameable`. This is something that simply fits conventions.

#### Is A

If your object is a type of another object then it should inherit from it using class inheritance. Now in the case of this naming over here, "Is A" simply indicates that the protocol models a concrete type, and in fact Swift follows the conventions of using nouns for these names.

The various examples of thie are the collection protocol, integer protocol, and so on. They model the identy of an object.

#### Can Be

"Can Be" protocols are pretty intuitice. They model behavior where one type can be converted to another type. For example, some of these types in the Swift standard library include `ExpressibleByFloatLiteral`, `ExpressibleByArrayLiteral`, and `CustomStringConvertible`. In fact, `CusomStringConvertible` is the Swift standard library protocol for `Printable` above. The definition of `CutomStringConvertible`:

{% highlight swift linenos %}
public protocol CustomStringConvertible {

    /// A textual representation of this instance.
    ///
    /// Instead of accessing this property directly, convert an instance of any
    /// type to a string by using the `String(describing:)` initializer. For
    /// example:
    ///
    ///     struct Point: CustomStringConvertible {
    ///         let x: Int, y: Int
    ///
    ///         var description: String {
    ///             return "(\(x), \(y))"
    ///         }
    ///     }
    ///
    ///     let p = Point(x: 21, y: 30)
    ///     let s = String(describing: p)
    ///     print(s)
    ///     // Prints "(21, 30)"
    ///
    /// The conversion of `p` to a string in the assignment to `s` uses the
    /// `Point` type's `description` property.
    public var description: String { get }
}
{% endhighlight %}

You can look at how Swift uses protocols by typing something such as `Array` and command click to go to the definition. You'll see that Array has two protocols and is actually a struct.

From there you can command click other protocols and it will go very deep. This displays the long chain of Swift protocol inheritance.

## Protocol Oriented Programming

Swift is often described as a protocol oriented programming language.

Protocol oriented programming does not mean we are abandoning object oriented programming. This simply means carefully defining the interfaces to your objects. It means preferring composition over inheritance where possible to create flexible objects.

Swifts features make it pretty easy to implement, so we favor this approach.

{% highlight swift linenos %}
protocol Movable {
  func move(_ direction: Direction, by distance: Int)
}

protocol Destructable {
  func decreaseLife(by factor: Int)
}

protocol Player: Destructable {
  var position: Point { get set }
  var life: Int { get set }
  
  init(x: Int, y: Int)
}

protocol Attacker {
  var strength: Int { get }
  var range: Int { get }

  func attack(player: Player)
}
{% endhighlight %}

All of the above can be used to mode a tower defense game.

#### Quiz

Question: Multiple protocol inheritance allows composition of functionality by combining types as you need

Answer: True

Question: Protocols in Swift can be used wherever a type is expected

Answer: True

Question: To conform to the Equatable protocol, types should:

Answer: Provide an implementation for the `==` operator.

Question: What does conforming to the `ExpressibleByDictionaryLiteral` protocol allow types to do?

Answer: Allows conforming types to be initialized with dictionary literals