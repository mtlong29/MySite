---
layout: article

permalink: /notes/thinking-in-components/

title: "React Basics - 2. Thinking in Components"

subtitle: "Treehouse - Learn React"

excerpt: "Components are the core building blocks of a React application. Being able to break your application up into reusable and composable components is critical to building scalable React applications."

categories: notes

date: 2017-10-21
---

{% include /globalSections/toc.html %}

**Components are the core building blocks of a React application.** Being able to break your application up into reusable and composable components is critical to building scalable React applications.

## Mocking up our Application

This application is a simple scoreboard that allows you to add and remove players, keep each player score by increasing or decreasing a score counter, and accumulate the total number of players and points as well. It will even contain a simple stopwatch that can be used to keep track of turn time.

Before adding dynamic content to an application it's a good idea to mock up your application first using static content and JSX. In this process ignore the dynamic portions of the application and focus on the markup we ultimately want to produce.

```javascript
function Application() {
  return (
    <div className="scoreboard">
    
      <div className="header">
        <h1>Scoreboard</h1>
      </div>
    
      <div className="players">
        <div className="player">
          <div className="player-name">Matthew Long</div>
          <div className="player-score">
            <div className="counter">
              <button className="counter-action decrement"> - </button>
              <div className="counter-score"> 31 </div>
              <button className="counter-action increment"> + </button>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
}

ReactDOM.render(<Application />, document.getElementById('container'));
```

>Note that classes use the attribute `className` instead of `class`. This is because `class` is a reserved keyword in JavaScript.

Most style guides will recommend putting your values in double quotes. Though single quotes will be valid, we'll be using double quotes for our properties.

## Properties

**In React we can use properties to customize our components.** When we define a component using a function, this function actually does take an argument. The argument is an object that contains all the properties that were used when the stance of this component was written out.

The most common name for this argument is `props`. When application is called, `props` will be an object with the key of `title` and a value of `My Scoreboard`. Now we place `props.title` in our `<h1>` element. **In order to use this we must use curly braces.** These curly braces can appear where normal content appears between tags in our code. They can also appear as the value of an attribute in a JSX tag. By wrapping this curly braces, what's inside the curly braces will now be regular JavaScript, so `props.title` will be evaluated. **We can write any JavaScript expression between these braces.**

>The big thing to remember is it has to be an expression. That is, something that returns a value. We cannot use an `if else` statement since that would be a JavaScript statement which does not evaluate to a value.

```javascript
function Application(props) {
  return (
    <div className="scoreboard">
    
      <div className="header">
        <h1>{props.title}</h1>
      </div>
    
      <div className="players">
        <div className="player">
          <div className="player-name">Matthew Long</div>
          <div className="player-score">
            <div className="counter">
              <button className="counter-action decrement"> - </button>
              <div className="counter-score"> 31 </div>
              <button className="counter-action increment"> + </button>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
}

ReactDOM.render(<Application title="My Scoreboard"/>, document.getElementById('container'));
```

## PropTypes and DefaultProps

Now that our application component has a title property it will have an empty header if we forget to pass it in. In React we can document exactly which properties our components take and what types they should be. We can even make a property required or provide a default value. This is done by assigning to our components props type property. Props types is just an object that contains all the keys a component can take, as well as a special type definition.

The first thing to do is after the application function has been declared, we can write `Application.propTypes` with a plural, equals, and then it will be an object. Each key in this object will be a property that application can take. We can access these special property types by going to `React.PropTypes` again notice the plural and notice the capital `P`. So you'll notice we defined our `PropTypes` by assigning to `Application.propTypes` with a lower case `p`.

```javascript
function Application(props) {
  return (
    <div className="scoreboard">
    
      <div className="header">
        <h1>{props.title}</h1>
      </div>
    
      <div className="players">
        <div className="player">
          <div className="player-name">Matthew Long</div>
          <div className="player-score">
            <div className="counter">
              <button className="counter-action decrement"> - </button>
              <div className="counter-score"> 31 </div>
              <button className="counter-action increment"> + </button>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
}

Application.propTypes = {
  title: React.PropTypes.string,
};

Application.defaultProps = {
  title: "Best Scoreboard",
}

ReactDOM.render(<Application/>, document.getElementById('container'));
```

