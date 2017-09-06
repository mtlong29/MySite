---
layout: article

permalink: /notes/dom-scripting-example/

title: "DOM Scripting Example"

subtitle: "Treehouse - Beginner JavaScript"

excerpt: "These notes contain an example for dom scripting. The example is an invitation JavaScript web application. The users can add names to a list of invitees. They can then change the name of an invitee, click confirmed, remove an invitee, and filter which invitee has confirmed."

categories: notes

modified: 2017-09-03
---

{% include /globalSections/toc.html %}

This is an example of using JavaScript with the DOM. 

These notes go over small steps, or JavaScript snippets, that are slowly added and finally at the end showing the full version. You can find the completed HTML and CSS at the end as well.

This example is of an application that allows someone to enter a persons name that is to be invited to an event. You can remove a user, change a users name, filter out people who have not confirmed their reservation, etc.

## Registering Names

This step gets users name when entered into the form. As you can see there is only one handler but we are harnessing the power of two (pressing enter and clicking submit).

{% highlight javascript linenos %}
// Registering Names
const form = document.querySelector('#registrar');
const input = form.querySelector('input');

// Registering Names
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';
  const ul = document.querySelector('#invitedList');
  const li = document.createElement('li');
  li.textContent = text;
  ul.appendChild(li);
});
{% endhighlight %}

See the following links for more information:

<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/Events/submit">The submit event</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault">preventDefault()</a></li>
</ul>

## RSVP Checkbox

{% highlight javascript linenos %}
// Registering Names
const form = document.querySelector('#registrar');
const input = form.querySelector('input');
const ul = document.querySelector('#invitedList');

// Registering Names
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';
  const li = document.createElement('li');
  li.textContent = text;
  // RSVP Checkbox
  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  li.appendChild(label); // End RSVP Checkbox
  ul.appendChild(li);
});

// Checkbox Handler -- Add Styling for when checkox is checked.
ul.addEventListener('change', (e) => {
  const checkbox = e.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;
  if (checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
});
{% endhighlight %}

## Removing Names

What if users make a mistake and want to remove a name? The following is adds a button to each list item to delete it. 

{% highlight javascript linenos %}
// Registering Names
const form = document.querySelector('#registrar');
const input = form.querySelector('input');
const ul = document.querySelector('#invitedList');

// Create List Items For Invitees
const createLI = text => {
  const li = document.createElement('li');
  li.textContent = text;
  // RSVP Checkbox
  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  li.appendChild(label); // End RSVP Checkbox
  // Removing Names
  const button = document.createElement('button');
  button.textContent = 'remove';
  li.appendChild(button);  // End Removing Names
  return li;
}

// Registering Names
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';
  const li = createLI(text);
  ul.appendChild(li);
});

// Checkbox Handler -- Add Styling for when checkox is checked.
ul.addEventListener('change', (e) => {
  const checkbox = e.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;
  if (checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
});

// Removing Names
ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const li = e.target.parentNode;
    const ul = li.parentNode;
    ul.removeChild(li);
  }
});
{% endhighlight %}

As you can see the event listener for the form was getting quite large so it was broken down into a function called `createLI();`.

There is also a delegated click handler, to allow us to set one handler for all buttons.

## Edit Names

### Planning Out How to Edit Names

The first steps of adding the eadit names feature can be seen below.

{% highlight javascript linenos %}
// Registering Names
const form = document.querySelector('#registrar');
const input = form.querySelector('input');
const ul = document.querySelector('#invitedList');

// Create List Items For Invitees
const createLI = text => {
  const li = document.createElement('li');
  li.textContent = text;
  
  // RSVP Checkbox
  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  li.appendChild(label); // End RSVP Checkbox
  
  // Edit Names Button 
  const editButton = document.createElement('button');
  editButton.textContent = 'edit';
  li.appendChild(editButton);  // End Edit Names button
  
  // Removing Names Button
  const removeButton = document.createElement('button');
  removeButton.textContent = 'remove';
  li.appendChild(removeButton);  // End Removing Names Button
  
  return li;
}

