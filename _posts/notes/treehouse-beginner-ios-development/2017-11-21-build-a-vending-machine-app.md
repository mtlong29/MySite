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

