import React from 'react';
import { Nav, Navbar, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchInput from './Form/SearchInput';

const EcomHeader = () => {
  return (
    <>
      <Navbar expand="lg" bg="primary" collapseOnSelect>

        <LinkContainer to='/ecommerce'>
          <Navbar.Brand>Products</Navbar.Brand>
        </LinkContainer>
        <SearchInput />
        <LinkContainer to='/whyshophere'>
          <Nav.Link>Why Shop at EaseFlow?</Nav.Link>
        </LinkContainer>

      </Navbar>
    </>
  );
}

export default EcomHeader;
