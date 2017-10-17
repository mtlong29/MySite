---
layout: article

permalink: /notes/building-a-rest-service/

title: "Building a Rest Service"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Notes on what REST APIs are. Understanding REST services. Notes on designing the API. And tips on planning out an API"

categories: notes

modified: 2017-10-17
---

{% include /globalSections/toc.html %}

REST APIs are a lightweight and powerful way of providing functionality to systems over the internet.

# Introcuding REST APIs

REST APIs handle only the server side of the equation. This means that the backend only has to be built once while any number of front end applications can consume the data.

REST Apis can provide data and contnet for:

<ul>
  <li>Rich Front-End Applications</li>
  <li>Mobile Applications</li>
  <li>Server-server side Applications</li>
</ul>

Example APIs:

<ul>
  <li><a href="https://developers.google.com/google-apps/calendar/">Google Calendar</a></li>
</ul>

# Understanding REST Services

REST is a way of communicating, using a combinations of URL's and what are called "verbs" to make stuff happen on the internet. You use REST all the time when you surf the web, though most people are only aware of the URL component.

#### Quiz

Question: When you type a Uniform Resource Locator into a browser address bar and hit return, what HTTP verb is seent to the resource?

Answer: GET

Question: What is an example of an action you can perform with an API besides retreiving data from the server?

Answer: Delete data from the database

Question: Which of the following is true of a typical REST API?

Answer: It handles server-side logic

Question: The combination of what two components form a RESTful request?

Answer: URL and HTTP Verb

Question: Which of the following is a reason that API's are so powerful?

Answer: They provide flexibility when creating visual interfaces

# Designing an API

Consider a Question and Answer API where users can ask questions and answer them. Users can also vote up or down to sort the answers and questions based on popularity/relavence. Think of <a href="https://stackoverflow.com/">stack overflow</a>.

First describe what you want to do with your app using simple sentences and phrases. You can then break them down into verbs such as Ask, Read, and Vote. As well as nouns such as Question and Answer.

We want to be able to:

<ul>
  <li>Ask a question,</li>
  <li>read the question,</li>
  <li>answer a question,</li>
  <li>read the answers,</li>
  <li>edit an answer,</li>
  <li>delete an asnwer, and</li>
  <li>vote on answers.</li>
</ul>

Note that the nouns are either 'Question' or 'Answer'. That's because questions and answers are the objects our API will provide.

The verbs in each of the phrases tend to indicate the action we want to perform on our objects. When we ask a question, we actully mean we want to create a question object. And when we say edit an answer, or editing the vote count on an answer, we're updating an answer.

## Planning the Questions Routes

The interface of our API is made up of URL patterns. Each URL pattern is known as a route. Planning routes is an important step.

The first route is `/questions`. For specific questions we cna have `/questions/:id`.

## Planning the Answer Routes

The answer is paired with a question. Therefore questions answers will be at `/questions/:id/answers`. A specific answer will be at `/questions/:id/answers/:id`. Sending a PUT or DELETE request to this `id` would provide the update and delete functionality.

## Voting on Answers

Users will need to vote-up and vote-down answers. This means there will be two routes for each: `questions/:qID/answers/:aID/vote-up` and `questions/:qID/answers/:aID/vote-down`.

Every API will do things a little differently. Keeping the people who will use your API in mind will help you find the best way to built it.

#### Quiz

Question: What does the "i" in API stand for?

Answer: interface

Question: Why must care be taken when making improvements to an API once it has been released for public use?

Answer: Changes can break applications that have been built to depend on it by other developers

Question: What HTTP verb is analogous to the "update" action of the "U" in the acronym CRUD?

Answer: PUT

Question: WHat is a route?

Answer: A pattern that describes a URL

Question: How do URLs represent one resource's dependency on another?

Answer: (/) forward slash

