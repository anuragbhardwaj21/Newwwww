import React, { useState } from 'react';

const CreateLecture = () => {
  const [lectureData, setLectureData] = useState({
    title: '',
    category: '',
    batch: '',
    schedule: '',
    conclude: '',
    user: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lectureData),
    };

    fetch('http://localhost:8080/lectures', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log('Lecture created:', data);
        setLectureData({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title</label>
          <input type="text" id="titleInput" name="title" value={lectureData.title} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="categoryInput">Category:</label>
          <select id="categoryInput" name="category" value={lectureData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="dsa">DSA</option>
            <option value="coding">Coding</option>
            <option value="da">DA</option>
          </select>
        </div>
        <div>
          <label htmlFor="batchInput">Batch:</label>
          <select id="batchInput" name="batch" value={lectureData.batch} onChange={handleChange} required>
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
            value={lectureData.schedule}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="concludeInput">Concludes:</label>
          <input
            type="datetime-local"
            id="concludeInput"
            name="conclude"
            value={lectureData.conclude}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="userInput">User:</label>
          <select id="userInput" name="user" value={lectureData.user} onChange={handleChange} required>
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
};

export default CreateLecture;
