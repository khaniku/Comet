import React, { Component } from "react";
import { Row, Button, FormGroup } from "reactstrap";
import ButtonDropDown from "./buttonDropDown";
//import InputGroup from "./inputGroup";
import Table from "./table";
import FormGroup2 from "./formGroup2";
import SortTable from "./sortTable";

class page extends Component {
  state = { search: "" };
  render() {
    const pageMargin = { margin: 75 };
    const buttonMargin = { margin: 30 };
    return (
      <div style={pageMargin}>
        <h1>Existing Surveys</h1>
        <h5>Filter by:</h5>
        <FormGroup>
          <Row>
            <FormGroup2 />
            <div style={buttonMargin}>
              <ButtonDropDown />
            </div>
          </Row>
          <Row>
            <div class="col">
              <div class="float-right">
                <Button>Submit</Button>
              </div>
            </div>
          </Row>
          <Row>
            <h6 style={{ color: "white" }}>.</h6>
          </Row>
          <Row>
            <Table />
          </Row>
        </FormGroup>
        <div>
          <SortTable />
        </div>
      </div>
    );
  }
}

export default page;
