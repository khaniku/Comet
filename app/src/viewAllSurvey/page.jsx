import React, { Component } from "react";
import { Row, Button, FormGroup } from "reactstrap";
import ButtonDropDown from "./buttonDropDown";
//import InputGroup from "./inputGroup";
import Table from "./table";
import FormGroup2 from "./formGroup2";

class page extends Component {
  state = { search: "" };
  render() {
    var letterStyle = { margin: 75 };
    var letterStyle2 = { margin: 30 };
    return (
      <div style={letterStyle}>
        <span>
          <h1>Existing Surveys</h1>
          <h5>Filter by:</h5>
          <FormGroup>
            <Row>
              <FormGroup2 />
              <div style={letterStyle2}>
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
        </span>
      </div>
    );
  }
}

export default page;
