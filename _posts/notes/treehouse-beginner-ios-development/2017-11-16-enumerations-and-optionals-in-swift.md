---
layout: article

permalink: /notes/enumerations-and-optionals-in-swift/

title: "Enumerations and Optionals in Swift"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "Two of Swift's most novel features over Objective-C are the extended power of enumerations and the language features to deal with nil values."

categories: notes

date: 2017-11-16
---

{% include /globalSections/toc.html %}

Two of Swift's most novel features over Objective-C are the extended **power of enumerations** and the language features to **deal with nil values**.

## The Problem with Primitives

>Enumerations allow us to model a finite grouping of data or a group of related types. `enums` are common in a few different languages. And in Swift, it traces its history to `enums` in the C language. But `enums` in Swift are a lot more flexible. In fact, they resemble objects. 

Consider the following example:

```swift
let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

func dayType(for day: String) -> String {
  switch day {
  case "Sunday", "Saturday": return "Weekend"
  case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday": return "Workday"
  default: return "This isn't a valid day!"
  }
}

func isNotificationMuted(on day: String) -> Bool {
  if day == "Weekend" {
    return true
  } else {
    return false
  }
}

let result = dayType(for: week[4])
let isMuted = isNotificationMuted(on: result)
```

**While this is a very simple array and function, what if instead of typing in `week[4]` we typed in `Thursday`.** This would work the same, but **typos are very common**! What if we accidentally typed in `Thusrday`? Or if the `week` array had a day typed incorrectly from the start. This would result in incorrect or unexpected output.

>This is why using strings can cause issues!

## Modeling Finite Data

Now that it is obvious that **strings can cause issues**, we can rewrite the functions using enumerations!

>To create an Enumeration **start with the `enum` keyword**. Then **give it a name like any other custom type**. Use uppercase *CamelCase* here as well! Inside the body of the `enum` you define member values, or members of the enumeration. Each member is defined **using the `case` keyword**, which is the same keyword we use inside the switch statement.

```swift
enum Day {
  case sunday
  case monday
  case tuesday
  case wednesday
  case thursday
  case friday
  case saturday
}
```

**This is when the possibility to type in the incorrect string is removed!** The following is the same function rewritten using the `enum`.

```swift
func dayType(for day: Day) -> String {
  switch day {
  case Day.saturday, Day.sunday: return "Weekend"
  case Day.monday, Day.tuesday, Day.wednesday, Day.thursday, Day.friday: return "Weekday"
  }
}
```

First, **note that there is no `default` case**. This is because the days of the week is a finite set of data. There is no more than these 7 days and it is impossible for the code to run to reach more than these 7. The switch case is exhaustive. Meaning it exhausts all possibilities. For example, if you remove the `Day.friday` case the compiler will then tell you it is not exhaustive. You can either add `Day.friday` or a `default` case.

>Also, it is impossible for an incorrect string to be typed in like before because the compiler will autocomplete and auto correct your values.

There are many examples of fixed data. 

## Getting Rid of Strings

 We got rid of some instances of strings in our function but there's still room for improvement!

 In the `dayType` function there are still strings being returned. Therefore, there is still a possibility for a typo! This means it is a good opportunity to create a new `enum`. Now that we aren't returning a `String` you can change the return type to the new `enum`:

 ```swift
 enum DayType {
  case weekend
  case weekday
}

func dayType(for day: Day) -> DayType {
  switch day {
  case Day.saturday, Day.sunday: return DayType.weekend
  case Day.monday, Day.tuesday, Day.wednesday, Day.thursday, Day.friday: return DayType.weekday
  }
}
```

You can create an error proof `isNotificationMuted` function as well:

```swift
func isNotificationMuted(on type: DayType) -> Bool {
  switch type {
  case DayType.weekend: return true
  case DayType.weekday: return false
  }
}
```

As you can see **no strings** are being typed anywhere now!

