---
layout: article

permalink: /notes/swift-auto-layout/

title: "Swift Auto Layout"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "Auto Layout has evolved greatly since it's conception. It wasn't even a thing to begin with. Swift used hardcoded coordinates, springs, structs, frames, and more beforehand. This worked, but had repetitive code, and other headaches. Once new iOS sizes released this didn't really work. Now, Swift uses Auto Layout by default."

categories: notes

date: 2017-12-01
---

{% include /globalSections/toc.html %}

Auto Layout has evolved greatly since it's conception. It wasn't even a thing to begin with. Swift used hardcoded coordinates, springs, struts, frames, and more beforehand. This worked, but had repetitive code, and other headaches. Once new iOS sizes released this didn't really work. Now, Swift uses Auto Layout by default.

#### Quiz 1

Question: A view's frame, defined by a `CGRect` value, encapsulates information about only the view's origin.

Answer: False

Question: What is defined in terms of the superview's coordinate space?

Answer: Frame

Question: Frame is a computed property whose value depends on the view's bounds, center and transform amongst other values.

Answer: True

Question: Priod to the introduction of Auto Layout, the layout and sizing mechanism in iOS development was known as ____.

Answer: Springs and Struts

Question: What is defined in terms of the view's own coordinate space?

Answer: Bounds

Question: What happens when we assign a value to a view's frame property?

Answer: The computed property's setter recalculates the view's bounds and center

#### Quiz 2

Question: When displaying a Right-To-Left language like Arabic, the trailing edge corresponds to the ____ attribute.

Answer: Left

Question: When we create a constraint that does not reference an attribute on another view, which attribute do we specify?

Answer: `NotAnAttribute`

Question: Auto Layout is based on what algorithm?

Answer: Cassowary

Question: The basic component of Auto Layout is a ____.

Answer: Linear equation

Question: When a constrain in Interface Builder is highlighted in red, it indicates what?

Answer: There is insufficient information to determine size andorigin

Question: What is the correct constraint equation?

Answer: `A1 = (M * A2) + C`

#### Quiz 3

Question: Why do we not have to specify a height and a width constraint of a label that contains some simple text?

Answer: Auto Layout can determine the size of views with content using their intrinsic content size

Question: Suppose that view A has the following constrains applied to it. 1: Height constraing with a constant of 80 and a priority of 750. 2: Heigh constraint with a constant of 90 and a priority of 250. What is the resulting height of view A?

Answer: 80

Question: Content hugging refers to how much the view resists compressing its size to protect its content.

Answer: False

Question: Auto Layout uses a constraints priority value to determine how to resolve conflicts between two constraints.

Answer: True

#### Quiz 4

Question: A size class can have two values ____ and ____.

Answer: compact, regular

Question: In addition to size classes, what other trait(s) can we use to modify layouts?

Answer: Display scale and user interface idiom

Question: A generic size class is represended by what combination?

Answer: Any width, any height

Question: Size classes correspond to exact device specifications or measurements.

Answer: False

Question: What size classes targets all iPhones in landscape?

Answer: Any width, compact height

Question: Use size classes to make fine tuned changes to your interface.

Answer: False

## NSLayoutConstraint

Every constraint used in Interface Builder is an instance of `NSLayoutConstraint` class.

Why would you want to write layout in code instead of using Interface Builder? For starters, it is the preferred method for many developers. Especially those who work on teams and use source control to work on various aspects of the app at the same time.

When we specify layout in code, it allows us to build abstractions much like anything else constructed in code. And there are several third party libraries written that make adding constraints much easier. In the past, when working on a team, interface builder was hard to use along with source control to build a UI of your app. But a lot of these problems have been fixed by apple.

There are some additions to Auto Layout that make adding constraints in code really fluid, easy to understand and simple to use. The first, is using Auto Layout APIs.

Every constraint is created in Interface Builder what we're essentially doing is creating an instance of an `NSLayoutConstraint`. `NSLayoutConstraint` has properties for every aspect of the constraint equation that we create in Interface Builder. We have `priority`, `firstItem`, `firstAttribute`, `relation`, etc. We can use the properties to create or modify constraints in code at any point.

Like you would control drag an element you can control drag a constraint to create an outlet. Navigate to the constraintof interest document outline within the storyboard file.

{% highlight swift linenos %}
@IBOutlet weak var labelTrailingConstraint: NSLayoutConstraint!

override func viewWillLayoutSubviews() {
    labelTrailingConstraint.constant = 50.0
}
{% endhighlight %}

It is important to note that this is an expensive operation so only modify constraints like this when you really need to. It's expensive because Interface Builder has to update all of the other frames.

