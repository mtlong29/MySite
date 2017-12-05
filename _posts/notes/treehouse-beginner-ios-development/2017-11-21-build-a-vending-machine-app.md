---
layout: article

permalink: /notes/build-a-vending-machine-app/

title: "Build a Vending Machine App"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "This set of notes concern building a vending machine app that models a vending machine in the real world. The focus of this app is to understand errors in code and how to handle situations that are unexpected or incorrect. In addition, more examples of using stock controls in iOS and how views are aranged in an app. This is a multiple screen app."

categories: notes

date: 2017-11-21
---

{% include /globalSections/toc.html %}

This set of notes concern building a vending machine app that models a vending machine in the real world. The focus of this app is to understand errors in code and how to handle situations that are unexpected or incorrect. In addition, more examples of using stock controls in iOS and how views are aranged in an app. This is a multiple screen app.

In other words, the point of these notes are to start putting everything together in practice.

The final app will allow you to select an item, then the quantity and the price will change. Then you can click purchase. The vending machine also displays the current balance. There are many things that could go wrong in this app. What if we try buying something that isn't in stock? Or what if we don't have enough money? Handling these errors is the main take away from building this app.

Note that the user interface is not a focus of these notes. This means the interface will be magically built outside of the scope of these notes.

The second large objective of this app is to learn how to handle multiple views.

Controls are also looked at which allow the user to input datat into the app.

## Starter File Walkthrough

Since this app is starting off with most of the UI already built, it's important to get familiar with the project before getting started.

One of the main differences in this app. Is the use of `UICollectionView`. This is used to display all of the vending machine items. Only one is modeled and then they are displayed 12 times. Because there are 12 items.

You can see the data in the `VendingInvintory.plist` file. This file will show how you can load data from an outside source.

All of the `IBOutlet`s are setup already.

You can command click through a lot of these to investiage what they do more indepth. But most of this isn't the focus of this app.

## Laying the Groundwork

Before the implementation of a concrete class to model a vending machine some groundwork needs to be laid down for long term flexibility by defining a few `protocol` types.

{% highlight swift linenos %}
enum VendingSelection {
  case soda
  case dietSoda
  case chips
  case cookie
  case sandwich
  case wrap
  case candyBar
  case popTart
  case water
  case fruitJuice
  case sportsDrink
  case gum
}

protocol VendingItem {
  var price: Double { get }
  var quantity: Int { get set }
}

protocol VendingMachine {
  var selection: [VendingSelection] { get }
  var inventory: [VendingSelection: VendingItem] { get set }
  var amountDeposited: Double { get set }
  
  init(inventory: [VendingSelection: VendingItem])
  
  func vend(_ quantity: Int, _ selection: VendingSelection) throws
  func deposit(_ amount: Double)
}
{% endhighlight %}

Recall that protocols define what something most conform to. Also, note that we are not using strings. Instead we use an `enum` for our selection and inintory. This is due to the fact that the compiler will help you write code because it knows what you are looking for whereas it has no idea with strings.

## Concrete Types and Property Lists

Now that our requirements are defined in two protocols. Now a few more concrete types need to be implemented.

Starting with a an object to represent a vending item. This will be simple so a `struct` named `Item` will do great.

{% highlight swift linenos %}
struct Item: VendingItem {
  let price: Double
  var quantity: Int
}
{% endhighlight %}

The items need to conform to `VendingItem`.

Note that when determining different kinds of objects, it doesnt matter for simple data structures which instance of the object we had, `structs` worked quite well.

A nice rule of thumb when deciding what kind of object type to use is: value types, that is a `struct` or an `enum`, are things while reference types or a `class` do things.

Now we need the main part of the app, the vending machine. Since we've already modeled what our object will lok like through a protocol, we just need to focus on proviving an implementation. So this app is going to have a vending machine that vends primarily food so we'll call this `FoodVendingMachine`. This conforms to the `VendingMachine` protocol.

{% highlight swift linenos %}
class FoodVendingMachine: VendingMachine {
  let selection: [VendingSelection] = [.soda, .dietSoda, .chips, .cookie, .sandwich, .wrap, .candyBar, .popTart, .water, .fruitJuice, .sportsDrink, .gum]
  var inventory: [VendingSelection: VendingItem]
  var amountDeposited: Double = 10.0
  
  required init(inventory: [VendingSelection : VendingItem]) {
    self.inventory = inventory
  }
  
  func vend(_ quantity: Int, _ selection: VendingSelection) throws {
    // code
  }
  
  func deposit(_ amount: Double) {
    amountDeposited += amount
  }
}
{% endhighlight %}

Note that unlike our items, the vending machine is better modeled as a `class`. Classes are good at modeling state. That is, the particular values in our data model at a point in time. 

Since our invintory can change based on actions we take.. we need an object that we can modify and pass around while still maintaining a reference. And we've learning before that classes are ideally suited for this. Also, our vending machine is going to do things. It's going to deposit money, vend items, etc.

#### Quiz

Question: A protocol type can be used to specify a type requirement for a class, function parameter or property requirement.

Answer: True

Question: Why is using `enum` values to specify dictionary keys safer that `String` types keys?

Answer: The compiler can verify that the enum value you are using is correctly defined. It cannot do this with a string.

Question: Why does using a protocol to model objects make our design more flexible?

Answer: We can use any object that conforms to the protocol to suit our design requirements

Question: How do you specify that a property requirement in a protocol is a read only property?

Answer: By declaring it as gettable only.

## Property Lists and XML

The data source for this app is in the form of a property list, or `plist` as it's often called.

A property list organizes data into named values and lists of values. `plists` are much like dictionaries or arrays. A `plist` gives you the means to produce structured data in a light weight and efficient format that is easy to access and store. `plists` are used in both iOS and Mac development, and are traditionally used to store user-preferences, but we can use it to store any sort of simple structured data.

Under the hood, `plists` convert the structured data to `XML`, a language for marking up text in a way that organizes the data for a computer to read easily.

Because property lists are meant to be light weight you cannot put any data type inside. You can only use primitive data such as dictionaries, arrays, etc.

When we design in Interface Builder all of our storyboard files are stored in an `XML` format in what is called a `nib` file. You can see this if you right-click on the filename `Main.storyboard` and go to Open As > Select Code. You'll see that the entire Interface Builder file is just an XML document. You can do the same thing to open a `plist` file as `XML`.

All of this is useful in the sense that you should think of data in this way. Data should not be coupled with your model. The data should be obtained outside the app. Data is most often obtained from the web.

## Type Methods

Taking the data source that's in a specific format and output the unpacked data in a format that works better for the model is the first step that must be taken.

When creating the invintory file, there are several possible error cases. The file may not exist, the fule may be corrupted, or it may be empty.

Regardless of the error, when an error occurs, we simply can't use a vending machine. No invintory, no items to vend. It doesn't make sense to create an instance of vending machine that doesn't have any data. 

It's not the job of the food vending machine to make sure it has accurate data. Its job is, given an inventory, it vends items to cutomers. By separating these concerns, our objects have more refined sense of responsibility, a single responsibility, which is exactly what we want.