Note that it is actually possible to omit the `Day` and `DayType` this is because the function knows the type and return type already. This actually makes the code a little more readable as well. On top of that you don't have to list all the days of the weekday days of the week for the `dayType` function. Also, **you don't have to type `case` out every time either. You can instead say case once and separate them with a comma.** Some people like to keep them separate on every line though. 

```swift
enum Day {
  case sunday, monday, tuesday, wednesday, thursday, friday, saturday
}

enum DayType {
  case weekend, weekday
}

func dayType(for day: Day) -> DayType {
  switch day {
  case .saturday, .sunday: return .weekend
  default: return .weekday
  }
}

func isNotificationMuted(on type: DayType) -> Bool {
  switch type {
  case .weekend: return true
  case .weekday: return false
  }
}
```

You need to find a good balance for readability!

>Note that with Swift you can have multiple functions with the same name as long as they **take different parameter types**.

This is why both the functions with the custom types and the ones with the arrays can be written in the same file without and error. This means that **in reality they are two different functions, even though they have the same name**. Note that when you call the functions you will see both in Xcode.

Call the new functions by:

```swift
let type = dayType(for: .monday)
let isMuted = isNotificationMuted(on: type)
// false
```

#### Another Example:

```swift
class Point {
  var x: Int
  var y: Int
  
  init(x: Int, y: Int) {
    self.x = x
    self.y = y
  }
}

enum Direction {
  case left
  case right
  case up
  case down
}

class Robot {
  var location: Point
  
  init() {
    self.location = Point(x: 0, y: 0)
  }
  
  func move(_ direction: Direction) {
    switch direction {
    case .left: return location.x -= 1
    case .right: return location.x += 1
    case .up: return location.y += 1
    case .down: return location.y -= 1
    }
  }
}
```

## Associated Enums

In Swift each `enum` member, so not the actual `enum`, but each member can store associated values of other types along with this member value. Basically this gives you a way to store custom information for each `enum` case every time we create a new value.

```swift
enum ColorComponent {
  case rgb(Float, Float, Float, Float)
  case hsb(Float, Float, Float, Float)
}

ColorComponent.rgb(61.0, 120.0, 198.0, 1.0)
```

As you can see it is easy to add additional data to a case that can be given at the creation of the instance. Simply open parentheses and list the types.

#### Another Example:

```swift
enum MobilePhone {
  case iphone(String), android(String), windowsPhone(String)
}

let iphone = MobilePhone.iphone("7 Plus")
```

## Methods on Enumerations

>Enumerations are sort of like other objects in Swift. Like classes and structures we can add instance methods to an `enum`, but unlike classes and structures, enumerations can't have stored properties.

**To refer to an `enum` value inside the `enum` you use the keyword `self`.** This is how you would switch over all the cases in an `enum`.

```swift
import UIKit

enum ColorComponent {
  case rgb(red: CGFloat, green: CGFloat, blue: CGFloat, alpha: CGFloat)
  case hsb(hue: CGFloat, saturation: CGFloat, brightness: CGFloat, alpha: CGFloat)
  
  func color() -> UIColor {
    switch self {
    case .rgb(let red, let green, let blue, let alpha): return UIColor(red: red/255.0, green: green/255.0, blue: blue/255.0, alpha: alpha)
    case .hsb(let hue, let saturation, let brightness, let alpha): return UIColor(hue: hue/360.0, saturation: saturation/100.0, brightness: brightness/100.0, alpha: alpha)
    }
  }
}

ColorComponent.rgb(red: 60, green: 198, blue: 130, alpha: 1).color()
ColorComponent.hsb(hue: 270, saturation: 77, brightness: 89, alpha: 0.95).color()
```

As you can see you can place names in front of the types for the associated values.

In the above `UIKit` was imported and then the `rgb` and `hsb` colors were used within this framework. Note that Xcode will display the colors. With the way that `UIKit` works you must use `CGFloat` types, which is a type of `Float`. To use the method you can chain it on to the instance.

