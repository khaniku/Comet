import React from 'react';

import {Link} from "react-router-dom";


export default class createSurvey extends React.Component {
  handleClick = buttonName => {
    this.setState();
  };

  addTemplate = buttonName => {
    this.setState();
  };

  addAsset = buttonName => {
    this.setState();
  };

  addMeasurement = buttonName => {
    this.setState();
  };


    render() {
        return (
         
        <div className="component-button-panel">
      <div class="gdp-row">
      <h1>
            <button id="button" ><Link to="/allSurvey">View All Survey</Link></button>
          
            <button id="button" ><Link to="/editOtherSurvey">Edit Other Survey</Link></button>

            <button id="button" ><Link to="/newSurvey">Create New Survey</Link></button>

            <button id="button" ><Link to="/AddAsset">Add Asset</Link></button>

            <button id="button" ><Link to="/AddPicture">Add Picture</Link></button>

            <button id="button" ><Link to="/measurement">Add Measurement</Link></button>    
          </h1>
    </div>
      </div>
     
           
        )

        
    }
  
}