---
layout: article

permalink: /notes/object-oriented-swift/

title: "Object Oriented Swift"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "Swift allows you to create custom data types using structures and classes. Both structures and classes achieve the same goal - they allow you to create custom data types to store and pass data around in your code, but they do this in different ways. Notes on this is found here."

categories: notes

modified: 2017-11-06
---

{% include /globalSections/toc.html %}

Swift allows you to create custom data types using structures and classes. Both structures and classes achieve the same goal - they allow you to create custom data types to store and pass data around in your code, but they do this in different ways.

## Introduction to Structs

A structure or `struct` is a flexible data type that allows you to group together related values and model them as a unit.

When creating a `struct` you do not use camelCase, or lower case camelCase. Instead it is common that the name be capotalized as well as the first letter subsequent words. Such as `PointOfSomething`. This is referred to as upper case CamelCase.

{% highlight swift linenos %}
struct Point {

}
{% endhighlight %}

A `struct` can define constants or variables which we call properties to store values. Inside the body of the `struct` you can create `stored properties` and define their type by the following:

{% highlight swift linenos %}
struct Point {
  let x: Int
  let y: Int
}
{% endhighlight %}

Note that we are not assigning any value to these `stored properties`. You can access these `stored properties` and assign them a value outside the `struct`:

{% highlight swift linenos %}
struct Point {
    let x: Int
    let y: Int
}
let coordinatePoint = Point(x: 0, y:0)
{% endhighlight %}

## Instances of Objects

The `struct` definition below is a "blueprint":

{% highlight swift linenos %}
struct Point {
    let x: Int
    let y: Int
}
{% endhighlight %}

The following line is called an "instance of the `struct`".

{% highlight swift linenos %}
let coordinatePoint = Point(x: 0, y:0)
{% endhighlight %}

To create an "instance of the `struct`" we start with the name of the `struct` (Point in this example) followed by an open parentheses. Essentially, this is a special sort of function.

Objects are data structures that contain pieces of information. A `struct` is an object in this sense because it is a data structure that conains information in the form of stored properties.

By creating an object called Point and adding stored properties, we've indicated that this data the x and y coordinate, work together, they are a unit.

We can access the properties that we've added using dot notation much like we can access functions. Now, this instance of Point represents a particular point in our coordinate space or map. So if we want to know the x value at that point we can simply say `coordinatePoint.x`.

Another example:

{% highlight swift linenos %}
struct User {
    let name: String
    var email: String
}
let student = User(name: "matthew", email: "mail@address.com")
student.name
{% endhighlight %}

Another example:

{% highlight swift linenos %}
struct Book {
  let title: String
  let author: String
  let price: Double
}
let myBook = Book(title: "Animal Farm", author: "George Orwell", price: 6.00)
{% endhighlight %}

## Methods

A <a href="https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Methods.html">method</a> is basically a function that is associated with a particular type:

{% highlight swift linenos %}
struct Point {
    let x: Int
    let y: Int
    
    /// returns the surrounding points in range of the current one
    func points(inRange range: Int = 1) {
        
        var results: [Point] = []
        
        let lowerBoundOfXRange = x - range
        let upperBoundOfXRange = x + range
        let lowerBoundOfYRange = y - range
        let upperBoundOfYRange = y + range
        
        for xCoordinate in lowerBoundOfXRange...upperBoundOfXRange {
            for yCoordinate in lowerBoundOfYRange...upperBoundOfYRange {
                let coordinatePoint = Point(x: xCoordinate, y: yCoordinate)
                results.append(coordinatePoint)
            }
        }
        
        return results
    }
}

let coordinatePoint = Point(x: 0, y:0)
coordinatePoint.x
{% endhighlight %}

Note that if you place a comment directly above a function. Xcode will make this the description of your function when you hold option and click it.

## Instance Methods

Instance methods are functions that belong to instances of a particular structure (or class, or enumeration).

The method hasn't been called yet. Once a method is called it becomes an instance:

{% highlight swift linenos %}
let coordinatePoint = Point(x: 0, y:0)
coordinatePoint.points()
let coordinatePointTwo = Point(x: 1, y:2)
coordinatePointTwo.points()
{% endhighlight %}