Note that the types can be different:

```swift
enum Barcode {
  case upc(Int, Int, Int, Int)
  case qrCode(String)
}

var productBarcode = Barcode.upc(8, 85909, 51226, 3)
productBarcode = .qrCode("ABCDEFGHIJKLMNOP")
```

#### Another Example:

```swift
enum BarButton {
  case done(title: String)
  case edit(title: String)
  
  func button() -> UIBarButtonItem {
    switch self {
    case .done: return UIBarButtonItem(title: "done", style: .done, target: nil, action: nil)
    case .edit: return UIBarButtonItem(title: "edit", style: .plain, target: nil, action: nil)
    }
  }
}

let done = BarButton.done(title: "Save")
let button = done.button()
```

## The Absence of Data

In many languages, when you encounter the absence of data, you have to deal with it by writing another pah for your code. There is no indication that the data doesn't exist so at many points in your program you have to write defensive code. This isn't the situation in Swift.

An example of the absence of data is if you're building a journal app where you write your thoughts and hit save and then a string is stored in some database. However, what if someone hits save before writing your thoughts. There is no string to store in the database. If you haven't taken this into account the database will return an error and your app will crash!

Luckily, Swift has a feature for this known as optionals! Once you start working with optionals it's really hard to go back to a language that doesn't have optionals.

>In order to have an `optional` you use the question mark character, `?`.

Consider the following example concerning a persons name:

```swift
struct Person {
  let firstName: String
  let lastName: String
}

let me = Person(firstName: "Timmy", lastName: "Billy")
```

For many people this is enough, but for others the middle name is an important part of their culture. For others, they don't even have a middle name. Therefore, a middle name should be `optional`:

```swift
struct Person {
  let firstName: String
  let middleName: String?
  let lastName: String
}

let me = Person(firstName: "Timmy", middleName: nil, lastName: "Billy")
```

As you can see the value of Timmy Billy's middle name is `nil`. This means there is no value. **If the `?` was removed this would be an error because `nil` is not a `String`.**

In other words, the following line of code `let someInt: Int?` means `someInt` might be type `Int` or it might be nothing. However, it cannot be a different type such as a `String`, or `Bool`.

On a side note, **an `optional` is modeled as an `enum`**. Consider the following:

```swift
enum Optional {
  case some(String)
  case none
}
```

If some string exists then it's that string otherwise it is none.

>Note that any custom type that we create can also be an optional. Not just Swifts built in types can be optionals.

#### Another Example:

```swift
var someValue: Int? = nil
```

## Working with Optional Types

Many languages don't have a way to indicate that a type could be `nil` or `null` at some point. Instead, we have to remember to check in many places.

**In order to use** the `middleName` value in string concatenation such as creating a `fullName` **you must unwrap** the `middleName` variable type. This is because a **`String` and an `optional String` are not the same type**. 

There is a way to forceably unwrap using an `!` but this is **VERY bad. NEVER do this..** For example, if `middleName` is `nil`, but you forget to check (such as an `if else` statement) for this and you concatenate AND unwrap then your code will crash!! DO NOT USE THE `!` TO UNWRAP!!

## Optional Binding

>The safe way to unwrap things is using `optional binding`.

>**Recall that dictionaries always `return` an `optional` value.** This is because when we asked for a particular value using a `key`, there's a chance this `key` might not exist. And rather than crashing, we safely `return nil` using an `optional`.

```swift
let airportCodes = [
  "CDG": "Charles De Gaulle"
]
let newYorkAirport = airportCodes["JFK"]

if let newYorkAirport = airportCodes["JFK"] {
  print(newYorkAirport)
} else {
  print("Whoops! That key does not exist!")
}
// "Whoops! That key does not exist!"
```

The above is called `optional binding`. **It's like saying if something exists do this else if nil do something else.** This lets the compiler do the unwrapping for us instead of forcing it to unwrap.

