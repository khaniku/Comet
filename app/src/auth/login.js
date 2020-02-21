/** 
 * The Login class implements an authentication of a user
 */

import React from 'react';
import FORMAT from './style.css';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Link} from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        usernameOrEmail : '', 
        password : '',
        loading: false,
        errorText: '',
        showError: false
    }
  }

  /**
   * @description Updates state of usernameOrEmail
   * @param {Object} event 
   * @method
   */
  handleUsernameChange(event) {
    this.setState({usernameOrEmail: event.target.value});
  }
  
  /**
   * @description Updates state of password
   * @param {Object} event 
   * @method
   */
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

	render() {
	  return (
        <main>
            <nav>
            </nav>
        <div id="login">
            <div id="header">
                <header>
                    <h2 class={FORMAT.right_shift}>Existing User</h2>
                    <h3 class={FORMAT.right_shift}>Required fields:<span> *</span></h3>
                </header>
            </div>
            <p class={FORMAT.right_shift}>Log into your account:</p>
                {this.state.showError ? (
                                <p class={FORMAT.right_shift}>{this.state.errorText}</p>
                ) : null}
                <label for="email" class={FORMAT.right_shift}>Email: </label>
                <input type="email" value={this.state.value}  onChange={(e) => this.handleUsernameChange(e)}  required /><span id={FORMAT.email_required}> *</span>

                <label for="password" class={FORMAT.right_shift}>Password: </label>
                <input type="password" value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} required /><span id={FORMAT.password_required}> *</span>
                
                <button id={FORMAT.login_button} onClick={()=> this.loginUser()}>Login</button>
            <p><a href="./dashboard" alt="Password reset page" class={FORMAT.right_shift}>Forgot your password?</a></p>
        </div>
        {/*This should be in signup page */}
        <div id={FORMAT.sign_up}>
            <form action="" method="post">
                <header>
                    <h2 class={FORMAT.right_shift}>New User</h2>
                </header>
                <section>
                    <p class={FORMAT.righ_shift}>Create new user account:</p>
                    <button id={FORMAT.signup_button} ><Link to="/signup">Sign up</Link></button>
                </section>
            </form>
        </div>
    </main>
	  )
	}

    /**
     * @description API fetch request for user log in
     * @async  
     * @method
    */
    async loginUser() {
        await fetch("http://localhost:5000/api/auth/signin", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usernameOrEmail: this.state.usernameOrEmail,
            password: this.state.password
        }),
        })
        .then((response) => {
        if (response.ok) {
            response.json().then(responseJson => {
                localStorage.setItem('accessToken', responseJson.accessToken);
                this.props.Auth(responseJson.accessToken);
                this.props.history.push("/dashboard");
            });
        }else{
            this.setState({loading: false})
            this.setState({showError: true , errorText: 'The Username or Password is incorrect!'});
        }
        })
        .catch((error) => {
            this.setState({loading: false})
            this.setState({showError: true , errorText: 'Something went wrong. Please try again!'});
            console.log(error);
        });
    }

}


export default connect(null, actions)(Login)

