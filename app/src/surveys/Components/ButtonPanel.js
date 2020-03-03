
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
        <input placeholder="" name="firstname" id="ipbml" class="input"/>
      </div>
      <div id="ife2e" class="form-group">
        <label id="imd3w" class="label">Customer name</label>
        <input type="email" placeholder="" name="email" id="ika0f" class="input"/>
      </div>
      <div id="i3bkc" class="form-group">
        <label id="iyopf" class="label">Customer email (Optional)</label>
        <input type="email" placeholder="" name="email" class="input"/>
      </div>
      <div id="iekyo" class="form-group">
        <label id="ihead" class="label">Asset 1</label>
   
        <div id="i7mgj">
          <div class="form-group">
            <label class="label">Message</label>
            <textarea name="message" class="textarea"></textarea>
          </div>
        </div>
        <div class="form-group">
          <label class="label">Message</label>
          <textarea name="message" class="textarea"></textarea>
        </div>
        
      </div>
     
      <div id="i8iul" class="form-group">
        <label id="i5lk5" class="label">Asset 2</label>
        <div id="icwu2">
          <div class="form-group">
            <label class="label">Message</label>
            <textarea name="message" class="textarea"></textarea>
          </div>
        </div>
        <div id="i49ui">
          <div class="form-group">
            <label class="label">Message</label>
            <textarea name="message" class="textarea"></textarea>
          </div>
        </div>
        <div class="form-group">
          <label class="label">Message</label>
          <textarea name="message" class="textarea"></textarea>
        </div>
        <div id="ifm9c">
        </div>
      </div>

      <div id="ijnh2" class="form-group">
        <label id="idvam" class="label">Assign to Surveyor</label>
        <textarea name="message" class="textarea"></textarea>
     
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