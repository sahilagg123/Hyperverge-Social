import React, { Fragment,useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
import { LOGOUT } from './actions/types';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute'
import Dashboard from './components/dashboard/Dashboard';
import Posts from './components/posts/Posts';
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar> </Navbar>
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute eaxct path='/profiles' component={Profiles}></PrivateRoute>
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <PrivateRoute eaxct path='/dashboard' component={Dashboard}></PrivateRoute>
            <PrivateRoute eaxct path='/posts' component={Posts}></PrivateRoute>
          </Switch>
        </section>
      </Fragment>
    </Router>
    </Provider>
  );
};
export default App;
