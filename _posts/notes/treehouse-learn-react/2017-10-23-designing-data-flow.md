---
layout: article

permalink: /notes/designing-data-flow/

title: "React Basics - 4. Designing Data Flow"

subtitle: "Treehouse - Learn React"

excerpt: "State is one of the most difficult things to reason about in your application because it flows and changes over time. By carefully designing where we use state and how it is passed around our application, we can build a robust application that will be easy to understand and maintain."

categories: notes

date: 2017-10-23
---

{% include /globalSections/toc.html %}

State is one of the most difficult things to reason about in your application because it flows and changes over time. By carefully designing where we use state and how it is passed around our application, we can build a robust application that will be easy to understand and maintain.

## Unidirectional Data Flow

>Unidirectional data flow means all data in our applications flow in a single direction. In React it flows down the tree from parent to child. This makes tracking the score and destination easy compared to other architectures where data may be coming from many parts of the application.

Application state is the state or data in our application that is core to the functionality of the application as a while. This usually includes a list of the models and data being manipulated by the interface. If we were to reload our application, the Application state is what we would would like to persist the most.

>Local component state is the state that is used to allow a component to function. Local component state is typically not used by other components in the application, and is less important to persist if the application resists.

## Restructuring State

Our application currently has one stateful component, our counter. This is actually not a great structure for our application as a whole. It was good for educational purposes to demonstrate a simple stateful component. However, the state of our counter is really our player's score. By keeping it stuck in the counter, it makes it difficult to read and use our player scores from other parts of the application.

First, create a function called counter. It takes props just like any other functional component. Then we can copy the content of our render function and place it into our counter. Remember that anywhere we used our `state.score`, we need to change it to `props`.

Now, instead of handling increment and decrement score from this, we'll actually be creating new `props` that will handle it higher up in our application. For now, we're going to remove these `onClick` handlers. Then we'll work on how we communicate later. We can move `propTypes` up as well as create a function for `defaultProps`.

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

  
var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },
  
  getDefaultProps: function() {
    return {
      title: "Scoreboard",
    };
  },
  
  getInitialState: function() {
    return {
      players: this.props.initialPlayers,
    };
  },
  
  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} />
      
        <div className="players">
          {this.state.players.map(function(player) {
            return <Player name={player.name} score={player.score} key={player.id} />
          })}
        </div>
      </div>
    );
  },
})

ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));
```

#### Quiz:

---

**Question**: In a React application, components commonly communicate with their children by calling methods on them.

**Answer**: False

**Question**: How does data flow in a React application?

**Answer**: From parent to child via properties.

**Question**: Application State is defined as state needed locally for a component to serve its function.

**Answer**: False

**Question**: We usually want to concentrate our application state high in our virtual DOM tree.

**Answer**: True

**Question**: How do we communicate events up through the DOM tree in a standard React application?

**Answer**: Provide callback functions as properties to components.

---

## Communicating Events

>While data flows down, events and communication flows up. This completes the loop of events that can change data bubbling up and the updated state data flowing back down to be displayed.

In order to design how data flows upwards while data continues to flow downwards. In order to design how data flows upwards through our components, we need to think about each component and its responsibilities. Our counter for instance has a score passed to it by the parent, but ti also includes buttons intended to change that score. First thing, we'll do is add it to our `PropTypes` for counter. We'll say `onChange`, and the type for this is `react.PropTypes.func` and we'll say it `isRequired`. As you can see when adding anonymous functions you may have to use `.bind(this)` to the function if `this` has already been used in a previous anonymous function.

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

function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={function() {props.onChange(-1);}}> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={function() {props.onChange(+1);}}> + </button>
    </div>
  );
}
  
Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}
  
function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange}/>
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
};

  
var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },
  
  getDefaultProps: function() {
    return {
      title: "Scoreboard",
    };
  },
  
  getInitialState: function() {
    return {
      players: this.props.initialPlayers,
    };
  },
  
  onScoreChange: function(index, delta) {
    this.state.players[index].score += delta;
    this.setState(this.state);
  },
  
  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} />
      
        <div className="players">
          {this.state.players.map(function(player, index) {
            return (
              <Player
                onScoreChange={function(delta) {this.onScoreChange(index, delta)}.bind(this)}
                name={player.name} 
                score={player.score} 
                key={player.id} />
            );
          }.bind(this))}
        </div>
      </div>
    );
  },
})

ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));
```

## Building the Statistics Component