## Adding Constraints in Code

It is possible to add constraints in code:

{% highlight swift linenos %}
import UIKit

class ViewController: UIViewController {

  let orangeView = UIView()
  
  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view, typically from a nib.
    
    orangeView.backgroundColor = UIColor(red: 255/255.0, green: 148/255.0, blue: 0/255.0, alpha: 1.0)
    view.addSubview(orangeView)
  }
  
  override func viewWillLayoutSubviews() {
    setupOrangeViewConstraints()
  }
  
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
  func setupOrangeViewConstraints() {
    orangeView.translatesAutoresizingMaskIntoConstraints = false
    
    let orangeViewCenterXConstraint = NSLayoutConstraint(item: orangeView, attribute: .centerX, relatedBy: .equal, toItem: view, attribute: .centerX, multiplier: 1.0, constant: 0.0)
    let orangeViewBottomSpaceConstraint = NSLayoutConstraint(item: orangeView, attribute: .bottom, relatedBy: .equal, toItem: view, attribute: .bottomMargin, multiplier: 1.0, constant: -50.0)
    let orangeViewHeightConstraint = NSLayoutConstraint(item: orangeView, attribute: .height, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1.0, constant: 57.0)
    let orangeViewWidthConstraint = NSLayoutConstraint(item: orangeView, attribute: .width, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1.0, constant: 200.0)
    
    view.addConstraints([orangeViewCenterXConstraint, orangeViewBottomSpaceConstraint, orangeViewHeightConstraint, orangeViewWidthConstraint])
  }


}
{% endhighlight %}

#### Another example:

{% highlight swift linenos %}
class MyViewController: UIViewController {
  let sampleView = UIView()

  override func viewDidLoad() {
    super.viewDidLoad()
    view.addSubview(sampleView)
  }

  override func viewWillLayoutSubviews() {
    super.viewWillLayoutSubviews()
    sampleView.translatesAutoresizingMaskIntoConstraints = false

    let sampleViewHeightConstraint = NSLayoutConstraint(item: sampleView, attribute: .height, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1.0, constant: 50.0)
    let sampleViewWidthConstraint = NSLayoutConstraint(item: sampleView, attribute: .width, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1.0, constant: 50.0)
    let sampleViewCenterXConstraint = NSLayoutConstraint(item: sampleView, attribute: .centerX, relatedBy: .equal, toItem: view, attribute: .centerX, multiplier: 1.0, constant: 0.0)
    let sampleViewCenterYConstraint = NSLayoutConstraint(item: sampleView, attribute: .centerY, relatedBy: .equal, toItem: view, attribute: .centerY, multiplier: 1.0, constant: 0.0)

    view.addConstraints([
      sampleViewWidthConstraint,
      sampleViewHeightConstraint,
      sampleViewCenterXConstraint,
      sampleViewCenterYConstraint
    ])
  }
}
{% endhighlight %}

## Layout Guides

Prior to iOS, content could not go under the navigation bar or status bar. The reason for this behavior was that with flat interfaces, allowing the content to go under the navigation elements would create a perception of depth. But by allowign the content to go all the way to the edges of the interface, if we pin to the top margins, by default the content now sits under the status bar or a potential nav bar. To account for this, a manual solution would involve determinging what UI elements exist at the top of the screen, calculating the height of those elements, and then adding that height to your view offsets to position things correctly. This is nightmarishly inefficient.

Thankfully, apple introduced the concept of a <a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/AutolayoutPG/WorkingwithConstraintsinInterfaceBuidler.html#//apple_ref/doc/uid/TP40010853-CH10-SW3">layout guide</a>.

Note that you can only do this programmatically. This means you will have errors in Interface Builder. No fear. You can get rid of these errors by creating a restraint, but selecting "remove at build time". This will remove the errors.

Add the views as outlets by controll dragging in assistant editor and giving them a name. Something like:

{% highlight swift linenos %}
@IBOutlet weak var firstView: UIView!
@IBOutlet weak var secondView: UIView!
@IBOutlet weak var thirdView: UIView!
@IBOutlet weak var fourthView: UIView!
{% endhighlight %}

In order to equally space out the views we will create "dummy" views that can be placed between the actual views and set the heights to be equal.

{% highlight swift linenos %}
import UIKit

class ViewController: UIViewController {

