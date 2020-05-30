import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Auth, Home, Calendar } from './pages';

const App: React.FC = (props: any) => {
  const { isAuth } = props;
  return (
    <div className="wrapper">
      <Switch>
        <Route
          exact
          path={["/login", "/register", "/register/verify"]}
          component={Auth}
        />
        <Route
          path="/"
          render={() => (isAuth ? <Home /> : <Redirect to="/login" />)}
        />

      </Switch>
    </div>
  );
}

export default connect(({ user }: any) => ({ isAuth: user.isAuth }))(App);
