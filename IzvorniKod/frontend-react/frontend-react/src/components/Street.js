import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Street(props) {
   const { id, maxStreetNo, minStreetNo, name } = props.street;
   
   return (
      <div className='headerdist'>
         <Link to={{
            pathname: `/ulice/${id}/edit`,
            state: {id},
            className: 'header-right'
         }}>{id}. {name} ({minStreetNo}-{maxStreetNo})</Link>
      </div>
   );
}

export default Street;