import React from "react";
import ReactSession from "react-client-session/dist/ReactSession";
import Card from "./Card";
import Street from "./Street";

function StreetList() {
   const [streets, setStreets] = React.useState([]);

   React.useEffect(() => {
      fetch('/streets')
         .then(data => data.json())
         .then(streets => setStreets(streets))
   }, []);
   if (ReactSession.get("username") === false) {
      return (
         <Card title="not logged in">
            <div className='StreetList'>
               {streets.map(street => <Street key={street.id } street={street} />)}
            </div>
         </Card>
      );
   }
   else {
      return (
         <Card title="Streets">
            <div className='StreetList'>
               {streets.map(street => <Street key={street.id } street={street} />)}
            </div>
         </Card>
      );
   }


}

export default StreetList;