#### Another Example:

```swift
let weatherDictionary: [String: [String: String]] = [
  "currently": ["temperature": "22.3"],
  "daily": ["temperature": "25.1"],
  "weekly": ["temperature": "24.8"]
]

let dailyWeather = weatherDictionary["daily"]
```

When you option click on `dailyWeather` you will see that it is type **`[String: String]?`**. This means **we need to unwrap it**:

```swift
let weatherDictionary: [String: [String: String]] = [
  "currently": ["temperature": "22.3"],
  "daily": ["temperature": "25.1"],
  "weekly": ["temperature": "24.8"]
]

if let dailyWeather = weatherDictionary["daily"] {
  
}
```

Now when you option click `dailyWeather` you will see that it is type `[String: String]`. Which means `dailyWeather` has been unwrapped. However, when you add  the `"temperature"` key you will see that this also needs to be unwrapped:

```swift
let weatherDictionary: [String: [String: String]] = [
  "currently": ["temperature": "22.3"],
  "daily": ["temperature": "25.1"],
  "weekly": ["temperature": "24.8"]
]

if let dailyWeather = weatherDictionary["daily"] {
  if let highTemp = dailyWeather["temperature"] {
    print(highTemp)
  }
}
```

This works and prints `"25.1"`, but when you have nested `optional bindings` it can get very messy. If you have a lot of "*unnesting*" to do this can look like a pyramid if you look at it on its side. **The swift community called this the Swift Pyramid of Doom... Luckily since Swift 2, and now even better in 3, we don't need the Pyramid of Doom**:

```swift
if let dailyWeather = weatherDictionary["daily"], let highTemperature = dailyWeather["temperature"] {
  print(highTemperature)
}
```

Now you can chain what to unwrap by separating them in one `if` using a comma instead of nested `if` statements. 

#### Another Example:

```swift
let movieDictionary = ["Spectre": ["cast": ["Daniel Craig", "Christoph Waltz", "Léa Seydoux", "Ralph Fiennes", "Monica Bellucci", "Naomie Harris"]]]

var leadActor: String = ""

if let movie = movieDictionary["Spectre"], let castMembers = movie["cast"] {
  leadActor = castMembers[0]
}
```

There are some downsides to using `if let` to unwrap an `optional`.. If you have a `struct` with two `String` types but one optional String type. **You will almost always have that pyramid type.** For example, you can check for the first two but then that third will make it `nil` which means you have to check inside the first two checks resulting in a pyramid. **This is where early exits come in!**

## Early Exits Using Guards

>An early exit is when we exit a function as early as possible. We can do this using the guard statement.

Consider the following example:

```swift
if let someValue = someOptionalExpression {
  print(someValue)
}
```

In the above a temporary constant is assigned to an expression. The expression has to be one that returns an optional value if this succeeds, inside the `if let` statement we have access to that temporary variable containing the unwrapped value.

In contrast **we start a `guard` statement with the `guard` keyword**. Like `if let` we then create a temporary constant and assign the value. Then we provide an expression to evaluate. This expression like before must return an optional value. If the expression succeeds that is the optional contains a value and is not `nil` it is assigned to the constant. So far everything is the same: `guard let someValue = someOptionalExpression`. However, **with the `guard` statement instead of opening the brace now, we write the `else` keyword and then add the brace. In the body we write what to do if it DOES contain `nil`**:

```swift
guard let someValue = someOptionalExpression else {
  return nil
}
```

>With `guard` the body is the failure path. We have to exit the current scope once we enter the brace. Typically, this means that we exit the function early by returning `nil`. This is why the `guard` statement is called an early exit construct.

```swift
struct Friend {
  let name: String
  let age: String
  let address: String?
}

func newFriend(friendDictionary: [String: String]) -> Friend? {
  guard let name = friendDictionary["name"], let age = friendDictionary["age"] else {
    return nil
  }
  let address = friendDictionary["address"]
  return Friend(name: name, age: age, address: address)
}
```

