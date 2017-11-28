/****************************************************
altering the notes page.. sorting
****************************************************/

$(document).ready(() => {

  // object of all courses
  const courses = {
    basicSyntax: {
      name: 'Basic Syntax',
      color: '#000',
    },
    frontEndDev: {
      name: 'Treehouse - Front End Web Development',
      color: '#3079AB',
    },
    beginJS: {
      name: 'Treehouse - Beginner JavaScript',
      color:'#C25975',
    },
    intermJS: {
      name: 'Treehouse - Full Stack JavaScript',
      color: '#C25975',
    },
    react: {
      name: 'Treehouse - Learn React',
      color: '#C25975',
    },
    beginSwift: {
      name: 'Treehouse - Beginner iOS Development',
      color:'#53BBB4',
    },
  }

  // initialize courseButtons string
  let courseButtons = "";

  // iterate over courses object and generate buttons
  $.each(courses, (key, value) => {
    courseButtons += `<button class="${key}">${value.name}</button>`;
  });

  // add course buttons to the dom
  $('#courseTags').append(`<button>All</button>${courseButtons}`);

  // iterate over courses now that buttons are part of the dom
  $.each(courses, (key, value) => {

    // change CSS for course buttons
    $(`.${key}`).css({
      'border-color': `${value.color}`,
    });

    // change notes border color based on colors defined in object
    $(`.course h3:contains(${value.name})`).css({
      'border-color': `${value.color}`,
      'color': `${value.color}`,
    });

    // add click event for buttons -- sort through notes based on button clicked
    $('#courseTags button').on('click', (e) => {
      if (e.target.innerHTML === 'All') {
        $('.course h3').parentsUntil('.individualTile').show();
      } else if (e.target.innerHTML === value.name) {
        $(`.course h3:contains(${e.target.innerHTML})`).parentsUntil('.individualTile').show();
      } else {
        $(`.course h3:not(:contains(${e.target.innerHTML}))`).parentsUntil('.individualTile').hide();
      }
    });

  });

});