// Registering Names
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';
  const li = createLI(text);
  ul.appendChild(li);
});

// Checkbox Handler -- Add Styling for when checkox is checked.
ul.addEventListener('change', (e) => {
  const checkbox = e.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;
  if (checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
});

// Button Handlers
ul.addEventListener('click', (e) => {
  
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    // Remove Names Button
    if (button.textContent === 'remove') {
      ul.removeChild(li);
    // Edit Names Button
    } else if (button.textContent === 'edit') {
      console.log('edit');
    }
  }
});
{% endhighlight %}

### Moving to Edit State

{% highlight javascript %}
// Registering Names
const form = document.querySelector('#registrar');
const input = form.querySelector('input');
const ul = document.querySelector('#invitedList');

// Create List Items For Invitees
const createLI = text => {
  const li = document.createElement('li');
  
  // Make Text Element an HTML Element
  const span = document.createElement('span');
  span.textContent = text;
  li.appendChild(span); // End Make Text Element an HTML Element
  
  // RSVP Checkbox
  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  li.appendChild(label); // End RSVP Checkbox
  
  // Edit Names Button 
  const editButton = document.createElement('button');
  editButton.textContent = 'edit';
  li.appendChild(editButton);  // End Edit Names button
  
  // Removing Names Button
  const removeButton = document.createElement('button');
  removeButton.textContent = 'remove';
  li.appendChild(removeButton);  // End Removing Names Button
  
  return li;
}

// Registering Names
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';
  const li = createLI(text);
  ul.appendChild(li);
});

// Checkbox Handler -- Add Styling for when checkox is checked.
ul.addEventListener('change', (e) => {
  const checkbox = e.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;
  if (checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
});

// Button Handlers
ul.addEventListener('click', (e) => {
  
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    // Remove Names Button
    if (button.textContent === 'remove') {
      ul.removeChild(li);
    // Edit Names Button
    } else if (button.textContent === 'edit') {
      const span = li.firstElementChild;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
      button.textContent = 'save';
    }
  }
});
{% endhighlight %}

## Moving to a Save State

{% highlight javascript linenos %}
// Registering Names
const form = document.querySelector('#registrar');
const input = form.querySelector('input');
const ul = document.querySelector('#invitedList');

// Create List Items For Invitees
const createLI = text => {
  const li = document.createElement('li');
  
  // Make Text Element an HTML Element
  const span = document.createElement('span');
  span.textContent = text;
  li.appendChild(span); // End Make Text Element an HTML Element
  
  // RSVP Checkbox
  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  li.appendChild(label); // End RSVP Checkbox
  
  // Edit Names Button 
  const editButton = document.createElement('button');
  editButton.textContent = 'edit';
  li.appendChild(editButton);  // End Edit Names button
  
  // Removing Names Button
  const removeButton = document.createElement('button');
  removeButton.textContent = 'remove';
  li.appendChild(removeButton);  // End Removing Names Button
  
  return li;
}

// Registering Names
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';
  const li = createLI(text);
  ul.appendChild(li);
});

// Checkbox Handler -- Add Styling for when checkox is checked.
ul.addEventListener('change', (e) => {
  const checkbox = e.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;
  if (checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
});

// Button Handlers
ul.addEventListener('click', (e) => {
  
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    // Remove Names Button
    if (button.textContent === 'remove') {
      ul.removeChild(li);
    // Edit Names Button
    } else if (button.textContent === 'edit') {
      const span = li.firstElementChild;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
      button.textContent = 'save';
    // Save Edited Names
    } else if (button.textContent === 'save') {
      const input = li.firstElementChild;
      const span = document.createElement('span');
      span.textContent = input.value;
      li.insertBefore(span, input);
      li.removeChild(input);
      button.textContent = 'edit';
    }
  }
});
{% endhighlight %}

