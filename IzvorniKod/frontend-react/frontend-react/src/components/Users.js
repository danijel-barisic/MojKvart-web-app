import React from "react";
import Card from "./Card";
import ReactSession from "react-client-session/dist/ReactSession";
import { useHistory } from "react-router";
import './Login.css';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import User from "./User";
import RoleRequestUser from "./RoleRequestUser";

function Users(props) {
   const [users, setUsers] = React.useState([]);
   const [updated, setUpdated] = React.useState(new Date());
   const role = ReactSession.get(ReactSession.get("username"));
   const history = useHistory();
   const { currentId } = props;

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

   function banUser(id) {
      const options = {
         method: 'POST',
      };
      fetch(`/accounts/${id}/banned`, options).then(response => {
         if (!response.ok) {
            console.log(response.body);
         } else {
            console.log("banned");
            setUpdated(new Date());
         }
      })
   }

   function UnbanUser(id) {
      const options = {
         method: 'POST',
      };
      fetch(`/accounts/${id}/unbanned`, options).then(response => {
         if (!response.ok) {
            console.log(response.body);
         } else {
            console.log("unbanned");
            setUpdated(new Date());
         }
      })
   }

   React.useEffect(() => {
      fetch('/accounts')
         .then(data => {
            if (!data.ok) {
               return;
            }
            data.json().then(users => setUsers(users));
         })
   }, [updated]);

   if (role === "ADMIN") {
      return (
         <>
         <Card title='Svi korisnici'>
            <div className='StreetList'>
               {users.map(function (user) {
                  let district = user.district;
                  console.log(district.id);
                  if (district.id == currentId) {
                     return ([
                        <div className="wrapper">
                           <div className="inner">
                              <RoleRequestUser key={user.id} user={user} props={props}/>
                           </div>
                           <div className="inner">
                              <>
                              {
                                 (user.blocked === true)
                                    ?  <>
                                          <FaLockOpen style={{color:"green" ,cursor:"pointer", margin: "0px 10px 0px 0px" }} onClick={() => UnbanUser(user.id)}></FaLockOpen>
                                          <MdDelete style={{cursor: "pointer"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                       </>
                                    :  <>
                                          <FaLock style={{color:"red" ,cursor:"pointer", margin: "0px 10px 0px 0px" }} onClick={() => banUser(user.id)}></FaLock>
                                          <MdDelete style={{cursor: "pointer"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                       </>
                              }
                              </>
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
                              <>
                              {
                                 (user.blocked === true)
                                    ?  <>
                                          <FaLockOpen style={{color:"green" ,cursor:"pointer", margin: "0px 10px 0px 0px" }} onClick={() => UnbanUser(user.id)}></FaLockOpen>
                                          <MdDelete style={{cursor: "pointer"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                       </>
                                    :  <>
                                          <FaLock style={{color:"red" ,cursor:"pointer", margin: "0px 10px 0px 0px" }} onClick={() => banUser(user.id)}></FaLock>
                                          <MdDelete style={{cursor: "pointer"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                       </>
                              }
                              </>
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
         <Card title='Blokirani korisnici'>
         <div className='StreetList'>
            {users.map(function (user) {
               let district = user.district;
               console.log(district.id);
               if (district.id == currentId && user.blocked === true) {
                  return ([
                     <div className="wrapper">
                        <div className="inner">
                           <User key={user.id} user={user} props={props}/>
                        </div>
                        <div className="inner">
                           <>
                           {
                              (user.blocked === true)
                                 ?  <>
                                       <FaLockOpen style={{color:"green" ,cursor:"pointer", margin: "0px 10px 0px 0px" }} onClick={() => UnbanUser(user.id)}></FaLockOpen>
                                       <MdDelete style={{cursor: "pointer"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                    </>
                                 :  <>
                                       <FaLock style={{color:"red" ,cursor:"pointer", margin: "0px 10px 0px 0px" }} onClick={() => banUser(user.id)}></FaLock>
                                       <MdDelete style={{cursor: "pointer"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                    </>
                           }
                           </>
                        </div>
                     </div>
                  ]);
               } else if (currentId === undefined && user.blocked === true){
                  return ([
                     <div className="wrapper">
                        <div className="inner">
                           <User key={user.id} user={user} props={props}/>
                        </div>
                        <div className="inner">
                        <>
                        {
                           (user.blocked === true)
                              ?  <>
                                    <FaLockOpen style={{color:"green" ,cursor:"pointer", margin: "0px 10px 0px 0px" }} onClick={() => UnbanUser(user.id)}></FaLockOpen>
                                    <MdDelete style={{cursor: "pointer"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                 </>
                              :  <>
                                    <FaLock style={{color:"red" ,cursor:"pointer", margin: "0px 10px 0px 0px" }} onClick={() => banUser(user.id)}></FaLock>
                                    <MdDelete style={{cursor: "pointer"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                 </>
                        }
                           </>
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
            </>
      );
   } 
   else {
      history.push("/");
   }
}

export default Users;