---
layout: article

permalink: /notes/swift-computed-and-lazy-properties/

title: "Swift Computed and Lazy Properties"

subtitle: "Treehouse - Intermediate iOS Development"

excerpt: "Stored properties in object instances are not the only stored properties.. These notes look at type properties, computed properties, lazy properties, and more."

categories: notes

date: 2017-12-03
---

{% include /globalSections/toc.html %}

**Stored properties in object instances are not the only stored properties..** These notes look at **type properties**, **computed properties**, **lazy properties**, and more.

## Type Properties

>Stored properties allow us to store values as part of an instance. During initialization, we assign different values to these stored properties, or we can set them to `nil` if they're optional. Stored properties, by definition, are part of an instance, and we access them using dot notation. 

```swift
struct Account {
  let username: String
  let password: String
}

let someAccount = Account(username: "matthewlong", password: "usegoodpassword")
someAccount.username // matthewlong
```

To get to the `username` stored property we say `someAccount.username`. As it turns out, stored properties aren't the only way to associate values with a `struct` or a `class`. We have quite a few options at our disposal that allow us to do different things. One being type properties.

>Type methods, unlike instance methods, are associated with the type itself.

```swift
class someClass {
  static func someMethod() {}
}
```

**We can declare a type property also using the `static` keyword.** So, just like we define a regular stored property, the only difference this time is we start with the keyword `static`:

```swift
struct Point {
  let x: Int
  let y: Int
}

struct Map {
  static let origin = Point(x: 0, y: 0)
}
```

Now, you can do something as easy as `Map.origin` to get that value. This type property is a constant, but if we created a variable property, we can set it just like we set an instance property.

```swift
struct Point {
  let x: Int
  let y: Int
}

struct Map {
  static var origin = Point(x: 0, y: 0)
}

Map.origin = Point(x: 1, y: 1)
```

Now, we can set the point on the type, rather than an instance. `Map.origin = Point(x: 1, y: 1)` Notice, we still have not created an instance.

Keeping it set to `let` we see that it respects the same behaviors that we've come to expect from stored properties on an instance. All constructs, classes, structs, and enumerations can all contain type properties, and they're all declared with the `static` keyword.

Basically, the question to ask is "does this property contain information that provides context, without having to instantiate an instance?".

#### Example:

"Declare a `struct` named `LevelTracker` with a single constant type property `maxLevel`. Assign an `Int` values to `maxLevel`."

```swift
struct LevelTracker {
  static let maxLevel: Int = 10
}
```

## Computed Properties

