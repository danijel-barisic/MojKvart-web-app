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

   /* if (ReactSession.get("username") === false) {
      return (
         <Card title="not logged in">
            <div className='StreetList'>
               {streets.map(street => <Street key={street.id } street={street} />)}
            </div>
         </Card>
      );
   }
   else { */
      return (
         <Card title="Ulice">
            <div className='StreetList'>
               {streets.map(street => <Street key={street.id} street={street} />)}
            </div>
         </Card>
      );
   }


export default StreetList;