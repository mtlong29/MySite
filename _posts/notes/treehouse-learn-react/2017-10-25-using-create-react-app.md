---
layout: article

permalink: /notes/using-create-react-app/

title: "Using Create React App"

subtitle: "Treehouse - Learn React"

excerpt: "Notes on using create react app. Create React App lets you quickly set up React projects."

categories: notes

date: 2017-10-25
---

{% include /globalSections/toc.html %}

**Create React App is a tool built by developers at Facebook to help you build React applications.** It saves you from time-consuming setup and configuration. You simply run one command and Create React App sets up the tools you need to start your React project.

## Installing and Using Create React App

>First, install Create React App globally by typing `npm install -g create-react-app`. Once it is installed you can create a new app by typing `create-react-app <folder-name>`.

Once you run this, it will display a few things in the console that will give you guidance on where to begin. For example, it tells you that you should navigate to your project directory and then start the test the test server using `npm start`. This will automatically launch your app in the browser at `localhost:3000`. It also provides you LAN address so you can access the app on a mobile device on the same network. It will also tell you that the development build is not optimized for production and you should run `npm run build` for that.

### Exploring the Project Structure and Files

>Create-react-app generates only the files you need to start your React project.

You don't have access to configuration files for Webpack, Babel, ESLint, or even see a bundle.js file. Most of the files we're going to be working with are located in the `src` folder.

For example, `app.js` is currently the main wrapper component of the app. It's importing `App.css`, which contains styles specific to the app component, and the `logo.svg` you'll see at the top of the page. The apps HTML template file is found in `index.html`.

## Customizing Your Project

You will usually delete most of the code in the `App.js` file and add your own code. You can also often delete the `App.css` and `logo.svg` files because you will use your own styles and logo. 

When copying in components or writing your own if an error has occurred it will display nicely in the browser! This is a great feature, it's better than having to decipher what an error that is outputted to the console.

### react-bootstrap

[Bootstrap has been made into React components](https://react-bootstrap.github.io/). In order to use these you must first install it and require it. Install it by typing `npm install --save react-bootstrap`. You then must require it in your app:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

>In order to actually use these components you have to import them. For example, `<Jumbotron>` must be imported or you will get an error stating `'Jumbotron' is not defined  react/jsx-no-undef`:

```javascript
import React, { Component } from 'react';
import { Jumbotron, Grid } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <Grid>
            <h1>Search App</h1>
            <p>This is a simple search app!</p>
          </Grid>  
        </Jumbotron>
      </div>
    );
  }
}

export default App;
```

### Components

>It is good practice to put your components in a folder inside the `src` folder. Call it `components`. Then you can place all of your components inside this folder such that: `src/components/SearchForm`.

**You will have to import React inside these components as well.** Don't forget to import any bootstrap elements you use as well. Don't forget to export the SearchForm and then import it on `App.js`.

#### SearchForm.js

```javascript
import React from "react";
import { 
  Form, 
  FormGroup, 
  FormControl, 
  Button 
} from "react-bootstrap";

const SearchForm = () => (
  <Form inline>
    <FormGroup controlId="formInlineEmail">
      <FormControl type="search" placeholder="enter something..." />
    </FormGroup>
    {' '}
    <Button type="submit">
      search
    </Button>
  </Form>
);

export default SearchForm;
```

#### App.js

```javascript
import React, { Component } from 'react';
import { Jumbotron, Grid } from "react-bootstrap";
import SearchForm from './components/SearchForm';

class App extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <Grid>
            <h1>Search App</h1>
            <p>This is a simple search app!</p>
            <SearchForm />
          </Grid>  
        </Jumbotron>
      </div>
    );
  }
}

export default App;
```

## Next Steps with Create React App

>Create React App has built-in scripts available for running tests, building your app for productions, and ejecting out of its default setup.

### React Test

>The [Jest](https://facebook.github.io/jest/docs/en/tutorial-react.html) is a JavaScript unit testing that Create React App already has configured. The file is named `App.test.js` and comes shipped with the following:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
```

To run these tests simply enter `npm test` in the console. It runs in watch mode as well.

### Build App

>When you're ready to export your application for production you can run the command `npm run build`. This will create a folder named `build` that has configured your files such that they can be read by any modern browser.

### Eject

If you want to build your app or configure it differently you can run `npm run eject`. However, once this is done it is impossible to go back. This is a one way command. Once you have done this a `config` folder is created that lists all of the configurations you can now make that was taken care of before. The only case in which you need to eject is when a dependency demands that you also change the build tool chain. For example, if a dependency enforces use of CSS Modules or can't work without a Babel login. In that case you would need to eject.