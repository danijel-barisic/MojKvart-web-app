import React, { Component } from 'react';

function District(props) {
   const { id, name, council} = props.street;
   
   return (
      <div>
         <p>{id}- {name}</p>
      </div>
   );
}

export default District;