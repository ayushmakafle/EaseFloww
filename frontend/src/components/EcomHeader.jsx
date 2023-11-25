import React from 'react';
import { Nav, Navbar, Container, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const EcomHeader = () => {
  return (
    <>
      <Navbar expand="lg" bg="primary" collapseOnSelect>
        <Container className="justify-content-between">
          <LinkContainer to='/ecommerce'>
            <Navbar.Brand>Products</Navbar.Brand>
          </LinkContainer>
          <Form className="d-flex mx-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="danger">Search</Button>
          </Form>
          <LinkContainer to='/whyshophere'>
            <Nav.Link>Why Shop at EaseFlow?</Nav.Link>
          </LinkContainer>
        </Container>
      </Navbar>
    </>
  );
}

export default EcomHeader;
