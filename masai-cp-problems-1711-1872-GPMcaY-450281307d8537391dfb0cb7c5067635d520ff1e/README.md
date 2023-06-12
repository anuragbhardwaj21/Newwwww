# React-Course-Platform 

## Submission Instructions [Please note]

## Maximum Marks - 15

- The Submission should not contain spaces, for example /rct-101 folder/eval will not work
- Do not push node_modules and package_lock.json to github

```
 ✅ Able to submit the app - 1 mark ( minimum score )
 ✅ On page load check basic structure is present(form and lectures are visible in the table) - 1 mark
 ✅ check whether 5 lectures are present with correct lecture details on page load - 2 marks
 ✅ Check whether able to access all the pages - 2 marks
 ✅ Check pagination component is not hard coded and buttons are getting disabled appropriately - 2 marks
 ✅ Check delete functionality is working or not - 2 marks
 ✅ Able to create the lecture and data is getting updated on DOM in real time - 3 marks
 ✅ form reset to initial state after the lecture is created successfully - 1 mark
 ✅ Delete and page numbered buttons having classNames as mentioned in the problem statement - 1 mark
```

## Installation

- Use node version(LTS) should be `v16.16.0`
- Don't change/override package.json
- please make sure you do not push package-lock.json

- Download and unzip the boilerplate file and then copy the "**contents**" of the unzipped file in the Masai Folder.
- Navigate to the Masai Folder, in VS Code.
- Run the following commands inside,

  - `npm install --engine-strict`
  - `npm start`
  - `npm run server` -> to start the json-server

- **_Note_**:
1. Make sure that the json-server is up and running at port `8080`
2. Use `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}` as the json-server URL where ever you use `http://localhost:8080`

### Not following the above instructions will lead your test cases to fail

## Problem Statement

You are required to build a React application that serves as a course platform. The application should enable users to view, create, and delete lectures using a JSON server, while also incorporating pagination functionality.


## Understanding Component Structure

```
├── src
|  ├── App.css
|  ├── App.js
|  ├── App.test.js
|  ├── Components
|  |  ├── CreateLecture.jsx
|  |  ├── Pagination.jsx
|  |  ├── ShowLectures.jsx
|  |  └── TableRow.jsx
|  ├── index.css
|  ├── index.js
```


**Note** - `Make sure you use only the given components and don't create new files and folders. Changing the component name, and structures might result in giving you zero marks.`

## Understanding Data Structure

- db.json (go through db.json file to understand the data structure)

## ![DEMO App Link](https://i.imgur.com/h0MGvLL.gif)
[DEMO App Link](https://i.imgur.com/h0MGvLL.gif)

### App.js

<div>
<img src="https://i.imgur.com/cWxDAAM.png" width="100%" />
</div>

- This component should contain the title of the Application with textContent as `Course Platform` in the `h1` tag.
- It should additionally contain the following components.
  - `CreateLecture` component- which is essentially a form for entering lecture details.
  - `ShowLectures` component - which displays lectures in a table format (showing only 5 lectures per page).
  - `Pagination` component- Contains 3 buttons

Note:- 
1. We need lecture details in multiple child components of App.js. So we will fetch the details of the lectures in this component. 
2. We need to show only 5 lectures per page and the order should be as per the order in db.json. This should be achieved by using query params, (_limit and _page). By default page 1 data should be visible. refer to this https://www.npmjs.com/package/json-server#paginate
3. endpoint :- `/lectures`, you need to add query params and Use fetch only

### CreateLecture.jsx
<div style="width:100%;margin:auto;text-align:center">
<img src="https://i.imgur.com/LPk44ch.png" width="50%" />
</div>

- The CreateLecture component allows users to enter lecture details in a form and on submitting the form it should make a `POST` request to the `/lectures` endpoint with the request body as a `lecture` details. (Check the format of db.json data to get an idea of how lecture details should be saved in db.json)
- `form` is already provided in the boilerplate you need to add functionality to it. (`Use onSubmit for submitting the form`)
- On submitting the `form`, the data should be updated on db.json and also the data should be updated on the DOM.(make appropriate `GET` to the required endpoint along with the required query params).
- Reset the form after it has been successfully submitted. This means that all previously entered details in the form should be cleared
- for schedule and concludes in the form we used the input of `type="datetime-local"`, you can refer to MDN docs Link:- [`<input type="datetime-local">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local)

Hint:- mostly we will be using values of the select and input tags used in the form as keys.

### ShowLectures.jsx
<div >
<img src="https://i.imgur.com/60DeBvE.png" width="100%" />
</div>

- This component will display the lectures with the help of the `TableRow`component.
- `Table` with `thead` and `tbody` is provided in the boilerplate you need to append the lectures to `tbody`

### TableRow.jsx

<div>
<img src="https://i.imgur.com/KmmW3WI.png" width="100%" />
</div>


- This component is used to add each lecture detail to the `tbody`.
- All the details of the lecture should be wrapped inside `tr` tag. And the `td` tags should contain the following lecture details as below.
  - title - title of the lecture
  - category - category of the lecture
  - batch - for which batch the lecture is.
  - schedule - Schedult time of the lecture.
  - conclude - Conclude time of the lecture.
  - user - User who created it.
  - button - with textContent `Delete` and on clicking it, it should make a `DELETE` request to the json server.(use endpoint `lectures/id`, where `id` is the `id` of the lecture.)
    -  The delete button should have className as `"bgRed"`.
- After successful `DELETE` request the data on the DOM should get Updated(Here you need to make a `GET` request to get the data of that page).


### Pagination.jsx
<div>
<img src="https://i.imgur.com/zIlJRXY.png" width="100%" />
</div>

- This component should contain 3 buttons. 
- button 1 with textContent `Previous`. 
  - This button should be disabled when there are no previous pages.
  - onClicking this, the page should be changed to the previous page.
- button 2 with textContent page number.(like 1,2,3). And this button should have className as `bgGreen`
- button 3 with textContent `Next`.
  - This button should be disabled when there are no pages left.
  - Onclickig this, the page should be changed to the next page.

Hint:- 
1. The network request should be made whenever the user changes the page and get the lecture details of that page.
2. You can get the total number of lectures from the headers of the response in the below-mentioned way.

```
response.headers.get(`X-Total-Count`)
```

<div>
  <img src="https://i.imgur.com/WOBqJ50.png" width="100%" />
</div>


**Note:**

- It's mandatory to achieve pagination by using query params. And per page you need to show 5 lectures. This can be achieved by using query params. (`limit` and `page`)
- refer to json server documentation for query params:- [https://www.npmjs.com/package/json-server](https://www.npmjs.com/package/json-server)
- You are free to apply your own CSS.

The Problem is tested on CP
<div>
  <img src="https://i.imgur.com/R8ZzqO2.png" width="100%" />
</div>

## General Instructions (**_IMPORTANT_**)

1. Do not use Global CSS, instead use `<componentName>.module.css` convention for Css in that file.
2. Do Not Remove `data-cy="xxxx"` from anywhere, this is used by testing tools to test your code, and removal of this will lead to a low score.
3. Make sure you use only the given components and don't create new files and folders as changing the component name, or structures might result in giving you zero marks
4. Make sure you use only the given data and don't create new data, as changing data might result in giving you zero marks.

#### General guidelines

- The system on cp.masaischool.com may take between 1-20 minutes for responding,
- so we request you to read the problem carefully and debug it before itself
- we also request you not just submit it last minute
- try to keep one submission at a time
