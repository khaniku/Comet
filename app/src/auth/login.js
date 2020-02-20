import React from 'react';
import FORMAT from '../../sample/css/index.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {usernameOrEmail : '', password : ''}
    this.handleChange = this.handleChange.bind(this);	  
    this.handleSubmit = this.handleSubmit.bind(this);	  
  }

	render() {
	  return (
    <main>
        <nav>
		  {/*<a href="https://www.cometsigns.com/"><img src="../image/comet-logo.png" target="_blank" alt="comet signs logo"></a>
            <a href="https://www.cometsigns.com/"></a>*/}
        </nav>
        <div id="login">
            <div id="header">
                <header>
                    <h2 className={FORMAT.right-shift}>Existing User</h2>
                    <h3 className={FORMAT.right-shift}>Required fields:<span> *</span></h3>
                </header>
            </div>
            <p className={FORMAT.right-shift}>Log into your account:</p>

                <label for="email" className={FORMAT.right-shift}>Email: </label>
                <input type="email" value={this.state.usernameOrEmail} onChange={this.handleChange}  required><span id="email-required"> *</span>

                <label for="password" className={FORMAT.right-shift}>Password: </label>
                <input type="password" value={this.state.password} onChange={this.handleChange} required><span id="password-required"> *</span>

                {/* 
                <input type="checkbox" id="toggle">
                <label for="toggle" id="checkbox">Keep me logged in</label>
*/}

                <button id="login-button" onClick={()=> this.loginUser()}>Login</button>
            <p><a href="" alt="Password reset page" className={FORMAT.right-shift}>Forgot your password?</a></p>
        </div>

        <div id="sign-up">
            <form action="" method="post">
                <header>
                    <h2 className={FORMAT.right-shift}>New User</h2>
                </header>
                <section>
                    <p className={FORMAT.right-shift}>Create new user account:</p>
                    <button id="signup-button" className={FORMAT.right-shift}>Sign up</button>
                </section>
            </form>
        </div>
    </main>
	  )
	}

  async loginUser() {
  
  }

}