## Filter Confirmed Invitees

{% highlight javascript linenos %}
// Form and Input Constants
const form = document.querySelector('#registrar');
const input = form.querySelector('input');

// Main Div Constant
const mainDiv = document.querySelector('.main');

// Main Unordered List Constant
const ul = document.querySelector('#invitedList');

// Filter Check Box Constants
const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckBox = document.createElement('input');

// Add Filter Check Box to DOM
filterLabel.textContent = "Hide those who haven't responded";
filterCheckBox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckBox);
mainDiv.insertBefore(div, ul);

// Filter Check Box Event Handler
filterCheckBox.addEventListener('change', (e) => {
  const isChecked = e.target.checked;
  const lis = ul.children;
  // Case When Filter is Checked
  if (isChecked) {
    for (let i = 0; i < lis.length; i++) {
      let li = lis[i];
      if (li.className === 'responded') {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    }
  // Case When Filter is Not Checked
  } else {
    for (let i = 0; i < lis.length; i++) {
      let li = lis[i];
      li.style.display = '';
    }
  }
});


// Create List Items For Invitees
const createLI = text => {
  const li = document.createElement('li');
  
  // Make Text Element an HTML Element
  const span = document.createElement('span');
  span.textContent = text;
  li.appendChild(span); // End Make Text Element an HTML Element
  
  // RSVP Checkbox
  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  li.appendChild(label); // End RSVP Checkbox
  
  // Edit Names Button 
  const editButton = document.createElement('button');
  editButton.textContent = 'edit';
  li.appendChild(editButton);  // End Edit Names button
  
  // Removing Names Button
  const removeButton = document.createElement('button');
  removeButton.textContent = 'remove';
  li.appendChild(removeButton);  // End Removing Names Button
  
  return li;
}

// Registering Names
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';
  const li = createLI(text);
  ul.appendChild(li);
});

// Checkbox Handler -- Add Styling for when checkox is checked.
ul.addEventListener('change', (e) => {
  const checkbox = e.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;
  if (checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
});

// Button Handlers
ul.addEventListener('click', (e) => {
  
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    // Remove Names Button
    if (button.textContent === 'remove') {
      ul.removeChild(li);
    // Edit Names Button
    } else if (button.textContent === 'edit') {
      const span = li.firstElementChild;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
      button.textContent = 'save';
    // Save Edited Names
    } else if (button.textContent === 'save') {
      const input = li.firstElementChild;
      const span = document.createElement('span');
      span.textContent = input.value;
      li.insertBefore(span, input);
      li.removeChild(input);
      button.textContent = 'edit';
    }
  }
});
{% endhighlight %}

The above JavaScript gets the job done fine. However, it is possible to refactor the existing code into better more readable code.

Notice that you only had to set the display to an empty string.

## The DOMContentLoaded Event

When a browser "reads" through an HTML page, and JavaScript it encounters is run as soon as the browser sees it. If JavaScript is written at teh top of the document, it can fail if the browser hasn't seen the elements it refers to yet. We can use the DOMContentLoaded event to solve this issue.

### Add DOMContentLoaded Event Listener

Wrap the entire JavaScript file in `document.addEventListener('DOMContentLoaded', () => {//});` so that you can place the HTML script tag anywhere. However, it is still best practice to place it right before the closing body.

See jQuery `$(document).ready(function(){//});` for similar technique.

### Refactoring One

A good place to start when refactoring is looking for places code is duplicated.

