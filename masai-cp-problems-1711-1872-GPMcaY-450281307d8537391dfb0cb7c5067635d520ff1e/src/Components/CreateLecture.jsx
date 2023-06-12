import React, { useState } from "react";

function CreateLecture() {
  const [{ inputData, setInputData }] = useState({
    title: "",
    category: "",
    batch: "",
    schedule: "",
    conclude: "",
    user: "",
  });

  const handleSubmitt = (event) => {
    event.preventDefault();
    fetch(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    })
      .then((response) => response.json())
      .then((data) => {
        setInputData({
          title: "",
          category: "",
          batch: "",
          schedule: "",
          conclude: "",
          user: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCh = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmitt}>
        <div>
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            id="titleInput"
            name="title"
            value={inputData.title}
            onChange={handleCh}
          />
        </div>
        <div>
          <label htmlFor="categoryInput">Category:</label>
          <select
            id="categoryInput"
            name="category"
            value={inputData.category}
            onChange={handleCh}
          >
            <option value="">Select Category</option>
            <option value="dsa">DSA</option>
            <option value="coding">Coding</option>
            <option value="da">DA</option>
          </select>
        </div>
        <div>
          <label htmlFor="batchInput">Batch:</label>
          <select id="batchInput" name="batch" value={inputData.batch} onChange={handleCh}>
            <option value="">Select Batch</option>
            <option value="CAP-05">CAP-05</option>
            <option value="PT-WEB-16">PT-WEB-16</option>
            <option value="CAP-04">CAP-04</option>
            <option value="FT-WEB-27">FT-WEB-27</option>
            <option value="CAP-03">CAP-03</option>
          </select>
        </div>
        <div>
          <label htmlFor="scheduleInput">Schedule:</label>
          <input type="datetime-local" id="scheduleInput" name="schedule" value={inputData.schedule} onChange={handleCh}/>
        </div>
        <div>
          <label htmlFor="concludeInput">Concludes:</label>
          <input type="datetime-local" id="concludeInput" name="conclude" value={inputData.conclude} onChange={handleCh}/>
        </div>
        <div>
          <label htmlFor="userInput">User:</label>
          <select id="userInput" name="user" value={inputData.user} onChange={handleCh}>
            <option value="">Select User</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
            <option value="user3">User 3</option>
          </select>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default CreateLecture;
