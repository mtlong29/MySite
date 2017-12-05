---
layout: article

permalink: /notes/building-a-simple-iphone-app-with-swift/

title: "Building a Simple iPhone App with Swift"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "These notes show the process of building a simple iPhone App with Swift and Xcode. The app is called Fun Facts. These notes contain core concepts such as views and view controllers, creating a data model, and the Model-View-Controller design pattern."

categories: notes

date: 2017-11-10
---

{% include /globalSections/toc.html %}

When starting a new project in Xcode you are given numerous options that contain boilerplate code (templates).

Some options are:

<ul>
  <li>Single View Application - The most basic template. This provides a good starting point for creating an application that has a single view. The calculator app is a good example of this.</li>
  <li>Game - Good starting point if you want to make a game.</li>
  <li>Master-Detail Application - This template provides a user interface configured with a list of items that then goes into a detail view when one of the items is selected. The mail app is a good example of this.</li>
  <li>Page-Based Application - This template provides a starting point for apps using a page view controller. A page view controller allows you to have an app that you can scroll through side-by-side. And it goes from one view to another. The weather app is a good example of this.</li>
  <li>Tabbed Application - A tabbed application is one that has a tab bar at the bottom, like in the apple music app.</li>
  <li>Sticker Pack App - Allows us to create stickers.</li>
  <li>iMessage Application - Allows us to create an application usable with iMessage.</li>
  <li>Augmented Reality - App that uses augmented reality.</li>
  <li>Document Based Application - These apps handle multiple documents.</li>
</ul>

For this set of notes a Single View Application called FunFacts will be created. This app will display a random fun fact.

## Tour of Xcode

Once you choose Single View Application an options page will show. Some of the options are product name, team, organization name, organization identifier.

For product name you can name your app whatever you want, for this it is "FunFacts". This is not the name that will be placed in the app store. For team you can choose none. If you want you can create a team that will allow you to set defaults for things such as deployment. The organization name can just be your own name if you aren't part of an organization. The organization identifier is typically the reverse of your website or your organizations website. For example, mine is "mtlong.me" so the organization identifier is "me.mtlong". With this the bundle identifier will be set as "me.mtlong.FunFacts". This will help you clearly identify your name and make it unique. Next you choose the programming language and other settings such as unit tests.

When you click the play button a simulation of an iphone will run displaying your app. This may take a few minutes.

To view the debugger toggle the bottom pannel.

## Architecture of an iOS App

An iOS app has many moving parts separated across different files.

Every app at its basic level consists of three main components, models, views, and controllers.

The models contain the data that we use in the app. Views are parts of the app that we see on the screen and interact with, and the controllers are these sort of puppet master objects that coordinate between the models and the views.

When you run the app on Xcode a lot of things happen automatically. The app started and ran, a white screen was displayed on screen with a status bar, and so on. This is because Apple has written a lot of code themselves to help build apps. The apps we build run on iOS.

The operating system manages the device hardware and provides certain technologies that we can use. The iOS SDK, or software development kit, contains all the tools and interfaces we need to use the operating system, and develop, install, and run apps on it.

At a very high level, iOS looks like this: you have four layers, Cocoa Touch, Media, Core Services, and Core OS. These are all different layers of code, and each layer builds on top of the next one, making it much easier to write code and achieve certain tasks. Each of these layers contain many years worth of code, with other several hundred classes that we can use to build apps. You'll often head of iOS development referred to as Cocoa Touch development, and this refers to the fact that we interact a lot with Cocoa Touch layer of code when building our apps. 

When you work with the iOS code base, you will encounter many of the classes that Apple engineers themselves have written for us to use. When writing Swift code, we use the string type. Strings in iOS are instances of the NSString class. Yes.. A string is a class?? Swift is a brand new language. So, none of this underlying iOS code is written in Swift. All of it is written in Objective-C, it's much older sibling.

Objective-C works a bit differenty, and names of classes are prefixed with letters to identify the part of the SDK they belong to. Similarly, you'll find NSNumber, NSArray, NSDictionary, and so on. This prefix is used because this code is part of a library of code called Foundation, which was written as part of the NeXTSTEP operating system. The prefix NS refers to NeXTSTEP.

