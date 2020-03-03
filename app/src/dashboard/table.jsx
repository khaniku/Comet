import React from "react";
import { Table } from "reactstrap";

const table = props => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Survey ID</th>
          <th>Survey Location</th>
          <th>Customer Name</th>
          <th>Survey Status</th>
          <th>Completed Date</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Huntsville</td>
          <td>Valero</td>
          <td>Complete</td>
          <td>02/20/2020</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Conroe</td>
          <td>H-E-B</td>
          <td>In Progress</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>The Woodlands</td>
          <td>Chase</td>
          <td>Unassigned</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default table;
