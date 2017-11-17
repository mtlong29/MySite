---
layout: article

permalink: /notes/enumerations-and-optionals-in-swift/

title: "Enumerations and Optionals in Swift"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "Two of Swift's most novel features over Objective-C are the extended power of enumerations and the language features to deal with nil values."

categories: notes

modified: 2017-11-16
---

{% include /globalSections/toc.html %}

Two of Swift's most novel features over Objective-C are the extended power of enumerations and the language features to deal with nil values.

## The Problem with Primitives

Enumerations allow us to model a finite grouping of data or a group of related types. `enums` are common in a few different languages. And in Swift, it traces its history to `enums` in the C language. But `enums` in Swift are a lot more flexible. In fact, they resemble objects. 

Consider the following example:

{% highlight swift linenos %}
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
{% endhighlight %}

While this is a very simple array and function, what if instead of typing in `week[4]` we typed in `Thursday`. This would work the same, but typos are very common! What if we accidentally typed in `Thusrday`? Or if the `week` array had a day typed incorrectly from the start. This would result in incorrect or unexpected output.

This is why using strings can cause issues!

## Modeling Finite Data

Now that it is obvious that strings can cause issues, we can rewrite the functions using enumerations!

To create an Enumeration start with the `enum` keyword. Then give it a name like any other custom type. Use uppercase CamelCase here as well!

Inside the body of the `enum` you define member values, or members of the enumeration. Each member is defined using a `case` keyword, which is the same keyword we use inside the switch statement.

{% highlight swift linenos %}
enum Day {
  case sunday
  case monday
  case tuesday
  case wednesday
  case thursday
  case friday
  case saturday
}
{% endhighlight %}

This is when the possibility to type in the incorrect string is removed! The following is the same function rewritten using the `enum`.

{% highlight swift linenos %}
func dayType(for day: Day) -> String {
  switch day {
  case Day.saturday, Day.sunday: return "Weekend"
  case Day.monday, Day.tuesday, Day.wednesday, Day.thursday, Day.friday: return "Weekday"
  }
}
{% endhighlight %}

First, note that there is no `default` case. This is because the days of the week is a finite set of data. There is no more than these 7 days and it is impossible for the code to run to reach more than these 7. The switch case is exhaustive. Meaning it exhausts all possibilities. For example, if you remove the `Day.friday` case the compiler will then tell you it is not exhaustive. You can either add `Day.friday` or a `default` case.

Also, it is impossible for an incorrect string to be typed in like before because the compiler will autocomplete and autocorrect your days.

There are many examples of fixed data. 

## Getting Rid of Strings

 We got rid of some instances of strings in our function but there's still room for improvement!

 In the `dayType` function there are still strings being returned. Therefore, there is still a possibility for a typo! This means it is a good opportunity to create a new `enum`. Now that we aren't returning a `String` you can change the return type to the new `enum`:

 {% highlight swift linenos %}
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
{% endhighlight %}

You can create an error proof `isNotificationMuted` function as well:

{% highlight swift linenos %}
func isNotificationMuted(on type: DayType) -> Bool {
  switch type {
  case DayType.weekend: return true
  case DayType.weekday: return false
  }
}
{% endhighlight %}

As you can see no strings are being typed anywhere now!

Note that it is actually possible to omit the `Day` and `DayType` this is because the function knows the type and return type already. This actually makes the code a little more readable as well. On top of that you don't have to list all the days of the weekday days of the week for the `dayType` function. Also, you don't have to type `case` out every time either. You can instead say case once and separate them with a comma. Some people like to keep them separate on every line though. 

{% highlight swift linenos %}
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
{% endhighlight %}

You need to find a good balance for readability!

Note that with Swift you can multiple functions with the same name as long as they take different parameter types. This is why both the functions with the custom types and the ones with the arrays can be written in the same file without and error. This means that in reality they are two differnt functions, even though they have the same name. Note that when you call the functions you will see both in Xcode.

Call the new functions by:

{% highlight swift linenos %}
let type = dayType(for: .monday)
let isMuted = isNotificationMuted(on: type)
// false
{% endhighlight %}

Another example:

{% highlight swift linenos %}
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
{% endhighlight %}

## Associated Enums

In Swift each `enum` member, so not the actual `enum`, but each member can store associated values of other types along with this member value. Basically this gives you a way to store custom information for each `enum` case every time we create a new value.

{% highlight swift linenos %}
enum ColorComponent {
  case rgb(Float, Float, Float, Float)
  case hsb(Float, Float, Float, Float)
}

ColorComponent.rgb(61.0, 120.0, 198.0, 1.0)
{% endhighlight %}

As you can see it is easy to add additional data to a case that can be given at the creation of the instance. Simply open parentheses and list the types.

Another example:

{% highlight swift linenos %}
enum MobilePhone {
  case iphone(String), android(String), windowsPhone(String)
}

let iphone = MobilePhone.iphone("7 Plus")
{% endhighlight %}

## Methods on Enumerations

Enumerations are sort of like other objects in Swift. Like classes and structures we can add instance methods to an `enum`, but unlike classes and structs, `enums` can't have stored properties.

To refer to an `enum` value inside the `enum` you use the keyword `self`. This is how you would switch over all the cases in an `enum`.

{% highlight swift linenos %}
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
{% endhighlight %}

As you can see you can place names in front of the types for the associated values.

In the above `UIKit` was imported and then the `rgb` and `hsb` colors were used within this framework. Note that Xcode will display the colors. With the way that `UIKit` works you must use `CGFloat` types, which is a type of `Float`. To use the method you can chain it on to the instance.

Note that the types can be different:

{% highlight swift linenos %}
enum Barcode {
  case upc(Int, Int, Int, Int)
  case qrCode(String)
}

var productBarcode = Barcode.upc(8, 85909, 51226, 3)
productBarcode = .qrCode("ABCDEFGHIJKLMNOP")
{% endhighlight %}

Another example:

{% highlight swift linenos %}
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
{% endhighlight %}