Back in 1985, Steve Jobs was fired from Apple, and he ended up starting another company called NeXT. The NeXTSTEP operating system was developed for one of their products, the NeXT Computer. Much later, in 1996, Apple wasn't finding much success in their product line and decided to buy NeXT. This brought Steve Jobs back into the company, and the NeXTSTEP operating system became the foundation for almost all of the Apple software today. This means we're standing on a lot of legacy here.

So many things such as drawing text on the screen, making buttons and tapping on the phone, we don't have to worry about at all because Apple has written code to do all that for us. We can subclass all of Apple's code to add more features on top of it, set values on properties, and override method implementations to get the behavior we want.

The views are built in `main.storyboard`. This is where the user interface is built. `ViewController.swift` file is where the logic is written that controlls how the app works. The `AppDelegate.swift` file communicates with iOS and is responsible for openign closing and saving the state of the app, among other things.

There a lots of moving parts when building an iOS app and it's most often best to focus on them separetly before you having a working app.

### Object Oriented Swift Recap

Example of creating a `struct` with stored properties and varying types including the type within a different `struct`. Also, creating a method that takes no parameters that returns a string that describes the post instance.

{% highlight swift linenos %}
struct Tag {
  let name: String
}
struct Post {
  let title: String
  let author: String
  let tag: Tag
  func description() -> String {
    return "\(title) by \(author). Filed under \(tag.name)"
  }
}
let firstPost = Post(title: "Super Good Stuff", author: "Billy", tag: Tag(name: "Swift"))
let postDescription = firstPost.description()
{% endhighlight %}

Example on subclassing:

{% highlight swift linenos %}
class Point {
  var x: Int
  var y: Int
  init(x: Int, y: Int) {
    self.x = x
    self.y = y
  }
}
class Machine {
  var location: Point
  init() {
    self.location = Point(x: 0, y: 0)
  }
  func move(_ direction: String) {
    print("Do nothing! I am a machine!")
  }
}
class Robot: Machine {
  override func move(_ direction: String) {
    switch direction {
    case "Up": location.y += 1
    case "Down": location.y -= 1
    case "Left": location.x -= 1
    case "Right": location.x += 1
    default: break
    }
  }
}
{% endhighlight %}

#### Quiz

Question: Classes are provided with memberwise initializers by default.

Answer: False. Structures are.

Question: When we initialize a subclass, we first need to initialize the properties in our base class, then call the super class' initializer.

Answer: True

Question: Which of the following types support inheritance?

Answer: Class

Question: Which of the following types is a value type?

Answer: Struct. <a href="https://developer.apple.com/swift/blog/?id=10">Value types</a> are where each instance keeps a unique copy of its data, usually defined as a `struct`, `enum`, or tuple. The most basic distinguishing feature of a value type is that copying, the effect of assignment, initialization, and argument passing, creats an independent instance with its own unique copy of its data:

{% highlight swift linenos %}
struct S { var data: Int = -1 }
var a = S()
var b = a // a is copied to b
a.data = 42 // changes a, not b
print("\(a.data), \(b.data)") // prints "42, -1"
{% endhighlight %}

## Designing with Interface Builder

Xcodes interface builder does two main things. First, it allows us to lay out elements in our views and specify their position on the screen among different devices. Second, it allows us to interact with these visual elements. 

When you use an app, you scroll the screen, tap buttons, select text and lots of other things. When you take actions like this, you expect things to happen. Interface builder lets us connect our visual elements to code so that we can execute some action when the user interacts with the elements.

Within the interface builder we work with a storyboard. A storyboard is a visual representation of the user interface of an iOS application showing screens of content and the connections between those screens.

The panel on the far right contains an Object Library. The Object Library has all sorts of elements you can drag onto the iphone. You can select the element and edit its properties in the right panel as well. You have to click play again for it to show in the simulation.

## Introduction to Views

In iOS you use windows and views to represent your elements. A view manages a rectangular area within the window in your app. Views are not only responsible for drawing elements on the screen, but they also are responsible for handling user interaction, like when we touch our screen and manage the layout of any service within the View. 

Views are instances of the UIView class. Which is one of the classes that is in the code that Apple provides. You use views as building blocks when building your app UIView even has specialized views that let you put text images and other types of content on the screen.

