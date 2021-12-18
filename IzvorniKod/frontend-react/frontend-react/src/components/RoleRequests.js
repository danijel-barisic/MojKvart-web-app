import React from 'react'
import ReactSession from 'react-client-session/dist/ReactSession'
import Card from './Card'
import {FaTimes,FaCheck} from 'react-icons/fa'

const RoleRequests = () => {
    const [requests,setRequests] = React.useState([]);
    const [users,setUsers] = React.useState([]);
    const [isLoading,setLoading] = React.useState([true])
    const role = ReactSession.get(ReactSession.get("username"));
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
      var result = users.find(user => {
        return user.id === idA
      })
      const data = {
        id: idA,
        email : result.email,
        firstName : result.firstName,
        lastName : result.lastName,
        password : result.password,
        roles: roles[idRR]
     };
     const options = {
        method: 'PUT',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
     };
    
      fetch(`/accounts/${idA}`, options)
      console.log(users)
      setTimeout(() =>{
        setRequests(requests.filter((request) => request.id !== idR ))
        },3000)
      setRequests(requests.map(request => request.id === idR? { ...request, status: 'Approved' }: request)) 
    } 

    function fetchData() {
      fetch('/accounts')
        .then(jsonResponse => jsonResponse.json())
        .then(response => {
          setUsers(response);
        })
        .catch(e => {
          console.log("error", e);
        });
        fetch('/role-requests')
        .then(jsonResponse => jsonResponse.json())
        .then(response => {
          setLoading(false);
          setRequests(response);
        })
        .catch(e => {
          console.log("error", e);
          setLoading(false);
        });
    }
  
    React.useEffect(() => {
      fetchData();
    }, []);

    console.log(requests)

    if(isLoading){
      return(
        <p>Page is loading please wait.</p>
      )
    }
    return (
        <Card title = "Zahtjevi">
             
             
                 <div className="wrapperRR">
                        <p>Username</p> <p >Status</p> <p> Role Requested </p>  <p></p>
                        </div>
               {requests.map( (request) => {
                  return ([
                    
                    
                        <div className="innerRR" >
                           <p>{users[request.account.id-1].email} </p>
                        
                     
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
