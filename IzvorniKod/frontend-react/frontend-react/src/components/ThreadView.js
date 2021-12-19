import React from 'react';
import './Header.css';
import Card from './Card';
import { useParams } from 'react-router-dom';

function ThreadView(props) {
   const { id } = useParams();
   console.log("hjkfshkfhskh" + id);
   const { name } = props.location.state;
   const [posts, setPosts] = React.useState([]);
   const [updated, setUpdated] = React.useState(new Date());


   React.useEffect(() => {
      fetch(`/threads/${id}`)
         .then(data => data.json())
         .then(posts => setPosts(posts.posts))
   }, [updated]);
   console.log(posts.posts);
   
   return (
      <>
         <div className="centar">
            <Card title={name}>
            </Card>
         </div>
         <div>
            <Card>
               <div className='StreetList'>
                  {posts.map(function (post) {
                     return ([
                        <div className='headerdist'> 
                           <span >postid: {post.id} content:{post.content} accountid:{post.account.id }</span>
                        </div>
                     ])
                  })}
               </div>
            </Card>
         </div>
      </>
   );
}

export default ThreadView;