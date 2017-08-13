---
layout: article

permalink: /blog/custom-wordpress-login-page/

title: "Creating a Custom Wordpress Login Page"

subtitle: "Wordpress"

excerpt: "That default wordpress login page could not be more boring. In fact, if you were to deliver a custom wordpress site to a client that still has that default login page then I consider that project unfinished. This is true especially due to the fact that this is extremely easy."

categories: blog

tags: [wordpress, web development, php, javascript]

image:
  header: custom-wordpress-login.jpg
  teaser: custom-wordpress-login.jpg

modified: 2017-07-28

featured: true
---

{% include /globalSections/toc.html %}

There are many reasons why someone would want to create a custom wordpress login page. I decided to design a custom login page for a new theme I was working on based off of the <a class="fancyLink" href="http://underscores.me/">underscores</a> starter. Upon briefly researching the current standards of doing this I noticed the top search results were all plugin based. Yuck.. Using a plugin is often a gross approach to things in my opinion. This post documents how I changed my login page such as the example below.

<figure class="full">
	<a href="/images/post-custom-wordpress-login/customWordpressLogin.jpg" title="Custom Wordpress Login"><img src="/images/post-custom-wordpress-login/customWordpressLogin.jpg" alt="Custom Wordpress Login" /></a>
</figure>

## Basic Steps

1. Create a new folder (inside your theme) and name it login (for example..)
2. In that folder create the css file that your login page will use
3. Tell wordpress to load this css file by editing your theme's `functions.php` file
4. Add optional php functions to your `functions.php` file

## Folder Structure

Your folder structure should looks like the following.

{% highlight bash %}
    wordpress/
    ├── your-theme/
    |   ├── login/
    |   |   ├── custom-login-style.css
    |   |   ├── background.jpg
    |   |   └── logo.png
    |   └── other-theme-files.txt
    └── other-wordpress-files.txt
{% endhighlight%}

## CSS

You can use whatever styling you wish for your custom login page. The below `CSS` will result in a login page like the shown on this page.

{% highlight css linenos %}
/* Change Background Image */

body.login {
  background-image: url("background.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}

/* Change Logo */
.login h1 a {
  background-image: url("logo.png");
}

/* Customize The login Form */

.login label {
  font-size: 12px;
  color: #555555;
}

.login input[type="text"]{
  background-color: #ffffff;
  border-color:#dddddd;
  -webkit-border-radius: 4px;
}

.login input[type="password"]{
  background-color: #ffffff;
  border-color:#dddddd;
  -webkit-border-radius: 4px;
}

/* Customize Login Button */

.login .button-primary {
  width: 120px;
  float:right;
  background-color:#46B6B8 !important;
  background: -webkit-gradient(linear, left top, left bottom, from(#46B6B8), to(#46B6B8));
  background: -webkit-linear-gradient(top, #46B6B8, #46B6B8);
  background: -moz-linear-gradient(top, #46B6B8, #46B6B8);
  background: -ms-linear-gradient(top, #46B6B8, #46B6B8);
  background: -o-linear-gradient(top, #46B6B8, #46B6B8);
  background-image: -ms-linear-gradient(top, #46B6B8 0%, #46B6B8 100%);
  color: #ffffff;
  -webkit-border-radius: 4px;
  border: 1px solid #3fa4a6;
}

.login .button-primary:hover {
  background-color:#46B6B8 !important;
  background: -webkit-gradient(linear, left top, left bottom, from(#46B6B8), to(#3fa4a6 ));
  background: -webkit-linear-gradient(top, #46B6B8, #3fa4a6 );
  background: -moz-linear-gradient(top, #46B6B8, #3fa4a6 );
  background: -ms-linear-gradient(top, #46B6B8, #3fa4a6 );
  background: -o-linear-gradient(top, #46B6B8, #3fa4a6 );
  background-image: -ms-linear-gradient(top, #0b436e 0%, #3fa4a6 100%);
  color: #fff;
  -webkit-border-radius: 4px;
  border: 1px solid #3fa4a6;
}

.login .button-primary:active {
  background-color:#46B6B8 !important;
  background: -webkit-gradient(linear, left top, left bottom, from(#3fa4a6), to(#46B6B8));
  background: -webkit-linear-gradient(top, #3fa4a6, #46B6B8);
  background: -moz-linear-gradient(top, #3fa4a6, #46B6B8);
  background: -ms-linear-gradient(top, #3fa4a6, #46B6B8);
  background: -o-linear-gradient(top, #3fa4a6, #46B6B8);
  background-image: -ms-linear-gradient(top, #3fa4a6 0%, #46B6B8 100%);
  color: #fff;
  -webkit-border-radius: 4px;
  border: 1px solid #3fa4a6;
}

/* Change border-left color of login error and login message */

.login #login_error, .login .message {
  border-left: 4px solid #3fa4a6;
}

/* Remove Lost Password Link */

p#nav {
  display: none;
}

/* Remove "Back To" Link */


p#backtoblog {
  display: none;
}
{% endhighlight %}

## PHP

Each block of code in the following `PHP` file is commented enough for you to understand its purpose.

{% highlight php linenos %}
/**
 * Tell wordpress to load this for custom login page
 */
function my_custom_login() {
  echo '<link rel="stylesheet" type="text/css" href="' . get_bloginfo('stylesheet_directory') . '/login/custom-login-styles.css" />';
}
add_action('login_head', 'my_custom_login');

/**
 * Change URL That Logo Links To
 */
function my_login_logo_url() {
  return get_bloginfo( 'url' );
}
add_filter( 'login_headerurl', 'my_login_logo_url' );

function my_login_logo_url_title() {
  return 'Peak Digital Agency';
}
add_filter( 'login_headertitle', 'my_login_logo_url_title' );

/**
 * Hide Login Error Message
 */
function login_error_override()
{
    return "Whoops. That login doesn't seem right.";
}
add_filter('login_errors', 'login_error_override');

/**
 * Remove Login Page Shake
 */
function my_login_head() {
  remove_action('login_head', 'wp_shake_js', 12);
}
add_action('login_head', 'my_login_head');
{% endhighlight %}