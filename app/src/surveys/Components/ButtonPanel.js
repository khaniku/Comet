
import React from "react";
import PropTypes from "prop-types";

import "./ButtonPanel.css";

export default class ButtonPanel extends React.Component {
  static propTypes = {
    clickHandler: PropTypes.func,
  };

  handleClick = buttonName => {
    this.props.clickHandler(buttonName);
  };

  render() {
    return (


      <div className="component-button-panel">
        <div class="gdp-row">
  <div class="cell">
      <div id="iqfehu" class="form-group">
        <button type="submit" id="iqu5bc" class="Button">View all Surveys</button>
      </div>
      
      
  </div>
  <div class="cell" id="i0k1">
      <div class="form-group">
        <button type="submit" class="Button" id="im2f">Edit other Survey</button>
      </div>
  </div>
  <div class="cell">
  </div>
</div>
        </div>
    );
  }

  
/*
  render() {
    return (
      <div className="component-button-panel">
        <div>
          <Button name="View all Survey" clickHandler={this.handleClick} />
          <Button name="Edit other Survey" clickHandler={this.handleClick} />
         
        </div>
     
          
      </div>
    );
  }*/
}