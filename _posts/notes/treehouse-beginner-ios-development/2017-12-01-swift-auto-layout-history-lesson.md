---
layout: article

permalink: /notes/swift-auto-layout/

title: "Swift Auto Layout"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "Auto Layout has evolved greatly since it's conception. It wasn't even a thing to begin with. Swift used hardcoded coordinates, springs, structs, frames, and more beforehand. This worked, but had repetitive code, and other headaches. Once new iOS sizes released this didn't really work. Now, Swift uses Auto Layout by default."

categories: notes

modified: 2017-12-01
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

Question:

Answer:

