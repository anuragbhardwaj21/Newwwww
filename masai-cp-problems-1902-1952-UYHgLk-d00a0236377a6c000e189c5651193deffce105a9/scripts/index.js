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
// code for time and date 
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
const currentTime = currentDate.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
});

time.innerText = currentTime

// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:9090/`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const blogsURL = `${baseServerURL}/blogs`;
let mainSection = document.getElementById("data-list-wrapper");

let blogsData = [];

// Problem 1: Shows the correct Welcome title
const welcomeTitle = document.createElement("h2");
welcomeTitle.innerText = "Welcome, Peter";
document.getElementById("welcome").appendChild(welcomeTitle);

// Problem 2: List of blogs on page load
function renderBlogCard(blog) {
  const card = document.createElement("div");
  card.className = "card";

  const cardImg = document.createElement("div");
  cardImg.className = "card_img";
  // Set image of the blog using blog.image

  const cardBody = document.createElement("div");
  cardBody.className = "card_body";

  const title = document.createElement("p");
  title.className = "title";
  title.innerText = blog.title;

  const subTitle = document.createElement("p");
  subTitle.className = "sub_title";
  subTitle.innerText = blog.sub_title;

  const category = document.createElement("p");
  category.className = "category";
  category.innerText = blog.category;

  const profilePic = document.createElement("img");
  profilePic.className = "profile_pic";
  // Set profile picture using blog.author.profile_pic

  const name = document.createElement("p");
  name.className = "name";
  name.innerText = blog.author.name;

  const publishDate = document.createElement("p");
  publishDate.className = "publish_date";
  publishDate.innerText = blog.publish_date;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deleteBtn";
  deleteBtn.innerText = "Delete";
  deleteBtn.setAttribute("data-id", blog.id);
  deleteBtn.addEventListener("click", () => deleteBlog(blog.id));

  const readBtn = document.createElement("button");
  readBtn.className = "readBtn";
  readBtn.innerText = "Read More";
  readBtn.setAttribute("data-id", blog.id);
  readBtn.addEventListener("click", () => redirectToBlogPage(blog));

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

function renderBlogCards() {
  mainSection.innerHTML = ""; // Clear existing blog cards

  blogsData.forEach((blog) => {
    const card = renderBlogCard(blog);
    mainSection.appendChild(card);
  });
}

async function fetchBlogs() {
  try {
    const response = await fetch(blogsURL);
    const data = await response.json();
    blogsData = data;
    renderBlogCards();
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}

// Call the fetchBlogs function on page load
window.addEventListener("load", fetchBlogs);

// Problem 3: Ability to delete a Blog
async function deleteBlog(blogId) {
  try {
    await fetch(`${blogsURL}/${blogId}`, {
      method: "DELETE",
    });
    // Update the blogsData array by removing the deleted blog
    blogsData = blogsData.filter((blog) => blog.id !== blogId);
    renderBlogCards();
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
}

// Problem 4: Check sort the Newest first functionality working as expected
newestFirst.addEventListener("click", () => {
  blogsData.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));
  renderBlogCards();
});

// Problem 5: Check sort Oldest first functionality working as expected
oldestFirst.addEventListener("click", () => {
  blogsData.sort((a, b) => new Date(a.publish_date) - new Date(b.publish_date));
  renderBlogCards();
});

// Problem 6: Filtering Blogs based on the category
function filterBlogsByCategory(category) {
  if (category === "All") {
    renderBlogCards();
  } else {
    const filteredBlogs = blogsData.filter((blog) => blog.category === category);
    renderBlogCards(filteredBlogs);
  }
}

filterInternational.addEventListener("click", () => {
  filterBlogsByCategory("International");
});

filterBusiness.addEventListener("click", () => {
  filterBlogsByCategory("Business");
});

filterEntertainment.addEventListener("click", () => {
  filterBlogsByCategory("Entertainment");
});

filterSports.addEventListener("click", () => {
  filterBlogsByCategory("Sports");
});

filterHealth.addEventListener("click", () => {
  filterBlogsByCategory("Health");
});

// Problem 7: Able to read blogs using the Read more button
function redirectToBlogPage(blog) {
  localStorage.setItem("blog", JSON.stringify(blog));
  window.location.href = "blog.html";
}
