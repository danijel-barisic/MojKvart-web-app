import React from 'react'
import Card from './Card'
import {FaTimes,FaCheck} from 'react-icons/fa'
import RoleRequestUser from './RoleRequestUser'
import './RoleRequest.css'
import '../style/style.css'
import { FaMedal } from "react-icons/fa"
import "./Card.css"
import SubCard from './SubCard'

const RoleRequests = () => {
    const [requests,setRequests] = React.useState([]);
    const [users,setUsers] = React.useState([]);
    const roles = {
      '1' : "ADMIN",
      '2': "Moderator",
      '3': "Vijecnik",
      '4' : "Stanovnik"
    }
   

    function onDeny(idR,idA){
      const options = {
         method: 'DELETE',
      };
      fetch(`/role-requests/${idR}`, options)
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
      const options2 = {
        method: 'DELETE',
     };
     fetch(`/role-requests/${idR}`, options2)
      console.log(users)
      setTimeout(() =>{
        setRequests(requests.filter((request) => request.id !== idR ))
        },2000)
      setRequests(requests.map(request => request.id === idR? { ...request, status: 'Approved' }: request)) 
    } 

  
    React.useEffect(() => {
      const fetchData = async () => {
        const fetchUsers = await fetch('/accounts').then(data => data.json());
        const fetchRoleRequests = await fetch('/role-requests').then(data => data.json());
  
        setUsers(fetchUsers);
        setRequests(fetchRoleRequests);
      };
  
      fetchData()
  
    }, []);


    
    return (
      <>
          <div className="current-title">
                <FaMedal /> ZAHTJEVI ZA ULOGE
            </div>
        <Card>
                 <div className="wrapperRR">
                        <p>Korisnik</p> <p >Status</p> <p> Tražena uloga </p>  <p></p>
                  </div>
        </Card> 
               {requests.map( (request) => {
                     console.log(request.status)

                 var user = users.find(x => x.id === request.account.id)
                  return ([
                      <SubCard>
                        <div className="innerRR" >
                           <p> <RoleRequestUser key={request.account.id-1} user={user} /> </p>
                           <p className={request.status == "Pending" ? "Pending" : request.status == "Denied" ? "Denied" : "Approved" }>  {request.status == "Pending" ? "Pending" : request.status == "Denied" ? "Denied" : "Approved"}</p>
                           <p > {roles[request.role.id]}</p>

                           <div className="icons">
                           <FaCheck style={{color:"#2390F0" ,cursor:"pointer"}} onClick={() => {if(window.confirm('Are you sure u want to approve this role request?')) {onApprove(request.id,request.account.id,request.role.id)}}}></FaCheck>
                           <FaTimes style={{color:"#A555B9" ,cursor:"pointer"}} onClick={() => {if(window.confirm('Are you sure u want to deny this role request?')) {onDeny(request.id,request.account.id)}}}></FaTimes>
                           </div>

                      
                        </div>
                     
                     </SubCard>
                  ]);
               })}
               
            
        
      </>
    )
}

export default RoleRequests
