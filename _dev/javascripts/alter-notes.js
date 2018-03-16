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
      color: '#E44D26',
    },
    intermJS: {
      name: 'Treehouse - Full Stack JavaScript',
      color: '#F7DF1E',
    },
    react: {
      name: 'Treehouse - Learn React',
      color: '#61DAFB',
    },
    beginSwift: {
      name: 'Treehouse - Beginner iOS Development',
      color:'#F05138',
    },
    intermSwift: {
      name: 'Treehouse - Intermediate iOS Development',
      color:'#F05138',
    },
    introCAndCPP: {
      name: 'UofL - Intro to C and C++',
      color: '#6799D4',
    }
  }

  // initialize courseButtons string
  let courseButtons = "";

  // iterate over courses object and generate buttons
  $.each(courses, (key, value) => courseButtons += `<button class="${key}">${value.name}</button>`);

  // add course buttons to the dom
  $('#courseTags').append(`<button>All</button>${courseButtons}`);

  // iterate over courses now that buttons are part of the dom
  $.each(courses, (key, value) => {

    // change CSS for course buttons
    $(`.${key}`).css({
      'border-color': `${value.color}`,
    });

    // change notes border color based on colors defined in object
    $(`.subTitle h3:contains(${value.name})`).css({
      'border-color': `${value.color}`,
      'color': `${value.color}`,
    });

    // add click event for buttons -- sort through notes based on button clicked
    $('#courseTags button').on('click', (e) => {
      if (e.target.innerHTML === 'All') {
        $('.subTitle h3').parentsUntil('.individualTile').show();
      } else if (e.target.innerHTML === value.name) {
        $(`.subTitle h3:contains(${e.target.innerHTML})`).parentsUntil('.individualTile').show();
      } else {
        $(`.subTitle h3:not(:contains(${e.target.innerHTML}))`).parentsUntil('.individualTile').hide();
      }
    });

  });

});