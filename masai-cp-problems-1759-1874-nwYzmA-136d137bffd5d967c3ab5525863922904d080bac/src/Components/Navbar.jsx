import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div data-cy="navbar">
      <div data-cy="navbar-home-link">
        <Link to="/">Student management system</Link>
      </div>

      <div>
        <Link to="/addnew" data-cy="add-new-button">Add New Student</Link>
      </div>
    </div>
  );
};

export default Navbar;