These intermediary objects can be placed in the `VendingMachine.swift` file. Two objects will be created. The first is going to take a `plist` file as input and returns a `dictionary` as output. The second takes a `dictionary` of arbitrary input and converts it to an `inventory` object.

{% highlight swift linenos %}
class PlistConverter {
  static func someMethod() {}
}

class FoodVendingMachine: VendingMachine {
  // more code
  required init(inventory: [VendingSelection : VendingItem]) {
    self.inventory = inventory
    PlistConverter.someMethod()
  }
  // more code
}
{% endhighlight %}

There is another type of method we can use in Swift called a <a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Methods.html">type method</a>. In contrast to an instance method that works on an instance containing populated data, a type method is associated with the type itself. You indicate that a method is a type method using the `static` keyword. Also, instead of creating an instance of `PlistConverter`, inside the `init` method we could say `PlistConverter.someMethod`. There you can see it's being called directly on the type.

This is done to give an object some data, and then work with that data for the life of the object. The data in that instance changes over time, so it makes sense to hold onto it and crete instance methods to work with the data at different points.

In contrast, our `PlistConverter` doesn't need to hang on to any data. Once it converts it to a dictionary we can output it. Since we're not holding on to the data, creating an instance is unnecessary.

Standalone functions work in some cases as well. Here they don't convery a purpose, and rather, with using a class and getting this name that we can attach to the method, we have a better sense of scoping and we can convery out intent better. Rather than just calling a unpack plist function that's a standalone function, we have `PlistConverter` so it clearly states that any methods that we put in here pertains to that class or that role.

## From Property List to Dictionary

To use the data from the `plist`, we first need to convert it to a format more accessible in code. First step is converting the `plist` to a dictionary.

We won't always know what the data is we're going to get. To handle this, Swift comes with two type aliases, to represent nonspecific types. A type alias is exactly what it implies, it's an alternate name for an existing type. The first type alias is `AnyObject`. `AnyObject` represents an instance of any class type. We also have a type alias called `any`. `any` is the most generic representation of a type in Swift and can represent an instance of absolutely any type in Swift including functions. Learn more about <a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TypeCasting.html#//apple_ref/doc/uid/TP40014097-CH22-ID342">any and AnyObject</a>.

The first thing to do in the body is to get a path to the resource. To access the files in our Xcode projects in code, we're going to use a class known as `Bundle`. This is a special category of class. When we use `Bundle` under the hood, we're actually using a class called `NSBundle`. The `NS` prefix means its a foundation class from an Objective-C foundation library. When we write an app and deliver it to the app store, it's packaged in what is known as a bundle. `Bundle` acts as a swift wrapper around the `NSBundle` class. This came with Swift 3. In fact, many of the `NS` prefixed classes have Swift 3 counterparts.

A bundle is a directory with a standardized hierarchical structure that holds executable code and the resources used by that code. Bundles are a greate abstraction on type of the files in our app and it provides a really easy way to interact with them.

<a href="https://developer.apple.com/library/ios/documentation/Cocoa/Reference/Foundation/Classes/NSBundle_Class/">Bundle Class Reference</a>.

Since there's a chance that a resource might not exist we are going to account for that using the `guard` statement.


{% highlight swift linenos %}
class PlistConverter {
  static func dictionary(fromFile name: String, ofType type: String) throws -> [String: AnyObject]{
    guard let path = Bundle.main.path(forResource: name, ofType: type) else {
      
    }
  }
}
{% endhighlight %}

Note that the Bundle class has property `main` and method `path`. These are used to select the file.

#### Quiz

Question: A type method is called on an instance of a type

Answer: False

Question: What does `AnyObject` represent?

Answer: An instance of any class type

Question: A type alias is defined as:

Answer: An alternate name for an existing type

Question: What is a property list?

Answer: A file that organizes data into named values and lists of values. A means to produce sstructured data in lightweight and efficient format that is easy to access and store. A data format that can be converted to language independent data structures.

Question: Swift comes with type type aliases to represent non-specific types: ____ and ____.

Answer: `AnyObject`, `any`

## Inventory Errors

We need an error type for when an error might occur when obtaining a file. This is done using an `enum`. We'll name this `InventoryError`.

Recall that error types need to confrom to the error protocol.

All you have to do is `throw` the error now.

{% highlight swift linenos %}
enum InventoryError: Error {
  case invalidResource
}

class PlistConverter {
  static func dictionary(fromFile name: String, ofType type: String) throws -> [String: AnyObject]{
    guard let path = Bundle.main.path(forResource: name, ofType: type) else {
      throw InventoryError.invalidResource
    }
    
  }
}
{% endhighlight %}

Another error can occur such that the contents in the `plist` cant be converted to a dictionary. For example, this could be an array. So in that case we wouldn't be able to convert it over to an instance of `NSDictionary`. So we need to use another guard statement.

{% highlight swift linenos %}
enum InventoryError: Error {
  case invalidResource
  case conversionFailure
}

class PlistConverter {
  static func dictionary(fromFile name: String, ofType type: String) throws -> [String: AnyObject]{
    guard let path = Bundle.main.path(forResource: name, ofType: type) else {
      throw InventoryError.invalidResource
    }
    
    guard let dictionary = NSDictionary(contentsOfFile: path) else {
      throw InventoryError.conversionFailure
    }
    
  }
}
{% endhighlight %}

## Type Casting

We may not always know the type of the objects that we're working with because they may be represented by a generic base class.

There are numerous operators that can be used to cast types. The first operator is the `is` operator. The `is` operator returns true if types match and false if not.

The `as` type cast operator allows you to cast to one of the more specific subclasses in a process know as 'downcasting'. It's called downcasting because if you think of the object graph as a tree, the base type on top, and more specific types as nodes extending downwards, then when going from a base, to a subclass we go down the tree.

Down casting might not always succeed so it comes with two operators, `as?` and `as!`. The conditional form, `as?` is favored over the forced form `as!`. Only use `as!` when you know it will succeed.

See an example along with notes below:

{% highlight swift linenos %}
class Employee {
  let name: String
  
  init(name: String) {
    self.name = name
  }
}

class HourlyEmployee: Employee {
  let hourlyWage: Double
  
  init(name: String, hourlyWage: Double) {
    self.hourlyWage = hourlyWage
    super.init(name: name)
  }
  
  func payWages(for hours: Double) -> Double {
    return hourlyWage * hours
  }
}

class SalariedEmployee: Employee {
  let salary: Double
  
  init(name: String, salary: Double) {
    self.salary = salary
    super.init(name: name)
  }
  
  func paySalary() -> Double {
    return salary/24
  }
}

let hourlyEmployee = HourlyEmployee(name: "Taylor", hourlyWage: 12.00)
let salariedEmployee = SalariedEmployee(name: "Lorenzo", salary: 62000)

