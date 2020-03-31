import React from "react";
import { Col, Row, Form, FormGroup, Label, Input } from "reactstrap";

const FormGroup2 = props => {
  return (
    <Form>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="surveyID">Survey ID</Label>
            <Input
              type="number"
              name="ID"
              id="surveyID"
              placeholder="Survey ID..."
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="surveyLocation">Survey Location</Label>
            <Input
              type="string"
              name="location"
              id="SurveyLocation"
              placeholder="Survey Location..."
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="customerName">Customer Name</Label>
            <Input
              type="string"
              name="name"
              id="CustomerName"
              placeholder="Customer Name..."
            />
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default FormGroup2;