In the above example you check for `name` and `age`. For this, those are required to have a `Friend`. So if either of these don't exist we immediately exit the function with `nil`. If they do exist then we can return an instance of `Friend` with an optional `address`. You don't have to know the `address` to be your friend.

Note that there is a feature known as a failure initializer that can be used to initialize something that may not give a value this can look like `init?`.

#### Another Example:

```swift
struct Book {
  let title: String
  let author: String
  let price: String?
  let pubDate: String?
  init?(dict: [String: String]) {
    guard let title = dict["title"], let author = dict["author"] else {
      return nil
    }
    self.title = title
    self.author = author
    self.price = dict["price"]
    self.pubDate = dict["pubDate"]
  }
}
```

## Enumerations With Raw Values

>**`enum` values can come populated with default values.** These values can be different for each instance, and we can use these values to do some work.

For example, let's say we're modeling a cash register where we might want to denote the different types of coins we can accept. Then a function that will sum the coins:

```swift
enum Coin {
  case penny
  case nickel
  case dime
  case quarter
}

let coins: [Coin] = [.penny, .nickel, .dime, .dime, .quarter, .quarter, .quarter]

func sum(having coins: [Coin]) -> Double {
  var total: Double = 0
  for coin in coins {
    switch coin {
    case .penny: total += 0.01
    case .nickel: total += 0.05
    case .dime: total += 0.1
    case .quarter: total += 0.25
    }
  }
  return total
}

sum(having: coins) // 1.01
```

Now the above works, but it's not the best way to do things. The coins always have the same value. **In situations like this, where we want our `enum` members to always have a default value, we can give them `raw values`.** These **`raw values` all have to be the same type and we specify the type in the `enum` declaration**.

```swift
enum Coin: Double {
  case penny = 0.01
  case nickel = 0.05
  case dime = 0.1
  case quarter = 0.25
}
```

You will see that the code still works. However, now the `switch` statement is not needed. We can take advantage of the `rawValue` property:

```swift
enum Coin: Double {
  case penny = 0.01
  case nickel = 0.05
  case dime = 0.1
  case quarter = 0.25
}

let coins: [Coin] = [.penny, .penny, .penny, .nickel, .nickel, .dime, .dime, .quarter, .quarter, .quarter]

func sum(having coins: [Coin]) -> Double {
  var total: Double = 0
  for coin in coins {
    total += coin.rawValue
  }
  return total
}

sum(having: coins) // 1.08
```

**It's important to note that raw values are not associated values.** And it's important to distinguish between the two. 

>You use raw values when you always want an `enum` member to have a default value. Associated values on the other hand are set when you create the `enum` and can be different values for every instance. **The important thing to note is that `rawValues` can only be Strings, characters, integers, or floating-point number types. This means custom types do not work, just the primitive swift types. Custom types do work with associated values though.**

Note that `enums` with integer `rawValues` get some special behavior.

```swift
enum Day: Int {
  case sunday = 1, monday = 2, tuesday = 3, wednesday = 4, thursday = 5, friday = 6, saturday = 7
}

Day.friday.rawValue // 6
```

Is equal to:

```swift
enum Day: Int {
  case sunday = 1, monday, tuesday, wednesday, thursday, friday, saturday
}

Day.friday.rawValue // 6
```

This is because integer **`rawValues` are automatically incrementing**. If you specify the first value, Swift increments and assigns this value to each successive case. This just makes it easier to declare.

Note that you also get some special behavior with strings. With strings, if you specify a string as a raw value and then don't provide a value, you get the name of the `enum` member as a string by default.

```swift
enum HTTP: String {
  case post
  case get
  case put
  case delete
}

HTTP.get.rawValue // get
```

## Initializing With Raw Values

>Like a `struct` and a `class` we can initialize an `enum`, but **only if it has `rawValues`**.

