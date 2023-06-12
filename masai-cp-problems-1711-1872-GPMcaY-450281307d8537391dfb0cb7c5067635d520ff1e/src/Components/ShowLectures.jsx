import React, { useEffect, useState } from 'react';
import TableRow from './TableRow';

const ShowLectures = () => {
  const [lectures, setLectures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    showLectures();
  }, [currentPage]);

  const showLectures = () => {
    fetch(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/lectures?_page=${currentPage}&_limit=5`)
      .then((response) => {
        // Get the total number of lectures from the response headers
        const totalCount = response.headers.get('X-Total-Count');
        setTotalPages(Math.ceil(totalCount / 5));
        return response.json();
      })
      .then((data) => {
        setLectures(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleRefreshLectures = () => {
    showLectures();
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
            <TableRow key={lecture.id} lecture={lecture} refreshLectures={handleRefreshLectures} />
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`${currentPage} / ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ShowLectures;
