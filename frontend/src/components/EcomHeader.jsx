import React from 'react';
import { Nav, Navbar, Form, Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchInput from './Form/SearchInput';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';

const EcomHeader = () => {
  const categories = useCategory()

  return (
    <>
      <Navbar expand="lg" bg="primary" collapseOnSelect>

        <LinkContainer to='/ecommerce'>
          <Navbar.Brand>Products</Navbar.Brand>
        </LinkContainer>

        <SearchInput />

        <NavDropdown title="Categories" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to={`/categories`}>
            All Categories
          </NavDropdown.Item>
          {categories.map((c) => (
            <NavDropdown.Item as={Link}
              to={`/category/${c.slug}`}>
              {c.name}
            </NavDropdown.Item>
          ))}
        </NavDropdown>

        <LinkContainer to='/whyshophere'>
          <Nav.Link>Why Shop at EaseFlow?</Nav.Link>
        </LinkContainer>

      </Navbar>
    </>
  );
}

export default EcomHeader;
