import React from "react";
import Nav from 'react-bootstrap/Nav';


const Header = () => {
  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/find">Find</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/insert">Insert</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Header;
