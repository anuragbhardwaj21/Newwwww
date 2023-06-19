import React from 'react';

const ShowLectures = ({ lectures, refreshLectures }) => {
  const handleDelete = (id) => {
    fetch(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/lectures/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        refreshLectures();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="show-lecture">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Batch</th>
            <th>Schedule</th>
            <th>Conclude</th>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {lectures.map((lecture) => (
            <tr key={lecture.id} className="table-row">
              <td>{lecture.title}</td>
              <td>{lecture.category}</td>
              <td>{lecture.batch}</td>
              <td>{lecture.schedule}</td>
              <td>{lecture.conclude}</td>
              <td>{lecture.user}</td>
              <td>
                <button className="bgRed" onClick={() => handleDelete(lecture.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowLectures;