You can toggle the document outline of the view by clicking a button towards the bottom to open a panel on the left. This panel shows the document outline for View Controller Scene, View Controller, View, and the elements you add. You will see that any element you add will be a subclass of the View, because it is contained within the main View.

One thing to note is that apps do not have single views. You can think of views as building blocks we use multiple views in different hierarchies to build how your app looks on screen. A single view can contain any number of sub views and we can have multiple views and arrange them in different ways to create our user interface.

For the FunFacts app drag a label and button onto the View. When you run the app you will even be able to click the button at this point. However, nothing will be working yet.

#### Quiz

Question: Each iPhone app has one window which acts as a controller for the views in our app.

Answer: True

Question: Which section of Interface Builder allows us to change the attributes of an object?

Answer: Attribute Inspector

Question: What is a storyboard?

Answer: Visual representation of the user interface of an iOS application

Question: Which of the following is/are true of views in iOS?

Answer: A view manages an area on the screen. Views are responsible for drawing content on the screen. Views are responsible for handling user interaction like touches. Views are responsible for managing the layout of its subviews.

Question: Views are instances of the ____ class.

Answer: UIView

## Frameworks and UIKit

You can pick and choose what code we use from apply by importing them. `UIKit` is imported by defauly on the `ViewController.swift` file: `import UIKit`.

When you hit build and run the code from UIKit is added to your app. This means we don't see the code, but it's there for us to use.

You can hold down the command key and click on `UIKit` to go to the definition and eventually to the header file that show us what properties are available to use and what properties to use. This typically shows you the method names, default values, and return types along with a ton of comments. The body of the code belongs to apple.

You will also see what classes are subclasses etc. For example, you can see that `UIButton` is a subclass of `UIControl` and `UIControl` is a subclass of `UIView`.

There are two ways, we can use a label, button, or many of the components in `UIKit`. Since they're classes, we can create them in code by creating an instance of a class like we're used to. Each of these classes have special initializers that get them ready for use and allow us to assign values to the different stored properties. The second way is through Interface Builder by dragging out elements and modifying some of the properties in the attributes inspector. XCode automatically does the same thing in the background. It creates an instance of the correct class and assigns values to its stored properties.

## Introduction to View Controllers

A view controller is an important component of our app that links the apps data to its visual appearance. A view is always controlled by a view controller. 

One is setup already once creating the app. You can see this by going to the `Main.storyboard` file and clicking on the view controller in the document outline. On the right, in the identiy inspector, you will see a class is given which is `ViewController`. You can use this class to write code to manipulate any of views it owns. You can add more for every view you create.

<a href="https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIViewController_Class/index.html">UIViewController Class Reference</a>
<a href="https://developer.apple.com/library/prerelease/ios/featuredarticles/ViewControllerPGforiPhoneOS/">Ciew Controller Programming Guide for iOS</a>

To connect things from the visual display in Interface Builder, to the code in our ViewController, first go back to the story board file and bring up the assistant editor. In the toolbar on the top right, the first set of three icons let's you pick the type of editor. The second one is the assistant editor button (the interlocking circles). The assistant editor displays files side by side. 

On the top there is a thin bar called the jump bar. Right where it says automatic, you can go to menu instead and simply navigate through the project. So we go to the FunFacts group and this is grouped exactly how it is in our project navigator area and you can select the `ViewController.swift` file.

To connect the label right click on it and you should get a modal view. Look for a row that says new referencing outlet and then click and drag over to the class definition. To create essentially a stored property and it should say insert outlet. Insert it at the top of the class. This is where we typically put stored properties, above the `ViewDidLoad` method.

A new modal will popup, you can type something like `funFactLabel` and hit connect. This will inset `@IBOutlet weak var funFactLabel: UILabel!`.

#### Quiz

Question: Which major Apple framework deals with the window and view architecture to manage app's user interface, handles events and provides a means for the app to interact with the system?

Answer: `UIKit`

Question: When we subclass `UIViewController` to create our own view controllers, we can override certain methods that allow us to modify the appearance and behavior of our views.

Answer: True

Question: Every view controller has a `UIView` instance as a stored property.

Answer: True

Question: A view controller links the iPhones operating system to an app's visual appearance

Answer: False

Question: A software ____ is a reusable code base that provides particular functionality in the context of a larger software platform

Answer: framework

## Creating IBOutlets

