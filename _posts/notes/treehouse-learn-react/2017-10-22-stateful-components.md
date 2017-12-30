---
layout: article

permalink: /notes/stateful-components/

title: "React Basics - 3. Stateful Components"

subtitle: "Treehouse - Learn React"

excerpt: "In this stage you will learn how to create components that have their own internal state. This allows components to update and react to changes by updating our DOM elements."

categories: notes

date: 2017-10-22
---

{% include /globalSections/toc.html %}

In this stage you will **learn how to create components that have their own internal state**. This allows components to update and react to changes by updating our DOM elements.

## Creating a Component Class

So far we've built the scoreboard application using functional components. These functions took in some properties and returned a virtual DOM tree representing what the UI should look like for that component.

The app is missing some critical functionality right now. We can't update any of the data. We can't change the scores for a player, and we can't add or remove a player. Our UI is static because our data's static. What we need to do now is **add some state**. The way we have been writing components is in a style called **stateless functional components, or SFC**. As the name implies, this form isn't suited for handling state before we can start using state in our components. We need to rewrite them as a component class. 

>A component class is a powerful way to build a component but that power comes complexity.

It is a good idea to always start out by writing a stateless functional component and later changing it if need be. They are much easier to write and reason about than component classes.

In the below the `Counter` component has been refactored to have state. First, create the variable called Counter, and then use `React.createClass` which takes in an object. So the object that `createClass` takes is an object that will define the methods of our class. The only required method for us to define is the `render` method. This method is much like the stateless functional components that we've been writing, in that it returns a virtual DOM representation for components. We'll write that by typing `render:` and it'll be a function. We can actually cut the content out of our old component and paste it into our render method. 

Finally, we have to replace `props.score` with `this.props.score`. In a component class, props is actually a property of the class itself. It does not get passed into the render function like it does in a stateless functional component.

One more thing we wanna do when translating our stateless functional component into a component class is to change how we define our props types. THe current way we're doing it will work, however when doing a component class, it's actually much easier to do props types as a property of our class. Make sure to add a comma between each of our definitions within this object. So, we can just define `prop.types`.

```javascript
var PLAYERS = [
  {
    name: "Jim Hoskins",
    score: 31,
    id: 1,
  },
  {
    name: "Andrew Chalkley",
    score: 35,
    id: 2,
  },
  {
    name: "Alena Holligan",
    score: 42,
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

var Counter = React.createClass({
  propTypes: {
    score: React.PropTypes.number.isRequired,
  },
  render: function() {
    return (
      <div className="counter">
        <button className="counter-action decrement"> - </button>
        <div className="counter-score"> {this.props.score} </div>
        <button className="counter-action increment"> + </button>
      </div>
    );
  }
});

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} />
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
  title: "Scoreboard",
}

ReactDOM.render(<Application players={PLAYERS}/>, document.getElementById('container'));
```

Now that we've changed our Counter stateless functional component into a componeent class we're prepared to add state.

#### Quiz:

---

**Question**: Which function allows you to create a new React Component Class?

**Answer**: `React.createClass()`

**Question**: Any Stateless Functional Component could be written as a Component Class.

**Answer**: True

**Question**: How would you refer to a component's name property in a Component Class?

**Answer**: `<span>{this.props.name}</span>`

**Question**: A Component Class's property types must be specified after it is defined, by assigning to `MyComponent.propTypes`.

**Answer**: False

**Question**: Which of these methods has a special meaning in a React Component Class?

**Answer**: `render()`

---

## Understanding State

>State is data in our application that can change.

Organizing and managing state in our applications is something we've been trying to solve for decades.

The more state we have and the more spread out it is, the more complex our application becomes to maintain and debug. React provides a mechanism to manage state within our components. While this is *useful*, it won't save us from overusing or misusing state. 

>React is a library for writing user interfaces, and as such, it doesn't attempt to provide tools for absolutely everything. You're encouraged to mix in other libraries to help with things like AJAX, persistence, and state management. In larger applications, you will likely want to use another library to manage your application state. A popular design pattern called Flux, is a great way to consolidate state into a manageable form. There are many libraries that implement this Flux pattern. Consider Redux, which takes the Flux pattern a bit further.