  @IBOutlet weak var firstView: UIView!
  @IBOutlet weak var secondView: UIView!
  @IBOutlet weak var thirdView: UIView!
  @IBOutlet weak var fourthView: UIView!
  
  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view, typically from a nib.
    setupConstraints()
  }
  
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }

  func setupConstraints() {
    let topLayoutGuide = UILayoutGuide()
    let centerLayoutGuide = UILayoutGuide()
    let bottomLayoutGuide = UILayoutGuide()
    
    view.addLayoutGuide(topLayoutGuide)
    view.addLayoutGuide(centerLayoutGuide)
    view.addLayoutGuide(bottomLayoutGuide)
    
    let firstViewToTopGuideConstraint = NSLayoutConstraint(item: firstView, attribute: .bottom, relatedBy: .equal, toItem: topLayoutGuide, attribute: .top, multiplier: 1.0, constant: 0.0)
    let secondViewToTopGuideConstraint = NSLayoutConstraint(item: secondView, attribute: .top, relatedBy: .equal, toItem: topLayoutGuide, attribute: .bottom, multiplier: 1.0, constant: 0.0)
    let secondViewToBottomGuideConstraint = NSLayoutConstraint(item: secondView, attribute: .bottom, relatedBy: .equal, toItem: centerLayoutGuide, attribute: .top, multiplier: 1.0, constant: 0.0)
    let thirdViewToCenterGuideConstraint = NSLayoutConstraint(item: thirdView, attribute: .top, relatedBy: .equal, toItem: centerLayoutGuide, attribute: .bottom, multiplier: 1.0, constant: 0.0)
    let thirdViewToBottomGuideConstraint = NSLayoutConstraint(item: thirdView, attribute: .bottom, relatedBy: .equal, toItem: bottomLayoutGuide, attribute: .top, multiplier: 1.0, constant: 0.0)
    let fourthViewToBottomGuideConstraint = NSLayoutConstraint(item: fourthView, attribute: .top, relatedBy: .equal, toItem: bottomLayoutGuide, attribute: .bottom, multiplier: 1.0, constant: 0.0)
    let topGuideHeightConstraint = NSLayoutConstraint(item: topLayoutGuide, attribute: .height, relatedBy: .equal, toItem: centerLayoutGuide, attribute: .height, multiplier: 1.0, constant: 0.0)
    let centerGuideHeightConstraint = NSLayoutConstraint(item: centerLayoutGuide, attribute: .height, relatedBy: .equal, toItem: bottomLayoutGuide, attribute: .height, multiplier: 1.0, constant: 0.0)

    view.addConstraints([
      firstViewToTopGuideConstraint,
      secondViewToTopGuideConstraint,
      secondViewToBottomGuideConstraint,
      thirdViewToCenterGuideConstraint,
      thirdViewToBottomGuideConstraint,
      fourthViewToBottomGuideConstraint,
      topGuideHeightConstraint,
      centerGuideHeightConstraint])
  }
}
{% endhighlight %}

Note that this is a TON of boilerplate code that is now "unnecessary".

## Layout Anchors 

Creating constraints in code has many advantages, but at the end of the day it is quite verbose and cumbersome. A recent addition to the Auto Layout API makes creating constraints in code much easier using <a href="https://developer.apple.com/library/ios/documentation/AppKit/Reference/NSLayoutAnchor_ClassReference/">layout anchors</a>.

With the `NSLayoutAnchor` class, instead of creating constraints directly, as we've been doing with `NSLayoutConstraint` we use an anchor property exposed on a view, or layout guide to create a constraint.

This could look something like the following:

{% highlight swift linenos %}
import UIKit

class MyViewController: UIViewController {
  
  let blueView = UIView()
  let greenView = UIView()
  
  override func viewDidLoad() {
    super.viewDidLoad()
    view.addSubview(greenView)
    view.addSubview(blueView)
  }
  
  override func viewWillLayoutSubviews() {
    super.viewWillLayoutSubviews()
    blueView.translatesAutoresizingMaskIntoConstraints = false
    greenView.translatesAutoresizingMaskIntoConstraints = false
    
    NSLayoutConstraint.activate([
      NSLayoutConstraint(item: blueView, attribute: .height, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1.0, constant: 100.0),
      NSLayoutConstraint(item: blueView, attribute: .width, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1.0, constant: 150.0),
      NSLayoutConstraint(item: blueView, attribute: .left, relatedBy: .equal, toItem: view, attribute: .leftMargin, multiplier: 1.0, constant: 8.0),
      NSLayoutConstraint(item: blueView, attribute: .top, relatedBy: .equal, toItem: self.topLayoutGuide, attribute: .bottom, multiplier: 1.0, constant: 8.0),
      NSLayoutConstraint(item: blueView, attribute: .right, relatedBy: .equal, toItem: view, attribute: .rightMargin, multiplier: 1.0, constant: -8.0)
      ])
    
    NSLayoutConstraint.activate([
      greenView.bottomAnchor.constraint(equalTo: blueView.bottomAnchor, constant: 8.0),
      greenView.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 8.0),
      greenView.rightAnchor.constraint(equalTo: view.rightAnchor, constant: -8.0),
      greenView.heightAnchor.constraint(equalToConstant: 75.0)
    ])
  }
}
{% endhighlight %}