Taking a look at `@IBOutlet weak var funFactLabel: UILabel!`:

The `var funFactLabel: UILabel` part is very familiar. Here we created a variable stored property with the name, `FunFactLabel`, and it has a type of `UILabel` which is that class that represents a label.

The first keyword, `IBOutlet` is a type qualifier. This is a tag applied to a stored property declaration that allows Interface Builder and Xcode to recognize that this stored property is an IB Outlet, or Interface Builder Outlet. and synchronize the visual element in our scene with the property in our code. 

If you look at the line number where the property is declared there is a filled in circle. This indicates that the property is currently connected to a label in Interface Builder. If you hover over it it'll show the label that it's connected to. You can also check that there's a valid connection by right-clicking on this label.

The second keyword is `weak`. This has to do with memory management. Memory management is a complex topic for another time. The important thing now is to know that the label created in Interface Builder has a weak relationship with the view controller, and that's why we have this weak keyword. In fact, all IB Outlets have weak relationships.

The other unfamiliar character is the exclamation point, `!`, at the end. When the system leads views not everything loads immediately at the same time. Things are loaded as they are needed to optimize performance and memory of your device. The exclamation point here indicates that there is a chance that our outlet and therefore, our label, won't be loaded by the time the view loads. And if we try to access the property before that, it will crash.

THe exclamation point is a swift language feature called an optional. Optionals are really important because they allow us to set values to `nil`. Recall that `nil` represents nothingness. An optional value indicates to the compiler that there's a chance the value we're looking for, the label we're looking for right now, might not exist yet. The optional is used here to tell the compiler that the connection between the label in the Interface Builder and the property in code might be `nil` because it hasn't been established at some point. This is all the information on optionals necessary at this point.

When the system is done loading our view, it called the `viewDidLoad` method on our view controlled. Any code put in there will automatically run when the view loads.

{% highlight swift linenos %}
override func viewDidLoad() {
  super.viewDidLoad()
  // Do any additional setup after loading the view, typically from a nib.
}
{% endhighlight %}

Apple wants to make sure that regardless of what we put in there, that there's some code that they've written that always gets run: `super.viewDidLoad()`. So before running any of our code theyre going to call the parent class. You do that by using the keyword `super`. This ensures that whatever they've written gets run first and then any code we add gets run second. 

You can change the text written in the label to an interesting fact here. Recall that you can access any property with dot notation. The property we need to assign a new value to is the `text` property.

{% highlight swift linenos %}
override func viewDidLoad() {
  super.viewDidLoad()
  funFactLabel.text = "Interesting Fact"
}
{% endhighlight %}

Now, when you run the program you will see "Interesting Fact" in the iPhone simulator instead of the "Some Fact Goes Here" label text.

## Using IBAction to Execute Methods

In the view the button is a control and can be interacted with. This means that not only can we create an outlet but we can also create an action to respond to a user interacting with it.

You can right click the button in the Interface Builder and select from many options. A clicker method is to hold control on the keyboard and drag the button over to the `ViewController`. This will create an outlet by default, but you can select action from the dropdown under collection. For this app, name it `showFact` and change the arguments to `none`.

This adds the following method to `ViewController`:

{% highlight swift linenos %}
@IBAction func showFact() {
}
{% endhighlight %}

Note that `IBAction` stands for Interface Builder Action. There are many tdifferent types of actions: touch down, touch drag, touch lift, etc.

To ensure it works you can add a print message:

{% highlight swift linenos %}
@IBAction func showFact() {
  print("You pressed me!")
}
{% endhighlight %}

This will log "You pressed me!" out to the console when you click the button on the iphone simulator. You can take this same conept to change the fact!

{% highlight swift linenos %}
@IBAction func showFact() {
  funFactLabel.text = "Another much more interesting fact."
}
{% endhighlight %}

This time when you click the button the fact changes (the text of the label changes)!

Note that instead of hitting stop and play every time to run your app you can press command + r as well.

<a href="http://nshipster.com/ibaction-iboutlet-iboutletcollection/">Learn more about IBAction</a>
<a href="https://developer.apple.com/library/ios/documentation/general/Conceptual/Devpedia-CocoaApp/TargetAction.html">Learn more about Target-Action</a>

## Help Menu

