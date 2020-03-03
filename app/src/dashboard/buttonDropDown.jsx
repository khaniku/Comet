import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const Example = props => {
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  return (
    <div>
      <ButtonDropdown className="h-25" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>Survey Status</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Assigned (not started)</DropdownItem>
          <DropdownItem>Completed</DropdownItem>
          <DropdownItem>In Progress</DropdownItem>
          <DropdownItem>Unassigned</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
};

export default Example;