HTTP Status Codes make for a great example of `rawValues` and `enum` initialization. 

```swift
enum HTTPStatusCodes: Int {
  case success = 200
  case forbidden = 403
  case unauthorized = 401
  case notFound = 404
}
```

Obviously, there are many more HTTP Status Codes than those, but this is sufficient for the example.

**Note that `enums` raw values have an initializer method and we can use this to produce the right `enum` member instance.** When you type `let HTTPStatusCodes =` and then open the parentheses, Xcode show that it has an initializer. 

```swift
let statusCode = 200
let httpStatusCode = HTTPStatusCodes(rawValue: statusCode) // success
```

When you option click on `httpStatusCode` you will see that it is an optional type. What we're doing here is providing the `rawValue` which has to match the type of raw value specified in these `enum` cases. If the argument does match the raw value of one of these cases, we get that `enum` case back. 

The initializer for `enum`'s with `rawValues` is that **failable initializer**. It's an initializer that **always returns an optional value of the type**. If you think about it for a second, this makes sense. The only restriction of `rawValue` parameter is the type that we specify here. So, in this case, if I were to do `HTTPStatusCode` and use that initializer, you'll see that it can accept any integer value. And, obviously, that is quite a large range. If the integer value doesn't match any of our cases here, then there is a very high chance of failure. In that case, we've no choice but to `return nil`.

We need to use either `if let` or `guard` statements. This means we can do `if let httpStatusCode` and then inside there we can print the status code:

```swift
let statusCode = 200
if let httpStatusCode = HTTPStatusCodes(rawValue: statusCode) {
  print(httpStatusCode) // success
}
```

Another example:

```swift
enum Compass: Int {
  case north = 0
  case south = 180
  case east = 90
  case west = 270
}

let direction = Compass(rawValue: 180)
```

## Optional Chaining

Consider the following three classes:

```swift
class Address {
  var buildingName: String?
  var buildingNumber: String?
  var street: String?
}

class Residence {
  var numberOfRooms = 1
  var address: Address?
}

class Person {
  var residence: Residence?
}
```

Note that these classes do not have `init` methods that are required. This is because they are all optionals, which are assigned the value of `nil`, and the `numberOfRooms` variable is set to an arbitrary value of `1`. Therefore, the `init` method is not required because everything already has a value.

We can create some data:

```swift
let susan = Person()

let address = Address()
address.street = "1234 Something Drive"
address.buildingName = "Building"
address.buildingNumber = "10"

let residence = Residence()
residence.address = address

susan.residence = residence
```

Now in order to print the `buildingNumber` we need to test that other values are not `nil`:

```swift
if let home = susan.residence, let postalAddress = home.address, let buildNumber = postalAddress.buildingNumber, let convertedNumber = Int(buildNumber) {
  print(convertedNumber)
}
```

This can be done with optional chaining:

```swift
if let buildingNumber = susan.residence?.address?.buildingNumber {
  print(buildingNumber)
}
```

## Pattern Matching With Enums

>Pattern matching in Swift lets you compare different values to execute code based on certain conditions.

**Pattern matching is also done with `switch` statements.** You try matching something with a case. **Enums allow us to take this to a whole new level.**

Consider the following example. This example has a wallet with coins in it. If you wanted to count the number of quarters then you can write a `for` loop with a switch statement that checks for `Coin.quarter` and increments the count by 1.

```swift
enum Coin: Double {
  case penny = 0.01
  case nickel = 0.05
  case dime = 0.1
  case quarter = 0.25
}

let wallet: [Coin] = [.penny, .nickel, .dime, .dime, .quarter, .quarter, .quarter, .dime, .nickel, .penny, .penny, .quarter, .dime]

var count = 0

for coin in wallet {
  switch coin {
  case .quarter: count += 1
  default: continue
  }
}
```

