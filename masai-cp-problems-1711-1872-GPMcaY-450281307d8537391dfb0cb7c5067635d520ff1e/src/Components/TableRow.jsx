import React from 'react';

const TableRow = ({ lecture, refreshLectures }) => {
  const handleDelete = () => {
    fetch(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/lectures/${lecture.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.log('Delete Response:', response);
        // Trigger a refresh of lectures after successful delete
        refreshLectures();
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