>A [computed property](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Properties.html#//apple_ref/doc/uid/TP40014097-CH14-ID259) does not actually store a value, but computes it based on the values of other stored properties in our `class`.

Computed properties work much like a function inside a `class`, or `struct`, etc.

```swift
struct Rectangle {
  let length: Int
  let width: Int
  
  var area: Int {
    return length * width
  }
}

let r1 = Rectangle(length: 10, width: 4)
r1.area // 40
```

It's important to note that the above computed property and the stored properties are instance properties. They need an instance to be created before we can use it. We can also create computed properties that are set on teh type, rather than the instance, using the `static` keyword. Stored properties can both read and write values. We can sort of do that with computed properties as well. The above computed property is read only. Note that you can think of computed types as syntaxical sugar for creating a method. It takes no parameters, and it has a return type that can never be void. So in the above example the return type will be `Point`. And there are two aspects to a property, reading or getting a values and writing or setting a value.

```swift
struct Point {
  var x: Int = 0
  var y: Int = 0
}

struct Size {
  var width: Int = 0
  var height: Int = 0
}

struct Rectangle {
  var origin = Point()
  var size = Size()
  
  var center: Point {
    get {
      let centerX = origin.x + size.width/2
      let centerY = origin.y + size.height/2
      
      return Point(x: centerX, y: centerY)
    }
    
    set (centerValue) {
      origin.x = centerValue.x - size.width/2
      origin.y = centerValue.y - size.height/2
    }
  }
}

var rect = Rectangle()

// center of default
print(rect.center) // Point(x: 0, y: 0)

// center with given rectangle size
rect.size = Size(width: 20, height: 4)
print(rect.center) // Point(x: 10, y: 2)

// assign a center
rect.center = Point(x: 4, y: 6)
print(rect.center) // Point(x: 4, y: 6)

// note tha origin is no longer 0, 0
print(rect.origin) // Point(x: -6, y: 4)
```

Note that we didn't have to bind this new value to a local constant `centerValue`. However, it reads good as is.

#### Example:

"With a provided `enum` containing members that represent three different text options from `UIKit`. Create a computed property, `style`, that returns the correct style specifier provided. For example, `Text.Headline.style` should `return` the string `UIFontTextStyleHeadling`.

```swift
let UIFontTextStyleHeadline: String = "UIFontTextStyleHeadline"
let UIFontTextStyleBody: String = "UIFontTextStyleBody"
let UIFontTextStyleFootnote: String = "UIFontTextStyleFootnote"

enum Text {
  case headline
  case body
  case footnote
  
  var style: String {
    switch self {
    case .headline: return UIFontTextStyleHeadline
    case .body: return UIFontTextStyleBody
    case .footnote: return UIFontTextStyleFootnote
    }
  }
}

print(Text.headline.style) // "UIFontTextStyleHeadline"
```

## Reading Modes

Enumerations and computed properties can simplify our code. Consider an example app that includes a reading component that has a set of themes like day, evening, and night. Day modes have bright backgrounds with dark text, night mode is the inverse, and evening is somewhere in between. When a user switches from one mode to another, there are a lot of things that needs to be changed in the UI. Since there are a finite set of reading modes, we can represent this as an `enum` of different cases.

```swift
import UIKit

enum ReadingMode {
  case day
  case evening
  case night
  
  var statusBarStyle: UIStatusBarStyle {
    switch self {
    case .day, .evening: return .default
    case .night: return .lightContent
    }
  }
  
  var headlineColor: UIColor {
    switch self {
    case .night: return UIColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 1.0)
    case .day, .evening: return UIColor(red: 16/255.0, green: 16/255.0, blue: 16/255.0, alpha: 1.0)
    }
  }
  
  var dateColor: UIColor {
    switch self {
    case .day, .evening: return UIColor(red: 132/255.0, green: 132/255.0, blue: 132/255.0, alpha: 1.0)
    case .night: return UIColor(red: 151/255.0, green: 151/255.0, blue: 151/255.0, alpha: 1.0)
    }
  }
  
  var bodyTextColor: UIColor {
    switch self {
    case .day, .evening: return UIColor(red: 1, green: 1, blue: 1, alpha: 1)
    case .night: return UIColor(red: 151/255.0, green: 151/255.0, blue: 151/255.0, alpha: 1.0)
    }
  }
  
  var linkColor: UIColor {
    switch self {
    case .day, .evening: return UIColor(red: 132/255.0, green: 132/255.0, blue: 132/255.0, alpha: 1.0)
    case .night: return UIColor(red: 161/255.0, green: 161/255.0, blue: 161/255.0, alpha: 1.0)
    }
  }
}
```

We We have a computed property for the `statusBarStyle`. If you look at a single computed property it returns a `UIStatusBarStyle`. Or in the case of a `headlineColor` it returns an instance of `UIColor`. It then switches on the mode that we're in. So if we're in night mode and we call the `headlineColor` property it switches on that and returns the relevant value, which for now these are just fake values. If it's day and evening it returns a different value and we've done this for everything.

Every time we call `dateColor` the property figures out what mode we're in, and then returns the right value. So in our app, our view set of code could look something like this:

```swift
let titleLabel = UILabel()

func setupDisplay(with mode: ReadingMode) {
  titleLabel.textColor = mode.headlineColor
}
```

Now, every time we call the method:

```swift
setupDisplay(with: .night)
```

Computed properties and enumerations are a great pairing in Swift.

#### Quiz:

---

**Question**: If we don't specify a constant to bind the value in a computed property's setter, it is automatically bound to a variable named ___.

**Answer**: newvalue

**Question**: A computed property that does not specify a getter or setter is by default a what?

**Answer**: read only computed property

**Question**: Type properties for classes, structs, and enums, are created with the ____ keyword.

**Answer**: `static`

**Question**: Type properties are associated with what?

**Answer**: Type itself

**Question**: A computed property can compute as well as store a value

**Answer**: False

---

## Lazy Stored Properties

A computed property allowed us to compute a value after initialization was complete, but we couldn't store the value. <a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Properties.html#//apple_ref/doc/uid/TP40014097-CH14-ID255">Lazy stored properties</a> allow us to defer creation until after the class has been initialized.

These are used if we wanted a stored property whose value also depended on initialization being complete, or if we wanted a property but we didn't necessarily want to assign it a value unless we used it.

When writing a stored property, you can add the `lazy` keyword to a property declaration to make it a lazy stored property.

In the reading app example lets say we have a client that interacts with the articles that we've saved. When we asked for an article it makes a networking request and downloads it so we could have a class, for example, called `ReadItLaterNetworkingClient`, and here we could have a session variable. That creates a network session and then does some work when we need to.

```swift
import Foundation

class ReadItLaterNetworkingClient {
  lazy var session: URLSession = URLSession(configuration: .default)
  
  // Do other things
}
```

Until we make an actual request, there is no value assigned to the session variable. We don't initialize it. When we do call it then it is assigned to the value that we have specified over here which could be a value that depends on initialization of the class being complete.

```swift

```

So why do this? Some objects are expensive to create. They take a lot of logic and their initialization process is quite complex. With such objects we don't want to create it until you really need to use it. Lazy loading properties ensure that you don't waste computational power needlessly.

Note that the `lazy` keyword can only be used with a variable, `var`. It cannot be used with `let`. This is because it is not immediately initialized.

## Property Observers

>A [property observer](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Properties.html#//apple_ref/doc/uid/TP40014097-CH14-ID262) allows you to execute some code any time a value is set or about to be set.

Property observers allow us to observe and respond to changes in property values. This is really useful feature that lets us change other parts of our code if a property's value changes.

Consider the following example:

```swift
import PlaygroundSupport
import UIKit

class ViewController: UIViewController {
  
  let slider = UISlider()
  
  var value: Double = 0.0 {
    willSet {
      print("Old value: \(value)")
    }
    
    didSet {
      view.alpha = CGFloat(value)
      print("New value: \(value)")
    }
  }
  
  override func viewDidLoad() {
    super.viewDidLoad()
    view.backgroundColor = UIColor(red: 30/255.0, green: 36/255.0, blue: 40/255.0, alpha: 1.0)
    
    // Add target-action pattern for value changed event
    slider.addTarget(self, action: #selector(viewController.slide(sender:)), for: .valueChanged)
  }
  
  override func viewWillLayoutSubviews() {
    super.viewWillLayoutSubviews()
    
    // Programmatically add constraints to setup layout
    view.addSubview(slider)
    slider.translatesAutoresizingMaskIntoConstraints = false
    
    NSLayoutConstraint.activate([
      slider.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      slider.centerYAnchor.constraint(equalTo: view.centerYAnchor),
      slider.heightAnchor.constraint(equalToConstant: 30),
      slider.widthAnchor.constraint(equalToConstant: 400)
      ])
    
  }
  
  // Method for target-action
  @objc func slide(sender: UISlider) {
    value = Double(sender.value)
  }
  
}

let viewController = ViewController()
PlaygroundPage.current.liveView = viewController.view
```

Note that you can write UI code inside a Swift playground with:

```swift
import PlaygroundSupport

let viewController = ViewController()
PlaygroundPage.current.liveView = viewController.view
```

The example contains a slider that changes the opacity. When we move the slider it executes the function.

The interesting part is the `value` property:

```swift
var value: Double = 0.0 {
  willSet {
    print("Old value: \(value)")
  }
  
  didSet {
    view.alpha = CGFloat(value)
    print("New value: \(value)")
  }
}
```

**Just like a computed property the declaration is followed by a set of curly braces.** Inside the braces are the property observers. `didSet` is called immediately after we assign a value to the stored property. Any code in the `didSet` clause is executed every time after the value has been assigned. 

Opposite of that is `willSet` which is called right before we change the underlying value.

What is printed initially is `Old value: 0.0`. Once the slider is slid you will get `New value: 0.0371287129819393` and then `New value: 0.0371287129819393` followed by `Old value: 0.0371287129819393` for example.

Note we could have easily done this inside the slide function.

#### Example

```swift
class TemperatureController: UIViewController {
  var temperature: Double {
    didSet {
      if temperature > 80 {
        view.backgroundColor = UIColor.redColor()
      } else if temperature < 40 {
        view.backgroundColor = UIColor.blueColor()
      } else {
        view.backgroundColor = UIColor.greenColor()
      }
    }
  }
  
  init(temperature: Double) {
    self.temperature = temperature
    super.init()
  }
  
  override func viewDidLoad() {
    view.backgroundColor = UIColor.whiteColor()
  }
}
```

#### Quiz:

---

**Question**: Property observers can be added to lazy stored properties.

**Answer**: False

**Question**: What is a lazy stored property?

**Answer**: A property whose initial value is not calculated until the first time we use it

**Question**: Why do we need lazy stored properties?

**Answer**: Some objects are expensive to create, we may not need the object created for a significant amount of time, it allows us to defer the creation of properties based on certain events

**Question**: A property observer allows us to observe and respond to changes in a property's value.

**Answer**: True

**Question**: `willSet` and `didSet` are called when setting properties during the initialization process.

**Answer**: False

---