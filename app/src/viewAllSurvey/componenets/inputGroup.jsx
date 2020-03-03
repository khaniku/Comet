import React from "react";
import { InputGroup, Input } from "reactstrap";

const inputGroup = props => {
  return (
    <div>
      <InputGroup>
        <Input placeholder="Survey ID..." />
        <Input placeholder="Survey Location..." />
        <Input placeholder="Customer Name..." />
      </InputGroup>
      <br />
    </div>
  );
};

export default inputGroup;