let employees = [hourlyEmployee, salariedEmployee]
// we know from learning about arrays that Swift arrays can only contain a single type; however, you can mix types in an array if all the array items have a common base type. when we mix and match them in the array, swift converts or cast each object to the base type, to satisfy the array homogeneity rule.

// currently this will not work to access object methods (unless there are base/super class methods)
for employee in employees {
}

// to actually use this instance in the right context, we can either check that it is the right type that we need or downcast them to a different type--there are two operators to help accomplish this task.
 
// the 'is' operator returns true if the type matches a type we specify and false if not. thus, we can use it to inspect each item the array.

for employee in employees { // currently this will not work to access object methods (unless there are base/super class methods)
  if employee is HourlyEmployee {
    print("Hourly")
  }
  // Hourly
  if employee is SalariedEmployee {
    print("Salaried")
  }
  // Salaried
}

// even though the employee array thinks that its items are of the base classes type, we can check each array item to see if they are instances of a particular sub class (i.e. using the 'is' operator inside the for loop's if statements to check each item in the local constant of the if statement to see if items inherit from hourhly employee and from SalariedEmployee). now we don't want to get into the details of how this is done exactly in the background, but just know that even though that each item in the array are of the employee base class, each array item also contains information on any subclasses they inherit from. but all this allows us to do is check it right (i.e. using the 'is' operator to check.)? we still can't call the payWages function on the hourlyEmployee instance or paySalary on the salariedEmployee instance using just the 'is' operator since both are inside the same array that's contrained to the base class of those instances.
 
 // what if we want to actually work with the specific subtypes? for that, we have another operator, the typecast operator, 'as'. the Employee class, in this example, is a higher less specific type than than any of the subclasses (i.e. the HourlyEmployee and the SalariedEmployee subclasses.). the 'as' operator allows you to cast to one of the more specific subclasses in a process know as 'downcasting'. it's called downcasting because if you think of the object graph as a tree, the base type on top, and more specific types as nodes extending downwards, then when going from a base, to a subclass we go down the tree.
 
 // downcasting may not always succeed. so the typecast operator comes in two different flavors, the conditional form as with a question mark, and the forced form, as with an exclamation point. the forced form, like the force unwrap operator, should only be used when you know the downcast will succeed.
 
 // for example, in our code, we verified that an employee instance is of a particular type by using the type check operator (i.e. the 'is' operator). we know that the local constant of the if statement named 'employee' here is an instance of the HourlyEmployee subclass for sure. So inside the if statement, we can use the Forced operator to downcast the instance.

for employee in employees { // now this works

  if employee is HourlyEmployee {
    print("Hourly")
    let hourlyEmployee = employee as! HourlyEmployee
    hourlyEmployee.payWages(for: 10.00)
  }
  
  if employee is SalariedEmployee {
    print("Salaried")
    let salariedEmployee = employee as! SalariedEmployee
  }
}

// the forced downcast operater, like the forced unwrap operator, should be treated carefully. only used the forced downcast operator only if you're 110% sure the downcast will succeed, otherwise your application will crash.
 
// for a safer option, you can use the conditional typecast operator as with a question mark. this operator returns an optional value if the cast succeeds or nil if it fails.

for employee in employees { // now this works
  if employee is HourlyEmployee {
    print("Hourly")
    let hourlyEmployee = employee as? HourlyEmployee // using conditional typecast operator along with...
    hourlyEmployee?.payWages(for: 10.00) // ...optional chaining
  }
  
  if employee is SalariedEmployee {
    print("Salaried")
    let salariedEmployee = employee as? SalariedEmployee // using conditional typecast operator along with...
    salariedEmployee?.paySalary() // ...optional chaining
  }
}

for employee in employees { // now this works

  if employee is HourlyEmployee {
    print("Hourly")
    if let hourlyEmployee = employee as? HourlyEmployee { // using if let along with the conditional typecast operator
      hourlyEmployee.payWages(for: 10.00)
    }
  }
  
  if employee is SalariedEmployee {
    print("Salaried")
    if let salariedEmployee = employee as? SalariedEmployee { // using if let along with the conditional typecast operator
      salariedEmployee.paySalary()
    }
  }
}
{% endhighlight %}

Using this on the vending machine application `PlistConverter`:

{% highlight swift linenos %}
class PlistConverter {
  static func dictionary(fromFile name: String, ofType type: String) throws -> [String: AnyObject]{
    guard let path = Bundle.main.path(forResource: name, ofType: type) else {
      throw InventoryError.invalidResource
    }
    
    guard let dictionary = NSDictionary(contentsOfFile: path) as? [String: AnyObject] else {
      throw InventoryError.conversionFailure
    }
    
    return dictionary
  }
}
{% endhighlight %}

## Creating an Inventory

After converting the `plist` into a dictionary is to make an actual invintory out of it.

To do this create a new class named `InventoryUnarchiver`.

{% highlight swift linenos %}
class InventoryUnarchiver {
  static func vendingInventory(fromDictionary dictionary: [String: AnyObject]) -> [VendingSelection: VendingItem] {
    var inventory: [VendingSelection: VendingItem] = [:]
    
    for (key, value) in dictionary {
      // cast value from AnyObject to something more concrete
      if let itemDictionary = value as? [String: Any], let price = itemDictionary["price"] as? Double, let quantity = itemDictionary["quantity"] as? Int {
        let item = Item(price: price, quantity: quantity)
      }
    }
    
    return inventory
  }
}
{% endhighlight %}

The last thing we need to do is convert the keys from strings to a more custom type like `VendingSelection`. For example, instead of the String gum we want gum from `VendingSelection`.

Converting this value is not difficult because of how `enums` work. We can specify the `enum` `VendingSelection` has raw values of type String.

Once you assign a raw value to an `enum` it also gets an initializer method that allows you to pass in a `rawValue` and returns an enumeration `case`. 

{% highlight swift linenos %}
enum VendingSelection: String {
  case soda
  case dietSoda
  case chips
  case cookie
  case sandwich
  case wrap
  case candyBar
  case popTart
  case water
  case fruitJuice
  case sportsDrink
  case gum
}

enum InventoryError: Error {
  case invalidResource
  case conversionFailure
  case invalidSelection
}

class InventoryUnarchiver {
  static func vendingInventory(fromDictionary dictionary: [String: AnyObject]) throws -> [VendingSelection: VendingItem] {
    var inventory: [VendingSelection: VendingItem] = [:]
    
    for (key, value) in dictionary {
      // cast value from AnyObject to something more concrete
      if let itemDictionary = value as? [String: Any], let price = itemDictionary["price"] as? Double, let quantity = itemDictionary["quantity"] as? Int {
        let item = Item(price: price, quantity: quantity)
        
        guard let selection = VendingSelection(rawValue: key) else {
          throw InventoryError.invalidSelection
        }
      }
    }
    
    return inventory
  }
}
{% endhighlight %}

We add it back to the dictionary using the appropriate value:

