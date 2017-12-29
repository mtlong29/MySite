---
layout: article

permalink: /notes/what-is-authentication/

title: "What is Authentication"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Authentication process. What happens behind the scenes when you log onto a website."

categories: notes

date: 2017-10-16
---

{% include /globalSections/toc.html %}

We will demystify the authentication process and you will gain an understanding of what is going on behind the scenes when you **log into a website**.

## What is User Authentication?

>User authentication will allow you to password protect parts of a website and limit access for only those visitors who have an account and are signed in.

When you enter a site that requires you create an account it usually asks for username, password, and maybe email address. The next time you go to that site you can enter it using these credentials. This proves who you are. **Once you are authenticated, a site knows who you are.**

#### Authentication Benefits

Authentication has two benefits. **First, it provides password protection to hide content from unauthorized users.** But more importantly, **authentication lets us customize the experience for its users.**

## Authentication and Authorization

There is a difference between authentication and authorization.

>Authentication is confirming that the user is who they claim to be. While authorization is determining which resources or areas of the site they can access.

**Websites needs to know who they are before they can provide you with information.** It needs to know what access you have through the process of authorization.

#### Quiz:

---

**Question**: Which of the following best describes authentication in a user authentication system?

**Answer**: The process of confirming that a user is who they claim to be.

**Question**: Which of the following best describes authorization in a user authentication system?

**Answer**: The process of determining which resources or areas of a site a user can access.

**Question**: Which of the following is NOT a benefit of a user authentication system?

**Answer**: It lets you define routes more clearly so users can access the content and resources they're looking for.

**Question**: What is one benefit of server "sessions"?

**Answer**: They let you keep track of a user as they jump from page to page on your site.

**Question**: A username and passwords are examples of ...

**Answer**: Credentials

---

## Authentication Example

This example uses Pug templating, Express, Express Middleware, etc. Below is everything except the stylesheets and images used in the project.

#### package.json

```javascript
{
  "name": "treehouse-express-auth",
  "version": "1.0.0",
  "description": "A project for learning how to add authentication to a web application.",
  "author": "Treehouse Island, Inc.",
  "private": true,
  "scripts": {
    "start": "node ./app"
  },
  "dependencies": {
    "bcrypt": "^0.8.7",
    "body-parser": "^1.13.3",
    "connect-mongo": "^1.2.1",
    "express": "^4.13.4",
    "express-session": "^1.13.0",
    "mongoose": "^4.5.0",
    "pug": "^2.0.0-beta2"
  },
  "license": "MIT"
}
```

#### app.js

```javascript
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();

// mongodb connection
mongoose.connect("mongodb://localhost:27017/bookworm");
var db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// use sessions for tracking logins
app.use(session({
  secret: 'treehouse loves you',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// make user ID available in templates
app.use(function (req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listen on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});
```

#### routes/index.js

```javascript
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mid = require('../middleware');

// GET /profile
router.get('/profile', mid.requiresLogin, function(req, res, next) {
  User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          return res.render('profile', { title: 'Profile', name: user.name, favorite: user.favoriteBook });
        }
      });
});

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

// GET /login
router.get('/login', mid.loggedOut, function(req, res, next) {
  return res.render('login', { title: 'Log In'});
});

// POST /login
router.post('/login', function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      }  else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// GET /register
router.get('/register', mid.loggedOut, function(req, res, next) {
  return res.render('register', { title: 'Sign Up' });
});

// POST /register
router.post('/register', function(req, res, next) {
  if (req.body.email &&
    req.body.name &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword) {

      // confirm that user typed same password twice
      if (req.body.password !== req.body.confirmPassword) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }

      // create object with form input
      var userData = {
        email: req.body.email,
        name: req.body.name,
        favoriteBook: req.body.favoriteBook,
        password: req.body.password
      };

      // use schema's `create` method to insert document into Mongo
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });

    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
})

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
```

#### models/index.js

```javascript
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    favoriteBook: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
});
// authenticate input against database documents
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ email: email })
      .exec(function (error, user) {
        if (error) {
          return callback(error);
        } else if ( !user ) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password , function(error, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
}
// hash password before saving to database
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});
var User = mongoose.model('User', UserSchema);
module.exports = User;
```

#### middleware/index.js

```javascript
function loggedOut(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/profile');
  }
  return next();
}
function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}
module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
```

#### views/about.pug

```html
extends layout

block content
  .main.container
    .row
      .col-md-8.col-md-offset-2
        h1.display-4.m-b-2 About Us
        p Bookworm is a friendly community where book lovers can discover and share books. See which books your friends are reading, and keep track of books you&apos;re reading or want to read.
        p Sed dictum dolor vitae dignissim scelerisque. Ut tincidunt, tortor at accumsan eleifend, tellus lectus vestibulum nibh, accumsan sagittis turpis nisl eu mauris. Mauris ut laoreet sapien. Nam suscipit, dui at condimentum accumsan, dui sapien tincidunt.

        a.btn.btn-info-outline.btn-lg.m-t-1(href='/register') Get Started for FREE
```