Using the help menu within Xcode will is a great tool for development! You can quickly access this by using the keyboard shortcut command + shit + 0. This is the best place to start when you're stuck! Getting comfortable with this documentation will make you a better developer. The search toolbar is powerful.

You can also hold option and click many things to read more about methods, classes, and much more.

#### Quiz

Question: What describes a Target-Action method:

Answer: Sending a specific message to a designated object or class.

Question: How do we let Interface Builder know that we have a method in code that is associated with a button in our view?

Answer: By using the `@IBAction` keyword.

Question: What is an `@IBOutlet`?

Answer: A keyword added to a property so that Interface Builder matches it with a visual object.

Question: Which method in a view controller automatically runs all the code inside it?

Answer: `viewDidLoad()`

## Creating a Data Collection

For the FunFact app the goal is that the user can keep clicking the button and get a new fact every time. This is why we need a data collection.

Data types that allow you to store and manage groups of values or objects. Two data types are arrays and dictionaries. Since all we need is a list of facts and not a list of key value pairs an array will work well for this app.

Make sure your array is placed where multiple functions inside the class can access it.

{% highlight swift linenos %}
let facts = ["Ants stretch when they wake up in the morning", "Ostriches can run faster than horses"]
{% endhighlight %}

Now you can set the fact that shows when the app loads:

{% highlight swift linenos %}
override func viewDidLoad() {
  super.viewDidLoad()
  funFactLabel.text = facts[0]
}
{% endhighlight %}

And you can call the second fact when you click the button:

{% highlight swift linenos %}
@IBAction func showFact() {
  funFactLabel.text = facts[1]
}
{% endhighlight %}

## Refactoring into a Model

The app implementation works so far. We could leave it as is and move on to improving the visual interface, but our code isn't structured well.

Even though we have very little code in our project. It is hard to say what code sets up the visual appearance, what controls our views, and what serves as our data model.

It is important to keep these things separate because as the project grows, as your write more code, having a good structure helps you keep it bug free.

We need to refactor our code! Refactoring is the process of changing the code but not changing its functionality.

In an app the less code you put into a single object, in a single file, the better. One of the main reasons we want to separate the data from the `ViewController` is to make both our class and the model a lot more flexible. Right now, they're coupled tightly.

While it may seem like the best strategy, comes with plenty of pitfalls. Those objects can be used with one another only. And in general we want things to be more flexible and reusable across our code base. If we anted to show the facts, in this array, in another screen in the app, we'd have to duplicate this code because right now it's a stored property on this object, the `ViewController` subclass. 

By having a single data model, you can treat that model as your source of truth. All the data in the app comes from that model as far as your controllers in views are concerned. If there are errors, we can fix it in one place and the fix is reflected everywhere.

We're going to declare a new `struct` to hold the data. Start by creating a new swift file in the FunFacts group. Name the file `FactProvider.swift`. This file comes with boilerplate comments and an `import Foundation` statement. Swift gets the comments from the project settings.

`import Foundation` imports a framework that lets us use classes and structs from `Foundation`. We don't need anything from this framework for this file so delete it.

## Structs or Classes

When thinking of object oriented Swift, you think of two objects primarily, classes and structs.

We want to create an object that encapsulates our facts in a simple model. Which do we use, `struct` or a `class`? We should limit our use of structs to simple data where we don't need to worry about which particular instance we're working with.

A `struct` works perfectly for our case since our data is just an array of strings. 

{% highlight swift linenos %}
struct FactProvider {
  let facts = [
    "Ants stretch when they wake up in the morning.",
    "Ostriches can run faster than horses.",
    "Olympic gold medals are actually made mostly of silver.",
    "You are born with 300 bones; by the time you are an adult you will have 206.",
    "It takes about 8 minutes for light from the Sun to reach Earth.",
    "Some bamboo plants can grow almost a meter in just one day.",
    "The state of Florida is bigger than England.",
    "Some penguins can leap 2-3 meters out of the water.",
    "On average, it takes 66 days to form a new habit.",
    "Mammoths still walked the Earth when the Great Pyramid was being built."
  ]
}
{% endhighlight %}

To use this go back to the `ViewController` class, and get rid of the current stored property. Declare a new one named `factProvider`. Now assign an instance of the `FactProvider` struct:

