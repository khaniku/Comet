
import React from "react";
import { Switch } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import Login from "../auth/login.js";
import AuthChecker from "../auth/AuthChecker";
// import Dashboard from '../dashboard';
import Page from "../surveys/components/page";
import SignUp from "../auth/signup.js";
import { connect } from "react-redux";
import * as actions from "../actions";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={AuthChecker} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
        <AuthenticatedRoute path="/surveys/components" component={Page} />
      </Switch>
    );
import React from 'react';
import { Switch } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom'
import Login from '../auth/login.js';
import AuthChecker from '../auth/AuthChecker';
import viewAllSurvey from '../viewAllSurvey/viewAllSurvey';
import Dashboard from '../dashboard';
import SignUp from '../auth/signup.js';
import createSurvey from '../surveys/createSurvey';
import allSurvey from '../viewAllSurvey/index';
import newSurvey from '../surveys/newSurvey';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Routes extends React.Component {
    render() {
        return (
        <Switch>
            {/* <Route path="/" exact component={AuthChecker} /> */}
            <Route path="/" exact component={createSurvey} />
            
            <Route path="/newSurvey" exact component={newSurvey} />
            

            

            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
            <AuthenticatedRoute path="/dashboard" component={Dashboard} />  
            
        </Switch>
        );
    }
  }
=======
import React from 'react';
import { Switch } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom'
import Login from '../auth/login.js';
import AuthChecker from '../auth/AuthChecker';
import Dashboard from '../dashboard';
import Page from '../surveys/components/page'
import SignUp from '../auth/signup.js';
import {connect} from 'react-redux';
import createSurvey from '../newSurvey/createSurvey'
import navigation from '../navBar/navigation'
import * as actions from '../actions';

class Routes extends React.Component {
    render() {
        return (
        <Switch>
            <Route path="/" exact component={AuthChecker} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/navigation" exact component={navigation} />
             
            <Route path="/createSurvey" exact component = {createSurvey} />
            {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
            <AuthenticatedRoute path="/dashboard" component={Dashboard} /> 
        </Switch>
        );
    }
>>>>>>> 675821c48806d85b1d976db13563645da120a1bc
}


const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("accessToken") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default connect(null, actions)(Routes);
