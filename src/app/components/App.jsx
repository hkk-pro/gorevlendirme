import React from 'react';
import { store } from '../store';
import { Provider } from 'react-redux';
import Dashboard from './Dashboard';
import { Router, Route } from 'react-router-dom';
import { history } from '../store/history';
import Navigation from './Navigation';
import TaskDetail from './TaskDetail';
import { Redirect } from 'react-router'
import Login from './Login'



const RouteGuard = Component => ({ match }) => {
  if (!store.getState().session.authenticated) {
   return <Redirect to="/" /> 

  } {
    return <Component match={match} />;
  }
}






export const App = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <Navigation />
        <Route exact path='/' component={Login}></Route>
        <Route exact path='/dashboard' render={RouteGuard(Dashboard)}></Route>
        <Route exact path='/task/:id' render={RouteGuard(TaskDetail)}></Route>
      </Provider>
    </Router>
  );
};
