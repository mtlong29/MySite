/****************************************************
javascript for altering the notes page
****************************************************/

$(document).ready(() => {
// button sorting for courses on notes page
  // array of all courses
  const courses = [
    'Basic Syntax',
    'Treehouse - Front End Web Development',
    'Treehouse - Beginner JavaScript',
    'Treehouse - Full Stack JavaScript',
    'Treehouse - Learn React',
    'Treehouse - Beginner iOS Development',
  ];
  // sort courses array by name
  courses.sort()
  // select courseTags id
  const $courseTags = $('#courseTags');
  // get the number of courses
  const numberOfCourses = courses.length;
  // initialize HTML button string including the All button
  let html = '<button>All</button>';
  // iterate over courses
  for (let i = 0; i < numberOfCourses; i++) {
    // generate course tag buttons
    html += '<button>' + courses[i] + '</button>';
  }
  // append course tag buttons to dom
  $courseTags.append(html);
  // select now generated course tag buttons
  const $courseTagButton = $('#courseTags button');
  // iterate over courses
  for (let i = 0; i < numberOfCourses; i++) {
    // add click event for buttons
    $courseTagButton.on('click', (e) => {
      if (e.target.innerHTML === 'All') {
        $('.course h3').parentsUntil('.individualTile').show();
      } else if (e.target.innerHTML === courses[i]) {
        $('.course h3:contains(' + e.target.innerHTML + ')').parentsUntil('.individualTile').show();
      } else {
        $('.course h3:not(:contains(' + e.target.innerHTML + '))').parentsUntil('.individualTile').hide();
      }
    });
  }
});