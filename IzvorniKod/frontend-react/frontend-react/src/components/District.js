import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function District(props) {
   const { id, name} = props.district;
   
   return (
      <div className='headerdist'>
         <Link to={{
            pathname: `/kvartovi/${id}`,
            state: { name },
            className: 'header-right'
         }}>{id}. {name}</Link>
      </div>
   );
}

export default District;