{% highlight swift linenos %}
class InventoryUnarchiver {
  static func vendingInventory(fromDictionary dictionary: [String: AnyObject]) throws -> [VendingSelection: VendingItem] {
    var inventory: [VendingSelection: VendingItem] = [:]
    
    for (key, value) in dictionary {
      // cast value from AnyObject to something more concrete
      if let itemDictionary = value as? [String: Any], let price = itemDictionary["price"] as? Double, let quantity = itemDictionary["quantity"] as? Int {
        let item = Item(price: price, quantity: quantity)
        
        guard let selection = VendingSelection(rawValue: key) else {
          throw InventoryError.invalidSelection
        }
        
        inventory.updateValue(item, forKey: selection)
      }
    }
    
    return inventory
  }
}
{% endhighlight %}

Now you must update the `ViewController.swift` file:

{% highlight swift linsnos %}
let vendingMachine: VendingMachine

required init?(coder aDecoder: NSCoder) {
  do {
    let dictionary = try PlistConverter.dictionary(fromFile: "VendingInventory", ofType: "plist")
    let inventory = try InventoryUnarchiver.vendingInventory(fromDictionary: dictionary)
    self.vendingMachine = FoodVendingMachine(inventory: inventory)
  } catch let error {
    fatalError("\(error)")
  }
  
  super.init(coder: aDecoder)
}

override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view, typically from a nib.
    setupCollectionViewCells()
    print(vendingMachine.inventory)
}
{% endhighlight %}

Now when you run the app the following dictionary is logged to the console:

{% highlight swift linenos %}
[
  VendingMachine.VendingSelection.gum: VendingMachine.Item(price: 0.75, quantity: 20), 
  VendingMachine.VendingSelection.cookie: VendingMachine.Item(price: 1.0, quantity: 3), 
  VendingMachine.VendingSelection.sportsDrink: VendingMachine.Item(price: 2.75, quantity: 1), 
  VendingMachine.VendingSelection.chips: VendingMachine.Item(price: 1.0, quantity: 14), 
  VendingMachine.VendingSelection.fruitJuice: VendingMachine.Item(price: 1.5, quantity: 6), 
  VendingMachine.VendingSelection.sandwich: VendingMachine.Item(price: 5.25, quantity: 2), 
  VendingMachine.VendingSelection.wrap: VendingMachine.Item(price: 5.25, quantity: 4), 
  VendingMachine.VendingSelection.candyBar: VendingMachine.Item(price: 1.0, quantity: 20), 
  VendingMachine.VendingSelection.popTart: VendingMachine.Item(price: 2.0, quantity: 2), 
  VendingMachine.VendingSelection.soda: VendingMachine.Item(price: 1.25, quantity: 10), 
  VendingMachine.VendingSelection.dietSoda: VendingMachine.Item(price: 1.25, quantity: 5), 
  VendingMachine.VendingSelection.water: VendingMachine.Item(price: 1.0, quantity: 11)
]
{% endhighlight %}

As you can see the keys are `VendingMachine.VendingSelection.gum` and the values are `VendingMachine.Item(price: 0.75, quantity: 20)`, for example.

#### Quiz

Question: Why is the work of inventory creation handled by two intermediate classes rather than the vending machine itelf?

Answer: By decoupling the data from the model, we can easily replace the source of data and keep the same model. Also, this allows the class to adhere to the single responsibilty principle.

Question: The process of converting from a superclass to a more specific subclass is known as ____.

Answer: Downcasting

Question: What represents the type check operator in swift?

Answer: `is`

Question: Is the following code safe? Why or why not?

{% highlight swift linenos %}
var someObject: Any = getDataFromInternet()
let castObject = someObject as! String
{% endhighlight %}

Answer: No, because a force unwrap should only be used when a downcast is ensured to succeed.

Question: How does the `NSDictionary` class handle the fact that when initializing with `contentsOfFile:`, something might go wrong?

Answer: By using a failable initializer and returning `nil`.

## Displaying Icons with UIImage

The interface to our model is somewhat complete but the UI still displays the placeholder image. We can add an instance method to our `enum` to `return` an instance of `UIImage` based on the selection we make.

In the final app there are 12 selections you can make and these are represented by the `selection` property of the `VendingMachine`. That selection property is simply an array of vending selection values. For each selection we want to have some associated image.

To do this start by going to the `VendingSelecion` enum and add a method named icon that doesn't take any parameters, but returns an instance of a class known as `UIImage`.

The goal of this method is to return the correct image based on which in a member or selection is made. We could use a `switch` on `self` and then it it's the `.soda` `case` I could return an instance of the soda image.

{% highlight swift linenos %}
func icon() -> UIImage {
  switch self {
  case .soda: return UIImage(named: "soda")
  // etc
  }
}
{% endhighlight %}

However, there's a way to do it with far less code. Less isn't always best but it is here. So instead of switching on `self`, rather than passing the name as a string manually recall that our enum has raw values which are strings of themselves. 

Instead of switching on `self` and going through each one, we can get a string automatically and use that to return the right image.

{% highlight swift linenos %}
import UIKit

enum VendingSelection: String {
  case soda
  case dietSoda
  case chips
  case cookie
  case sandwich
  case wrap
  case candyBar
  case popTart
  case water
  case fruitJuice
  case sportsDrink
  case gum
  
  func icon() -> UIImage {
    if let image = UIImage(named: self.rawValue) {
      return image
    } else {
      return default
    }
  }
}
{% endhighlight %}

With Swift 8 we don't have to force unwrap for our else clause. Instead we can return the default image (in fact the image icon for default will show in Xcode). Xcode 8 knows what the default image is.

Finally, for this to show up in your app you must make a change in the `ViewController.swift` file:

{% highlight swift linenos %}
func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
    guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: reuseIdentifier, for: indexPath) as? VendingItemCell else { fatalError() }
  
    let item = vendingMachine.selection[indexPath.row]
    cell.iconView.image = item.icon()
  
    return cell
}
{% endhighlight %}

## Modeling the Vending Machine

Now that the user can select an item in our app, the logic to vend that particular item can be written. Like loading from an inventory, there are things that can go wrong here so we must first write some error handing code.

In a collection view, when any of the items in the collection are tapped, it fires off a method, it calls a method `collectionView` you did select item and index path. For example, the following will print the vending item to the console in Xcode when tapped:

{% highlight swift linenos %}
func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
    updateCell(having: indexPath, selected: true)
  
    print(vendingMachine.selection[indexPath.row])
}
{% endhighlight %}

So `indexPath.row` here gives us the index posisiton we're tapping and we can use this index number again to look in the election array, and figure out what object we're tapping.

Instead of printing it to the console lets save the selection to a stored property:

{% highlight swift linenos %}
var currentSelection: VendingSelection?
{% endhighlight %}

The reason we are assigning `VendingSelection` as an optional is because when we first start the app we don't want anything selected. We don't want some random vending item to be selected.

Now, everytime we tap a selection we're going to fire off the method `didSelectItemAt` and now instead of the print statement we're going to assign the selection to the `currentSelection` variable.

{% highlight swift linenos %}
func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
    updateCell(having: indexPath, selected: true)
  
    currentSelection = vendingMachine.selection[indexPath.row]
}
{% endhighlight %}

