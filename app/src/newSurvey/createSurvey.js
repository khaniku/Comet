import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';




class newSurvey extends React.Component {
  static propTypes = {
    clickHandler: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
        surveyor : '',
        dueDate : '',
        siteAddress : '', 
        customerName : '',
        customerID : '',
        customerEmail : '',
    }

    this.changeDueDate=this.changeDueDate.bind(this);
    this.changeCustEmail=this.changeCustEmail.bind(this);
    this.changeAddress=this.changeAddress.bind(this);
    this.changeCustName=this.changeCustName.bind(this);
    this.changeCustID=this.changeCustID.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this._checkLogin();
  }

  changeSurveyor(event) {
    this.setState({surveyor: event.target.surveyor}); 
   
    console.log(this.state.surveyor)
  }
  changeDueDate(event){
    this.setState({dueDate: event.target.dueDate})
  }
  changeCustEmail(event){
    this.setState({customerEmail: event.target.customerEmail})
  }
  changeCustID(event){
    this.setState({customerID: event.target.customerID});
  }
  changeAddress(event){
    this.setState({siteAddress: event.target.siteAddress});
    console.log(this.state.siteAddress)
  }
  changeCustName(event){
    this.setState({customerName: event.target.customerName})
  }


  

 
  handleSubmit = (e, message) => {
    e.preventDefault();
    
    let formData = {
    surveyor : this.state.surveyor,
    dueDate : this.state.dueDate,    
    SiteAddress: this.state.siteAddress,
    customerName: this.state.customerName,
    customerID: this.state.customerID,
    customerEmail: this.state.customerEmail,

    }
   // if (formData.SiteAddress.length < 1 || formData.customerName.length < 1 || formData.customerID.length < 1 || formData.customerEmail.length < 1) {
     // return false
     // }
      this.createSurvey(formData);
  }
  async createSurvey(formData) {
    await fetch("http://159.203.100.198:5000/api/survey/create", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.props.auth.accessToken
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
            Surveyor: 
            <textarea type ="text" value={this.state.surveyor} onChange={(e) => this.changeSurveyor(e)} />
         
          </label>
          <label>
            : Due Date
            <textarea type ="text" value={this.state.dueDate} onChange={this.changeDueDate} />
          </label>
          <label>
            Address: 
            <textarea type ="text" value={this.state.siteAddress} onChange={this.changeAddress} />
          </label>
          <label>
            Customer Name: 
            <input type ="text" value={this.state.customerName} onChange={this.changeCustName} />
          </label>
          <label>
            Customer ID: 
            <input type ="text" value={this.state.customerID} onChange={this.changeCustID} />
          </label>
          <label>
            Customer email: 
            <input type ="text" value={this.state.customerEmail} onChange={this.changeCustEmail} />
          </label> 
          <label>
            <input id='formButton' type = "submit" value = "Create Survey"  onClick={this.handleSubmit}/>   
          </label>    
      </form>
        );
  }


}
const mapStateToProps = state => {
    return {auth: state.auth}
  }  
  export default connect(mapStateToProps)(newSurvey);