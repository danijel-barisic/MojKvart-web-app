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
   const { name } = props.location.state;
   const [posts, setPosts] = React.useState([]);
   const [updated, setUpdated] = React.useState(new Date());
   const [users,setUsers] = React.useState([]);
   const [roles, setRoles] = React.useState()

   const history = useHistory();
   const user = ReactSession.get("username");

   

   
    const inputRef = useRef({});
   
   console.log(inputRef.current)
   function onReply(inputRef,replyId){
      
      inputRef.current[replyId].className = inputRef.current[replyId].className + " " + "elementToFadeInAndOutighlight";
      setTimeout(function() {
         inputRef.current[replyId].className = "inner"
         },2000)
      
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
   }

   function onNewPost() {
      setUpdated(new Date());
   }


   React.useEffect(() => {
      fetch(`/threads/${id}`)
         .then(data => data.json())
         .then(posts => setPosts(posts.posts))
      fetch(`/accounts/${user}`).then(data => data.json())
         .then(users => setUsers(users));
      
   }, [updated]);

   React.useEffect(() => {
      if (users !== undefined && users.id !== undefined) {
          fetch(`/accounts/roles/${users.id}`)
          .then(data => data.json())
          .then(roles => setRoles(roles))
      }
  }, [users])

  if(roles == undefined) {
     return(
        <><div>Wait for page to load...</div></>
     )
  }
  
   return (
      <>
         <div className="centar">
         <Card title={name}>
       
         </Card>
         </div>
         <div className='wrapperCard'>
            <Card>
               <div className='StreetList'>
                  {posts.map(function (post) {
                    return ([
                     <div className="wrapper">
                        {
                        (post.replyId !== null) ? <>
                        <div className="innerReply">
                           <div className='innerReplyWho'>
                              
                       
                        <GoReply onClick={() => onReply(inputRef,post.replyId)} ></GoReply>
                        
                        ({(post.replyId)})
                        </div>

                           <Post key={post.id} post={post} />
                           {
                              (users.id === post.account.id || roles[0].name === "Moderator" )
                              ?  <>
                                    <div className="inner">
                                       <MdDelete style={{color:"red" ,cursor:"pointer"}} onClick={() => deletePost(post.id)}></MdDelete>
                                      <Link to={`/novaobjava/${id}/${post.id}/edit`}><MdEdit style={{margin:"0px 50px 0px 0px"}}></MdEdit></Link>
                                      {"~" +users.firstName + " " + users.lastName}
                                    </div>
                                 </>
                              :  <></>
                           }
                        </div>
                        </>
                        : <>
                        <div className="inner" ref={el => inputRef.current[post.id] = el} id={post.id}>
                           
                        <Post key={post.id} post={post} />
                        
                        </div>
                        </>
                        }
                     
                        {
                              (users.id === post.account.id && post.replyId == null)
                              ?  <>
                                    <div className="inner">
                                       <MdDelete style={{color:"red" ,cursor:"pointer"}} onClick={() => deletePost(post.id)}></MdDelete>
                                      <Link to={`/novaobjava/${id}/${post.id}/edit`}><MdEdit style={{margin:"0px 50px 0px 0px"}}></MdEdit></Link> 
                                      {"~" +users.firstName + " " + users.lastName}
                                    </div>
                                 </>
                              :  <></>
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