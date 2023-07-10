// // code for time and date 
// const date = document.getElementById("date");
// const time = document.getElementById("time");

// // Format the date as desired (e.g., YYYY-MM-DD)
// const currentDate2 = new Date().toLocaleDateString("en-US", {
//   month: "long",
//   day: "2-digit",
//   year: "numeric",
// });
// date.innerText = currentDate2;

// const currentDate = new Date();
// const currentTime = currentDate.toLocaleTimeString('en-US', {
//   hour: '2-digit',
//   minute: '2-digit',
//   hour12: true
// });

// time.innerText = currentTime

// // --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
// const baseServerURL = `http://localhost:${
//   import.meta.env.REACT_APP_JSON_SERVER_PORT
// }`;
// // --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// // ***** Constants / Variables ***** //
// const blogsURL = `${baseServerURL}/blogs`;
// let mainSection = document.getElementById("data-list-wrapper");

// let blogsData = [];


// //filter and sort

// let newestFirst = document.getElementById("newest-first");
// let oldestFirst = document.getElementById("oldest-first");

// let filterInternational = document.getElementById("filter-International");
// let filterBusiness = document.getElementById("filter-Business");
// let filterEntertainment = document.getElementById("filter-Entertainment");
// let filterSports = document.getElementById("filter-Sports");
// let filterHealth = document.getElementById("filter-Health");


// // add your js code for index page here 
// Code for time and date
const date = document.getElementById("date");
const time = document.getElementById("time");

// Format the date as desired (e.g., YYYY-MM-DD)
const currentDate2 = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "2-digit",
  year: "numeric",
});
date.innerText = currentDate2;

const currentDate = new Date();
const currentTime = currentDate.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

time.innerText = currentTime;

// Constants / Variables
const baseServerURL = "http://localhost:3000"; // Update the server URL if necessary
const blogsURL = `${baseServerURL}/blogs`;
let mainSection = document.getElementById("data-list-wrapper");

let blogsData = [];

// Fetch blogs data from the server
async function fetchBlogsData() {
  try {
    const response = await fetch(blogsURL);
    const data = await response.json();
    blogsData = data;
    console.log(blogsData);
    displayBlogsData(blogsData);
  } catch (error) {
    console.error("Error fetching blogs data:", error);
  }
}

// Display blogs data in the DOM
function displayBlogsData(blogs) {
  mainSection.innerHTML = ""; // Clear previous data

  blogs.forEach((blog) => {
    const card = createBlogCard(blog);
    mainSection.appendChild(card);
  });
}

// Create a blog card element
function createBlogCard(blog) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardImg = document.createElement("div");
  cardImg.classList.add("card_img");
  // Add blog image logic here (e.g., cardImg.style.backgroundImage = `url(${blog.image})`;)

  const cardBody = document.createElement("div");
  cardBody.classList.add("card_body");

  const title = document.createElement("p");
  title.classList.add("title");
  title.innerText = blog.title;

  const subTitle = document.createElement("p");
  subTitle.classList.add("sub_title");
  subTitle.innerText = blog.sub_title;

  const category = document.createElement("p");
  category.classList.add("category");
  category.innerText = blog.category;

  const profilePic = document.createElement("img");
  profilePic.classList.add("profile_pic");
  profilePic.src = blog.author.profile_pic;

  const name = document.createElement("p");
  name.classList.add("name");
  name.innerText = blog.author.name;

  const publishDate = document.createElement("p");
  publishDate.classList.add("publish_date");
  publishDate.innerText = blog.publish_date;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.innerText = "Delete";
  deleteBtn.setAttribute("data-id", blog.id);
  deleteBtn.addEventListener("click", () => {
    deleteBlog(blog.id);
  });

  const readBtn = document.createElement("button");
  readBtn.classList.add("readBtn");
  readBtn.innerText = "Read More";
  readBtn.setAttribute("data-id", blog.id);
  readBtn.addEventListener("click", () => {
    viewBlog(blog);
  });

  cardBody.appendChild(title);
  cardBody.appendChild(subTitle);
  cardBody.appendChild(category);
  cardBody.appendChild(profilePic);
  cardBody.appendChild(name);
  cardBody.appendChild(publishDate);
  cardBody.appendChild(deleteBtn);
  cardBody.appendChild(readBtn);

  card.appendChild(cardImg);
  card.appendChild(cardBody);

  return card;
}

// Delete a blog
async function deleteBlog(blogId) {
  try {
    await fetch(`${blogsURL}/${blogId}`, {
      method: "DELETE",
    });
    fetchBlogsData(); // Refresh blogs data after deletion
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
}

// View a blog
function viewBlog(blog) {
  localStorage.setItem("blog", JSON.stringify(blog));
  window.location.href = "blog.html";
}

// Sort blogs by newest first
function sortNewestFirst() {
  blogsData.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));
  displayBlogsData(blogsData);
}

// Sort blogs by oldest first
function sortOldestFirst() {
  blogsData.sort((a, b) => new Date(a.publish_date) - new Date(b.publish_date));
  displayBlogsData(blogsData);
}

// Filter blogs by category
function filterByCategory(category) {
  const filteredBlogs = blogsData.filter((blog) => blog.category === category);
  displayBlogsData(filteredBlogs);
}

// Event Listeners
document.getElementById("newest-first").addEventListener("click", sortNewestFirst);
document.getElementById("oldest-first").addEventListener("click", sortOldestFirst);
document.getElementById("filter-International").addEventListener("click", () => {
  filterByCategory("International");
});
document.getElementById("filter-Business").addEventListener("click", () => {
  filterByCategory("Business");
});
document.getElementById("filter-Entertainment").addEventListener("click", () => {
  filterByCategory("Entertainment");
});
document.getElementById("filter-Sports").addEventListener("click", () => {
  filterByCategory("Sports");
});
document.getElementById("filter-Health").addEventListener("click", () => {
  filterByCategory("Health");
});

// Fetch blogs data on page load
fetchBlogsData();
