import React from 'react';
import { useRef } from 'react';
import './Header.css';
import Card from './Card';
import ReactSession from "react-client-session/dist/ReactSession";
import { useHistory } from "react-router";
import { useParams } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import {GoReply} from 'react-icons/go';
import Post from './Post';
import ThreadNewPost from './ThreadNewPost';
function ThreadView(props) {
   const { idT:id } = useParams();
   console.log("hjkfshkfhskh" + id);
  
   const [posts, setPosts] = React.useState([]);
   const [updated, setUpdated] = React.useState(new Date());
   const [user,setUser] = React.useState([]);
   const [users, setUsers] = React.useState([]);
   const [roles, setRoles] = React.useState([]);
   const [thread,setThread] = React.useState();
   const [izbrisano,setIzbrisano] = React.useState([])
   let isModerator = false;
   const history = useHistory();
   
   const userSession = ReactSession.get("username");

    const inputRef = useRef({});
   
   //console.log(inputRef.current)

   function onReply(inputRef,replyId){
      
     
      if(inputRef.current[replyId] == undefined){
         console.log("izbrisano")
          
      }else{
         
         var cln = inputRef.current[replyId].className
         inputRef.current[replyId].className = inputRef.current[replyId].className + " " + "elementToFadeInAndOutighlight";
         setTimeout(function() {
            inputRef.current[replyId].className = cln
            },1000)
      }
     
      
   }
   function deletePost(id){
      const options = {
         method: 'DELETE',
      };
      fetch(`/posts/${id}`,options)
         .then(res =>{
         if(!res.ok){
            console.log(res.body);
         }else{
            console.log("deleted");
            setUpdated(new Date());
         }
      })
      setIzbrisano(oldArray => [...oldArray, id]);
      
   }

   function onNewPost() {
      setUpdated(new Date());
   }

   console.log(thread)

   React.useEffect(() =>{
      fetch(`/threads/${id}`)
            .then(data => data.json())
            .then(thread => setThread(thread))
   },[]);

   React.useEffect(() => {
      fetch(`/threads/${id}`)
         .then(data => data.json())
         .then(thread => setPosts(thread.posts))
         
      fetch(`/accounts/${userSession}`).then(data => data.json())
         .then(user => setUser(user));
      fetch(`/accounts`).then(data => data.json())
         .then(users => setUsers(users));
      
   }, [updated]);

   React.useEffect(() => {
      if (user !== undefined && user.id !== undefined) {
          fetch(`/accounts/roles/${user.id}`)
          .then(data => data.json())
            .then(roles => setRoles(roles))
            
      }
  }, [user])

  if(roles == undefined || thread == undefined) {
     return(
        <><div>Wait for page to load...</div></>
     )
  }
  
  
   return (
      <>
         <div className="centar">
         <Card title={thread.name}>
       
         </Card>
         </div>
         <div className='wrapperCard'>
            <Card>
               <div className='ThreadViewMain'>
                  {posts.map(function (post) {
                     let rendered = false;
                     roles.forEach(role => {
                        if (role.name === "Moderator") {
                           isModerator = true;
                        }
                     });
                    return ([
                     <div className="wrapperTV">
                        {
                        (post.replyId !== null) ? <>
                        <div className="innerReply">
                           <div className='innerReplyWho'>
                           
                       
                        <GoReply style={{cursor:"pointer"}} onClick={() => onReply(inputRef,post.replyId)} ></GoReply>
                        {!izbrisano.includes(post.replyId)  ?
                        <> ({(post.replyId)})</> : <>[obrisano]</>
                     }
                       
                        

                           <Post key={post.id} post={post} />
                           </div>
                           {
                              (user.id === post.account.id || isModerator )
                              ?  <>
                                    <div className="innerRep" ref={el => inputRef.current[post.id] = el} id={post.id}>
                                    <p className='pTV'>{"~" +post.account.firstName + " " + post.account.lastName}</p>
                                       <MdDelete style={{color:"red" ,cursor:"pointer"}} onClick={() => deletePost(post.id)}></MdDelete>
                                      <Link to={`/novaobjava/${id}/${post.id}/edit`}><MdEdit></MdEdit></Link>
                                      
                                    </div>
                                 </>
                              :  <>
                              <div className='innerRep'>
                              <p className="pTV">{"~" +post.account.firstName + " " + post.account.lastName}</p>
                              </div>
                              </>
                           }
                        </div>
                        </>
                        : <>
                        <div className="innerTV" ref={el => inputRef.current[post.id] = el} id={post.id}>
                        
                        <Post key={post.id} post={post} />
                                      <p className='pTV'>{"~" + post.account.firstName + " " + post.account.lastName + "TU"}</p>
                                      {rendered = true}
                        
                        </div>
                        </>
                        }
                     
                        {
                              (user.id === post.account.id && post.replyId == null && !isModerator && rendered)
                              ?  <>
                                    <div className="innerTV">
                                       <MdDelete style={{color:"red" ,cursor:"pointer"}} onClick={() => deletePost(post.id)}></MdDelete>
                                      <Link to={`/novaobjava/${id}/${post.id}/edit`}><MdEdit></MdEdit></Link> 
                                      
                                    </div>
                                 </>
                              : (isModerator && post.replyId == null) ? <>
                              <MdDelete style={{color:"red" ,cursor:"pointer"}} onClick={() => deletePost(post.id)}></MdDelete>
                             <Link to={`/novaobjava/${id}/${post.id}/edit`}><MdEdit></MdEdit></Link> </> : <></>
                           }
                           
                     </div>
                  ]);
                  })}
               </div>
            </Card>
            <ThreadNewPost onNewPost={ onNewPost }/>
         </div>
      </>
   );
}

export default ThreadView;