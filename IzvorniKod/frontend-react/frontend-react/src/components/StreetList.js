import React from "react";
import Header from "./Header";
import Street from "./Street";
import './StreetList.css';

function StreetList() {
   const [streets, setStreets] = React.useState([]);

   React.useEffect(() => {
      fetch('/streets')
         .then(data => data.json())
         .then(streets => setStreets(streets))
   }, []);

   return (
      <div className='StreetList'>
         {streets.map(street => <Street key={street.id } street={street} />)}
      </div>
   );

}

export default StreetList;