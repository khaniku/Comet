
import React from "react";
import PropTypes from "prop-types";

import "./ButtonPanel.css";
const data = [{
  1 : {
    height: ''
  },
  2 : {
    height: '',
    width: ''
  }
}]
export default class ButtonPanel extends React.Component {
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
      <div className="page Entry">
    
<div id="icdj" class="gdp-row">

  <div id="iig7" class="cell">
    <form method="post" id="ii3sj" data-redirect="" class="form">
      <div id="i829i" class="form-group">
        <label id="igpzo" class="label">Site Address</label>
      <input className="input" type="address" value={this.state.value}  onChange={(e) => this.handleAddressChange(e)}  required /><span id="site address required"> *</span>
      </div>
      <div id="ife2e" class="form-group">
        <label id="imd3w" class="label">Customer name</label>
        <input className="input" type="address" value={this.state.value}  onChange={(e) => this.handleCustomerNameChange(e)}  required /><span id="site address required"> *</span>
      </div>
      <div id="i3bkc" class="form-group">
        <label id="iyopf" class="label">Customer email </label>
        <input className="input" type="address" value={this.state.value}  onChange={(e) => this.handleCustomerEmailChange(e)}  required /><span id="site address required"> *</span>
      </div>
   
     
   

      <div id="igfc3" class="form-group">
        <button type="submit" id="ivfmj" class="button">Create Survey</button>
      </div>
     
    
    </form>
    <div id="isv32t">
  
    </div>
  </div>
</div>
     
      </div>
    );
  }
}