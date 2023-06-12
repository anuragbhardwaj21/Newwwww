/* eslint-disable no-undef */

import data from "../../submissionData.json"; // do not create this file

import mockdata from "../fixtures/dbjsonData.json";
import threeUnitsOfData from "../fixtures/ony6lectures.json";

// const data = [
//   {
//     submission_link: "http://localhost:3000",
//     id: "manish-local",
//     json_server_link: `http://localhost:8080/`,
//   },
// ];

function checktable(startIndex, endIndex, lectures) {
  cy.wait(100);
  for (let i = startIndex, j = 0; i < endIndex && j < 5; i++, j++) {
    cy.get("tbody tr")
      .eq(j)
      .each((ele, ind) => {
        console.log(i, lectures[i]);
        cy.wrap(ele).find("td").eq(0).should("have.text", lectures[i].title);
        cy.wrap(ele).find("td").eq(1).should("have.text", lectures[i].category);
        cy.wrap(ele).find("td").eq(2).should("have.text", lectures[i].batch);
        cy.wrap(ele).find("td").eq(3).should("have.text", lectures[i].schedule);
        cy.wrap(ele).find("td").eq(4).should("have.text", lectures[i].conclude);
        cy.wrap(ele).find("td").eq(5).should("have.text", lectures[i].user);
        cy.wrap(ele).find("td button").eq(0).should("have.text", "Delete");
      });
  }
}

