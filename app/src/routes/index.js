import React from "react";
import { Switch } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import Login from "../auth/login.js";
import AuthChecker from "../auth/AuthChecker";
import Dashboard from "../dashboard";
import SignUp from "../auth/signup.js";
import { connect } from "react-redux";
import * as actions from "../actions";

class Routes extends React.Component {
<<<<<<< HEAD
  render() {
    return (
      <Switch>
        {/* <Route path="/" exact component={AuthChecker} /> */}
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
        {/* <AuthenticatedRoute path="/dashboard" component={Dashboard} />   */}
      </Switch>
    );
=======
    render() {
        return (
        <Switch>
            <Route path="/" exact component={AuthChecker} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
            <AuthenticatedRoute path="/dashboard" component={Dashboard} /> 
        </Switch>
        );
    }
>>>>>>> b0fa5e063c36f01850ce69ec7b33902c5c832501
  }
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("accessToken") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default connect(null, actions)(Routes);
