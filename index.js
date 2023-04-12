
async function fetchCourses() {
    const response = await fetch("./courses.json");
    if (!response.ok) {
        throw new Error(response.status);
    }
    return await response.json();
};

//------------render all courses------------------------
const allBtnCorses = document.querySelector('.difficulty__list');

fetchCourses()
    .then((courses) => renderAllCoursesList(courses))
    .catch((error) => console.log(error));

const collectionList = document.querySelector('.collection__list');
    
function renderAllCoursesList(courses) {
  const markup = courses
      .map((course) => {
          return    `<li class="collection__item" id=${course.id}>
                        <div class="overlay">
                            <p>${course.description}</p>
                        </div>
                        <img class="img" src=${course.img} alt=${course.title}>
                        <h3   h3 class="title">${course.title}</h3>
                        <span class="difficulty">difficulty - ${course.difficulty}</span>
                    </li>`
})
        .join("");
  collectionList.innerHTML = markup;
}

//-------render difficulty list courses-----------------

const difficultyBtn = document.querySelector('.difficulty__list');

difficultyBtn.addEventListener("click", findCoursesByDifficulty);

function findCoursesByDifficulty(e) {
    if (e.target === e.currentTarget) {
        return
    };

    const difficulty = e.target.id.slice(1);

    difficulty === 'all'
        ? fetchCourses()
            .then((courses) => renderAllCoursesList(courses))
            .catch((error) => console.log(error))
        : fetchCourses()
            .then((courses) => renderDifficultyCoursesList(courses, difficulty))
            .catch((error) => console.log(error));
}

function renderDifficultyCoursesList(courses, difficulty) {
    console.log(courses)
  const markup = courses
      .map((course) => {
          if (course.difficulty === difficulty) {
              console.log(true)
          return    `<li class="collection__item" id=${course.id}>
                        <div class="overlay">
                            <p>${course.description}</p>
                        </div>
                        <img class="img" src=${course.img} alt=${course.title}>
                        <h3   h3 class="title">${course.title}</h3>
                        <span class="difficulty">difficulty - ${course.difficulty}</span>
                    </li>`
          }
})
        .join("");
    console.log(markup)
  collectionList.innerHTML = markup;
}

//-------render popular courses-----------------

const popularBtn = document.querySelector('.buttons__list');
console.log(popularBtn)
popularBtn.addEventListener("click", findPopularCourses);

function findPopularCourses(e) {
    if (e.target === e.currentTarget) {
        return
    };

    const popularCourse = e.target.id.slice(1);

    fetchCourses()
        .then((courses) => renderPopularCoursesList(courses, popularCourse))
        .catch((error) => console.log(error));
}

function renderPopularCoursesList(courses, popularCourse) {
  const markup = courses
      .map((course) => {
          if (course.title.toLowerCase() === popularCourse) {
              console.log(true)
          return    `<li class="collection__item" id=${course.id}>
                        <div class="overlay">
                            <p>${course.description}</p>
                        </div>
                        <img class="img" src=${course.img} alt=${course.title}>
                        <h3   h3 class="title">${course.title}</h3>
                        <span class="difficulty">difficulty - ${course.difficulty}</span>
                    </li>`
          }
})
        .join("");
  collectionList.innerHTML = markup;
}

// ------search courses---------------
const searchForm = document.querySelector('.js-form');

searchForm.addEventListener('submit', searchCourses);

function searchCourses(e) {
    e.preventDefault();

    const query = e.currentTarget.elements.query.value.toLowerCase();
    
    if (query.trim() === '') return;

    fetchCourses()
        .then((courses) => renderSearchedCoursesList(courses, query))
        .catch((error) => console.log(error));
};

function renderSearchedCoursesList(courses, query) {
        
        const markup = courses
            .map((course) => {
                if (course.title.toLowerCase().includes(query)) {
                    console.log(true)
          return    `<li class="collection__item" id=${course.id}>
                        <div class="overlay">
                            <p>${course.description}</p>
                        </div>
                        <img class="img" src=${course.img} alt=${course.title}>
                        <h3   h3 class="title">${course.title}</h3>
                        <span class="difficulty">difficulty - ${course.difficulty}</span>
                    </li>`
                }
            })
        .join("");
        console.log(markup);
        collectionList.innerHTML = markup;
};