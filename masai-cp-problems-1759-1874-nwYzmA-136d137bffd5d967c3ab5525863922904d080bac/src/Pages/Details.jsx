import { useParams, useHistory } from 'react-router-dom';

export const Details = () => {
  const { id } = useParams();
  const history = useHistory();
  
  // Fetch student details based on the id using useEffect or fetch here

  const handleEditClick = () => {
    history.push(`/edit/${id}`);
  };

  const handleDeleteClick = () => {
    // Handle delete functionality here
    // Redirect to home page after deletion
    history.push('/');
  };

  return (
    <div data-cy="details-component">
      <h1>Student Details</h1>

      <div>
        <h3 data-cy="student-id">ID: {id}</h3>
        {/* Display other student details here */}
      </div>

      <div>
        <button onClick={handleEditClick} data-cy="edit-btn">Edit</button>
        <button onClick={handleDeleteClick} data-cy="delete-btn">Delete</button>
      </div>
    </div>
  );
};
export default Details