data.forEach(({ submission_link: url, id, json_server_link: server_url }) => {
  describe("react-course-platform", function () {
    let acc_score = 1;

    beforeEach(() => {
      if (url.charAt(url.length - 1) != "/") {
        url = url + "/";
      }

      Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });

      cy.writeFile("db.json", mockdata, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });

    it("On page load check basic structure is present(form and lectures are visible in the table)", () => {
      cy.visit(url);
      cy.get("h1").eq(0).should("contain","Course Platform")
      cy.get("form").should("exist");
      cy.get("table").should("exist");
      cy.get("tbody").children().should("have.length.greaterThan", 4);
      cy.get("tbody tr").children().should("have.length.greaterThan", 4);
      cy.get(".pagination button").should("have.length", 3);
      cy.then(() => {
        acc_score += 1;
      });
    });

    it("check whether 5 lectures are present with correct lecture details on pageload", () => {
      cy.intercept("GET", "**/lectures*").as("getLectures");
      cy.visit(url);
      cy.wait("@getLectures");
      cy.get("tbody").children().should("have.length", 5);
      let lectures = mockdata.lectures;
      checktable(0, 5, lectures);
      cy.then(() => {
        acc_score += 2;
      });
    });

    it("Check whether able to access all the pages", () => {
      cy.intercept("GET", "**/lectures?*").as("getLectures");
      cy.visit(url);
      let lectures = mockdata.lectures;
      cy.wait("@getLectures");
      checktable(0, 5, lectures);
      cy.get(".pagination button").eq(2).click({ force: true });
      cy.wait("@getLectures");
      checktable(5, 10, lectures);
      cy.get(".pagination button").eq(2).click({ force: true });
      cy.wait("@getLectures");
      checktable(10, 15, lectures);
      cy.then(() => {
        acc_score += 2;
      });
    });

    it("Check pagination component is not hardcoded and buttons are getting disabled appropriately", () => {
      let requestCount = 0;
      cy.intercept("GET", "**/lectures?*", (req) => {
        if (requestCount === 0) {
          req.reply({
            body: threeUnitsOfData,
            headers: {
              "X-Total-Count": "3",
            },
          });
        } else {
          req.continue();
        }
        requestCount++;
      }).as("getLectures");
      cy.visit(url);
      cy.wait("@getLectures");
      cy.get(".pagination button").should("have.length", 3);
      cy.get(".pagination button")
        .eq(0)
        .should("contain", "Previous")
        .should("be.disabled");
      cy.get(".pagination button").eq(1).should("contain", 1);
      cy.get(".pagination button")
        .eq(2)
        .should("contain", "Next")
        .should("be.disabled");
      cy.reload();
      cy.wait("@getLectures");
      cy.get(".pagination button").should("have.length", 3);
      cy.get(".pagination button")
        .eq(0)
        .should("contain", "Previous")
        .should("be.disabled");
      cy.get(".pagination button").eq(1).should("contain", 1);
      cy.get(".pagination button")
        .eq(2)
        .should("contain", "Next")
        .should("not.be.disabled")
        .click({ force: true });
      cy.wait("@getLectures");
      cy.get(".pagination button")
        .eq(0)
        .should("contain", "Previous")
        .should("not.be.disabled");
      cy.get(".pagination button").eq(1).should("contain", 2);
      cy.get(".pagination button")
        .eq(2)
        .should("contain", "Next")
        .should("not.be.disabled")
        .click({ force: true });
      cy.wait("@getLectures");
      cy.get(".pagination button").should("have.length", 3);
      cy.get(".pagination button")
        .eq(0)
        .should("contain", "Previous")
        .should("not.be.disabled");
      cy.get(".pagination button").eq(1).should("contain", 3);
      cy.get(".pagination button")
        .eq(2)
        .should("contain", "Next")
        .should("be.disabled");
      cy.then(() => {
        acc_score += 2;
      });
    });

    it("Check delete functionality is working or not", () => {
      cy.intercept("GET", "**/lectures?*").as("getLectures");
      cy.intercept("DELETE", "**/lectures/15").as("delete15Lectures");
      cy.intercept("DELETE", "**/lectures/14").as("delete14Lectures");
      cy.visit(url);
      cy.wait("@getLectures");
      cy.get(".pagination button")
        .should("have.length", 3)
        .eq(1)
        .should("contain", 1);
      cy.get(".pagination button")
        .should("have.length", 3)
        .eq(2)
        .should("contain", "Next")
        .click({ force: true });
      cy.wait("@getLectures");
      cy.get(".pagination button")
        .should("have.length", 3)
        .eq(1)
        .should("contain", 2);
      cy.get(".pagination button")
        .should("have.length", 3)
        .eq(2)
        .should("contain", "Next")
        .click({ force: true });
      cy.wait("@getLectures");

      cy.get("tbody tr").should("have.length", 5);
      cy.get("td button").last().click({ force: true });
      cy.wait("@delete15Lectures");
      cy.wait("@getLectures");
      let lectures = mockdata.lectures;
      checktable(10, 14, lectures);
      cy.get("tbody tr").should("have.length", 4);
      cy.get("td button").last().click({ force: true });
      cy.wait("@delete14Lectures");
      cy.wait("@getLectures");
      cy.get("tbody tr").should("have.length", 3);
      checktable(10, 13, lectures);
      cy.then(() => {
        acc_score += 2;
      });
    });

    it("Able to create the lecture and data is getting updated on DOM in real time", () => {
      cy.intercept("GET", "**/lectures?*").as("getLectures");
      cy.intercept("POST", "**/lectures*").as("createLecture");
      cy.visit(url);
      cy.wait("@getLectures");
      cy.get("form")
        .within(() => {
          cy.get('input[name="title"]').clear().type("Sample Lecture");
          cy.get('select[name="category"]').select("DSA");
          cy.get('select[name="batch"]').select("CAP-05");
          cy.get('input[name="schedule"]').clear().type("2023-06-01T09:00");
          cy.get('input[name="conclude"]').clear().type("2023-06-01T10:00");
          cy.get('select[name="user"]').select("User 2");
        })
        .then(() => {
          cy.get("form").submit();
        });
      let createdLecture = {
        title: "Sample Lecture",
        category: "dsa",
        batch: "CAP-05",
        schedule: "2023-06-01T09:00",
        conclude: "2023-06-01T10:00",
        user: "user2",
      };
      // Verify the post request is made and lecture details are updated on the DOM
      cy.wait("@createLecture");
      cy.wait("@getLectures");
      cy.get(".pagination button")
        .eq(2)
        .should("contain", "Next")
        .click({ force: true });
      cy.wait("@getLectures");
      cy.get(".pagination button")
        .eq(2)
        .should("contain", "Next")
        .click({ force: true });
      cy.wait("@getLectures");
      cy.get(".pagination button")
        .eq(2)
        .should("contain", "Next")
        .click({ force: true });
      cy.wait("@getLectures");
      cy.get("tbody tr").should("have.length", 1);
      let lectures = [createdLecture];
      checktable(0, 1, lectures);
      cy.then(() => {
        acc_score += 3;
      });
    });

    it("form reset to intial state after lecture is created successfully", () => {
      cy.intercept("GET", "**/lectures?*").as("getLectures");
      cy.intercept("POST", "**/lectures*").as("createLecture");
      cy.visit(url);
      cy.wait("@getLectures");
      cy.get("form")
        .within(() => {
          cy.get('input[name="title"]').clear().type("Sample Lecture");
          cy.get('select[name="category"]').select("DSA");
          cy.get('select[name="batch"]').select("CAP-05");
          cy.get('input[name="schedule"]').clear().type("2023-06-01T09:00");
          cy.get('input[name="conclude"]').clear().type("2023-06-01T10:00");
          cy.get('select[name="user"]').select("User 2");
        })
        .then(() => {
          cy.get("form").submit();
        });
      let createdLecture = {
        title: "Sample Lecture",
        category: "dsa",
        batch: "CAP-05",
        schedule: "2023-06-01T09:00",
        conclude: "2023-06-01T10:00",
        user: "user2",
      };
      // Verify the post request is made and lecture details are updated on the DOM
      cy.wait("@createLecture");
      cy.wait("@getLectures");
      cy.get("#titleInput").should("have.value", "");
      cy.get("#categoryInput").should("have.value", "");
      cy.get("#batchInput").should("have.value", "");
      cy.get("#scheduleInput").should("have.value", "");
      cy.get("#concludeInput").should("have.value", "");
      cy.get("#userInput").should("have.value", "");
      cy.then(() => {
        acc_score += 1;
      });
    });


    it("Delete and page numbered buttons having classNames as mentioned in the problem statement", () => {
      cy.intercept("GET", "**/lectures?*").as("getLectures");
      cy.visit(url);
      let lectures = mockdata.lectures;
      cy.wait("@getLectures");
      cy.get("tbody tr").each((ele) => {
        cy.wrap(ele)
          .find("button")
          .should("have.class", "bgRed");
      });
      cy.get(".pagination button").eq(1).should("have.class", "bgGreen");
      cy.then(() => {
        acc_score += 1;
      });
    });

    it(`generate score`, () => {
      console.log("final score:", acc_score);
      ////////////// this should not be changed
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
      //////////////////
    });
  });
});
