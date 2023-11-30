import React from 'react';
import { Nav, Navbar, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchInput from './Form/SearchInput';

const EcomHeader = () => {
  return (
    <>
      <Navbar expand="lg" bg="primary" collapseOnSelect>
        <ul>
                    <li>
                        <a href="/ecommerce">Our Products</a>
                        <SearchInput />
                    </li>
                    <li>
                        <Nav.Link href="/whyshophere">Why Shop at EaseFlow?</Nav.Link>
                    </li>
                    </ul>
      </Navbar>
    </>
  );
}

export default EcomHeader;
