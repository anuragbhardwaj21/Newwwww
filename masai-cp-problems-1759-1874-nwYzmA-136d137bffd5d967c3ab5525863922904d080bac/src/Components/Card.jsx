import { Link } from 'react-router-dom';

export const Card = ({ id, name, age, grade }) => {
  return (
    <div data-cy="student-card">
      <h3 data-cy="student-name">Name: {name}</h3>

      <div>
        <h4 data-cy="student-age">Age: {age}</h4>
        <h4 data-cy="student-grade">Grade: {grade}</h4>
      </div>

      <Link to={`/details/${id}`} data-cy="view-dtl-btn">View Details</Link>
    </div>
  );
};
export default Card