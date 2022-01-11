import React from "react";
import District from "./District";
import Card from "./Card";

function DistrictList() {
   const [districts, setDistrict] = React.useState([]);

   React.useEffect(() => {
      fetch('/districts')
         .then(data => data.json())
         .then(districts => setDistrict(districts))
   }, []);

   return (
      <Card title='Kvartovi'>
         <div className='StreetList'>
            {districts.map(district => <District key={district.id } district={district} />)}
         </div>
      </Card>
   );

}

export default DistrictList;