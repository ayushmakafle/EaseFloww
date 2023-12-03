import React from 'react';
import { Nav, Navbar, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchInput from './Form/SearchInput';
import '../styles/MainNavbar.css';
const EcomHeader = () => {
  return (
    <>
    <header>
      <Navbar className="wrapper"expand="lg"  collapseOnSelect>
        <ul>
                    <li>
                        <Nav.Link href="/ecommerce">Our Products</Nav.Link>
                    </li>
                    <li>
                      <SearchInput />
                    </li>
                    <li>
                        <Nav.Link href="/whyshophere">Why Shop at EaseFlow?</Nav.Link>
                    </li>
                    </ul>
      </Navbar>
      </header>
    </>
  );
}

export default EcomHeader;