{% highlight swift linenos %}
let factProvider = FactProvider()
{% endhighlight %}

When we create an instance of an object, we use an initializer to pass in initial values to restore properties. Structs automatically create a memberwise initializer. But since our stored property already has values, we can simply use an empty set of parentheses to create an instance.

Now you can replace the code that uses the property we had earlier to use the data model instead. Remember that to access properties and objects, we use the dot notation. To get the second fact when clicking the button:

{% highlight swift linenos %}
@IBAction func showFact() {
  funFactLabel.text = factProvider.facts[1]
}
{% endhighlight %}

## Model-View-Controller

In keeping the code organized like this, we've followed the Model-View-Controller design pattern.

The role of code in our app can be put into one of three categories: models, views, or controlles. This is a fundamental aspect of iOS development and what we've been doing is following a common design pattern.

Software engineers often run into problems when writing code. Some of these problems are common enough that there are widely accepted solutions fof them. These solutions are called design patterns and one of the more fundamental design patterns in iOS is known as MVC (Model View Controller) design pattern.

In our app, the `struct` we created is the data model and the data is in the form of facts stored in an array. The data could very well come from another place like the web. Where the data comes from does not matter.

By separating the code like this, the model object can be reused across many other views if needed without having to repeat code.

After models, we have views. The views in the MVC pattern consist of everything that the user can see. Stuff that builds up the user interface of an app.

A views purpose is to draw on the screen and to display data from the model object so that the user can see and interact with it. In our application, the views are represented in the `main.storyboard` file.

The last part of this pattern are controllers. Since the views are supposed to visually represent data in the model but can't communicate with the model, and the model is supposed to handle manipulation of the data for the view but can't communicate with the view directly, we have a third object a controller that mediates between the two.

The controller typically contains code to connect parts of the view to the model and to facilitate communication between the two of them. In our app, the view controller class is the controller. It maintains a reference to both the view, as well as the label and buttons we added through IB Outlets. Similarly, the data model is part of the controller through the stored property we added. Inside methods like `viewDidLoad`.

You can think of an app as many MVC groups. Often each screen has its own MVC group.

If all your code is in a small number of files it will be difficult to debug, maintain, and add to your code. MVC is often looked at as a requirement for iOS development.

## Finishing Up Our Model

The app doesn't show more than the first two facts. This is because it is hardcoded to the first and second index of the facts array.

A better way would be to create a random number and have that random number equal the index. There are many ways to generate a random number in swift, but one of the best ways is using the `GameKit` framework.

To use `GameKit`, you must first `import` it.

Next, to assign a random number to the index we can create a method, name it `randomFact`. This method will the random fact. To generate the random number use `let randomNumber = GKRandomSource.sharedRandom().nextInt(upperBound: facts.count)`. Then use `randomNumber` as the index value and return `facts[randomNumber]`.

{% highlight swift linenos %}
import GameKit
struct FactProvider {
  let facts = [
    "Ants stretch when they wake up in the morning.",
    "Ostriches can run faster than horses.",
    "Olympic gold medals are actually made mostly of silver.",
    "You are born with 300 bones; by the time you are an adult you will have 206.",
    "It takes about 8 minutes for light from the Sun to reach Earth.",
    "Some bamboo plants can grow almost a meter in just one day.",
    "The state of Florida is bigger than England.",
    "Some penguins can leap 2-3 meters out of the water.",
    "On average, it takes 66 days to form a new habit.",
    "Mammoths still walked the Earth when the Great Pyramid was being built."
  ]
  func randomFact () -> String {
    let randomNumber = GKRandomSource.sharedRandom().nextInt(upperBound: facts.count)
    return facts[randomNumber]
  }
}
{% endhighlight %}

And you can call this method on both instances of factProvider:

{% highlight swift linenos %}
import UIKit
class ViewController: UIViewController {
  let factProvider = FactProvider()
  @IBOutlet weak var funFactLabel: UILabel!
  override func viewDidLoad() {
    super.viewDidLoad()
    funFactLabel.text = factProvider.randomFact()
  }
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  } 
  @IBAction func showFact() {
    funFactLabel.text = factProvider.randomFact()
  }
}
{% endhighlight %}

#### Quiz

Question: When we follow the MVC mode, the model and view communicate directly with each other to present data to the user.

Answer: False