All of the work is going to be done inside the `FoodVendingMachine` class found in the `VendingMachine.swift` file:

{% highlight swift linenos %}
class FoodVendingMachine: VendingMachine {
  let selection: [VendingSelection] = [.soda, .dietSoda, .chips, .cookie, .sandwich, .wrap, .candyBar, .popTart, .water, .fruitJuice, .sportsDrink, .gum]
  var inventory: [VendingSelection: VendingItem]
  var amountDeposited: Double = 10.0
  
  required init(inventory: [VendingSelection : VendingItem]) {
    self.inventory = inventory
  }
  
  func vend(_ quantity: Int, _ selection: VendingSelection) throws {
    // code
  }
  
  func deposit(_ amount: Double) {
    // code
  }
}
{% endhighlight %}

So, when a user selects an item we need to first make sure it's valid. Then we need to check if there's enough in stock. Finally, we need to make sure the user has enough money to buy it. All of these cases are where an error can occur. Hence, we need to define new errors:

{% highlight swift linenos %}
enum VendingMachineError: Error {
  case invalidSelection
  case outOfStock
  case insufficientFunds(required: Double)
}
{% endhighlight %}

Note that for the insufficient funds error, we'd like to let the users know how much money they need to add to complete the transaction. So we're going to use an associated value to convey that information. Therefore, we'll add a tuple.

The logic and error handling:

{% highlight swift linenos %}
class FoodVendingMachine: VendingMachine {
  let selection: [VendingSelection] = [.soda, .dietSoda, .chips, .cookie, .sandwich, .wrap, .candyBar, .popTart, .water, .fruitJuice, .sportsDrink, .gum]
  var inventory: [VendingSelection: VendingItem]
  var amountDeposited: Double = 10.0
  
  required init(inventory: [VendingSelection : VendingItem]) {
    self.inventory = inventory
  }
  
  func vend(_ quantity: Int, _ selection: VendingSelection) throws {
    guard var item = inventory[selection] else  {
      throw VendingMachineError.invalidSelection
    }
    
    guard  item.quantity >= quantity else {
      throw VendingMachineError.outOfStock
    }
    
    let totalPrice = item.price * Double(quantity)
    
    if (amountDeposited >= totalPrice) {
      amountDeposited -= totalPrice
      
      item.quantity -= quantity
      
      inventory.updateValue(item, forKey: selection)
    } else {
      let amountRequired = totalPrice - amountDeposited
      throw VendingMachineError.insufficientFunds(required: amountRequired)
    }
  }
  
  func deposit(_ amount: Double) {
    // code
  }
}
{% endhighlight %}

Now we must update the `ViewController.swift` file to use the above.

We can start by adding a stored property to keep track of the selection.

{% highlight swift linenos %}
var quantity = 1
{% endhighlight %}

Assuming that we can't increate the quantity just yet we still only want to purchase one item at a time. This way we can implement our simplest use case and then go from there. 

A user purchases an item in our vending machine when they tapped the purchase button. So our first step here should be to create an action.

Note that adding a comment such as `// MARK: - Vending Machine` will allow you to use this section in the jump bar navigation.

To do this you head over to the `main.storyboard` file and open up the assistant editor. Then control drag the purchase button over and make sure that you select Action as the connection. You can name it `purchase` and set the arguments to `none`. Now we can add our logic:

{% highlight swift linenos %}
// MARK: - Vending Machine

@IBAction func purchase() {
  if let currentSelection = currentSelection {
    do {
      try vendingMachine.vend(selection: currentSelection, quantity: quantity)
    } catch {
      // FIXME: Error handling code
    }
  } else {
    // FIXME: Alert user to no selection
  }
}
{% endhighlight %}

Note that the `if let currentSelection = currentSelection{}` bit is just a quick way to unwrap an optional and assign it to a constant of the same name so that there's no confusion as to what it is we want. Remember that this is in its local scope it only exists inside the body of the if let. So you can have this duplication because `currentSelection` is really `self.currentSelection`.

Also note that the comment `// FIXME: Alert user to no selection` is a way to show a problem to yourself as a developer. In the jump bar a bandaid  with the text `Alert user to no selection` is displayed for quick reference. 

Note that we changed the `vendingMachine` protocol slightly. The `vend` method did not read very well:

{% highlight swift linenos %}
protocol VendingMachine {
  var selection: [VendingSelection] { get }
  var inventory: [VendingSelection: VendingItem] { get set }
  var amountDeposited: Double { get set }
  
  init(inventory: [VendingSelection: VendingItem])
  
  func vend(selection: VendingSelection, quantity: Int) throws
  func deposit(_ amount: Double)
}
{% endhighlight %}

#### Quiz

Question: When we use `UIImage`'s `named:` initializer, where do the images come from?

Answer: Assets folder

Question: How do we convey additional information to the call site when throwing an error?

Answer: Through associated values

Question: Why is a generic empty atch block generally a bad idea?

Answer: It allows you to ignore errors in your code which is as bad as not writing error handling. Errors occur for different reasons. A generic catch block ignores specifics and just handles all errors as equal.

## Communicating with User

Even though the vending machine works, there's no indication to the user that code has been executed. This can be resolved by updating the price and the quantity. 

#### Updating the Price

The price for both the selected item as well as the total price of our selection should be updated. For now, that's the same, but as we add in the option to increase the qnaitity, we'll update the display with the total price as well.

We know that when we select an item, we execute the code inside the `didSelectItemAt` `indexPath` method. So far, we're assigning a value to the current selection, what is the price of the item? Since we have the current selection, we can get the item from the inventory using subscript notation.

It's best to make things pretty obvious to the reader of our code what's going on so adding a convenience method that returns either the correct item if it exists or `nil` if it doesn't is a good idea. A method like this is really just a convenience method. It does nothing more than wrap a function around an accessor we can already use, but it gives context.

In the `VendingMachine.swift` file:

{% highlight swift linenos %}
protocol VendingMachine {
  var selection: [VendingSelection] { get }
  var inventory: [VendingSelection: VendingItem] { get set }
  var amountDeposited: Double { get set }
  
  init(inventory: [VendingSelection: VendingItem])
  
  func vend(selection: VendingSelection, quantity: Int) throws
  func deposit(_ amount: Double)
  func item(forSelection selection: VendingSelection) -> VendingItem?
}
{% endhighlight %}

Now that we have a new conform we must add this to the `FoodVendingMachine` class:

{% highlight swift linenos %}
func item(forSelection selection: VendingSelection) -> VendingItem? {
  return inventory[selection]
}
{% endhighlight %}

Back in the `ViewController.swift` file:

{% highlight swift linenos %}
// MARK: - UICollectionViewDelegate

func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
    updateCell(having: indexPath, selected: true)
  
    currentSelection = vendingMachine.selection[indexPath.row]
  
  if let currentSelection = currentSelection, let item = vendingMachine.item(forSelection: currentSelection) {
    priceLabel.text = "$\(item.price)"
    totalLabel.text = "$\(item.price * Double(quantity))"
  }
}
{% endhighlight %}

