import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Thread(props) {
   const { id, name} = props.thread;
   
   return (
      <div className='headerdist'>
         
         {name}
      </div>
   );
}

export default Thread;