>The `continue` keyword, like `return` is a control transfer statement. **The `continue` statement tells a loop to stop what it's doing, and start at the beginning of the next iteration through the loop.** So all we're doing is jumping to the next value in the loop.

This kind of code is done often. Which means Swift has some flavor for this:

```swift
for case .quarter in wallet {
  count += 1
}
```

The power of cases have been extended to `if` statements as well:

```swift
for coin in wallet {
  if case .nickel = coin {
    print("Not so much money")
  } else if case .dime = coin {
    print("Better than nothing")
  }
}
```

Most of this is just syntaxical sugar, because you can do most of it with a comparison operator and other basic syntax.

The interesting thing here is, remember that an `optional` is just an `enum` under the hood with a none and a some case? Now because they're just enumerations, we can use this same type of syntax, `if case` and `for case`, with an `optional` to even unwrap the value.

For example:

```swift
let someOptional: Int? = 42

if case .some(let x) = someOptional {
  print(x)
}
```

Note that `if let` is a lot easier to read so it is used instead.

## Nil Coalescing Operator

In most cases, custom operators just add to the syntax overhead of the language but a useful one in Swift is the `nil` coalescing operator, `??`. This operator makes it much easier to provide values in case an optional value is `nil`.

```swift
a ?? b
```

Given an optional value `a`, if `a` contains a value, then we unwrap and use it. Otherwise we use `b`. Now, in this case when using this kind of operator, the expression `a` must always be an optional. And the type should always match the type of the unwrapped `a`, so the type of `b` should always match the type of the unwrapped `a`.

Consider the following logic:

```swift
let firstName: String? = "Matthew"
let username = "Actionhero29"

var displayName: String

if let name = firstName {
  displayName = name
} else {
  displayName = username
}
```

This type of logic is very common. There is a dedicated operator for it known as the ternary conditional operator: `question ? answer1 : answer2`. This essentially is a shortcut for evaluating a `true` or `false` question. If `true` `question` is evaluated to `answer1` else, if `false` `question` is evaluated to `answer2`.

```swift
let displayName = firstName != nil ? firstName! : username
```

Note that you have to use the bang operator, `!`. This is VERY bad. Thankfully we can use the coalescing operator, `??`.

```swift
let displayName = firstName ?? username
```

When you are going to use any of these always start with an `if` statement and then you can refactor to this later if you want.

#### Quiz:

---

**Question**: Enums can do everything structures and classes can do including contain stored properties

**Answer**: False

**Question**: When an enum member has an associated value, how do you access it?

**Answer**: By binding it to a local constant

**Question**: Given the following: `fun someFunction() -> SomeEnum {}` Where `SomeEnum` is an `enum` with a single member value. Why does `return .value` compile?

**Answer**: Because the return type is specified, the compiler can infer `.value` really means `SomeEnum.value`

**Question**: You cannot include a control transfer statement in the `else` clause `guard` statement.

**Answer**: False

**Question**: What is the value of `c` given the code below?

```swift
var a: Int? = nil
let b = 2
let c = a ?? b
```

**Answer**: `2`

**Question**: Enums are well suited for use with `switch` statements because the compiler can deduce exhaustiveness.

**Answer**: True

**Question**: Which of the following is valid syntax for creating an `enum` with integer raw values?

**Answer**: `enum SomeEnum: Int {}`

**Question**: Which of the following sets of data would not be well suited modeled as an enumeration?

**Answer**: Types of ice cream flavors. There are an infinite amount of ice cream flavors so an `enum` wouldn't be well suited for this type of data.

**Question**: Associated values allow us to provide default values to our enumeration members.

**Answer**: False

**Question**: In Swift, only an optional type can be set to `nil`.

**Answer**: True

**Question**: Raw value initializers accept any value that conforms to the type requirements. An optional value allow the initializer to return `nil` in case there is no match.

**Answer**: True

**Question**: In an optional chaining expression, if one part of the expression fails, an error is raised

**Answer**: False

---