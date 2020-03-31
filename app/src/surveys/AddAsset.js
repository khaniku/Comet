import React from "react";
import PropTypes from "prop-types";
import "./newSurvey.css";


export default class AddAsset extends React.Component {
  static propTypes = {
    clickHandler: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
        siteAddress : '', 
        customerName : '',
        customerEmail : '',
     
     
    }
    //this._checkLogin();
  }

  handleAddressChange(event) {
    this.setState({siteAddress: event.target.value});
  }
  handleCustomerNameChange(event) {
    this.setState({customerName: event.target.value});
  }
  handleCustomerEmailChange(event) {
    this.setState({customerEmail: event.target.value});
  }

  handleClick = buttonName => {
    this.props.clickHandler(buttonName);
  };

  submitSurvey = buttonName => {
    this.props.clickHandler(buttonName);
  }

  render() {
    return (
   
        <form>
       
        <div>
        <input 
        type="text" 
        value={this.state.companyName}
        placeholder="Name of Customer" 
        required 
      />
      </div>
      <div>
        <input 
        type="text" 
        value={this.state.companyName}
        placeholder="Customer ID" 
        required 
      />
      </div>
      <div>
      <input 
        type="text" 
        value={this.state.companyName}
        placeholder="Customers email" 
        required 
      />
      </div>
      <div>
      <input 
        type="text" 
        value={this.state.companyName}
        placeholder="Site Address" 
        required 
      />
      </div>

      <button>Create Survey</button>
    
      </form>

     
    
    
    
    
        );
  }
}


