import React from "react";
import Card from "./Card";
import ReactSession from "react-client-session/dist/ReactSession";
import { useHistory } from "react-router";
import './Login.css';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import User from "./User";
import RoleRequestUser from "./RoleRequestUser";
import '../style/style.css';
import {BsPeopleFill} from 'react-icons/bs'
import {ImBlocked} from 'react-icons/im'
import Card3 from "./Card3";

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

   function checkAdmin(id) {
      const options = {
         method: 'GET',
      };
      fetch(`/accounts/roles/${id}`, options).then(response => {
         if (!response.ok) {
            console.log(response.body);
         } else {
            console.log(response.json());
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
         <div className="current-title">
         <BsPeopleFill /> KORISNICI
      </div>
         <>
         <Card3>
            <div className='StreetList'>
               {users.map(function (user) {
                  let district = user.district;
                  let roles = user.roles.map(function (x) {
                     return x[Object.keys(x)[1]]
                  })
                  console.log("districtid->",district.id);
                  console.log(roles);
                  if (district.id == currentId) {
                     return ([
                        <div className="wrapper2">
                           <div className="inner">
                              <User key={user.id} user={user} props={props} />
                           </div>
                           <div className="inner">
                           <div className="pad">
                              {
                                 (roles.includes("ADMIN"))
                                    ? <>
                                    </>
                                    : <>
                                       {
                                          (user.blocked === true)
                                             ? <>
                                                <FaLockOpen style={{ color: "#2390F0", cursor: "pointer", margin: "0px 10px 0px 0px" , width: "28px", height: "28px"}} onClick={() => UnbanUser(user.id)}></FaLockOpen>
                                                <MdDelete style={{ cursor: "pointer" , width: "28px", height: "28px"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                             </>
                                             : <>
                                                <FaLock style={{ color: "#A555B9", cursor: "pointer", margin: "0px 10px 0px 0px" , width: "28px", height: "28px"}} onClick={() => banUser(user.id)}></FaLock>
                                                <MdDelete style={{ cursor: "pointer" , width: "28px", height: "28px"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                             </>
                                       }
                                    </>
                              }
                           </div>
                           </div>
                        </div>
                     ])
                  } else if (currentId === undefined){
                     return ([
                        <div className="wrapper2">
                           <div className="inner">
                              <User key={user.id} user={user} props={props}/>
                           </div>
                           <div className="inner">
                              <div className="pad">

                              <>
                              {
                                 (roles.includes("ADMIN"))
                                 ? <>
                                 </>
                                 : <>
                                    {
                                       (user.blocked === true)
                                          ? <>
                                             <FaLockOpen style={{ color: "#2390F0", cursor: "pointer", margin: "0px 10px 0px 0px" , width: "28px", height: "28px"}} onClick={() => UnbanUser(user.id)}></FaLockOpen>
                                             <MdDelete style={{ cursor: "pointer" , width: "28px", height: "28px"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                          </>
                                          : <>
                                             <FaLock style={{ color: "#A555B9", cursor: "pointer", margin: "0px 10px 0px 0px" , width: "28px", height: "28px"}} onClick={() => banUser(user.id)}></FaLock>
                                             <MdDelete style={{ cursor: "pointer" , width: "28px", height: "28px"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                          </>
                                    }
                                 </>
                              }
                                 </>
                              </div>
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
         </Card3>
         <div className="current-title">
         <ImBlocked /> BLOKIRANI KORISNICI
      </div>
         <div style={{marginBottom: "30px"}}>

         <Card3>
         <div className='StreetList'>
            {users.map(function (user) {
               let district = user.district;
               console.log(district.id);
               if (district.id == currentId && user.blocked === true) {
                  return ([
                     <div className="wrapper2">
                        <div className="inner">
                           <User key={user.id} user={user} props={props}/>
                        </div>
                        <div className="inner">
                           <div className="pad">
                           <>
                           {
                              (user.blocked === true)
                                 ?  <>
                                       <FaLockOpen style={{color:"#2390F0" ,cursor:"pointer", margin: "0px 10px 0px 0px" , width: "28px", height: "28px"}} onClick={() => UnbanUser(user.id)}></FaLockOpen>
                                       <MdDelete style={{cursor: "pointer", width: "28px", height: "28px"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                    </>
                                 :  <>
                                       <FaLock style={{color:"#A555B9" ,cursor:"pointer", margin: "0px 10px 0px 0px" , width: "28px", height: "28px"}} onClick={() => banUser(user.id)}></FaLock>
                                       <MdDelete style={{cursor: "pointer", width: "28px", height: "28px"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                    </>
                           }
                           </>
                        </div>
                        </div>
                     </div>
                  ]);
               } else if (currentId === undefined && user.blocked === true){
                  return ([
                     <div className="wrapper2">
                        <div className="inner">
                           <User key={user.id} user={user} props={props}/>
                        </div>
                        <div className="inner">
                           <div className="pad">
                        <>
                        {
                           (user.blocked === true)
                              ?  <>
                                    <FaLockOpen style={{color:"#2390F0" ,cursor:"pointer", margin: "0px 10px 0px 0px" , width: "28px", height: "28px"}} onClick={() => UnbanUser(user.id)}></FaLockOpen>
                                    <MdDelete style={{cursor: "pointer", width: "28px", height: "28px"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                 </>
                              :  <>
                                    <FaLock style={{color:"#A555B9" ,cursor:"pointer", margin: "0px 10px 0px 0px" , width: "28px", height: "28px"}} onClick={() => banUser(user.id)}></FaLock>
                                    <MdDelete style={{cursor: "pointer", width: "28px", height: "28px"}} onClick={() => deleteUser(user.id)}></MdDelete>
                                 </>
                        }
                           </>
                        </div>
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
            </Card3>
         </div>
            </>
         </>
      );
   } 
   else {
      history.push("/");
   }
}

export default Users;