import React from "react";
import Card from "./Card";
import ReactSession from "react-client-session/dist/ReactSession";
import { useHistory } from "react-router";
import './Login.css';
import { FaTimes } from 'react-icons/fa';
import User from "./User";

function Users(props) {
   const [users, setUsers] = React.useState([]);
   const [updated, setUpdated] = React.useState(new Date());
   const role = ReactSession.get(ReactSession.get("username"));
   const history = useHistory();
   const { currentId, currentName } = props;

   function deleteUser(id) {
      const options = {
         method: 'DELETE',
      };
      fetch(`/accounts/${id}`, options)
         .then(response => {
            /* console.log(response); */
            if (!response.ok) {
               console.log(response.body);
            } else {
               console.log("deleted");
               setUpdated(new Date());
            }
         });
   }

   React.useEffect(() => {
      fetch('/accounts')
         .then(data => data.json())
         .then(users => setUsers(users))
   }, [updated]);

   if (role === "ADMIN") {
      return (
         <Card title='Korisnici'>
            <div className='StreetList'>
               {users.map(function (user) {
                  let district = user.district;
                  console.log(district.id);
                  if (district.id == currentId) {
                     return ([
                        <div className="wrapper">
                           <div className="inner">
                              <User key={user.id} user={user} props={props}/>
                           </div>
                           <div className="inner">
                              <FaTimes style={{color:"red" ,cursor:"pointer"}} onClick={() => deleteUser(user.id)}></FaTimes>
                           </div>
                        </div>
                     ]);
                  } else if (currentId === undefined){
                     return ([
                        <div className="wrapper">
                           <div className="inner">
                              <User key={user.id} user={user} props={props}/>
                           </div>
                           <div className="inner">
                              <FaTimes style={{color:"red" ,cursor:"pointer"}} onClick={() => deleteUser(user.id)}></FaTimes>
                           </div>
                        </div>
                     ])
                  } else {
                     return ([
                        <></>
                     ]);
                  }
               })}
            </div>
         </Card>
      );
   } 
   else {
      history.push("/");
   }
}

export default Users;