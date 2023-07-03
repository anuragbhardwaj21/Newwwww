import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export const EditStudentDetails = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    // Fetch student details based on the id using useEffect or fetch here
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    // After successful submission, redirect to details page
    history.push(`/details/${id}`);
  };

  return (
    <div data-cy="edit-student-details-component">
      <h1>Edit Student Details</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} required />
        </div>

        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={handleAgeChange} required />
        </div>

        <div>
          <label>Grade:</label>
          <input type="text" value={grade} onChange={handleGradeChange} required />
        </div>

        <button type="submit" data-cy="submit-btn">Submit</button>
      </form>
    </div>
  );
};
export default EditStudentDetails