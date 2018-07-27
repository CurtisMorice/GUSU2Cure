import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Global/Header/Header';
import Landing from './components/Pages/Landing/Landing';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import UserHome from './components/Pages/UserHome/UserHome';
import RegisterPage from './components/Pages/RegisterPage/RegisterPage';


import './styles/main.css';

const App = () => (
  <div>
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={Landing}
        />
        <Route
          path="/login"
          component={LoginPage}
        />
        <Route
          path="/user"
          component={UserHome}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
