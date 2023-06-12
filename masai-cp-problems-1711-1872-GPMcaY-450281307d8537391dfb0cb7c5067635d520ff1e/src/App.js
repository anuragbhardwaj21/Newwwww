import React, { useEffect, useState } from 'react';
import './App.css';
import CreateLecture from './Components/CreateLecture';
import ShowLectures from './Components/ShowLectures';
import Pagination from './Components/Pagination';

const App = () => {
  const [lectures, setLectures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLectures = () => {
    fetch(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/lectures?_limit=5&_page=${currentPage}`)
      .then((response) => {
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

  useEffect(() => {
    fetchLectures();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <h1>Course Platform</h1>
      <CreateLecture refreshLectures={fetchLectures} />
      <ShowLectures lectures={lectures} refreshLectures={fetchLectures} />
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
