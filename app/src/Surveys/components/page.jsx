import React, { Component } from "react";
import FinalTable from "./finalTable";

class page extends Component {
  state = { search: "" };
  render() {
    const pageMargin = { margin: 75 };
    return (
      <div style={pageMargin}>
        <h1>Existing Surveys</h1>
        <div>
          <FinalTable />
        </div>
      </div>
    );
  }
}

export default page;
