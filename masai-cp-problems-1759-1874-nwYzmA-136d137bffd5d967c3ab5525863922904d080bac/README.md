## React-routing-students-data-management-system

## Submission Instructions [Please note]

## Maximum Marks - 13

- The Submission should not contain spaces, for example,/rct-101 folder/eval will not work
- Do not push node_modules and package-lock.json to GitHub

```
 ✅  able to submit the app - 1 mark ( minimum score )
 ✅  Check home page work properly - 2 marks
 ✅  Check the navbar should have proper structure - 2 marks
 ✅  Check able to add a new student - 2 marks
 ✅  Check able to update a student Data- 2 marks
 ✅  Check able to delete a student Data- 2 marks
 ✅  Check able to redirect invalid route- 2 marks


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
- `npm run server` -> to start the JSON-server
- **_Note_**:

1. Make sure that the JSON server is up and running at port 8080
2. Create a .env file. Include `REACT_APP_JSON_SERVER_PORT=8080` in it
3. You need to restart the react server once the env file is updated.
4. Use `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}` as the JSON-server URL

<li style="color:green">Use onSubmit to submit the form</li> 
<li style="color:green">Use fetch only</li>

#### Steps

### Testing Objectives
- Ability to perform dynamic routing with the help of `react-router-dom`.
- Ability to perform CRUD operation.

### Understanding Component Structure

- App
  - Navbar
  - MainRoutes
    - Path: “/”, Page: Home.jsx
    - Path: “/addnew”, Page: AddNewStudent.jsx
    - Path: “/details/:id”, Page: Details.jsx
    - Path: “/edit/:id”, Page: EditStudentDetails.jsx 
    - Invalid Path, Page: Invalid.jsx 

### JSON Data:

- db.json file is included in the boilerplate zip file, with the initial student's data. **Do not overwrite/modify this data**

### Features to build:

### MainRoutes.jsx

- MainRoutes component should contain all the routes mentioned.
 - MainRoutes
    - Path: “/”, Page: Home.jsx
    - Path: “/addnew”, Page: AddNewStudent.jsx
    - Path: “/details/:id”, Page: Details.jsx
    - Path: “/edit/:id”, Page: EditStudentDetails.jsx 
    - Path: “/*”, Page: Invalid.jsx 

### Navbar.jsx

- Navbar should have a logo surrounded with a `Link` tag to `Home` with a div with `data-cy="navbar-home-link"` with textContent `Student management system`.

- Navbar should have an AddNew Button with `data-cy="add-new-button"` with textContent `Add New Student` on click it should navigate to `/addnew`.

### Home.jsx

- landing on Home Page it should request to `/students` to get the default data.

- after getting all data should be shown with the help of the Card component (Card.jsx).

   - #### Card.jsx
      - each card contains an h3 tag with `data-cy="student-name"` showing the student name.
      - two h4 tag   `data-cy="student-age"` shows the age of the student and `data-cy="student-grade"` shows the student's grade.
      - a button with `data-cy="view-dtl-btn"` to redirect the user to the details page (Details.jsx)

 ![](https://i.imgur.com/xpPL7Vq.png)

### Details.jsx
- on landing this page get the particular students data by making a `get` request to `/students/:id` and show it with two buttons edit and delete.
- a h3 tag with `data-cy="student-details-name"` shows the student name.

- three h4 tag   `data-cy="student-details-age"` shows the age of the student and `data-cy="student-details-grade"` shows the student grade and `data-cy="student-details-info"` shows the student additionalInfo.

- button with  `data-cy="edit-Btn"` should surround with a `Link` tag `import from react-router-dom`  and clicking it redirects to the Edit page(EditStudentDetails.jsx).

- button with `data-cy="delete-Btn"` should have a delete function and on clicking it should delete the particular student data and redirect to the homepage (Home.jsx) and in the home page deleted data should not be shown.
![](https://i.imgur.com/qBwAeqN.png)
### EditStudentDetails.jsx
- on landing this page there is a form with the attribute `data-cy="edit-form"` and dedicated input boxes for every detail and make a `get` request to `/students/:id` fill input tags with current data.

- input box with attribute `data-cy="edit-form-student-name"` responsible for changing the name of the student data.

- input box with attribute `data-cy="edit-form-student-age"` responsible for changing the age of the student data.

- input box with attribute `data-cy="edit-form-student-grade"` responsible for changing the grade of the student data.

- input box with attribute `data-cy="edit-form-student-info"` responsible for changing the additionalInfo of the student data.

- there is a button with `type="submit"`.

- after changing the details have to submit the form.(`make sure you submit the form don't use onClick function.`)

- on submit make a `PUT` request to the server to update the data.

- after successful submission, it will redirect to the details page where the updated data should be shown. 
![](https://i.imgur.com/8K7uozw.png)
### AddNewStudent.jsx
- on landing this page there is a div with `data-cy="add-new-component"` inside that there is a form with `data-cy="add-new-form"` inside that dedicated input boxes for handling every field.

- input box with attribute `data-cy="form-student-name"` responsible for adding the name of the student data.

- input box with attribute `data-cy="form-student-age"` responsible for adding the age of the student data.

- input box with attribute `data-cy="form-student-grade"` responsible for adding the grade of the student data.

- input box with attribute `data-cy="form-student-info"` responsible for adding the additionalInfo of the student data.

- there is a button with `type="submit"`.

- after adding the details have to submit the form.(`make sure you submit the form don't use onClick function.`)

- on submitting the form if all the fields are not filled then an error message should be shown in a `p tag with the attribute "data-cy="error-box""`(initially this tag should not exist in the DOM only shown when trying to submit) with the text `All the fields should be filled!` and if try to change any input tags value the `p tag with attribute "data-cy="error-box""` should not exist in the DOM.

- on successful submission, all the fields should be cleared. (don't redirect to any other route (like the home page)).

- the data should be reflected in the home page if we go to the home page(Home.jsx).
![](https://i.imgur.com/7TRWzAW.png)
### Invalid.jsx
- if the user tries to go to any other route other than the mentioned then it redirects to this page.

- it should have an h1 tag with attribute `data-cy="invalid-code"` with text content `404`.

- it should have a h3 tag with the attribute `data-cy="invalid-message"` with text content `page not found !`.

- it should have a button with the attribute `data-cy="back-home"` On clicking this button it should redirect to the home page(Home.jsx).

![](https://i.imgur.com/PPbgKOs.png)

### General Instructions:

- Do not remove `data-testid=’xxx’` from anywhere inside the code. They are the test inputs, and removing them may lead to low scores.
- Do not change the current folder structure, and names of components provided.
- Only use the data present in the db.json file, and do not modify the data in the JSON file.

#### General guidelines

- The system on cp.masaischool.com may take between 1-20 minutes for responding,
- so we request you to read the problem carefully and debug it before itself
- we also request you not just submit it last minute
- try to keep one submission at a time
