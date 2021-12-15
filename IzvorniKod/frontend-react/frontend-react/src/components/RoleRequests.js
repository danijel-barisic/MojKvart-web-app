import React from 'react'
import ReactSession from 'react-client-session/dist/ReactSession'
import Card from './Card'
import {FaTimes,FaCheck} from 'react-icons/fa'

const RoleRequests = () => {
    const [requests,setRequests] = React.useState([]);
    const [users,setUsers] = React.useState([]);
    const [isLoading,setLoading] = React.useState([true])
    const role = ReactSession.get(ReactSession.get("username"));

    function onDeny(id){
      const options = {
         method: 'DELETE',
      };
      //fetch(`/role-requests/${id}`, options)
      setRequests(requests.map(request => request.id === id? { ...request, status: 'Denied' }: request))
      //setRequests(requests.filter((request) => request.id !== id ))

      console.log(requests)
    } 

    function onApprove(id){
      const options = {
         method: 'DELETE',
      };
      //fetch(`/role-requests/${id}`, options)
      //setRequests(requests.filter((request) => request.id !== id ))
      setRequests(requests.map(request => request.id === id? { ...request, status: 'Approved' }: request))
      console.log(requests)
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

    console.log(users)

    if(isLoading){
      return(
        <p>Page is loading please wait.</p>
      )
    }
    return (
        <Card title = "Zahtjevi">
             
             
                 <div className="wrapperRR">
                        <p>Username</p> <p>Status</p> <p> AccountId </p>
                        </div>
               {requests.map( (request) => {
                  return ([
                    
                    
                        <div className="innerRR" >
                           <p>{users[request.account.id-1].email }</p>
                        
                     
                           <p className={request.status == "Pending" ? "Pending" : request.status == "Denied" ? "Denied" : "Approved" }>  {request.status}</p>
                        
                        
                           <p> {request.account.id}</p>
                           <div className="icons">

                           <FaCheck style={{color:"#039487" ,cursor:"pointer"}} onClick={() => {if(window.confirm('Are you sure u want to approve this role request?')) {onApprove(request.id)}}}></FaCheck>


                           <FaTimes style={{color:"red" ,cursor:"pointer"}} onClick={() => {if(window.confirm('Are you sure u want to deny this role request?')) {onDeny(request.id)}}}></FaTimes>
                           </div>

                        
                        </div>
                     
                     
                  ]);
               })}
               
            
        </Card>
    )
}

export default RoleRequests
