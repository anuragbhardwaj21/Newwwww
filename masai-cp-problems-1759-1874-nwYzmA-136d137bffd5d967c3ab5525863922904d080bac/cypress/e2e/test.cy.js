import data from "../../submissionData.json"; // do not create this file
// const data = [
//   {
//     submission_link: "http://localhost:3000",
//     id: "manish-local",
//     json_server_link: "http://localhost:8080",
//   },
// ];

data.forEach(({ submission_link: url, id, json_server_link: server_url }) => {
  describe("react-routing-students-data-management-system Testing", function () {
    let acc_score = 1;

    beforeEach(() => {
      cy.visit(url);

      if (url.charAt(url.length - 1) != "/") {
        url = url + "/";
      }

      Cypress.on("uncaught:exception", (err, runnable) => {
        // prevent the error from failing the test
        return false;
      });
    });

    it("Check home page work properly", () => {
      cy.visit(url);
      cy.intercept("GET", "**/students", { fixture: "students.json" }).as(
        "getStudents"
      );

      cy.wait("@getStudents");

      cy.get('[data-cy="student-list"]').children().should("have.length", 6);

      cy.fixture("students").then((body) => {
        //  console.log("smallojoj",body);

        body.map((element, index) => {
          cy.get('[data-cy="student-card"]')
            .eq(index)
            .children('[data-cy="student-name"]')
            .contains(element.name);

          cy.get('[data-cy="student-card"]')
            .eq(index)
            .children()
            .children('[data-cy="student-age"]')
            .contains(element.age);

          cy.get('[data-cy="student-card"]')
            .eq(index)
            .children()
            .children('[data-cy="student-grade"]')
            .contains(element.grade);
        });
      });

      cy.get('[data-cy="view-dtl-btn"]').eq(3).click();

      cy.url().should("eq", url + "details/4");

      cy.get('[data-cy="details-component"]').should("exist");

      cy.then(() => {
        acc_score += 2;
      });
    });

    it("Check the navbar should have proper structure", () => {
      cy.visit(url);
      cy.get('[data-cy="navbar"]').should("exist");

      cy.get('[data-cy="navbar-home-link"]').should("exist");
      cy.get('[data-cy="navbar-home-link"]').contains(
        "Student management system"
      );

      cy.get('[data-cy="navbar-home-link"]').click();
      cy.url().should("eq", url);
      cy.get('[data-cy="home-component"]').should("exist");

      cy.get('[data-cy="add-new-button"]').should("exist");
      cy.get('[data-cy="add-new-button"]').contains("Add New Student");

      cy.get('[data-cy="add-new-button"]').click();
      cy.url().should("eq", url + "addnew");
      cy.get('[data-cy="add-new-component"]').should("exist");

      cy.get('[data-cy="navbar-home-link"]').click();
      cy.url().should("eq", url);
      cy.get('[data-cy="home-component"]').should("exist");

      cy.then(() => {
        acc_score += 2;
      });
    });

    it("Check able to add a new student", () => {
      cy.visit(url);

      let formData = {
        name: "Subhankar Sarkar",
        grade: "11",
        age: "24",
        additionalInfo:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nisi hic molestias reprehenderit molestiae soluta suscipit inventore voluptatibus ea laboriosam.",
      };

      cy.get('[data-cy="add-new-button"]').click();
      cy.url().should("eq", url + "addnew");
      cy.get('[data-cy="add-new-component"]').should("exist");

      // partially error check
      cy.get('[data-cy="form-student-name"]').clear().type(formData.name);
      cy.get('[data-cy="form-student-age"]').clear().type(formData.age);

      cy.get('[data-cy="add-new-form"]').submit();

      cy.get('[data-cy="error-box"]').should("exist");
      cy.get('[data-cy="error-box"]').contains(
        "All the fields should be filled!"
      );

      // submit
      cy.intercept("POST", "**/students", (req) => {
        req.reply({
          statusCode: 200,
          body: formData,
        });
      }).as("postStudent");

      cy.get('[data-cy="form-student-name"]').clear().type(formData.name);
      cy.get('[data-cy="form-student-age"]').clear().type(formData.age);
      cy.get('[data-cy="error-box"]').should("not.exist");
      cy.get('[data-cy="form-student-grade"]').clear().type(formData.grade);
      cy.get('[data-cy="form-student-info"]')
        .clear()
        .type(formData.additionalInfo);

      cy.get('[data-cy="add-new-form"]').submit();

      cy.wait("@postStudent");

      cy.get('[data-cy="form-student-name"]').should("be.empty");
      cy.get('[data-cy="form-student-age"]').should("be.empty");
      cy.get('[data-cy="form-student-grade"]').should("be.empty");
      cy.get('[data-cy="form-student-info"]').should("be.empty");

      cy.intercept("GET", "**/students", {
        fixture: "updatedStudents.json",
      }).as("getUpdatedStudents");

      cy.get('[data-cy="navbar-home-link"]').click();
      cy.wait("@getUpdatedStudents");

      cy.url().should("eq", url);
      cy.fixture("updatedStudents").then((body) => {
        //  console.log("objBody",body);

        body.map((element, index) => {
          cy.get('[data-cy="student-card"]')
            .eq(index)
            .children('[data-cy="student-name"]')
            .contains(element.name);

          cy.get('[data-cy="student-card"]')
            .eq(index)
            .children()
            .children('[data-cy="student-age"]')
            .contains(element.age);

          cy.get('[data-cy="student-card"]')
            .eq(index)
            .children()
            .children('[data-cy="student-grade"]')
            .contains(element.grade);
        });
      });

      cy.then(() => {
        acc_score += 2;
      });
    });

    it("Check able to update a student Data", () => {
      cy.visit(url);

      cy.intercept("GET", "**/students", {
        fixture: "updatedStudents.json",
      }).as("getUpdatedStudents");

      let oldData = {
        name: "Subhankar Sarkar",
        grade: "11",
        age: "24",
        additionalInfo:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nisi hic molestias reprehenderit molestiae soluta suscipit inventore voluptatibus ea laboriosam.",
      };

      let newData = {
        name: "Subhankar Mondal",
        grade: "22",
        age: "25",
        additionalInfo:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nisi hic molestias reprehenderit molestiae.",
        id: 7,
      };

      cy.wait("@getUpdatedStudents");

      cy.intercept("GET", "**/students/7", {
        fixture: "noneditedStudents.json",
      }).as("getSingleStudents");

      // cy.get('[data-cy="student-card"]')
      //   .eq(6)
      //   .children()
      //   .children('[data-cy="view-dtl-btn"]')
      //   .click();
      cy.get('[data-cy="view-dtl-btn"]').eq(6).click();
      cy.url().should("eq", url + "details/7");

      cy.wait("@getSingleStudents");

      cy.get('[data-cy="student-details-name"]').contains(oldData.name);
      cy.get('[data-cy="student-details-age"]').contains(oldData.age);
      cy.get('[data-cy="student-details-grade"]').contains(oldData.grade);
      cy.get('[data-cy="student-details-info"]').contains(
        oldData.additionalInfo
      );

      cy.get('[data-cy="edit-Btn"]').click();
      cy.url().should("eq", url + "edit/7");

      cy.wait("@getSingleStudents");

      cy.get('[data-cy="edit-form-student-name"]').should(
        "have.value",
        oldData.name
      );
      cy.get('[data-cy="edit-form-student-age"]').should(
        "have.value",
        oldData.age
      );
      cy.get('[data-cy="edit-form-student-grade"]').should(
        "have.value",
        oldData.grade
      );
      cy.get('[data-cy="edit-form-student-info"]').should(
        "have.value",
        oldData.additionalInfo
      );

      // submit
      cy.intercept("PUT", "**/students/7", (req) => {
        req.reply({
          statusCode: 200,
          body: newData,
        });
      }).as("editStudent");

      cy.intercept("GET", "**/students/7", {
        fixture: "editedStudents.json",
      }).as("getNewSingleStudents");

      cy.get('[data-cy="edit-form-student-name"]').clear().type(newData.name);
      cy.get('[data-cy="edit-form-student-age"]').clear().type(newData.age);
      cy.get('[data-cy="edit-form-student-grade"]').clear().type(newData.grade);
      cy.get('[data-cy="edit-form-student-info"]')
        .clear()
        .type(newData.additionalInfo);

      cy.get('[data-cy="edit-form"]').submit();

      cy.wait("@editStudent");

      cy.wait("@getNewSingleStudents");
      cy.url().should("eq", url + "details/7");

      cy.get('[data-cy="student-details-name"]').contains(newData.name);
      cy.get('[data-cy="student-details-age"]').contains(newData.age);
      cy.get('[data-cy="student-details-grade"]').contains(newData.grade);
      cy.get('[data-cy="student-details-info"]').contains(
        newData.additionalInfo
      );

      cy.then(() => {
        acc_score += 2;
      });
    });

    it("Check able to delete a student Data", () => {
      cy.visit(url);

      cy.intercept("GET", "**/students", {
        fixture: "updatedStudents.json",
      }).as("getUpdatedStudents");

      cy.wait("@getUpdatedStudents");

      cy.get('[data-cy="student-list"]').children().should("have.length", 7);

      cy.intercept("GET", "**/students/7", {
        fixture: "noneditedStudents.json",
      }).as("getSingleStudents");

     
      cy.get('[data-cy="view-dtl-btn"]').eq(6).click();
      cy.url().should("eq", url + "details/7");

      cy.wait("@getSingleStudents");

      cy.intercept("DELETE", "**/students/7", {
        fixture: "noneditedStudents.json",
      }).as("deleteSingleStudents");

      cy.intercept("GET", "**/students", {
        fixture: "students.json",
      }).as("getStudents");

      cy.get('[data-cy="delete-Btn"]').click();

      cy.wait("@deleteSingleStudents");
      cy.wait("@getStudents");

      cy.url().should("eq", url);

      cy.get('[data-cy="student-list"]').children().should("have.length", 6);

      cy.then(() => {
        acc_score += 2;
      });
    });
    
    it("Check able to redirect invalid route", () => {
      cy.visit(url+"invalid");
      
      cy.get('[data-cy="invalid-component"]').should("exist");
      cy.get('[data-cy="invalid-code"]').should("exist");
      cy.get('[data-cy="invalid-code"]').contains("404");

      cy.get('[data-cy="invalid-message"]').should("exist");
      cy.get('[data-cy="invalid-component"]').contains("page not found !");

      cy.get('[data-cy="back-home"]').should("exist");
      cy.get('[data-cy="back-home"]').click();
      cy.url().should("eq", url);


      cy.then(() => {
        acc_score += 2;
      });
    });

    after(() => {
      let result = {
        id,
        marks: Math.ceil(acc_score),
      };
      result = JSON.stringify(result);
      cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  });
});
