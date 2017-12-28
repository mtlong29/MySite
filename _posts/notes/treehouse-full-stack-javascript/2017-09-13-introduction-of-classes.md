---
layout: article

permalink: /notes/introduction-to-classes/

title: "Introduction to Classes"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "JavaScript classes, introduced in ECMAScript 2015, are primarily syntactical sugar over JavaScript's existing prototype-based inheritance. The class syntax is not introducing a new object-oriented inheritance model to JavaScript. JavaScript classes provide a much simpler and clear syntax to create objects and deal with inheritance."

categories: notes

date: 2017-09-13
---

{% include /globalSections/toc.html %}

**JavaScript classes, introduced in ECMAScript 2015, are primarily syntactical sugar over JavaScript's existing prototype-based inheritance.** The class syntax is **not introducing a new object-oriented inheritance model to JavaScript**. JavaScript classes provide a **much simpler and clear syntax to create objects and deal with inheritance**.

## Structure of Classes

>Classes are common feature of MANY object oriented programming languages such as (Java, Python, RoR, PHP, etc.). 

```javascript
'use strict';

let Student = function(data) {
  this.name = data.name;
  this.age = data.age;
}

let joey = new Student({ name: 'Joey', age: 25 });
let sarah = new Student({ name: 'Sarah', age: 22 });

console.log(joey);
console.log(sarah);
// Student {name: 'Joey', age: 25}
// Student {name: 'Sarah', age: 22}
```

```javascript
'use strict';

class Student {
  constructor(data) {
    this.name = data.name;
    this.age = data.age;
  }
}

let joey = new Student({ name: 'Joey', age: 25 });
let sarah = new Student({ name: 'Sarah', age: 22 });

console.log(joey);
console.log(sarah);
// Student {name: 'Joey', age: 25}
// Student {name: 'Sarah', age: 22}
```

```javascript
'use strict';

class Student {
  constructor({name, age, interestLevel = 5} = {}) {
    this.name = name;
    this.age = age;
    this.interestLevel = interestLevel;
  }
}

let joey = new Student({ name: 'Joey', age: 25 });
let sarah = new Student({ name: 'Sarah', age: 22 });

console.log(joey);
console.log(sarah);
// Student {name: 'Joey', age: 25, interestLevel: 5}
// Student {name: 'Sarah', age: 22, interestLevel: 5}
```

```javascript
'use strict';

class Student {
  constructor({name, age, interestLevel = 5} = {}) {
    this.name = name;
    this.age = age;
    this.interestLevel = interestLevel;
    this.grades = new Map();
  }
}

let joey = new Student({ name: 'Joey', age: 25 });
let sarah = new Student({ name: 'Sarah', age: 22 });

sarah.grades.set('History', 'B');
sarah.grades.set('Math', 'A');

console.log(joey);
console.log(sarah);
// Student {name: 'Joey', age: 25, interestLevel: 5}
// Student {name: 'Sarah', age: 22, interestLevel: 5, grades: Map {'History' => 'B', 'Math' => 'A'}}
```

## Sub-Classes

Classes can easily inherit properties from other classes. You can add new features to a class by extending another class.

```javascript
'use strict';

class Person {
  dance() {
    const dances = [
      'waltz',
      'tango',
      'mambo',
      'foxtrot'
    ];
    console.log(`${this.name} is doing the ${dances[Math.floor(Math.random() * dances.length)]}!`);
  }
  constructor({ name, age, eyeColor = 'brown' } = {}) {
    this.name = name;
    this.age = age;
    this.eyeColor = eyeColor;
  }
}

let stevenJ = new Person({ name: 'Steven', age: 22 });
stevenJ.dance();
// Steven is doing the waltz!
```

```javascript
'use strict';

class Person {
  dance() {
    const dances = [
      'waltz',
      'tango',
      'mambo',
      'foxtrot'
    ];
    console.log(`${this.name} is doing the ${dances[Math.floor(Math.random() * dances.length)]}!`);
  }
  constructor({ name, age, eyeColor = 'brown' } = {}) {
    this.name = name;
    this.age = age;
    this.eyeColor = eyeColor;
  }
}

class Student extends Person {
  constructor({ name, age, interestLevel = 5 } = {} ) {
    super({name, age});
    this.name = name;
    this.age = age;
    this.interestLevel = interestLevel;
    this.grades = new Map;
  }
}

let stevenJ = new Student({ name: 'Steven', age: 22, interestLevel: 3 });
stevenJ.dance();
console.log(stevenJ.interestLevel)
// Steven is doing the tango!
// 3
```

