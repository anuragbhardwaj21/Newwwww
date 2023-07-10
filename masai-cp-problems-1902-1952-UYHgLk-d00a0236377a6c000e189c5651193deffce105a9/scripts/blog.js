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

// Code for time and date
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

// Back button code
document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

// Retrieve blog data from localStorage
const blogData = JSON.parse(localStorage.getItem("blog"));

// Update DOM with blog data
document.querySelector(".title").innerText = blogData.title;
document.querySelector(".sub_title").innerText = blogData.sub_title;
document.querySelector(".profile_pic").src = blogData.author.profile_pic;
document.querySelector(".name").innerText = blogData.author.name;
document.querySelector(".image").src = blogData.image;
document.querySelector(".description").innerText = blogData.description;
