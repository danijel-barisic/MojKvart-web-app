import React from 'react'
import Card from './Card'
import {FaTimes,FaCheck} from 'react-icons/fa'
import RoleRequestUser from './RoleRequestUser'
import './RoleRequest.css'

const RoleRequests = () => {
    const [requests,setRequests] = React.useState([]);
    const [users,setUsers] = React.useState([]);
    var roles = {
      '1' : "ADMIN",
      '2' : "Moderator",
      '3' : "Vijećnik",
      '4' : "Stanovnik"
    }

    function onDeny(idR,idA){
      const options = {
         method: 'DELETE',
      };
      //fetch(`/role-requests/${id}`, options)
      setRequests(requests.map(request => request.id === idR? { ...request, status: 'Denied' }: request))
      setTimeout(() =>{
      setRequests(requests.filter((request) => request.id !== idR ))
      },3000)

    } 

    function onApprove(idR,idA,idRR){
     const options = {
        method: 'PUT',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(roles[idRR])
     };
      
      fetch(`/accounts/grantRole/${idA}`, options)
      console.log(users)
      setTimeout(() =>{
        setRequests(requests.filter((request) => request.id !== idR ))
        },3000)
      setRequests(requests.map(request => request.id === idR? { ...request, status: 'Approved' }: request)) 
    } 

  
    React.useEffect(() => {
      const fetchData = async () => {
        const respGlobal = await fetch('/accounts').then(data => data.json());
        const respRepos = await fetch('/role-requests').then(data => data.json());
  
        setUsers(respGlobal);
        setRequests(respRepos);
      };
  
      fetchData()
  
    }, []);

    //console.log(users)

    
    return (
        <Card title = "Zahtjevi">
                 <div className="wrapperRR">
                        <p>Username</p> <p >Status</p> <p> Role Requested </p>  <p></p>
                        </div>
               {requests.map( (request) => {
                 var user = users.find(x => x.id === request.account.id)
                  return ([

                        <div className="innerRR" >
                           <p> <RoleRequestUser key={request.account.id-1} user={user} /> </p>
                           <p className={request.status == "" ? "Pending" : request.status == "Denied" ? "Denied" : "Approved" }>  {request.status == "" ? "Pending" : request.status == "Denied" ? "Denied" : "Approved"}</p>
                           <p > {roles[request.role.id]}</p>

                           <div className="icons">
                           <FaCheck style={{color:"#039487" ,cursor:"pointer"}} onClick={() => {if(window.confirm('Are you sure u want to approve this role request?')) {onApprove(request.id,request.account.id,request.role.id)}}}></FaCheck>
                           <FaTimes style={{color:"red" ,cursor:"pointer"}} onClick={() => {if(window.confirm('Are you sure u want to deny this role request?')) {onDeny(request.id,request.account.id)}}}></FaTimes>
                           </div>

                      
                        </div>
                     
                     
                  ]);
               })}
               
            
        </Card>
    )
}

export default RoleRequests
