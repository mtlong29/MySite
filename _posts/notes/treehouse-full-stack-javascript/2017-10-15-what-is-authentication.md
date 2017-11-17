---
layout: article

permalink: /notes/what-is-authentication/

title: "What is Authentication"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Authentication process. What happens behind the scenes when you log onto a website."

categories: notes

modified: 2017-10-165
---

{% include /globalSections/toc.html %}

We will demystify the authentication process and you will gain an understanding of what is going on behind the scenes when you log into a website.

## What is User Authentication?

User authentication will allow you to password protect parts of a website and limit access for only those visitors who have an account and are signed in.

When you enter a site that requires you create an account it usually asks for username, password, and maybe email address. The next time you go to that site you can enter it using these credentials. This proves who you are.

Once you are authenticated, a site knows who you are.

### Authentication Benefits

Authentication has two benefits.

First, it provides password protection to hide content from unauthorized users.

But more importantly, authentication lets us customize the experience for its users.

## Authentication and Authorization

There is a difference between authentication and authorization.

Authentication is comfirming that the user is who they claim to be. While authorization is determining which resources or areas of the site they can access.

Websites needs to know who they are before they can provide you with information. It needs to know what access you have through the process of authorization.

#### Quiz

Question: Which of the following best describes authentication in a user authentication system?

Answer: The process of confirming that a user is who they claim to be.

Question: Which of the following best describes authorization in a user authentication system?

Answer: The process of determining which resources or areas of a site a user can access.

Question: Which of the following is NOT a benefit of a user authentication system?

Answer: It lets you define routes more clearly so users can access the content and resources they're looking for.

Question: What is one benefit of server "sessions"?

Answer: They let you keep track of a user as they jump from page to page on your site.

Question: A username and passwords are examples of ...

Answer: Credentials

