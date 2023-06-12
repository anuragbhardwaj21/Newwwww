import React from 'react';
import './App.css';
import CreateLecture from './Components/CreateLecture';
import ShowLectures from './Components/ShowLectures';
import Pagination from './Components/Pagination';

const App = () => {
  return (
    <div className="App">
      <h1>Course Platform</h1>
      <CreateLecture />
      <ShowLectures />
      <Pagination />
    </div>
  );
};

export default App;
