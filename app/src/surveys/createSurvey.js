import React from 'react';
import ButtonPanel from './Components/ButtonPanel';
import {Link} from "react-router-dom";


export default class createSurvey extends React.Component {

  
  handleClick = buttonName => {
    this.setState();
  };
    

viewAllSurvey = () =>{
     
}  

editOtherSurvey = () =>{
    alert("edit other survey")
}  
    
    
    
    
    render() {
        return (
         
        <div className="component-button-panel">
      <div class="gdp-row">
      <h1>
            <button id="button" ><Link to="/AllSurvey">View All Survey</Link></button>
          
            <button id="button" ><Link to="/editOtherSurvey">Edit Other Survey</Link></button>
    
          </h1>
     <h2> <div id="i40g" class="column">
        <div class="form-group">
          <button type="submit" id="iumg4" class="button">Add Template</button>
          <button type="submit" id="ih7jj" class="button">Add Asset</button>
          <button type="submit" id="itvhz" class="button">Add Measurement</button>
          <button type="submit" id="ibnfa" class="button">Add Picture</button>
        </div>
      </div>
      </h2>
      <div id="dataEntry" class="column">
      
          <ButtonPanel clickHandler={this.handleClick}/>
      </div>
  
    </div>
   
   
   
      </div>
     
           
        )

        
    }
  
}