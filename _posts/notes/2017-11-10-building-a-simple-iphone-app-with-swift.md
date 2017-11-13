---
layout: article

permalink: /notes/building-a-simple-iphone-app-with-swift/

title: "Building a Simple iPhone App with Swift"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "These notes show the process of building a simple iPhone App with Swift and Xcode. The app is called Fun Facts. These notes contain core concepts such as views and view controllers, creating a data model, and the Model-View-Controller design pattern."

categories: notes

modified: 2017-11-10
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