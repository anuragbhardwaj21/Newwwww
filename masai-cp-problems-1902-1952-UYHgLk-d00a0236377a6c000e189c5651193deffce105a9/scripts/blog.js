// // code for time and date 
// const date = document.getElementById("date");
// const time = document.getElementById("time");

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

// // back button code
// document.getElementById("backBtn").addEventListener("click", () => {
//   window.location.href = "index.html";
// });
// // --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------



// add your js code for blog page here 

// code for time and date
const date = document.getElementById("date");
const time = document.getElementById("time");

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

// back button code
document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// Problem 7: Able to read blogs using the Read more button
function getBlogFromLocalStorage() {
  const blogData = localStorage.getItem("blog");
  if (blogData) {
    return JSON.parse(blogData);
  }
  return null;
}

function renderBlogDetails(blog) {
  const titleElement = document.querySelector(".title");
  const subTitleElement = document.querySelector(".sub_title");
  const profilePicElement = document.querySelector(".profile_pic");
  const nameElement = document.querySelector(".name");
  const imageElement = document.querySelector(".image");
  const descriptionElement = document.querySelector(".description");

  titleElement.innerText = blog.title;
  subTitleElement.innerText = blog.sub_title;
  profilePicElement.src = blog.author.profile_pic;
  nameElement.innerText = blog.author.name;
  imageElement.src = blog.image;
  descriptionElement.innerText = blog.description;
}

window.addEventListener("DOMContentLoaded", () => {
  const blog = getBlogFromLocalStorage();
  if (blog) {
    renderBlogDetails(blog);
  } else {
    // Handle the case when the blog data is not available
    console.error("Blog data not found.");
  }
});
