import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ButtonPanel.css";

const data = [{
  1: {
    height: ''
  },
  2: {
    height: '',
    width: ''
  }
}]

export default class ButtonPanel extends React.Component {
  static propTypes = {
    clickHandler: PropTypes.func,
  };

  handleClick = buttonName => {
    this.props.clickHandler(buttonName);
  };

  submitSurvey = buttonName => {
    this.props.clickHandler(buttonName);
  }
  
  render() {
    return (
      <div>
        <button id="button" ><Link to="/surveys/components/page">View All Survey</Link></button>
        <button id="button" ><Link to="/newSurvey">Create New Survey</Link></button>
        <table>
        </table>
      </div>
    )
  }
}
