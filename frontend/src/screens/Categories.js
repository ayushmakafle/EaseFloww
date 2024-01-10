import React from 'react';
import useCategory from '../hooks/useCategory';
import EcomHeader from '../components/EcomHeader';
import { Link } from 'react-router-dom';
import './Categories.css'; // Import the CSS file for styles

const Categories = () => {
  const categories = useCategory();

  return (
    <>
      <EcomHeader />

      <div>
        <div className="row">
          {categories.map((c, index) => (
            <div className="col-md-7 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <div>
                <Link
                  to={`/category/${c.slug}`}
                  className='btn btn-secondary animated-btn'
                  style={{
                    backgroundColor: '#ef5e99', 
                    padding:'12px',
                    color: '#fff', 
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '24px', 
                    textAlign: 'center',
                    textDecoration: 'none',
                    width: '45%',
                    marginLeft:'524px'
                  
                  }}
                >
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;

