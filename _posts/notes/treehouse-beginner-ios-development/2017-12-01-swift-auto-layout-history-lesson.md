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

 
