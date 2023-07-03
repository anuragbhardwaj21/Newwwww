import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../Components/Card';

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/students');
      const data = await response.json();
      setStudents(data);
    };

    fetchData();
  }, []);

  return (
    <div data-cy="home-component">
      <h1>Students List</h1>

      <div data-cy="student-list">
        {students.map(student => (
          <Card
            key={student.id}
            id={student.id}
            name={student.name}
            age={student.age}
            grade={student.grade}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
