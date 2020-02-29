import React from 'react';


export default class createSurvey extends React.Component {
    

viewAllSurvey = () =>{
     
}  

editOtherSurvey = () =>{
    alert("edit other survey")
}  
    
    
    
    
    render() {
        return (
        <div className="component-button-panel">
      <div class="gdp-row">
<div class="cell">
    <div id="iqfehu" class="form-group">
      <button type="submit" onClick ={() => this.viewAllSurvey()}   id="iqu5bc" class="Button">View all Surveys</button>
      <button type="submit" onClick ={() => this.editOtherSurvey()} class="Button" id="im2f">Edit other Survey</button>
    </div>
    </div>
    <div class="cell">
    </div>
    </div>
      </div>
           
        )
    }
}