#### views/contact.pug

```html
extends layout

block content
  .main.container
    .row
      .col-md-8.col-md-offset-2
        h1.display-4.m-b-2 Contact Us
        p Sed dictum dolor vitae dignissim scelerisque. Ut tincidunt, tortor at accumsan eleifend, tellus lectus vestibulum nibh, accumsan sagittis turpis nisl eu mauris. Mauris ut laoreet sapien. Nam suscipit, dui at condimentum accumsan, dui sapien tincidunt.

        a.btn.btn-primary(href='#') Get in touch
```

#### views/error.pug

```html
extends layout

block content
  .main.container
    .row.text-xs-center
      .col-md-6.col-md-offset-3.p-t-2
        i.icn-person.material-icons error
        p.lead.m-t-2= message 
```

#### views/index.pug

```html
extends layout

block content
  .main.container.text-xs-center
    h1.display-3 Read &amp; Share Books
    p.lead Choose from our large collection of paid and free books!
    a.btn.btn-info-outline.btn-lg(href='/register') Get Started for FREE
```

#### views/layout.pug

```html
doctype html(lang='en')
head
  meta(charset='utf-8')
  meta(name='viewport', content='width=device-width, initial-scale=1, shrink-to-fit=no')
  meta(http-equiv='x-ua-compatible', content='ie=edge')
  title Bookworm | #{title}
  link(rel='stylesheet', href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css', integrity='sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd', crossorigin='anonymous')
  link(href='https://fonts.googleapis.com/icon?family=Material+Icons', rel='stylesheet')
  link(rel='stylesheet', href='/stylesheets/style.css')

  body
    // load navbar.jade
    include navbar

    // content block
    block content

    // footer
    p.foot.text-xs-center A Treehouse Project

    script(src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js')
    script(src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js', integrity='sha384-vZ2WRJMwsjRMW/8U7i6PWi6AlO1L79snBrmgiDpgIWJ82z8eA5lenwvxbMV1PAh7', crossorigin='anonymous')
```

#### views/login.pug

```html
extends layout

block content
  .main.container
    .row
      .col-md-6.col-md-offset-3
        h1.display-4.m-b-2 Log In
        form(method='POST' action='/login')
          div.form-group
            label(for='email') Email
            input.form-control(type='text' id='email' placeholder='email' name='email')
          div.form-group
            label(for='password') Password
            input.form-control(type='password' id='password' placeholder='password' name='password')
          button.btn.btn-primary(type='submit') Log in        
```

#### views/navbar.pug

```html
nav.navbar.navbar-fixed-top.navbar-dark.bg-inverse
  button.navbar-toggler.hidden-md-up.pull-xs-right(type='button', data-toggle='collapse', data-target='#navbar') &#x2630;
  #navbar.navbar-nav.collapse.navbar-toggleable-sm
    .container
      a.navbar-brand(href='/')
        i.icn-logo.material-icons bookmark_border
        | Bookworm
      .nav-items.clearfix
        if !currentUser
          a.nav-item.nav-link(href='register') Sign Up
        a.nav-item.nav-link(href='about') About
        a.nav-item.nav-link(href='contact') Contact
        a.nav-item.nav-link(href='profile') My Profile
        
      if currentUser
        div
          img.avatar.img-circle.hidden-xs-down(src='/assets/images/avatar.png', alt='avatar')
          a.btn.btn-light.pull-md-right(href='/logout') Log out
      else  
        a.btn.btn-info.pull-md-right(href='login') Login
```

#### views/profile.pug

```html
extends layout

block content
  .main.container.clearfix
    .row
      .col-md-8.col-md-offset-2
        h1.display-4
          img.avatar.img-circle.hidden-xs-down(src='/assets/images/avatar.png', alt='avatar')
          | #{name}
        h2.favorite-book Favorite Book
        | #{favorite}
```

#### views/register.pug

```html
extends layout

block content
  .main.container.row
    .col-md-6.col-md-offset-3
      h1.display-4.m-b-2 Sign Up
      
      // register form
      form(method='POST' action='/register')
        div.form-group
          label(for='name') Name:
          input#name.form-control(type='text', placeholder='first and last' name='name')
        div.form-group
          label(for='email') Email:
          input#email.form-control(type='email', placeholder='name@email.com' name='email')
        div.form-group
          label(for='favoriteBook') Favorite Book:
          input#favoriteBook.form-control(type='text', placeholder='title of book' name='favoriteBook')
        div.form-group
          label(for='pw') Password:
          input#pw.form-control(type='password' name='password')
        div.form-group
          label(for='pw2') Confirm Password:
          input#pw2.form-control(type='password' name='confirmPassword')
        button.btn.btn-primary(type='submit') Sign up
```