---
layout: article

permalink: /notes/build-a-vending-machine-app/

title: "Build a Vending Machine App"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "This set of notes concern building a vending machine app that models a vending machine in the real world. The focus of this app is to understand errors in code and how to handle situations that are unexpected or incorrect. In addition, more examples of using stock controls in iOS and how views are aranged in an app. This is a multiple screen app."

categories: notes

modified: 2017-11-21
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
    // code
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

## 