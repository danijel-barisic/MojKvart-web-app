import React from "react";
import Header from "./Header";
import { useHistory } from "react-router";
import HeaderNotLoggedIn from "./HeaderNotLoggedIn";
import ReactSession from "react-client-session/dist/ReactSession";

function Home() {
   const history = useHistory();
   const isLoggedIn = ReactSession.get("username");

   
   console.log("home->", {isLoggedIn})
   if (!isLoggedIn) {
      history.push("/");
      return (
         <HeaderNotLoggedIn state={isLoggedIn} />
      )
   }
   else {
      return (
         <Header state={isLoggedIn} />
      );
   }

}

export default Home;