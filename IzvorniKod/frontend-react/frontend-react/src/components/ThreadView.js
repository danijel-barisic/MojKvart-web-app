import React from "react";
import { useRef } from "react";
import "./Header.css";
import Card from "./Card";
import ReactSession from "react-client-session/dist/ReactSession";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { MdDelete, MdEdit, MdPostAdd, MdReply } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoReply } from "react-icons/go";
import Post from "./Post";
import ThreadNewPost from "./ThreadNewPost";
import CardThreadView from "./CardThreadView";
import { HiFolderOpen } from "react-icons/hi";
import "./Login.css";

function ThreadView(props) {
  const { idT: id } = useParams();
  console.log("hjkfshkfhskh" + id);

  const [posts, setPosts] = React.useState([]);
  const [updated, setUpdated] = React.useState(new Date());
  const [user, setUser] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [thread, setThread] = React.useState();
  const izbrisano = React.useRef({});
  let isModerator = false;
  const history = useHistory();

  const userSession = ReactSession.get("username");

  const inputRef = useRef({});

  //console.log(inputRef.current)

  function onReply(inputRef, replyId) {
    if (inputRef.current[replyId] == undefined) {
      console.log("izbrisano");
    } else {
      var cln = inputRef.current[replyId].className;
      inputRef.current[replyId].className =
        inputRef.current[replyId].className +
        " " +
        "elementToFadeInAndOutighlight";
      setTimeout(function () {
        inputRef.current[replyId].className = cln;
      }, 1000);
      var elmntToView = document.getElementById(replyId);
      elmntToView.scrollIntoView();
    }
  }
  function deletePost(id) {
    const options = {
      method: "DELETE",
    };
    fetch(`/posts/${id}`, options).then((res) => {
      if (!res.ok) {
        console.log(res.body);
      } else {
        console.log("deleted");
        setUpdated(new Date());
      }
    });
    izbrisano.current[id] = "deleted";
  }

  function onNewPost() {
    setUpdated(new Date());
  }

  console.log(thread);

  React.useEffect(() => {
    fetch(`/threads/${id}`)
      .then((data) => data.json())
      .then((thread) => setThread(thread));
  }, []);

  React.useEffect(() => {
    fetch(`/threads/${id}`)
      .then((data) => data.json())
      .then((thread) => setPosts(thread.posts));

    fetch(`/accounts/${userSession}`)
      .then((data) => data.json())
      .then((user) => setUser(user));
    fetch(`/accounts`)
      .then((data) => data.json())
      .then((users) => setUsers(users));
  }, [updated]);

  React.useEffect(() => {
    if (user !== undefined && user.id !== undefined) {
      fetch(`/accounts/roles/${user.id}`)
        .then((data) => data.json())
        .then((roles) => setRoles(roles));
    }
  }, [user]);

  if (roles == undefined || thread == undefined || posts == undefined) {
    return (
      <>
        <div>Wait for page to load...</div>
      </>
    );
  }
  console.log(izbrisano);
  return (
    <>
      <div className="threadViewTop">
        <button
          className="button2"
          type="button"
          onClick={() => {
            history.goBack();
          }}
        >
          {" "}
          Natrag
        </button>
        <div className="current-title">
          <MdPostAdd /> {thread.name}
        </div>
        <button
          className="button-purple"
          type="button"
          onClick={() => {
            history.push(`/novaobjava/${id}`);
          }}
        >
          {" "}
          Stvori objavu
        </button>
      </div>
      <CardThreadView>
        {posts.map(function (post) {
          let rendered = false;
          roles.forEach((role) => {
            if (role.name === "Moderator") {
              isModerator = true;
            }
          });
          return [
            <div className="wrapperTV">
              {post.replyId !== null ? (
                <>
                  <div className="innerReply">
                    <div
                      ref={(el) => (inputRef.current[post.id] = el)}
                      id={post.id}
                    ></div>

                    <div className="innerRep">
                      <p className="pTV">
                        {"~" +
                          post.account.firstName +
                          " " +
                          post.account.lastName}
                        <GoReply
                          style={{
                            color: "#A555B9",
                            cursor: "pointer",
                            width: "50px",
                            height: "30px",
                          }}
                          onClick={() => onReply(inputRef, post.replyId)}
                        ></GoReply>
                        {izbrisano.current[post.replyId] != "deleted" ? (
                          <> ({post.replyId})</>
                        ) : (
                          <>[obrisano]</>
                        )}
                      </p>
                    </div>

                    <Post key={post.id} post={post} />

                    <button
                      className="replyButton"
                      type="button"
                      onClick={() => {
                        history.push(`/novaobjava/${id}/${post.id}`);
                      }}
                    >
                      {" "}
                      <MdReply size={20}></MdReply>Odgovori
                    </button>
                  </div>
                  {user.id === post.account.id || isModerator ? (
                    <>
                      <div>
                        <MdDelete
                          style={{ color: "#A555B9", cursor: "pointer" }}
                          onClick={() => deletePost(post.id)}
                        ></MdDelete>
                        <Link to={`/novaobjava/${id}/${post.id}/edit`}>
                          <MdEdit style={{ color: "white" }}></MdEdit>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  <div className="wrapperTV2">
                    <p className="pTV">
                      {"~" +
                        post.account.firstName +
                        " " +
                        post.account.lastName}
                    </p>
                    <div
                      className="innerTV"
                      ref={(el) => (inputRef.current[post.id] = el)}
                      id={post.id}
                    >
                      <Post key={post.id} post={post} />
                    </div>

                    <button
                      className="replyButton"
                      type="button"
                      onClick={() => {
                        history.push(`/novaobjava/${id}/${post.id}`);
                      }}
                    >
                      {" "}
                      <MdReply size={20}></MdReply>Odgovori
                    </button>
                    {(rendered = true)}
                  </div>
                </>
              )}

              {user.id === post.account.id &&
              post.replyId == null &&
              !isModerator &&
              rendered ? (
                <>
                  <div className>
                    <MdDelete
                      style={{ color: "#A555B9", cursor: "pointer" }}
                      onClick={() => deletePost(post.id)}
                    ></MdDelete>
                    <Link to={`/novaobjava/${id}/${post.id}/edit`}>
                      <MdEdit style={{ color: "white" }}></MdEdit>
                    </Link>
                  </div>
                </>
              ) : isModerator && post.replyId == null ? (
                <>
                  <MdDelete
                    style={{ color: "#A555B9", cursor: "pointer" }}
                    onClick={() => deletePost(post.id)}
                  ></MdDelete>
                  <Link to={`/novaobjava/${id}/${post.id}/edit`}>
                    <MdEdit style={{ color: "white" }}></MdEdit>
                  </Link>{" "}
                </>
              ) : (
                <></>
              )}
            </div>,
          ];
        })}
      </CardThreadView>
    </>
  );
}

export default ThreadView;