{% highlight javascript linenos %}
// Waits for HTML DOM to Load before Executing Script
document.addEventListener('DOMContentLoaded', () => {
                          
  // Form and Input Constants
  const form = document.querySelector('#registrar');
  const input = form.querySelector('input');
  
  // Main Div Constant
  const mainDiv = document.querySelector('.main');
  
  // Main Unordered List Constant
  const ul = document.querySelector('#invitedList');
  
  // Filter Check Box Constants
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');
  
  // Add Filter Check Box to DOM
  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  
  // Filter Check Box Event Handler
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    // Case When Filter is Checked
    if (isChecked) {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        if (li.className === 'responded') {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      }
    // Case When Filter is Not Checked
    } else {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        li.style.display = '';
      }
    }
  });
  
  // Create List Items For Invitees
  const createLI = text => {
    
    // Function to Create DOM Element
    const createElement = (elementName, property, value) => {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }
    
    // Function to Append Content to List Item
    const appendToLi = (elementName, property, value) => {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    } 
    
    const li = document.createElement('li');
    // Make Text Element an HTML Element
    appendToLi('span', 'textContent', text);
    // RSVP Checkbox
    appendToLi('label', 'textContent', 'Confirmed')
      .appendChild(createElement('input', 'type', 'checkbox'));
    // Edit Names Button 
    appendToLi('button', 'textContent', 'edit');
    // Removing Names Button
    appendToLi('button', 'textContent', 'remove');
    return li;
  }
  
  // Registering Names
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    const li = createLI(text);
    ul.appendChild(li);
  });
  
  // Checkbox Handler -- Add Styling for when checkox is checked.
  ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    if (checked) {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });
  
  // Button Handlers
  ul.addEventListener('click', (e) => {
    
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      // Remove Names Button
      if (button.textContent === 'remove') {
        ul.removeChild(li);
      // Edit Names Button
      } else if (button.textContent === 'edit') {
        const span = li.firstElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'save';
      // Save Edited Names
      } else if (button.textContent === 'save') {
        const input = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = 'edit';
      }
    }
  }); // End Button Handlers

}); // End Document.ready event handler
{% endhighlight %}

## Refactoring Two

Refactoring the logic portion of the code.

{% highlight javascript linenos %}
// Waits for HTML DOM to Load before Executing Script
document.addEventListener('DOMContentLoaded', () => {
                          
  // Form and Input Constants
  const form = document.querySelector('#registrar');
  const input = form.querySelector('input');
  
  // Main Div Constant
  const mainDiv = document.querySelector('.main');
  
  // Main Unordered List Constant
  const ul = document.querySelector('#invitedList');
  
  // Filter Check Box Constants
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');
  
  // Add Filter Check Box to DOM
  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  
  // Filter Check Box Event Handler
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    // Case When Filter is Checked
    if (isChecked) {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        if (li.className === 'responded') {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      }
    // Case When Filter is Not Checked
    } else {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        li.style.display = '';
      }
    }
  });
  
  // Create List Items For Invitees
  const createLI = text => {
    
    // Function to Create DOM Element
    const createElement = (elementName, property, value) => {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }
    
    // Function to Append Content to List Item
    const appendToLi = (elementName, property, value) => {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    } 
    
    // Create List Item
    const li = document.createElement('li');
    // Make Text Element an HTML Element and Append It
    appendToLi('span', 'textContent', text);
    // RSVP Checkbox and Append It
    appendToLi('label', 'textContent', 'Confirmed')
      .appendChild(createElement('input', 'type', 'checkbox'));
    // Edit Names Button and Append It
    appendToLi('button', 'textContent', 'edit');
    // Removing Names Button and Append It
    appendToLi('button', 'textContent', 'remove');
    // Return Final List Item
    return li;
  }
  
  // Registering Names
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    const li = createLI(text);
    ul.appendChild(li);
  });
  
  // Checkbox Handler -- Add Styling for when checkox is checked.
  ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    if (checked) {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });
  
  // Button Handlers
  ul.addEventListener('click', (e) => {
    
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'save';
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit';
        }
      };
      
      // Select and Run Action in Buttons Name
      nameActions[action]();  
    }
  }); // End Button Handlers
}); // End Document.ready event handler
{% endhighlight %}

## Next Steps 

There will always be additional changes that can be made, but refactoring your code as much as possible will make it so that this is easier.

You can also look into local storage. You can learn more about local storage <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">here</a>.