Now that we have our state consolidated in a single place, we can use it to build more components. So far it may seem like we did a lot of code for very little benefit. Our code up until now functions the same as it did in the early stages. One issue on how it was before is keeping score value in the counter components state locally: What if we wanted to put the total score of all players in the header? How would we collect that data from each counter? We don't really have a way to do that in the old structure. The information of the score was trapped in the counter component and any of the counter's children. Its data couldnt be used in parents of the counter, siblings of the counter, or relatives of the counter that require moving upwards in the tree. Now our data is at the top of our application. So getting the total score is pretty straightforward. Start by building a new component into our header that gives us some statistics. Do this by creating a new stateless component called `Stats`. **Note that you must include a `tbody` if you are using a `table` with React. This is because if you create a `table` the `tbody` will be automatically created by the browser.** Basically, we want the length of the array of players to be the number of players. Create a variable to get this: `var totalPlayers = props.players.length;`. In order to get the total amount of points we can use the `reduce` function. The first time it gets called the total will be set to `0` which is what is passed as the second argument to `reduce`.

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

function Stats(props) {
  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce(function(total, player) {
    return total + player.score;
  }, 0);
  
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  );
}
  
Stats.protoTypes = {
  players: React.PropTypes.array.isRequired,
};

function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players}/>
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired,
};

function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={function() {props.onChange(-1);}}> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={function() {props.onChange(+1);}}> + </button>
    </div>
  );
}
  
Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}
  
function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange}/>
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
};

  
var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },
  
  getDefaultProps: function() {
    return {
      title: "Scoreboard",
    };
  },
  
  getInitialState: function() {
    return {
      players: this.props.initialPlayers,
    };
  },
  
  onScoreChange: function(index, delta) {
    this.state.players[index].score += delta;
    this.setState(this.state);
  },
  
  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players} />
      
        <div className="players">
          {this.state.players.map(function(player, index) {
            return (
              <Player
                onScoreChange={function(delta) {this.onScoreChange(index, delta)}.bind(this)}
                name={player.name} 
                score={player.score} 
                key={player.id} />
            );
          }.bind(this))}
        </div>
      </div>
    );
  },
})

ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));
```

## Adding Players to the Scoreboard

An input form thats controlled when its value is passed to it by the parent component. This requires us to update the passed value when it changes by listening for the `onChange` event of the input component.

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

var nextId = 4;
  
var AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },
  
  getInitialState: function() {
    return {
      name: "",
    };
  },
  
  onNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  
  onSubmit: function(e) {
    e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({name: ""});
  },
  
  
  render: function() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange}/>
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  },
});
  
function Stats(props) {
  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce(function(total, player) {
    return total + player.score;
  }, 0);
  
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  );
}
  
Stats.protoTypes = {
  players: React.PropTypes.array.isRequired,
};

function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players}/>
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired,
};

function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={function() {props.onChange(-1);}}> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={function() {props.onChange(+1);}}> + </button>
    </div>
  );
}
  
Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}
  
function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>✖</a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange}/>
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};

  
var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },
  
  getDefaultProps: function() {
    return {
      title: "Scoreboard",
    };
  },
  
  getInitialState: function() {
    return {
      players: this.props.initialPlayers,
    };
  },
  
  onScoreChange: function(index, delta) {
    this.state.players[index].score += delta;
    this.setState(this.state);
  },
    
  onPlayerAdd: function(name) {
    console.log('Player added:', name);
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId,
    });
    this.setState(this.state);
    nextId += 1;
  },
  
  onRemovePlayer: function(index) {
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },
    
  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players} />
      
        <div className="players">
          {this.state.players.map(function(player, index) {
            return (
              <Player
                onScoreChange={function(delta) {this.onScoreChange(index, delta)}.bind(this)}
                onRemove={function() {this.onRemovePlayer(index)}.bind(this)}
                name={player.name} 
                score={player.score} 
                key={player.id} />
            );
          }.bind(this))}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd} />
      </div>
    );
  },
})

ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));
```

#### Quiz:

---

**Question**: The state called "name" in our AddPlayerForm component would be considered

**Answer**: Local Component State

**Question**: Where does all of our application state live?

**Answer**: Application

**Question**: How do we define a property called onChange is a required function for a Counter component?

**Answer**: Counter.propTypes = `{ onChange: React.PropTypes.func.isRequired }`

**Question**: Which of the following components in our Application currently holds state?

**Answer**: AddPlayerForm

**Question**: All state is contained in Application currently?

**Answer**: False

---