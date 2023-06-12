import React, { useState } from 'react';

const CreateLecture = ({ refreshLectures }) => {
  const [inputData, setinputData] = useState({
    title: '',
    category: '',
    batch: '',
    schedule: '',
    conclude: '',
    user: '',
  });

  const handlenew = (event) => {
    const { name, value } = event.target;
    setinputData((previnputData) => ({
      ...previnputData,
      [name]: value,
    }));
  };

  const handleEnter = (event) => {
    event.preventDefault();

    fetch(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/lectures`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    })
      .then((response) => {
        console.log('Create Response:', response);
        // Trigger a refresh of lectures after successful submission
        refreshLectures();
        setinputData({
          title: '',
          category: '',
          batch: '',
          schedule: '',
          conclude: '',
          user: '',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputData),
    };

    fetch(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/lectures`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create lecture');
        }
        refreshLectures();
        setinputData({
          title: '',
          category: '',
          batch: '',
          schedule: '',
          conclude: '',
          user: '',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title</label>
          <input type="text" id="titleInput" name="title" value={inputData.title} onChange={handlenew} />
        </div>
        <div>
          <label htmlFor="categoryInput">Category:</label>
          <select id="categoryInput" name="category" value={inputData.category} onChange={handlenew}>
            <option value="">Select Category</option>
            <option value="dsa">DSA</option>
            <option value="coding">Coding</option>
            <option value="da">DA</option>
          </select>
        </div>
        <div>
          <label htmlFor="batchInput">Batch:</label>
          <select id="batchInput" name="batch" value={inputData.batch} onChange={handlenew}>
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
          <input
            type="datetime-local"
            id="scheduleInput"
            name="schedule"
            value={inputData.schedule}
            onChange={handlenew}
          />
        </div>
        <div>
          <label htmlFor="concludeInput">Concludes:</label>
          <input
            type="datetime-local"
            id="concludeInput"
            name="conclude"
            value={inputData.conclude}
            onChange={handlenew}
          />
        </div>
        <div>
          <label htmlFor="userInput">User:</label>
          <select id="userInput" name="user" value={inputData.user} onChange={handlenew}>
            <option value="">Select User</option>
            <option value="User 1">User 1</option>
            <option value="User 2">User 2</option>
            <option value="User 3">User 3</option>
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateLecture;