import React, { Component } from "react";
import FinalTable from "./finalTable";
import cometLogo from '../../image/comet-logo.png';
import { Link } from "react-router-dom";

class page extends Component {
  state = { search: "" };
  render() {
    const pageMargin = { margin: 75 };
    return (
      <div style={pageMargin}>
        <nav>
          <a href="https://www.cometsigns.com/"><img src={cometLogo} target="_blank" alt="comet signs logo" /></a>
        </nav>
        <h1>Existing Surveys</h1>
        <div>
          <FinalTable />
        </div>
        <div>
        <button id="button" ><Link to="/newSurvey">Create New Survey</Link></button>
        </div>
      </div>
    );
  }
}

export default page;