## Final Project

### HTML

{% highlight html linenos %}
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>RSVP App</title>
  <link href="https://fonts.googleapis.com/css?family=Courgette" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
</head>
<body>
  <div class="wrapper">
    <header>
      <h1>RSVP</h1>
      <p>A Treehouse App</p>
      <form id="registrar">
        <input type="text" name="name" placeholder="Invite Someone">
        <button type="submit" name="submit" value="submit">Submit</button>
      </form>
    </header>
		
    <div class="main">	
      <h2>Invitees</h2>
      <ul id="invitedList"></ul>	
    </div>
  </div>
  <script type="text/javascript" src="app.js"></script>
</body>
</html>
{% endhighlight %}

### CSS

{% highlight css linenos %}
/* ================================= 
  Element Styles
==================================== */

* {
  box-sizing: border-box;
}
body {
  font-family: 'Lato', sans-serif;
  color: #4c4c4c;
  background: #f8fdf3;
}
h1,
p,
form button {
  color: white;  
}
h1 {
  font-family: 'Courgette', cursive;
  text-shadow: 0 1px 0 rgba(0,0,0, .4);
  line-height: .65;
  margin-top: .5em;
  margin-bottom: 0;
}
h2 {
  margin-top: 0;
}
p {
  font-size: 1.1em;
  text-shadow: 0 1px 0 rgba(0,0,0, .25);
}
form {
  width: 60%;
  background: white;
  display: inline-block;
  overflow: hidden;
  display: -webkit-flex;
  display: flex;
  border-radius: .2em;
  border: solid 4px white;
  box-shadow: 0 1px 14px rgba(0,0,0, .12);
}
form button {
  padding: 0 1em;
  font-size: 1em;
  background: #7bcbc4;
  border-radius: .2em;
}
ul {
  list-style: none;
  padding: 0;
  margin: 2em 0 1em;
}
ul li {
  padding: 1em;
  background: #fff;
  border-radius: .2em;
  border: solid 1px rgba(88, 183, 205, .2);
  border-bottom: solid 2px rgba(88, 183, 205, .2);
  position: relative;
}
button {
  cursor: pointer;
}
input, 
button {
  border: none;
  outline: none;
}
header {
  text-align: center;
  background: linear-gradient(90deg, #d4eece, #55b3d0, #1e7eb7),
              url('../images/header-bg.jpg') no-repeat;
  background-blend-mode: multiply;    
  background-size: cover;   
}
header input {
  padding: 12px;
  font-size: 1.15em;
  width: 100%;
}
li span, 
li input[type=text] {
  color: #707070;
  font-size: 1.3em;
  margin-bottom: .3em;
}
li input[type=text] {
  padding: .2em;
  width: 95%;
  border: 1px dotted rgba(0,0,0, .2);
}
li label {
  font-size: .9em;
  display: block;
  color: rgba(112, 112, 112, .55);
}
li span, 
li input[type=text]:first-child {
  display: block;
}
li button {
  font-size: .78em;
  margin-top: 1.65em;
  margin-right: .4em;
  border-radius: .3em;
  padding: .4em .6em;
  color: white;
  background: #58b7cd;
}
li button:last-child {
  background: rgba(88, 183, 205, .5);
}
.wrapper {
  width: 100%;
  max-width: 900px;
  margin: 2.5em auto;
  border-radius: .35em;
  background: #fcfcfc;
  overflow: hidden;
  box-shadow: 0 0 26px rgba(0,0,0, .13);
}
div > input:last-child {
  font-size: 1em;
  margin-left: 6px;
}
div > label {
  color: #767676;
}

/* responded */
.responded {
  transition: 0.4s;
  border-color: rgba(88, 183, 205, .9);
}
.responded label {
  transition: 0.4s;
  color: rgba(88, 183, 205, 1);
}

/* ================================= 
  Media Queries
==================================== */

@media (min-width: 0) and (max-width: 768px) {
  header {
    padding: 1.25em;
  }
  h1 {
    font-size: 3.6em;
    margin: .3em 0 0;
  }
  ul li {
    margin-bottom: 1em;
  }
  form {
    width: 95%;
    -webkit-flex-direction: column;
    flex-direction: column;
    margin: auto;
    margin-top: 2.5em;
  }
  form button {
    padding: 12px 0;
    margin-top: .5em;
  }
  form input {
    font-size: 1em;
    text-align: center;
  }
  .wrapper {
    margin: 0;
  }
  .main {
    padding: 2em 1em .75em;
  }
}

@media (min-width: 769px) {
  header {
    height: 280px;
    padding: 2.5em 1em 1em;  
    background-position: 0 -95px; 
  }
  .main > div {
    float: right;
    display: inline-block;
    margin-top: 12px;
    margin-right: 1.25%;
  }
  div > label {
    margin-top: 12px;
  }
  h1 {
    font-size: 5.8em;
  }
  h2 {
    float: left;
    font-size: 1.9em;
    margin-left: 1.25%;
  }
  form {
    margin: 4.15em auto 0;
    z-index: 3000;
    position: relative;
  }
  .wrapper {
    width: 90%;
  }
  .main {
    padding: 3.8em 1.5em .75em;
    position: relative;
    z-index: 10;
  }
  ul {
    display: -webkit-flex;
    display: flex;
    clear: both;
    
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-flex-wrap: wrap;    
    flex-wrap: wrap;
    padding-top: 1.25em;
  }
  ul li {
    -webkit-flex-grow: 1;
    flex-grow: 1;
    -webkit-flex-basis: 47.5%;
    flex-basis: 47.5%;
    margin: 0 1.25% 1em;
  }
}
@media (min-width: 880px) { 
  ul li {
    -webkit-flex-basis: 20%;
    flex-basis: 20%;
  }
}
{% endhighlight %}

### JavaScript

{% highlight javascript linenos %}
// Waits for HTML DOM to Load before Executing Script
document.addEventListener('DOMContentLoaded', () => {
                          
  // Form and Input Constants
  const form = document.querySelector('#registrar');
  const input = form.querySelector('input');
  
  // Main Div Constant
  const mainDiv = document.querySelector('.main');
  
  // Main Unordered List Constant
  const ul = document.querySelector('#invitedList');
  
  // Filter Check Box Constants
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');
  
  // Add Filter Check Box to DOM
  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  
  // Filter Check Box Event Handler
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    // Case When Filter is Checked
    if (isChecked) {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        if (li.className === 'responded') {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      }
    // Case When Filter is Not Checked
    } else {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        li.style.display = '';
      }
    }
  });
  
  // Create List Items For Invitees
  const createLI = text => {
    
    // Function to Create DOM Element
    const createElement = (elementName, property, value) => {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }
    
    // Function to Append Content to List Item
    const appendToLi = (elementName, property, value) => {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    } 
    
    // Create List Item
    const li = document.createElement('li');
    // Make Text Element an HTML Element and Append It
    appendToLi('span', 'textContent', text);
    // RSVP Checkbox and Append It
    appendToLi('label', 'textContent', 'Confirmed')
      .appendChild(createElement('input', 'type', 'checkbox'));
    // Edit Names Button and Append It
    appendToLi('button', 'textContent', 'edit');
    // Removing Names Button and Append It
    appendToLi('button', 'textContent', 'remove');
    // Return Final List Item
    return li;
  }
  
  // Registering Names
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    const li = createLI(text);
    ul.appendChild(li);
  });
  
  // Checkbox Handler -- Add Styling for when checkox is checked.
  ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    if (checked) {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });
  
  // Button Handlers
  ul.addEventListener('click', (e) => {
    
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'save';
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit';
        }
      };
      
      // Select and Run Action in Buttons Name
      nameActions[action]();  
    }
  }); // End Button Handlers
}); // End Document.ready event handler
{% endhighlight %}