Now when we run the app when you select an item the price and the total price change. Keep in mind that at this point they are the same thing.

Currently, hitting purchase doesn't provide any indication that you purchased anything. The balance is just an arbitrary placeholder at the moment. Recall that when we start off a certain amount is deposited into our machine. We gave it that default value of `10`. But the balance doesnt indicate that. 

We want the balance to be reflected right when the view loads. So head over to `viewDidLoad`:

{% highlight swift linenos %}
override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view, typically from a nib.
    setupCollectionViewCells()
  
    balanceLabel.text = "$\(vendingMachine.amountDeposited)"
    totalLabel.text = "$00.00"
    priceLabel.text = "$0.00"
}
{% endhighlight %}

Note that we also set the total prices initial value of total and price to something sensible, `$00.00`.

Still though, if we make a transation, nothing changes. When we hit Purchase, if the vend function executes successfully, then all we need to do is update our labels again. So the following helper method can help do this. In the `VendingMachine` section in the `ViewController.swift` file we can write a new function and call this `updateDisplay`.

{% highlight swift linenos %}
// MARK: - Vending Machine

@IBAction func purchase() {
  if let currentSelection = currentSelection {
    do {
      try vendingMachine.vend(selection: currentSelection, quantity: quantity)
      updateDisplay()
    } catch {
      // FIXME: Error handling code
    }
  } else {
    // FIXME: Alert user to no selection
  }
}

func updateDisplay() {
  balanceLabel.text = "$\(vendingMachine.amountDeposited)"
  totalLabel.text = "$00.00"
  priceLabel.text = "$0.00"
}
{% endhighlight %}

Now when we run the app the prices all display correctly. You can purchase an item and the balance will decrease until you are out of funds. 

One current issue is when you purchase an item the item stays selected but the price and total displays as $0. This can be resolved with some magic code after the `do catch` statement in the Vending Machine function on the `ViewController.swift` file:

{% highlight swift linenos %}
// MARK: - Vending Machine

@IBAction func purchase() {
  if let currentSelection = currentSelection {
    do {
      try vendingMachine.vend(selection: currentSelection, quantity: quantity)
      updateDisplay()
    } catch {
      // FIXME: Error handling code
    }
    
    if let indexPath = collectionView.indexPathsForSelectedItems?.first {
      collectionView.deselectItem(at: indexPath, animated: true)
      updateCell(having: indexPath, selected: false)
    }
    
  } else {
    // FIXME: Alert user to no selection
  }
}

func updateDisplay() {
  balanceLabel.text = "$\(vendingMachine.amountDeposited)"
  totalLabel.text = "$00.00"
  priceLabel.text = "$0.00"
}
{% endhighlight %}

Note that that was technically beyond the scope of these notes. Basically what it is saying is asking the collection view to tell us which cells are selected. Now, the collection views can be set up to have multiple cells selected at once, so this returns an array of cells or an array of index values.

Because these are all optiona, they could be `nil`. We're using an `if let` statement to unwrap it. So if this works, we have an index path for the selected item. Once we have that index path, we can tell `CollectionView` to go ahead and deselect that and give it an `indexPath`. The animated property allows us to animate that transition, which it does automatically. Finally, once we have that, we go ahead and update the cell to have a default background. Getting rid of the blue selected item after purchase.

However, we're not done. We can still only select and purchase one item.

#### Working with Steppers

So far in this app the only control is a button. Using the target action pattern and a button we're able to fire off an action when the button was tapped.

In this app, the purchased action, for example, is executed when we tap the purchase button. Like a button, there's another control in this project. It's known as a stepper. 

A stepper provides an interface for incrementing or decrementing values. It's really simple, if you click on the stepper and go to the attributes inspector you'll see that it has a minimum and maximum range of values set to one and ten.

For the next set of fields we can customize what value the stepper starts at by default which again is set to one. When we click the increment or decrement button it steps up or down by a certain value and we can set the values that it steps by. Here, we want it to step by one. If you set it to five, for example, it would go from one to six is you click the increment button.

Controls are meant to be very simple to setup. They offer common functionality with very little setup involved. 

When we connected the Purchase button from the `storyboard.swift` file to the `ViewController.swift` file by creating an action, we specifically connected it to the touch up inside event. You can right click on it to see this as well. This means the action only fired if you tab the button and life you finger while inside the boundaries of the button. 

We want to do the same thing with the stepper. Except we want the value changed event instead. This is becasue we want to change a value depending on what button (increment or decrement) is clicked. We want to keep track of this as well.

When you right click any control you should see all of the events that you can trigger and be notified of. At the bottom there's a value changed event that we can hook up to a particular action. Do this with the assistant editior. It looks like this:

{% highlight swift linenos %}
@IBAction func updateQuantity(_ sender: UIStepper) {
  
}
{% endhighlight %}

Note that it is named `updateQuantity` and is type `UIStepper`.

To test that everything is connect propperly you can add a print statement inside the function:

{% highlight swift linenos %}
@IBAction func updateQuantity(_ sender: UIStepper) {
  print(sender.value)
}
{% endhighlight %}

Now, in the console the stepper can increment and decrement. As expected, it bottoms out at 1 and maxes out at 10.

#### Updating the Quantity

With a stepper in the app, we can now update the quantity and allow users to purchase more than one item.

To update the quantity displayed on the screen is relatively easy:

{% highlight swift linenos %}


@IBAction func updateQuantity(_ sender: UIStepper) {
  quantity = Int(sender.value)
  quantityLabel.text = "\(quantity)"
}
{% endhighlight %}

Note that we also set the initial `quantityLabel` to `1` using `quantityLabel.text = "1"`.

There are however a few holes in our current logic. The total price does not update with the quantity. Except when you increase the quantity and change your selection the quantity stays the same and the total price updates according to the price of that new selection times the previous quantity selected. 

First, we need a reference to the actual stepper so we can reset the value there.

In the `Main.storyboard` file select the stepper and go to the assistant selector. Then control drag from the stepper over to the `ViewController`. We need to create an `IBOutlet` and we can name it `quantityStepper`. This looks like `@IBOutlet weak var quantityStepper: UIStepper!`.

Now, over in the `ViewController`, we'll need to first reset the quantity to `1` and then update the `quantityLabel`. We'll do that in `didSelectItemAt indexPath` because we want to do that every time we select a new item.

{% highlight swif linenos %}
func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
    updateCell(having: indexPath, selected: true)
  
    quantityStepper.value = 1
    quantityLabel.text = "1"
    quantity = 1
  
    currentSelection = vendingMachine.selection[indexPath.row]
  
  if let currentSelection = currentSelection, let item = vendingMachine.item(forSelection: currentSelection) {
    priceLabel.text = "$\(item.price)"
    totalLabel.text = "$\(item.price * Double(quantity))"
  }
}
{% endhighlight %}

Now, we still need to update the total price based off the quantity. This can be `updateQuantity` method. However, we first need a method for updating the total price. We'll name it `updateTotalPrice`.

