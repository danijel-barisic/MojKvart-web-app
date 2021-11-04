import React, { Component } from 'react';

function Street(props) {
   const { id, maxStreetNo, minStreetNo, name, districtId} = props.street;
   
   return (
      <div>
         <p>{id} {name} ({minStreetNo}-{maxStreetNo}) {districtId}</p>
      </div>
   );
}

export default Street;