```javascript
'use strict';

class Person {
  dance() {
    const dances = [
      'waltz',
      'tango',
      'mambo',
      'foxtrot'
    ];
    console.log(`${this.name} is doing the ${dances[Math.floor(Math.random() * dances.length)]}!`);
  }
  constructor({ name, age, eyeColor = 'brown' } = {}) {
    this.name = name;
    this.age = age;
    this.eyeColor = eyeColor;
  }
}

class Student extends Person {
  dance (traditional) {
    if(traditional) {
      super.dance();
      return;
    }
    const dances = [
      'lyrical',
      'tap',
      'ballet',
      'jazz'
    ];
    console.log(`${this.name} is doing the ${dances[Math.floor(Math.random() * dances.length)]}!`);
  }
  
  constructor({ name, age, interestLevel = 5 } = {} ) {
    super({name, age});
    this.name = name;
    this.age = age;
    this.interestLevel = interestLevel;
    this.grades = new Map;
  }
}

let stevenJ = new Student({ name: 'Steven', age: 22, interestLevel: 3 });
stevenJ.dance(true);
console.log(stevenJ.interestLevel);
// Steven is doing the mambo!
// 3
```

```javascript
'use strict';

class Person {
  dance() {
    const dances = [
      'waltz',
      'tango',
      'mambo',
      'foxtrot'
    ];
    console.log(`${this.name} is doing the ${dances[Math.floor(Math.random() * dances.length)]}!`);
  }
  constructor({ name, age, eyeColor = 'brown' } = {}) {
    this.name = name;
    this.age = age;
    this.eyeColor = eyeColor;
  }
}

class Student extends Person {
  dance (traditional) {
    if(traditional) {
      super.dance();
      return;
    }
    const dances = [
      'lyrical',
      'tap',
      'ballet',
      'jazz'
    ];
    console.log(`${this.name} is doing the ${dances[Math.floor(Math.random() * dances.length)]}!`);
  }
  
  constructor({ name, age, interestLevel = 5 } = {} ) {
    super({name, age});
    this.name = name;
    this.age = age;
    this.interestLevel = interestLevel;
    this.grades = new Map;
  }
}

let stevenJ = new Student({ name: 'Steven', age: 22, interestLevel: 3 });
stevenJ.dance();
console.log(stevenJ.interestLevel);
// Steven is doing the lyrical!
// 3
```

## Static Methods

**A static method is one that exists on the class declaration and is not accessible through an instance.** You can only call the function by referencing it's calss.

```javascript
'use strict';

class Bird {
  static changeColor(color) {
    this.color = color;
  }
  constructor({ color = 'red' } = {}) {
    this.color = color;
  }
}

let redBird = new Bird;

console.log(redBird.color);
Bird.changeColor.call(redBird, 'blue');
console.log(redBird.color);
// red
// blue
```

## Getter and Setter Methods

Getter and Setter methods have long been available in objects, but now they are available in classes, too!

```javascript
'use strict';

class Student {
  
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  constructor({ firstName, lastName, age, interestLevel = 5 } = {}) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.interestLevel = interestLevel;
  }
}

let stevenJ = new Student({ firstName: 'Steven', lastName: 'Jones', age: 22});

console.log(stevenJ.name);
// Steven Jones
```

```javascript
'use strict';

class Student {
  
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  constructor({ firstName, lastName, age, interestLevel = 5 } = {}) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.interestLevel = interestLevel;
  }
}

let stevenJ = new Student({ firstName: 'Steven', lastName: 'Jones', age: 22});

console.log(stevenJ.name);

stevenJ.name = 'Steven Jones';
// Cannot set property name of #<Student> which has only a getter
```

```javascript
'use strict';

class Student {
  
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  set name(input) {
    let name = input.split(' ');
    this.firstName = name[0];
    this.lastName = name[1];
  }
  
  constructor({ firstName, lastName, age, interestLevel = 5 } = {}) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.interestLevel = interestLevel;
  }
}

let stevenJ = new Student({ firstName: 'Steven', lastName: 'Jones', age: 22});

console.log(stevenJ.name);

stevenJ.name = 'Steven Jennines';

console.log(stevenJ.name);
// Steven Jones
// Steven Jennings
```