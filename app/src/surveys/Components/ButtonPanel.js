
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
      <div className="page Entry">
        <div id="ihtr">
  <div class="gdp-row">
    <div id="ib6jk" class="cell">
      
    
     
       
       
    
    </div>
    <div id="i6899" class="cell">
   
    </div>
    <div id="ir2va" class="cell">
      <form method="post" id="igugym" data-redirect="" class="form">
        <div id="ixtevk" class="form-group">
        
        </div>
        <div class="form-group">
          <button type="submit" id="ioakg4" class="button">Send</button>
        </div>
        <div data-form-state="success" id="i873b2" class="state-success">Thanks! We received your request
        </div>
        <div data-form-state="error" id="i1kp7r" class="state-error">An error occurred on processing your request, try again!
        </div>
      </form>
    </div>
  </div>
</div>
<div id="icdj" class="gdp-row">
  <div id="idks" class="cell">
    <form method="post" id="i39i" data-redirect="" class="form">
      <div id="i40g" class="form-group">
        <label id="i65f" class="label">Add Template</label>
        <div class="form-group">
          <select name="options" id="ipjel" class="select"><option value="1">Option 1</option><option value="2">Option 2</option><option value="3">Option 3</option></select>
        </div>
      </div>
      <div id="iwvh" class="form-group">
        <label id="ipjor" class="label">Add Asset</label>
        <input type="email" placeholder="Type here your email" name="email" id="i3t1m" class="input"/>
      </div>
      <div class="form-group">
        <label class="label">Add Picture&nbsp;</label>
        <select name="options" id="i0obg" class="select"><option value="1">Option 1</option><option value="2">Option 2</option><option value="3">Option 3</option></select>
      </div>
      <div class="form-group">
        <button type="submit" id="ibnfa" class="button">Send</button>
      </div>
      <div data-form-state="success" id="id0ab" class="state-success">Thanks! We received your request
      </div>
      <div data-form-state="error" id="ic3i5" class="state-error">An error occurred on processing your request, try again!
      </div>
    </form>
  </div>
  <div id="iig7" class="cell">
    <form method="post" id="ii3sj" data-redirect="" class="form">
      <div id="i829i" class="form-group">
        <label id="igpzo" class="label">Site Address</label>
        <input placeholder="Type here your name" name="firstname" id="ipbml" class="input"/>
      </div>
      <div id="ife2e" class="form-group">
        <label id="imd3w" class="label">Customer name</label>
        <input type="email" placeholder="Type here your email" name="email" id="ika0f" class="input"/>
      </div>
      <div id="i3bkc" class="form-group">
        <label id="iyopf" class="label">Customer email (Optional)</label>
        <input type="email" placeholder="Type here your email" name="email" class="input"/>
      </div>
      <div id="iekyo" class="form-group">
        <label id="ihead" class="label">Asset 1</label>
        <div id="i1p0p">
          <div id="i088i" class="form-group">
            <label id="ik8wu" class="label"></label>
            <textarea name="message" class="textarea"></textarea>
          </div>
        </div>
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
        <div id="i47hr">
        </div>
      </div>
      <div id="ig8xu" class="gdp-row">
        <div id="i8apf" class="cell">
          <div id="iy0e9" class="form-group">
            <label id="iasjh" class="label">Add Asset</label>
          </div>
        </div>
        <div class="cell">
          <div id="izrzk" class="form-group">
            <label id="im8cy" class="label">Add Picture&nbsp;</label>
            <select name="options" id="ikeh7" class="select"><option value="1">Option 1</option><option value="2">Option 2</option><option value="3">Option 3</option></select>
          </div>
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
      <div id="iam7w" class="gdp-row">
        <div id="injed" class="cell">
          <div id="izbyl" class="form-group">
            <label id="itxy6" class="label">Add Measurement</label>
          </div>
          <div class="form-group">
            <button type="submit" id="icqr2n" class="button">Send</button>
          </div>
        </div>
        <div class="cell">
          <div id="iz8tl" class="form-group">
            <label id="i25dy" class="label">Add Picture&nbsp;</label>
          </div>
          <div id="ifub83" class="form-group">
            <button type="submit" id="izlsqv" class="button">Send</button>
          </div>
        </div>
      </div>
      <div id="ijnh2" class="form-group">
        <label id="idvam" class="label">Assign to Surveyor</label>
        <select name="options" class="select"><option value="1">Option 1</option><option value="2">Option 2</option><option value="3">Option 3</option></select>
      </div>
      <div id="igfc3" class="form-group">
        <button type="submit" id="ivfmj" class="button">Create Survey</button>
      </div>
      <div data-form-state="success" id="ih9pd" class="state-success">Thanks! We received your request
      </div>
      <div data-form-state="error" id="ibqbr" class="state-error">An error occurred on processing your request, try again!
      </div>
    </form>
    <div id="isv32t">
      <span>Insert here your custom code</span>
    </div>
  </div>
</div>
     
      </div>
    );
  }
}