import React, { useEffect, useState } from 'react';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
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
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
   <div></div>
  );
};

export default Pagination;
