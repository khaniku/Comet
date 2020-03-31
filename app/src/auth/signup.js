import React from 'react';
//import styles from './signup.scss'; 
import Select from 'react-select';

const options = [
    { value: 'Manager', label: 'Manager' },
    { value: 'Requester', label: 'Requester' },
];

const reactFormContainer = document.querySelector('.react-form-container')

class ReactFormLabel extends React.Component {
 constructor(props) {
  super(props)
 }

 render() {
  return(
   <label className="label" htmlFor={this.props.htmlFor}>{this.props.title}</label>
  )
 }
}

export default class SignUp extends React.Component {
 constructor(props) {
  super(props)

  this.state = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    selectedOption: null,
    errorText: '',
    showError: false,
    loading: false
  }

  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
 }

 handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    });
 }

 handleDropDownChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };

 showPassword = () => {
    let x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }


 handleSubmit = (e, message) => {
    e.preventDefault();
    
    let formData = {
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    username: this.state.username,
    email: this.state.email,
    password: this.state.password,
    role: this.state.selectedOption.value
    }

    if (formData.firstName.length < 1 || formData.lastName.length < 1 || formData.username.length < 1 || formData.email.length < 1) {
    return false
    }
    this.signUp(formData);
  
 }

 async signUp(formData) {
    await fetch("http://159.203.100.198:5000/api/auth/signup", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then((response) => {
        response.json().then(responseJson => {
        if(responseJson.success){
            this.setState({loading: false})
            this.setState({ showError: false , errorText: ''});
            this.props.history.push("/login");
        } else {
            this.setState({loading: false})
            this.setState({showError: true , errorText: responseJson.message});
        }
        });
    })
    .catch((error) => {
    this.setState({loading: false})
    this.setState({showError: true , errorText: 'Something went wrong. Please try again!'});
    console.log(error);
    });
 }

    render() {
        const { selectedOption } = this.state;
        return(
            <form className='react-form' onSubmit={this.handleSubmit}>
                <h1>Sign Up</h1>
                {this.state.showError ? (
                    <p className="error_text">{this.state.errorText}</p>
                ) : null}
                <fieldset className='form-group'>
                <ReactFormLabel htmlFor='formName' title='First Name:' />

                <input className='input_signup' name='firstName' type='text' required onChange={this.handleChange} value={this.state.firstName} />
                </fieldset>

                <fieldset className='form-group'>
                <ReactFormLabel htmlFor='formName' title='Last Name:' />

                <input className='input_signup' name='lastName' type='text' required onChange={this.handleChange} value={this.state.lastName} />
                </fieldset>

                <fieldset className='form-group'>
                <ReactFormLabel htmlFor='formEmail' title='Email:' />

                <input id='formEmail' className='input_signup' name='email' type='email' required onChange={this.handleChange} value={this.state.email} />
                </fieldset>

                <fieldset className='form-group'>
                <ReactFormLabel htmlFor='formName' title='Username:' />

                <input  className='input_signup' name='username' type='text' required onChange={this.handleChange} value={this.state.username} />
                </fieldset>
                <fieldset className='form-group'>
                <ReactFormLabel htmlFor='formSubject' title='Password:'/>

                <input id='formSubject' className='input_signup' id="myInput" name='password' type='password' required onChange={this.handleChange} value={this.state.subject} />
                <div className="checkbox">
                    <input type="checkbox" onClick={this.showPassword} id="showPassword" name="showPassword" value="showPassword"/>
                    <ReactFormLabel htmlFor="showPassword" title='Show Password'/>
                </div>
                </fieldset>
                <fieldset className='form-group'>
                    <ReactFormLabel htmlFor='formSubject' title='Select Role:'/>
                    <Select
                        value={selectedOption}
                        onChange={this.handleDropDownChange}
                        options={options}
                    />
                </fieldset>

                <div className='form-group'>
                <input id='formButton' className='btn' type='submit' placeholder='Send message' />
                </div>
            </form>
    )
 }
}