Question: We always want our objects to be as flexible and reusable as possible.

Answer: True

Question: Why do we not use an initializer method when creating the model in our app?

Answer: `init` methods allow us to customize instances at creation and our data is always the same

Question: MVC stands for ____ - ____ - ____.

Answer: Model, View, Controller

Question: Arrays in Swift are homogenous, that is, they must contain values of the same type

Answer: True

Question: Refactoring is the process of restructuring code by changing its behavior

Answer: False

Question: If the following code is run it will crash, why?

{% highlight swift linenos %}
let someData = [1, 2, 2]
someLabel.text = someData[3]
{% endhighlight %}

Answer: Array index out of bounds error

Question: In an app, you typically only have one MVC implementation.

Answer: False

## Introduction to Auto Layout

There are now many iOS devices which mean layout for every device must be taken into account due to the different sizes. Also, you have to consider horizontal vs vertical orientation.

Apple has provided a system called <a href="https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/AutolayoutPG/">Auto Layout</a>.

With Auto Layout you don't specify an x and y coordinate. Instead, you see relationships between elements in a view.

You can define these relationships using constrains on individual elements or restrains between elements.

This is done in the storyboard file. For this app it is `Main.storyboard`.

Resize the label element so that the whole label shows. Also, you can set the lines to 0 so that it will wrap to the next line if needed. Note that the height, width, etc values are not in pixels. They are in points. This is because the pixel value of iOS devices vary.

When using Auto Layout you can add restraints by providing its position and size. Position requires x and y, and size requires width and length.

If you hold the option key you can see the space between elements.

The Auto Layout submenu is the four icons in the middle on the bottom right. There is a button for adding a new restraint.

Every view has an alignment rectangle that allows us to manage size and possitioning.

For horizontal positioning, the view has a leading constraint attribute, a trailing attribute, as well as left, right, and center. Leading attribute refers to the edge where words and sentences begin (for a label example). Trailing refers to the edge where words end. Now the reason there's also a left and a right is because not all languages follow the same direction. So in English, for example, leading is the same as a left constraint. Whereas in Arabic, text starts from right and goes to the left, elading is the same as the right constraint.

For vertical positioning we can set top, bottom, center, and baseline. Top, bottom, and center are self-explanatory and refer to the top and bottom of the label, along with the vertical center. THe baseline attribute is only available for items that have a baseline. Baseline is an invisible line, offset from the bottom of the alignment rectangle, where glyphs of characters are laid out. Basically, it's that line where text sits.

To actually add the constraints click the add constraint icon again and then when you have your element selected 

## Positioning and Size

To finish up the position we also need a y coordinate. You can click the align button in the bottom right to add alignment constraints. You can then center something such as the text inside a container by choosing "vertically in container" and clicking add constraint.

If a element has a red outline then it doesnt have sufficient information. A yellow outline means some of the information is conflicting so the final layout is ambiguous.

You can click resolve issues button in bottom right or in the document outline on the Interface Builder. The document outline section provides more information. Options such as update frames, and update constraints are available.


#### Quiz

Question: Elements with content, like labels, have an intrinsic size that allows the system to determine size without the need for constraints.

Answer: True

Question: When we have a red outline around an element in Interface Builder, this indicates that:

Answer: We have not provided enough information in the form of constraints for the system to determine size or positioning

Question: For each element we need to provide two categories of constraints: ____ and ____.

Answer: size, position

Question: What is a view's frame?

Answer: A rectangle that defines the view's location and size in it's superview

Question: Using Auto Layout, we define layout using a series of point values on a per device basis. The system then sorts through our list of coordinates and specifies size and position on each device

Answer: False

Question: A constraint is a mathematical relationship between two elements

Answer: True

Question: What is true, given some text in English?

Answer: Left and Leading constraints are equivalent

Question: When we have a dotted yellow outline around an element in Interface Builder, this indicates that:

Answer: The constraints are in conflict with other information and this creates an ambiguous layout

Question: When you add a constraint to an element, it is typically added between the element and its superview or nearest neighbor.

Answer: True

## Styling User Interface Elements

To change the color or properties of an element go to the properties inspector on the right.

You can check out the documentation for UIView and see all the properties. But it's just as easy to look through Interface Builder without having to write code explicitely.

You can remove a constraint in the size inspector.

