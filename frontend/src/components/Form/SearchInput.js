
import React from 'react';
import { useSearch } from '../../context/search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate('/search');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="d-flex mx-auto" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-1"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button
          className="btn btn-primary"
          type="submit"
          style={{
            padding: '10px 17px',
            backgroundColor: '#ef5e99',
            fontSize: '18px', 
          }}
        >
          Search
        </button>
      </form>
    </>
  );
};

export default SearchInput;