import React from 'react';
import { Nav, Navbar, Form, Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchInput from './Form/SearchInput';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cart';
import { Avatar, Badge } from 'antd'

const EcomHeader = () => {
  const categories = useCategory()
  const [cart] = useCart()

  return (
    <>
      <Navbar expand="lg" bg="primary" collapseOnSelect>
<<<<<<< HEAD

        <LinkContainer to='/ecommerce'>
          <Navbar.Brand>Products</Navbar.Brand>
        </LinkContainer>

        <SearchInput />

        <NavDropdown title="Categories" id="basic-nav-dropdown">
          <>
            <LinkContainer to='/categories'>
              <NavDropdown.Item>All Categories</NavDropdown.Item>
            </LinkContainer>
            {categories.map((c) => (
              <LinkContainer key={c._id} to={`/category/${c.slug}`}>
                <NavDropdown.Item>{c.name}</NavDropdown.Item>
              </LinkContainer>
            ))}
          </>
        </NavDropdown>

        <LinkContainer to='/cart' className='p-4 m-4'>
          <Badge count={cart?.length} showZero>
            <Nav.Link to='/cart'> <i className="fa-solid fa-cart-shopping"></i> </Nav.Link>
          </Badge>
        </LinkContainer>

        {/* <LinkContainer to='/whyshophere'>
          <Nav.Link>Why Shop at EaseFlow?</Nav.Link>
        </LinkContainer>
          */}

=======
        <ul>
                    <li>
                        <Nav.Link href="/ecommerce">Our Products</Nav.Link>
                        <SearchInput />
                    </li>
                    <li>
                        <Nav.Link href="/whyshophere">Why Shop at EaseFlow?</Nav.Link>
                    </li>
                    </ul>
>>>>>>> 978b33d057010f5d0de267454aabaf1557947891
      </Navbar>
    </>
  );
}

export default EcomHeader;
