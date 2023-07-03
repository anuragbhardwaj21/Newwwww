import { Switch, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import AddNewStudent from '../Pages/AddNewStudent';
import Details from '../Pages/Details';
import EditStudentDetails from '../Pages/EditStudentDetails';
import Invalid from '../Pages/Invalid';

const MainRoutes = () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/addnew" component={AddNewStudent} />
      <Route path="/details/:id" component={Details} />
      <Route path="/edit/:id" component={EditStudentDetails} />
      <Route component={Invalid} />
    </div>
  );
};

export default MainRoutes;
