---
layout: article

permalink: /notes/prototype-chain/

title: "Prototype Chain"

subtitle: "Treehouse - Front End Web Development"

excerpt: "Notes on JavaScript prototypes. All JavaScript objects inherit the properties and methods from their prototype. Objects created using an object literal, or with new Object(), inherit from a rptotype called Object.prototype."

categories: notes

date: 2017-08-27
---

{% include /globalSections/toc.html %}

## Prototype Chain

What happens when there are objects with similar properties and behavior? Creating a separate constructor function for each type that do the same thing seems like a lot of work. Especially if the objects share the same behavior.

For example, if we wanted to extend a playlist application to include movies as a playlist item, both movies and songs have titles and durations, both should have the isPlaying property too. Their behaviors are similar. They both should be able to be played and stopped. The differences are that a song has an artist, and a movie has a year. It can also have the play and a stop behavior, and we can link it to the other types of media, the song and movie. This linking is called creating a prototype chain.

When you access a property or method on an object the JavaScript interpreter checks if it's directly on the instance. If it's not, it will check the prototype. If it's not there, it will check the next prototype up the chain. 

## Large Example

{% highlight javascript linenos%}
function Media(title, duration) {
  this.title = title;
  this.duration = duration;
  this.isPlaying = false;
}
Media.prototype.play = function () {
  this.isPlaying = true;
};
Media.prototype.stop = function () {
  this.isPlaying = false;
};

{% endhighlight %}

{% highlight javascript linenos%}
function Movie(title, year, duration) {
  Media.call(this, title, duration);
  this.year = year;
}
Movie.prototype = Object.create(Media.prototype);
Movie.prototype.toHTML = function () {
  var htmlString = '<li';
  if (this.isPlaying) {
    htmlString += ' class="current"';
  }
  htmlString += '>';
  htmlString += this.title;
  htmlString += ' (';
  htmlString += this.year;
  htmlString += ') ';
  htmlString += '<span class="duration">'
  htmlString += this.duration;
  htmlString += '</span></li>';
  return htmlString;
};

{% endhighlight %}

{% highlight javascript linenos%}
function Song(title, artist, duration) {
  Media.call(this, title, duration);
  this.artist = artist;
}
Song.prototype = Object.create(Media.prototype);
Song.prototype.toHTML = function () {
  var htmlString = '<li';
  if (this.isPlaying) {
    htmlString += ' class="current"';
  }
  htmlString += '>';
  htmlString += this.title;
  htmlString += ' - '
  htmlString += this.artist;
  htmlString += '<span class="duration">'
  htmlString += this.duration;
  htmlString += '</span></li>';
  return htmlString;
};

{% endhighlight %}

{% highlight javascript linenos%}
var playlist = new Playlist();
var hereComesTheSun = new Song("Here Comes the Sun", "The Beatles", "2:54");
var walkingOnSunshine = new Song("Walking on Sunshine", "Katrina and the Waves", "3:43");
var manOfSteel = new Movie("Man of Steel", 2013, "2:23:00");
playlist.add(hereComesTheSun);
playlist.add(walkingOnSunshine);
playlist.add(manOfSteel);
var playlistElement = document.getElementById("playlist");
playlist.renderInElement(playlistElement);
var playButton = document.getElementById("play");
playButton.onclick = function () {
  playlist.play();
  playlist.renderInElement(playlistElement);
}
var nextButton = document.getElementById("next");
nextButton.onclick = function () {
  playlist.next();
  playlist.renderInElement(playlistElement);
}
var stopButton = document.getElementById("stop");
stopButton.onclick = function () {
  playlist.stop();
  playlist.renderInElement(playlistElement);
}
{% endhighlight %}

{% highlight html linenos %}
<!DOCTYPE html>
<html>
<head>
  <title>Treetunes</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div>
    <h1>Treetunes</h1>
    <ol id="playlist">
    </ol>
    <button id="play">Play</button>
    <button id="next">Next</button>
    <button id="stop">Stop</button>
  </div>
  <script src="playlist.js"></script>
  <script src="media.js"></script>
  <script src="movie.js"></script>
  <script src="song.js"></script>
  <script src="app.js"></script>
</body>
</html>
{% endhighlight %}