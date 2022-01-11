import React from "react";
import ReactSession from "react-client-session/dist/ReactSession";
import { useHistory } from "react-router";
import './Login.css';
import { FaTimes } from 'react-icons/fa';
import { MdDelete,MdForum,MdEdit,MdReply, MdPostAdd } from 'react-icons/md';
import Thread from "./Thread";
import SubCardForum from "./SubCardForum";
import CardForum from "./CardForum";
import {HiFolderOpen} from 'react-icons/hi'
import Card50 from "./Card50.js";
import Card12 from "./Card12";
import Card17 from "./Card17";

function Forum(props) {
   const [threads, setThreads] = React.useState([]);
   const [users, setUsers] = React.useState([]);
   const [roles, setRoles] = React.useState([]);
   const [updated, setUpdated] = React.useState(new Date());
   const user = ReactSession.get("username");
   const history = useHistory();
   let userid = undefined;

   function deleteThread(id) {
      const options = {
         method: 'DELETE',
      };
      fetch(`/threads/${id}`, options)
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
      const fetchData = async () => {
         const fetchThreads = await fetch('/threads').then(data => data.json());
         setThreads(fetchThreads);
         const fetchUsers = await fetch(`/accounts/${user}`).then(data => data.json());
         setUsers(fetchUsers);
         userid = fetchUsers.id;
         const fetchRoles = await fetch(`/accounts/roles/${userid}`).then(data => data.json());
         setRoles(fetchRoles);
      };

      fetchData();
   }, [updated]);

   if (users === undefined || threads === undefined || users.district === undefined) {
      console.log("users: ", users, "threads: ", threads, "roles: ", roles);
      return ([ 
         <>
            <div className="current-title">
               <MdForum className="icon-color" /> FORUM
            </div>
               {/* <div className='Login'>
                  <button className='button' type="button" onClick={() => {history.push("/novatema")}}>Dodaj temu</button>
               </div> */}
               <Card50 title='Molimo pričekajte dok se podaci ne učitaju!'>
            </Card50>
         </>
      ]);
   } else {
      return (
         <>
            <div className="current-title">
               <MdForum className="icon-color" /> FORUM
            </div>
            {/* <div title='Forum'>
               <div className='Login'>
                  <button className='button' type="button" onClick={() => {history.push("/novatema")}}>Dodaj temu</button>
               </div>
            </div> */}
            <div className="sub-header"></div>
            <div className="grid-father">
               <Card17>
                  <h2>TEME</h2>
                  <button className='button-purple' type="button" onClick={() => {history.push("/novatema")}}>Dodaj temu</button>
               </Card17>
               {threads.map(function (thread) {
                  userid = users.id;
                  let role = roles.map(function (x) {
                     return x[Object.keys(x)[1]]
                  })
                  if(users.district.id === thread.district.id) {
                     return (
                        <Card12>
                           <h2>{thread.name}</h2>
                           <div className="Login flex-container-right">
                              <div>
                                 <span>
                                    <button className='button' type="button" onClick={() => {history.push(`/forum/${thread.id}`)}}>Otvori temu</button>
                                    {
                                       (role.includes("Moderator"))
                                       ?  <>
                                             <div className="inner">
                                                <MdDelete style={{ color: "#A555B9", cursor: "pointer", width: "28px", height: "28px"}} onClick={() => deleteThread(thread.id)}></MdDelete>
                                             </div>
                                          </>
                                       :  <></>
                                    }
                                 </span>
                              </div>
                           </div>
                        </Card12>
                     )
                  } else {
                     return (<></>)
                  }
               })}
            </div>
         </>
      );
   }

}

export default Forum;