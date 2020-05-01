import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Route } from "react-router";
import ButtonPanel from "../navBar/Components/ButtonPanel";
class newSurvey extends React.Component {
  static propTypes = {
    clickHandler: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      surveyors:[] ,
      surveyor: '',
      dueDate: '',
      siteAddress: '',
      customerName: '',
      customerID: '',
      customerEmail: '',
    }
    // this.changeDueDate=this.changeDueDate.bind(this);
    // this.changeCustEmail=this.changeCustEmail.bind(this);
    // this.changeAddress=this.changeAddress.bind(this);
    // this.changeCustName=this.changeCustName.bind(this);
    // this.changeCustID=this.changeCustID.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this._checkLogin();
  }
  async componentDidMount() {
    let that =this
    await this.getSurveys().then (function(data){
      console.log(data)
      that.setState({surveyors:data})
    }
    )
    console.log(this.state.surveyors)
  }
  getSurveys(){
    return fetch("http://159.203.100.198:5000/api/user/surveyors", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.auth.accessToken
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
    console.log(responseJson)
        return responseJson;
    })
    .catch((error) => {
    console.log(error);
    });
  }
  onChangeSurveyor(event) {
    this.setState({ surveyor: event.target.value });
  }
  Redirect(event) {
    //  <Route path= {ButtonPanel}></Route>
  }
  changeDueDate(event) {
    this.setState({ dueDate: event.target.value })
  }
  // changeCustEmail(event){
  //   this.setState({customerEmail: event.target.value})
  // }
  // changeCustID(event){
  //   this.setState({customerID: event.target.value});
  // }
  changeAddress(event) {
    this.setState({ siteAddress: event.target.value });
  }
  changeCustName(event) {
    this.setState({ customerName: event.target.value })
  }
  handleSubmit = (e, message) => {
    e.preventDefault();
    let formData = {
      surveyor: this.state.surveyor,
      dueDate: this.state.dueDate,
      siteAddress: this.state.siteAddress,
      customerName: this.state.customerName,
      // customerID: this.state.customerID,
      // customerEmail: this.state.customerEmail,
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
          console.log(responseJson)
          this.props.history.push("/ButtonPanel");
        });
      })
      .catch((error) => {
        this.setState({ loading: false })
        this.setState({ showError: true, errorText: 'Something went wrong. Please try again!' });
        console.log(error);
      });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        {/* <button>
          onClick={() => ButtonPanel}
        </button>
        <button>
          Add Photo
          </button>
        <button>
          Add Measurement
        </button> */}
        <label>
          Surveyor:
          <select onChange={(e) => this.onChangeSurveyor(e)}>
          <option> select surveyor </option> 
        {this.state.surveyors.map((surveyor) => <option key={surveyor.id} value={surveyor.id}>{surveyor.firstName + " " + surveyor.lastName}</option>)}
           </select> 
        </label>
        <label>
          : Due Date
            <textarea type="text" value={this.state.value} onChange={(e) => this.changeDueDate(e)} />
        </label>
        <label>
          Address:
            <textarea type="text" value={this.state.value} onChange={(e) => this.changeAddress(e)} />
        </label>
        <label>
          Customer Name:
            <input type="text" value={this.state.value} onChange={(e) => this.changeCustName(e)} />
        </label>
        {/* <label>
            Customer ID: 
            <input type ="text" value={this.state.value} onChange={(e) => this.changeCustID(e)} />
          </label>
          <label>
            Customer email: 
            <input type ="text" value={this.state.customerEmail} onChange={(e) => this.changeCustEmail(e)} />
          </label>  */}
        <label>
          <input id='formButton' type="submit" value="Create Survey" onClick={this.handleSubmit} />
        </label>
      </form>
    );
  }
}
const mapStateToProps = state => {
  return { auth: state.auth }
}
export default connect(mapStateToProps)(newSurvey);