{% highlight swift linenos %}
func updateTotalPrice(for item: VendingItem) {
  totalLabel.text = "$\(item.price * Double(quantity))"
}

@IBAction func updateQuantity(_ sender: UIStepper) {
  quantity = Int(sender.value)
  quantityLabel.text = "\(quantity)"
  
  if let currentSelection = currentSelection, let item = vendingMachine.item(forSelection: currentSelection) {
    updateTotalPrice(for: item)
  }
}
{% endhighlight %}

Lastly, we need to reset the `totalPrice` label when selecting a new item. We can also do this in `didSelectItemAt indexPath`:

{% highlight swift linenos %}
func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
    updateCell(having: indexPath, selected: true)
  
    quantityStepper.value = 1
    quantityLabel.text = "1"
    quantity = 1
  
    totalLabel.text = "$00.00"
  
    currentSelection = vendingMachine.selection[indexPath.row]
  
  if let currentSelection = currentSelection, let item = vendingMachine.item(forSelection: currentSelection) {
    priceLabel.text = "$\(item.price)"
    totalLabel.text = "$\(item.price * Double(quantity))"
  }
}
{% endhighlight %}

The `totalPrice` and `quanitiy` update correctly now, but the code is really sloppy. All of this brings room for error, right now because we have to always make sure that `quantity` and `quantitiyStepper` are in sync. If it doesnt stay in sync, then when we decrease the value we might end up purchasing something else because the `vend` method uses the quantities stored property and not the stepper value.

The best thing at this point would be to get rid of the stored property and then everywhere we're usign the `quantity` stored property let's change it to the steppers value.

Upon deleting this a ton of errors show up, which is great, because it shows us everywhere we need to change. So we can quickly scroll through and change `quantity` to `Int(quantityStepper.value)` unless it needs to be a Double value you simply change it to `quantityStepper.value`.

At this point everything is working correctly. However, the code is using strings in a number of places, and they're even the same string pretty often: `"$00.00"` or `$0.00` etc. So we want to refact this because using Strings like this could be our downfall. To do this, we'll change the `updateDisplay` method:

{% highlight swift linenos %}
func updateDisplayWith(balance: Double? = nil, totalPrice: Double? = nil, itemPrice: Double? = nil, itemQuantity: Int? = nil) {
  if let balanceValue = balance {
    balanceLabel.text = "$\(balanceValue)"
  }
  if let totalValue = totalPrice {
    totalLabel.text = "$\(totalValue)"
  }
  if let priceValue = itemPrice {
    priceLabel.text = "$\(priceValue)"
  }
  if let quantityValue = itemQuantity {
    quantityLabel.text = "\(quantityValue)"
  }
}
{% endhighlight %}

This function is doing a lot of the display work for us so now all we have to do is call it in the right places. You only need to include the arguments you need since they are set to `nil` by default.

#### Quiz
Question: According to the Human Interface Guidelines, when should we not use a stepper?

Answer: When users are likely to make large changes to a value

Question: A stepper is an instance of a particular component in `UIKit`. Which component is this?

Answer: `Control`

Question: Which event is fired off when we increase the value of a stepper?

Answer: `ValueChanged`

## Temporary Views

So far we only know how to display a single view in our apps. Apps almost always show more than one view.

For example, the Vending Machine app works, but if something does go wrong there is no indication to the user that something has gone wrong such as attempting to purchase an amount greater than our balance.

Views come in all sorts of variations. We have specific views that are very flexible, and then many different ways to pesent each one of these views on the screen.

The presentation style of each view matters because they each convey a specific type of information to the user.

To start off we can show a temporary view. Sometimes we want to present information to the user about an event that occurred, but we don't necessarily want to remove them from their place in the app or change the context they are in. To achieve this purpose, iOS provides three different <a href="https://developer.apple.com/ios/human-interface-guidelines/ui-views/alerts/">temporary views</a> out of the box.

Since the view is temporary, we're not removing the user from their current place in the app. We're just asking them to take a quick action for a certain event or object. The simplest temporary view in iOS is an alert.

An alert gives people important information that affects their use of an app or the device. These are the messages such as "Allow 'App Title' to access your location while you use the app?"

There are guidelines on how you're allowed to use these. The <a href="https://developer.apple.com/ios/human-interface-guidelines/overview/design-principles/">iOS Human Interface Guidelines</a> contains Apple's guidelines for developers on how to build apps that match the platform's look, feel, and purpose. It is full of important information.

#### Displaying an Alert View

Earlier, when we implemented the `vend` functionality, we wrote incomplete error handling code in the `purchase` function.

We can fis that by showing an alert when something goes wrong. An <a href="https://developer.apple.com/ios/human-interface-guidelines/ui-views/alerts/">alert view</a> is represented by the class `UIAlertController`. <a href="https://developer.apple.com/reference/uikit/uialertcontroller">Learn more about UIAlertController class.</a> It has a simple `init` method that takes all the information needed to display an alert.

We are going to display three different alerts depending on the error that the user has run into, so we can create a single method, we'll name it `showAlert`:

{% highlight swift linenos %}
func showAlert() {
  let alertController = UIAlertController(title: "Out of Stock", message: "This item is unavailable. Please make another selection.", preferredStyle: .alert)
  
  present(alertController, animated: true, completion: nil)
}
{% endhighlight %}

Note that, `preferredStyles` is an `enum` with differnt styles.

The `present` method is used to tell the `ViewController` that a view should be displayed over top of a view. This is a "Modal View" that sits on top of a different view. Moval views prevent the user from interacting with the view it's sitting on top of, the underline view, until they preform the action that is necessary such as a dismiss.

Moval views can be full screen or take up just a little bit of the screen. Either way, they prevent input of the underlying view.

By default if you ask a `ViewController` to `present` another `ViewControll`, it displays that set of views modally. An app has a hierarchy. 

#### Quiz

Question: A modal view allows a user to interact with the underlying views.

Answer: False

Question: If an alert view provides information related to the standard functioning of an app, what should we be doing instead?

Answer: Designing information presentation within the app's centeral design

Question: Why do we present a view controller and not a view directly?

Answer: A view controller manages a view and we're simply asking the controller to present it.

Question: Create an alert without buttons when you want to prevent the user from undertaking an action in your app.

Answer: False

Question: Since alerts are used to convey important information, they should be used often to highlight content.

Answer: False

#### Adding User Interaction

According to the iOS Human Interface Guidelines buttons are "required" for your alerts. These are made with the `UIAlertAction` class. <a herf="https://developer.apple.com/reference/uikit/uialertaction">Learn more about the UIAlertAction class.</a>

This action is created in the `showAlert()` method. Instead of creating the action in the Interface Builder and dragging it over we can do it in code.

{% highlight swift linenos %}
func showAlert() {
  let alertController = UIAlertController(title: "Out of Stock", message: "This item is unavailable. Please make another selection.", preferredStyle: .alert)
  
  let okAction = UIAlertAction(title: "OK", style: .default, handler: dismissAlert)
  alertController.addAction(okAction)
  
  present(alertController, animated: true, completion: nil)
}

