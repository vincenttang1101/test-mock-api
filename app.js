const coursesAPI = "http://localhost:3000/courses";

const getCourses = (callback) => {
  fetch("http://localhost:3000/courses")
    .then((response) => response.json())
    .then(callback);
};

const renderCourses = (courses) => {
  const courseListBlock = document.querySelector(".course-list");
  const htmls = courses.map(
    (course) =>
      `<li class="course-item-${course.id}">
      <h4>${course.name}</h4>
      <button onclick="handleDeleteCourse(${course.id})">Delete</button>
      </li>`
  );
  courseListBlock.innerHTML = htmls.join("");
};

const createCourse = (data, callback) => {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  fetch(coursesAPI, options)
    .then((response) => response.json())
    .then(callback);
};

const handleCreateForm = () => {
  const createBtn = document.querySelector(".create");

  createBtn.onclick = () => {
    const name = document.querySelector('input[name="name"').value;

    const formData = {
      name: name,
    };
    createCourse(formData, () => getCourses(renderCourses));
  };
};

const handleDeleteCourse = (id) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(coursesAPI + `/${id}`, options)
    .then((response) => response.json())
    .then(() => {
      const course = document.querySelector(".course-item-" + id);

      course.remove();
    });
};

const startServer = () => {
  getCourses(renderCourses);
  handleCreateForm();
};

startServer();
