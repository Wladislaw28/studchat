import React from 'react';
import { Route, Router } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Auth, Home, Calendar } from './pages';

const App: React.FC = (props: any) => {
  const { isAuth } = props;
  return (
    <div className="wrapper">
      <Route exact path={["/login", "/register"]} component={Auth} />
      <Route exact path="/" render={() => (isAuth ? <Home /> : <Redirect to='/login' />)} />
    </div>
  );
}

export default connect(({ user }: any) => ({ isAuth: user.isAuth }))(App);
