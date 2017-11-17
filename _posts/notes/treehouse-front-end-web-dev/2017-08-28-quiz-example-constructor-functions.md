---
layout: article

permalink: /notes/quiz-example-constructior-function/

title: "Quiz Example Constructor Function"

subtitle: "Treehouse - Front End Web Development"

excerpt: "Example of a quicz constructor function. There isn't a working example in this post, but all the necessary HTML, and JavaScript is here."

categories: notes

modified: 2017-08-27
---

{% include /globalSections/toc.html %}

{% highlight javascript linenos %}
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.currentQuestionIndex = 0;
}
Quiz.prototype.guess = function (answer) {
  if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.currentQuestionIndex++;
};
Quiz.prototype.getCurrentQuestion = function () {
  return this.questions[this.currentQuestionIndex];
};
Quiz.prototype.hasEnded = function () {
  return this.currentQuestionIndex >= this.questions.length;
};
{% endhighlight %}

{% highlight javascript linenos %}
function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}
Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};
{% endhighlight %}

{% highlight javascript linenos %}
var QuizUI = {
  displayNext: function() {
    if(quiz.hasEnded()) {
      this.displayScore();
    } else {
      this.displayQuestion();
      this.displayChoices();
      this.displayProgress();
    }
  },
  displayQuestion: function() {
    this.populateIdWithHTML('question', quiz.getCurrentQuestion().text);
  },
  displayChoices: function() {
    var choices = quiz.getCurrentQuestion().choices;
    for(var i = 0; i < choices.length; i++) {
      this.populateIdWithHTML('choice' + i, choices[i]);
      this.guessHandler('guess' + i, choices[i]);
    }
  },
  displayScore: function() {
    var gameOverHTML = '<h1>Game Over</h1>';
    gameOverHTML += '<h2>Your score is: ' + quiz.score + '</h2>';
    this.populateIdWithHTML('quiz', gameOverHTML);
  },
  populateIdWithHTML: function(id, text) {
    var element = document.getElementById(id);
    element.innerHTML = text;
  },
  guessHandler: function(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
      quiz.guess(guess);
      QuizUI.displayNext();
    }
  },
  displayProgress: function() {
    var currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.populateIdWithHTML('progress', 'Question ' + currentQuestionNumber + ' of ' + quiz.questions.length);
  }
};
{% endhighlight %}

{% highlight javascript linenos %}
var questions = [
  new Question('PS4 or Xbox One?', ['PS4', 'Xbox One'], 'PS4'),
  new Question('PC or Mac?', ['PC', 'Mac'], 'Mac'),
  new Question('iPhone or Android?', ['iPhone', 'Android'], 'iPhone'),
  new Question('Four plus five?', ['Nine', 'One'], 'Nine')
];
var quiz = new Quiz(questions);
QuizUI.displayNext();
{% endhighlight %}

{% highlight html linenos %}
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>Amazing Quiz</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
  <div class="grid">
    <div id="quiz" class="centered grid__col--8">
      <h1>Awesome Quiz</h1>
      <h2 id="question" class="headline-secondary--grouped"></h2>
      <p id="choice0"></p>
      <button id="guess0" class="btn--default">Select Answer</button>
      <p id="choice1"></p>
      <button id="guess1" class="btn--default">Select Answer</button>
      <footer>
        <p id="progress">Question x of y</p>
      </footer>
    </div>
  </div>
  <script src="quiz.js"></script>
  <script src="question.js"></script>
  <script src="quiz_ui.js"></script>
  <script src="app.js"></script>
</body>
</html>
{% endhighlight %}