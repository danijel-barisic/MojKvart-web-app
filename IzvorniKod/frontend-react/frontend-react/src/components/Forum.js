import React from "react";
import Card from "./Card";
import ReactSession from "react-client-session/dist/ReactSession";
import { useHistory } from "react-router";
import './Login.css';
import { FaTimes } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Thread from "./Thread";
import { MdForum } from 'react-icons/md'

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
               <Card title='Molimo pričekajte dok se podaci ne učitaju!'>
            </Card>
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
            <Card title='Teme'>
               {threads.map(function (thread) {
                  userid = users.id;
                  let role = roles.map(function (x) {
                     return x[Object.keys(x)[1]]
                  })
                     if(users.district.id === thread.district.id) {
                        return ([
                           <div className="wrapper">
                              <div className="inner">
                                 <Thread key={thread.id} thread={thread} />
                              </div>
                              {
                                    (role.includes("Moderator"))
                                    ?  <>
                                          <div className="inner">
                                             <MdDelete style={{color:"red" ,cursor:"pointer"}} onClick={() => deleteThread(thread.id)}></MdDelete>
                                          </div>
                                       </>
                                    :  <></>
                                 }
                           </div>
                        ]);
                     } else {
                        return ([
                           <>
                           </>
                        ])
                     }
                     })}
            </Card>
         </>
      );
   }

}

export default Forum;