If it's not a default property, but still needs to be required you can add `.isRequired`. This would look like `title: React.PropTypes.string.isRequired`.

Y>ou will see errors in the console if anything is wrongly defined or left out.

#### Quiz:

---

**Question**: You can use if / else statements inside JSX expressions.

**Answer**: False

**Question**: Props passed to a component should not be changed by that component.

**Answer**: True

**Question**: How would you assign a CSS class to a component in JSX?

**Answer**: `<div className="player">...</div>`

**Question**: `propTypes` are required on all components that take properties.

**Answer**: False

---

## Decomposing our Application

**The point of decomposition is to break down your code to make it more readable.** Having one large component is not very effective. While, having a ton of small components is also not efficient. Your goal should be finding a middle ground where your application is most readable. The act of composition is combining many smaller or simpler pieces to create a large piece. It is often the case that decomposition occurs during development.

```javascript
function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
};

function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement"> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment"> + </button>
    </div>
  );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
}

function Player(props) {
  return (
    <div className="players">
      <div className="player">
        <div className="player-name">{props.name}</div>
        <div className="player-score">
          <Counter score={props.score}/>
        </div>
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
};

function Application(props) {
  return (
    <div className="scoreboard">
      <Header title={props.title} />
      <Player name="Matthew Long" score={29} />
      <Player name="Billy" score={42} />
    </div>
  );
}

Application.propTypes = {
  title: React.PropTypes.string,
};

Application.defaultProps = {
  title: "Best Scoreboard",
}

ReactDOM.render(<Application/>, document.getElementById('container'));
```

## Loops and Lists in JSX

One way to improve the current application is how players are placed into the application. We currently have two *hardcoded* player components. It would be nice if we could have an array or `player` and render a player component of each of those. 

Start by creating a variable at the top of the script to act as our initial player code. The array will contain multiple objects. Each object will have a name and a score. In order to display it we can't write a simple `for` loop because it is a statement not an expression. Instead we'll use the map function of the array. The map method takes a function itself. This function will take each of our players that's in the players array. Our map function will map a player object onto a player component. And what will ultimately be returned in this outer expression is an array of player components. 

In a React JSX expression, an array of components will simply be rendered in the DOM one after the other, like a list.

```javascript
var PLAYERS = [
  {
    name: "Matthew Long",
    score: 29,
    id: 1,
  },
  {
    name: "Billy",
    score: 42,
    id: 2,
  },
  {
    name: "Sheldon",
    score: 35,
    id: 3,
  },
];

function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
};

function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement"> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment"> + </button>
    </div>
  );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
}

function Player(props) {
  return (
      <div className="player">
        <div className="player-name">{props.name}</div>
        <div className="player-score">
          <Counter score={props.score}/>
        </div>
      </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
};

function Application(props) {
  return (
    <div className="scoreboard">
      <Header title={props.title} />
      <div className="players">
        {props.players.map(function(player) {
          return <Player name={player.name} score={player.score} key={player.id} />
        })}
      </div>
    </div>
  );
}

Application.propTypes = {
  title: React.PropTypes.string,
  players: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    id: React.PropTypes.number.isRequired,
  })).isRequired,
};

Application.defaultProps = {
  title: "Best Scoreboard",
}

ReactDOM.render(<Application players={PLAYERS} />, document.getElementById('container'));
```

Note that the players array and each object also has a property of id. This helps fix an error that says warning: each child in an array or iterator must have a uniqe key prop. Check the render method of Application.

#### Quiz:

---

**Question**: You can use a JavaScript `for` loop to iterate over items inside a JSX expression.

**Answer**: False

**Question**: Which property is required on components generated in a loop?

**Answer**: key

**Question**: Which function allows you to create a list of JSX elements from an array of JavaScript values?

**Answer**: `array.map`

**Question**: When should we break a component into smaller components?

**Answer**: When the component has too much markup, when the component does too many things, and when the component is reused

---