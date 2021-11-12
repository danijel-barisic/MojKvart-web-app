import React from "react";
import Card from "./Card";
import Street from "./Street";

function StreetList() {
   const [streets, setStreets] = React.useState([]);

   React.useEffect(() => {
      fetch('/streets')
         .then(data => data.json())
         .then(streets => setStreets(streets))
   }, []);

   return (
      <Card title="Streets">
         <div className='StreetList'>
            {streets.map(street => <Street key={street.id } street={street} />)}
         </div>
      </Card>
   );

}

export default StreetList;