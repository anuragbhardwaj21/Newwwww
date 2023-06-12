import React from 'react';

const TableRow = ({ lecture }) => {
  const handleDelete = () => {
    const requestOptions = {
      method: 'DELETE',
    };

    fetch(`http://localhost:8080/lectures/${lecture.id}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log('Lecture deleted');
          // Refresh the lecture data after successful deletion
          window.location.reload();
        } else {
          console.error('Error:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <tr className="table-row">
      <td>{lecture.title}</td>
      <td>{lecture.category}</td>
      <td>{lecture.batch}</td>
      <td>{lecture.schedule}</td>
      <td>{lecture.conclude}</td>
      <td>{lecture.user}</td>
      <td>
        <button className="bgRed" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