## Changing Color On New Fact

You can change properties programmatically as well as through the Interface Builder. Recall that all the Interface Builder did was create an instance of `UIColor`.

This means we can use this to create a new instance every click of the button.

{% highlight swift linenos %}
@IBAction func showFact() {
  funFactLabel.text = factProvider.randomFact()
  let newColor = UIColor(red: 223/255.0, green: 86/255.0, blue: 94/255/0, alpha: 1.0)
  view.backgroundColor = newColor
}
{% endhighlight %}

We can randomize this color much like getting the random fact.

{% highlight swift linenos %}
import UIKit
import GameKit
struct BackgroundColorProvider {
  let colors = [
    UIColor(red: 90/255.0, green: 187/255.0, blue: 181/255.0, alpha: 1.0), //teal color
    UIColor(red: 222/255.0, green: 171/255.0, blue: 66/255.0, alpha: 1.0), //yellow color
    UIColor(red: 223/255.0, green: 86/255.0, blue: 94/255.0, alpha: 1.0), //red color
    UIColor(red: 239/255.0, green: 130/255.0, blue: 100/255.0, alpha: 1.0), //orange color
    UIColor(red: 77/255.0, green: 75/255.0, blue: 82/255.0, alpha: 1.0), //dark color
    UIColor(red: 105/255.0, green: 94/255.0, blue: 133/255.0, alpha: 1.0), //purple color
    UIColor(red: 85/255.0, green: 176/255.0, blue: 112/255.0, alpha: 1.0), //green color
  ]
  func randomColor() -> UIColor {
    let randomNumber = GKRandomSource.sharedRandom().nextInt(upperBound: colors.count)
    return colors[randomNumber]
  }  
}
{% endhighlight %}

This changes the background color of the view every click when added to the IBAction for the `showFact()` button:

{% highlight swift linenos %}
@IBAction func showFact() {
  funFactLabel.text = factProvider.randomFact()
  let randomColor = colorProvider.randomColor()
  view.backgroundColor = randomColor
}
{% endhighlight %}

In order to match the color of the button text with the background color you must create a new Outlet using the assistant editor, click on the button and then control drag over to the View Controller. Name the outlet `funFactButton`.

{% highlight swift linenos %}
import UIKit
class ViewController: UIViewController {
  let factProvider = FactProvider()
  let colorProvider = BackgroundColorProvider()
  @IBOutlet weak var funFactLabel: UILabel!
  @IBOutlet weak var funFactButton: UIButton!
  override func viewDidLoad() {
    super.viewDidLoad()
    funFactLabel.text = factProvider.randomFact()
  }
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  @IBAction func showFact() {
    funFactLabel.text = factProvider.randomFact()
    let randomColor = colorProvider.randomColor()
    view.backgroundColor = randomColor
    funFactButton.tintColor = randomColor
  }
}
{% endhighlight %}

#### Quiz

Question: How is tint color different from text color?

Answer: Tint color indicates interactivity and selection state for UI elements while text color is simply stylized text

Question: Why do we not hardcode the upper bound of the random number?

Answer: Because our data source may change and the hardcoded number will give an incorrect range. Because it's a magic number that doesn't provide any information about the range of random numbers. Because we should strive to hardcode as little information as possible.

Question: UIColor is part of the ____ framework.

Answer: UIKit

Question: Why do we not add the code for generating and displaying colors to the view controller?

Answer: A controller's job is to take data that is ready for presentation and give it to the view to present. Creating and manipulating the data is not part of that role.

## Running on Device

Before iOS 9 you had to spend $99 to enroll in the apple development program in order to run your app on your device.

Thankfully now you basically just plug your device in and select it from the scheme.

You can go to the general settings of your app and change the deployment target version. 

You also need a signing certificate for your phone. You can do this by adding your apple account in Xcode.

If you want to check out the progress of your phone you can go to windows and select devices.

You can add an app icon to your device through the use of an asset catalog. The asset catalog contains images used in your app as well as the icon. This folder has already been created for your app. You need various icon sizes to target different resolutions.

Note that even though the icons are rounded on the app, you should drag them in square. They will be rounded by Xcode.

#### Quiz

Question: Why do we provide app icons at different point sizes?

Answer: To target different device resolutions for the various iOS devices