func dismissAlert(sender: UIAlertAction) -> Void {
  updateDisplayWith(balance: 0, totalPrice: 0, itemPrice: 0, itemQuantity: 1)
}
{% endhighlight %}

1. make show alert more configurable
2. account for every error in vending machien erorr type and present an alert that is appropriate
Finishing up by exhausting possible errors:

{% highlight swift linenos %}
func showAlertWith(title: String, message: String, style: UIAlertControllerStyle = .alert) {
  let alertController = UIAlertController(title: title, message: message, preferredStyle: style)

  let okAction = UIAlertAction(title: "OK", style: .default, handler: dismissAlert)
  alertController.addAction(okAction)
  
  present(alertController, animated: true, completion: nil)
}

func dismissAlert(sender: UIAlertAction) -> Void {
  updateDisplayWith(balance: 0, totalPrice: 0, itemPrice: 0, itemQuantity: 1)
}

@IBAction func purchase() {
  if let currentSelection = currentSelection {
    do {
      try vendingMachine.vend(selection: currentSelection, quantity: Int(quantityStepper.value))
      updateDisplayWith(balance: vendingMachine.amountDeposited, totalPrice: 0.0, itemPrice: 0, itemQuantity: 1)
    } catch VendingMachineError.outOfStock {
      showAlertWith(title: "Out of Stock", message: "This item is not available. Please make another selection.")
    } catch VendingMachineError.invalidSelection {
      showAlertWith(title: "Invalid Selection", message: "Please make another selection.")
    } catch VendingMachineError.insufficientFunds(let required) {
      let message = "You need $\(required) to complete the transaction."
      showAlertWith(title: "Insufficient Funds", message: message)
    } catch let error {
      fatalError("\(error)")
    }
    // .. code
  }
}
{% endhighlight %}

Note that without the final generic gatch the compiler has no way of knowing we have exhausted all possible errors.

## Displaying Cust Views Modally

Unlike the alert view (or a system view) it is possible to design and layout a view completely in code, but we don't know how to do that just yet.

What if we want to display a custom view modally rather than a system?

You can do it quite easily using Interface Builder. So over in the `Main.storyboard` file we can add a second view controller onto our screen.

In Interface Builder simply open the right panel (the utilities panel) towards the bottom click "Show Object Library" and drag "View Controller" onto the page.

You can quickly style the new view using the utilities panel. For example, you can change the background color in the attributes inspector.

You can copy and paste elements from one view onto another using the typical command-c and command-v keyboard shortcuts.

Note that when you copy and paste the constraints aren't copied so you must add those in afterward. 

For the vending machine app we copied over the purchase button from the main View Controller and added left right and bottom constraints, 0. We also added a height constraint of 56pts. Same as before.

Next, we changed the title from "purchase" to "dismiss" by double clicking the text. Next, we changed the background color of the button to red to indicate something needs doing.

After we finished the button we added a new label to the center of the view and added the text "funds successfully added".

Now that we have a new view the goal is to display it when the user adds money to the vending machine funds. This is the "add funds" button at the top of the original view.

For the purpose of this app we're going to keep the scope of this limited meaning this will always just add five dollars. This is because the focus is displaying the modal view.

On a side note, a modal isn't actually the best tool here. You should use a modal when you want to interrupt what the user is currently doing. This action (adding funds and informing the user it has been done) would be better suited for thoughtful animation.

Displaying the modal on click of the "add funds" button is super easy. All you do is control drag from the button over to the new view! Upon doing this a popup in Xcode will appear giving you several options. The option to "present modally" is used in this case. Once this is done, a connecting arrow is displayed on the storyboard. If you click on the arrow it will show you other details. You can change the way its presented and give it an identity, etc.

Now, when you run the app and click the "add funds" button the modal appears. The objective of the modal now is to dismiss the modal. This requires a tiny bit more work. 

However, we also must add the 5 dollars to our funds on the click of "add funds".. To get this started go to the assistant editor and create a new action. Add this after the `shorAlert` and `dismissAlert` functions in the `ViewController.swift` file. To add it right click on the button and drag the "Touch Up Inside" action over. Name it `depositFunds`. We don't need any arguments so set that to none and then click connect.

Inside the function is very simple. We just have to call the `vendingMachine` `deposit` function and add `5.0`. Next, we want to update the display balance using the `updateDisplayWith` method.

{% highlight swift linenos %}
@IBAction func depositFunds() {
  vendingMachine.deposit(5.0)
  updateDisplayWith(balance: vendingMachine.amountDeposited)
}
{% endhighlight %}

Currently, there's no way to tell if we have actually added the funds because we can't dismiss the modal view yet.

Since this new modal view that we added is an entirely new View Controller than the one we've been working with, we need to create a different custom subclass to manage it.

If you select the Project Navigator, you know that this `ViewController.swift` file contains a ViewController subclass, and that's what manages this View Controller in the storyboard. We can't use that same view controller to manage this one, because we added an entirely new view controller to get this view on the screen. So, we need a custom subclass. 

To add a new View Controller right click on the `VendingMachine` file or go to File ? New File, and select "Cocoa Touch Class". Now in here we can specify what base class tha we want to inherit from and since we want a `UIViewController` subclass we're going to specify that this file that we're adding should be a subclass of `UIViewController`.

Next, we need to give this class a name, the subclass, and we'll call this `DepositController`, then hit Next and add it to the project.

Now, we have this new custom subclass, but right now the two don't know about each other, so back in the `Main.storyboard` file in the utilities area head over to the Identity Inspector. Be sure to have the top part of the view selected first. From the dropdown, add the new associated class, `DepositController`. Now we have a custom subclass.

All you have to do now is create a new `IBAction`. However, make sure that there isn't a that there isnt a link, by right clicking the button first. A link could exist because of how we simply copied the button and pasted it onto the new view. Afteraward, drag "Touch Up Inside" again to the `DepositController.swift` file. This will look like the following, in code:

{% highlight swift linenos %}
@IBAction func deposit(_ sender: Any) {}
{% endhighlight %}

The `present` method that we used to show the controller modally has a counterpart, `dismiss`. This method dismisses the view controller that was presented modally.

{% highlight swift linenos %}
@IBAction func deposit(_ sender: Any) {
    dismiss(animated: true, completion: nil)
}
{% endhighlight %}

#### Quiz

Question: A `UIAlertAction` instance can be initialized with a "handler" - a function that executes code when the action is started. Why does the following function not work as a handler?

{% highlight swift linenos %}
func doSomething(sender: UIStepper) {}
{% endhighlight %}

Answer: The function signature does not match the one accepted by the handler parameter

Question: Which function can we call to intentionally crash the app and prevent the user from continuing?

Answer: `fatalError()`

Question: To dismiss a view controller, you must call `dismiss: animated:` on the controller you want to dismiss otherwise it wont work.

Answer: False

Question: How do you modify a view controller created in a Storyboard in code?

Answer: Create a custom subclass and associate it with the view controller in the storyboard