**Using the state handling mechanisms built into React is also possible.** However, as you become more comfortable with React it will be worth learning the state management tools used by the React community. Again, state is just a piece of data that changes over time. It has an initial value, and over time, events will happen to mutate that value. For example, in our score counters the score is our state. It will have an initial value of zero, then the user may click plus or minus to adjust the score.

First, we must create a state variable for our score. React component classes have a special method called `getInitialState`. If we implement this method, the value we return from it will be our initial state.

>Generally, our state is going to be an object with multiple keys in it.

We must replace `props` with `state` because we are no longer getting our score from our properties.

```javascript
var PLAYERS = [
  {
    name: "Jim Hoskins",
    score: 31,
    id: 1,
  },
  {
    name: "Andrew Chalkley",
    score: 35,
    id: 2,
  },
  {
    name: "Alena Holligan",
    score: 42,
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

var Counter = React.createClass({
  propTypes: {},
  
  getInitialState: function() {
    return {
      score: 0,
    }
  },
  
  render: function() {
    return (
      <div className="counter">
        <button className="counter-action decrement"> - </button>
        <div className="counter-score"> {this.state.score} </div>
        <button className="counter-action increment"> + </button>
      </div>
    );
  }
});

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter />
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
  title: "Scoreboard",
}

ReactDOM.render(<Application players={PLAYERS} />, document.getElementById('container'));
```

## Updating State

Now that our score is in our state we can finally change our scores in our counter component. The first thing to do is *create a new method* on our count class. Name it whatever, but here it's `incrementScore`. Here it is a function, and it can take an event, and we'll remember to put a comma after each of our method definitions. So what I want to have happen is every time somebody clicks the increment button down here to call this method. The button component has a property called `onClick`.

Native DOM components in React contain many of these `onClick` type handlers that map on to different events that could happen to an element on the page. So will attach to `onClick` and what we'll do is pass it our method called `incrementScore`. We can do this by typing `this.incrementScore`. The event listener isn't necessarily needed for this therefore we could leave off the `e` argument.

In this case since we're incrementing the score it would be the current state plus one. So what we can do is say `this.state`, so we can read from our state inside of this method handle here, score and then we'll just say plus one. In other words if we read it out loud it says we're going to set the state by saying score should be the current score plus one. The same can be done for `decrementScore`.

```javascript
var PLAYERS = [
  {
    name: "Matthew Long",
    score: 29,
    id: 1,
  },
  {
    name: "Billy",
    score: 10,
    id: 2,
  },
  {
    name: "Sheldon",
    score: 42,
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

var Counter = React.createClass({
  propTypes: {
    initialScore: React.PropTypes.number.isRequired,
  },
  
  getInitialState: function() {
    return {
      score: this.props.initialScore,
    }
  },
  
  incrementScore: function(e) {
    this.setState({
      score: (this.state.score + 1),
    });
  },

  decrementScore: function(e) {
    this.setState({
      score: (this.state.score - 1),
    });
  },
  
  render: function() {
    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
        <div className="counter-score"> {this.state.score} </div>
        <button className="counter-action increment" onClick={this.incrementScore}> + </button>
      </div>
    );
  }
});

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter initialScore={props.score} />
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
  title: "Scoreboard",
}

ReactDOM.render(<Application players={PLAYERS} />, document.getElementById('container'));
```

#### Quiz:

---

**Question**: How would you update the "color" property of a state object?

**Answer**: `this.setState({color: "blue"})`

**Question**: How should you set an initial state value for a component?

**Answer**: Write a `getInitialState` method and return the initial state values.

**Question**: The React community has several state management libraries for use with React

**Answer**: True

**Question**: When using `React.class`, you do not need to call `.bind()` on methods in order to keep the reference to "this" intact.

**Answer**: True

**Question**: Using `Element.addEventListener` is common for attaching click handlers in components

**Answer**: False

---