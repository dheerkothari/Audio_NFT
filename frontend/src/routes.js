import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
// import AddProduct from './pages/AddProduct';
import Dashboard from './Components/Dashboard';
import SignIn from './Components/SighIn';
import SignUp from './Components/SighUp';

const PrivateRoute = (props) => {
  const token = localStorage.getItem('token');

  return token ? <Route {...props} /> : <Redirect to="/login" />
}

const AuthRoute = (props) => {
  const token = localStorage.getItem('token');

  return token ? <Redirect to="/dashboard" /> : <Route {...props} />;
}

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path={["/dashboard"]} component={Dashboard} exact />
        <AuthRoute path={["/"]} component={SignIn} exact />
        <AuthRoute path="/signup" component={SignUp} exact />
      </Switch>
    </Router>
  )
};

export default Routes;