## Views Dictionary and Format Strings

Constraints in code make it very simple to layout our views, but it's still often more cumbersome than Interface Builder because we have to write out a line of code for every single constraint. 

It's possible to write multiple constraints in one go using Auto Layout's visual format language.

Text based visual strings, or ASCII Art, is art made out of characters found in the ASCII standard. This method of writing constraints is known as a visual format language. It uses a text string to describe a layout.

Auto Layout will perform string substitution and replace this "ASCII Art" with values defined in dictionaries.

{% highlight swift linenos %}
import UIKit

class ViewController: UIViewController {

  let orangeView = UIView()
  let purpleView = UIView()
  let blueView = UIView()
  
  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view, typically from a nib.
    orangeView.backgroundColor = UIColor(red: 255/255.0, green: 148/255.0, blue: 0.0, alpha: 1.0)
    purpleView.backgroundColor = UIColor(red: 187/255.0, green: 44/255.0, blue: 162/255.0, alpha: 1.0)
    blueView.backgroundColor = UIColor(red: 122/255.0, green: 206/255.0, blue: 255/255.0, alpha: 1.0)
    
    orangeView.translatesAutoresizingMaskIntoConstraints = false
    purpleView.translatesAutoresizingMaskIntoConstraints = false
    blueView.translatesAutoresizingMaskIntoConstraints = false
    
    view.addSubview(orangeView)
    view.addSubview(purpleView)
    view.addSubview(blueView)
    
    let views: [String: AnyObject] = [
      "orangeView": orangeView,
      "purpleView": purpleView,
      "blueView": blueView,
      "topLayoutGuide": self.topLayoutGuide,
    ]
    
    let metrics: [String: AnyObject] = [
      "orangeViewWidth": 200,
      "orangeViewHeight": 57,
      "standardOffset": 8,
      "bottomSpaceOffset": 50,
    ]
    
    view.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:[orangeView(orangeViewWidth)]", options: [], metrics: metrics, views: views))
    
    orangeView.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
    
    view.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:[topLayoutGuide]-standardOffset-[purpleView]-standardOffset-[orangeView(orangeViewHeight)]-bottomSpaceOffset-|", options: [], metrics: metrics, views: views))
    view.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:[topLayoutGuide]-standardOffset-[blueView]-standardOffset-[orangeView]", options: [], metrics: metrics, views: views))
    view.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-standardOffset-[purpleView(==blueView)]-standardOffset-[blueView]-standardOffset-|", options: [], metrics: metrics, views: views))
  
  }

  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
}
{% endhighlight %}

To represent the `superView` in a format string, we use the pipe character, `|`. If the pipe is a the beginning, it refers to the leading edge, if it is at the end it represents the trailing edge.

The hyphen, `-`, on its own is used to represent standard spacing. Typically, when the relation is between two views, that spacing is eight points. If it is between a view and a super view, it is twenty points. A hyphen with a constant, explicitly declares non-standard spacing.

The double equal sign, `==`, is used for equal widths or equal heights depending on the orientation of the format string. We can also use greater than or equals, `>=`, amd less than or equals, `<=`.

We can also specify priorities on values by using `@`. Such as `[orangeView(>= 150@250)]`. In that example a low priority of 250 is set allowing Auto Layout to break it easily.

Note that the options parameter specifies alignment and it does so in a manner perpendicular to the current layout orientation being defined by our format string.

The Apple docs ysed to list the visual format language as the preferred way for laying out constraints but they don't anymore. This is for the best. While visual format strings are a great way of quickly laying views, the layout anchors is a lot easier.

The other issue at least when starting out is that when our layout breaks or we have an ambiguous layout it's hard to debug things. Visual format strings create many constraints from the strings we provide. It's hard to understand what little mistakes we might be making that way.

Most of all though, it's stringly types code, and as always it's prone to errors.

#### Quiz 5

Question: Auto Layout replaces components of the format string with views and values specified in the views and metrics dictionaries.

Answer: True

Question: The standard offset value is always 8 points

Answer: False

Question: Using a visual format string, how do you specify constraints in the vertical orientation?

Answer: Starting the string with a "V"

Question: What character represents the superview?

Answer: "|"

Question: Given the following constraint, what is the width of the `blackView?` `"H:|-8-[blackView(==blueView@250)]-8-[blueView]-8-|"`

Answer: The width of the `blueView`.

