import React, { Component } from 'react';
import Card from './Card';

function Street(props) {
   const { id, maxStreetNo, minStreetNo, name, districtId} = props.street;
   
   return (
      <Card>
         <div>
            <p>{id} {name} ({minStreetNo}-{maxStreetNo}) {districtId}</p>
         </div>
      </Card>
   );
}

export default Street;