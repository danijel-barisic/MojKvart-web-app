import React from "react";
import Street from "./Street";
import Card from "./Card";

function DistrictList() {
   const [streets, setStreets] = React.useState([]);

   React.useEffect(() => {
      fetch('/districts')
         .then(data => data.json())
         .then(streets => setStreets(streets))
   }, []);

   return (
      <Card title='Districs'>
         <div className='StreetList'>
            {streets.map(street => <Street key={street.id } street={street} />)}
         </div>
      </Card>
   );

}

export default DistrictList;