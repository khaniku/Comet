import React from "react";
import PropTypes from "prop-types";
import "./newSurvey.css";



export default class newSurvey extends React.Component {
  static propTypes = {
    clickHandler: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {

        userID : '',
        dueDate : '',
        siteAddress : '', 
        customerName : '',
        customerID : '',
        customerEmail : '',
            
     
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this._checkLogin();
  }

  handleChange(event) {
    this.setState({siteAddress: event.target.siteAddress});
    this.setState({customerName: event.target.customerName})
    this.setState({customerID: event.target.customerID});
    this.setState({customerEmail: event.target.customerEmail})
    this.setState({userID: event.target.userID});
    this.setState({dueDate: event.target.dueDate})
    
  }
  

 
  handleSubmit = (e, message) => {
    e.preventDefault();
    
    let formData = {
    userID : this.state.userID,
    dueDate : this.state.dueDate,    
    SiteAddress: this.state.siteAddress,
    customerName: this.state.customerName,
    customerID: this.state.customerID,
    customerEmail: this.state.customerEmail,

    }
    if (formData.SiteAddress.length < 1 || formData.customerName.length < 1 || formData.customerID.length < 1 || formData.customerEmail.length < 1) {
      return false
      }
      this.createSurvey(formData);
  }
  async createSurvey(formData) {
    await fetch("http://159.203.100.198:5000/api/auth/survey/SurveyController", {
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
            this.props.history.push("/newSurvey");
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
    return (
   
        <form onSubmit={this.handleSubmit}>

<label>
            User ID: 
            <textarea type ="text" value={this.state.userID} onChange={this.handleChange} />
         
          </label>
          <label>
            : Due Date
            <textarea type ="text" value={this.state.dueDate} onChange={this.handleChange} />
         
          </label>
          <label>
            Address: 
            <textarea type ="text" value={this.state.siteAddress} onChange={this.handleChange} />
         
          </label>

          <label>
            Customer Name: 
            <input type ="text" value={this.state.customerName} onChange={this.handleChange} />
           
          </label>

          <label>
            Customer ID: 
            <input type ="text" value={this.state.customerID} onChange={this.handleChange} />
           
          </label>

          <label>
            Customer email: 
            <input type ="text" value={this.state.customerEmail} onChange={this.handleChange} />
            
          </label> 
            
          <label>
          
            <input id='formButton' type = "submit" value = "Create Survey"  onClick={this.handleSubmit}/>   
          </label>    
      </form>

        
        );
  }

}