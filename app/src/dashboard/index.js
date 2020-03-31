<<<<<<< HEAD
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
=======
import React from 'react';
import styling from './dashboard.css';
import cometLogo from './comet-logo.png';

export default class Dashboard extends React.Component {
    render() {
        return (
            <main>
                <nav>
                    <a href="https://www.cometsigns.com/"><img src={cometLogo} target="_blank" alt="comet signs logo" /></a>
                </nav>
                <header>
                    <h1>Search Survey Instances</h1>
                </header>
                <div id="right-panel">
                    <label htmlFor="name-search">Name: </label>
                    <input type="text" id="name-search" />

                    <label htmlFor="status">Status:</label>
                    <select name="selection" id="status">
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>

                    <table id="templates-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Created on</th>
                                <th>Completed on</th>
                                <th>Deadline</th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><input className={styling.button} type="button" value="view" /></td>
                                <td>
                                    <form action="" method="post">
                                        <button className={styling.button} id="delete-button" name="action" value="delete" onClick={(item) => { if (window.confirm('Are you sure you sure you want to delete this survey')) { this.deleteItem(item) } else { this.onCancel(item) } }}>delete</button>

                                        <input type="hidden" name="" value="" />
                                    </form>
                                </td>
                            </tr>
                        </tbody>
                    </table><br />
                    <button>Create template</button>
                    <button>View templates</button>
                </div>
            </main>
        );
    }
}
>>>>>>> d540f3070bd1c3ed6d8196b6822f986ed449873b
