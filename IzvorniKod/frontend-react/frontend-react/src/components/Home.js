import React from "react";
import Header from "./Header";
import { useHistory } from "react-router";
import HeaderNotLoggedIn from "./HeaderNotLoggedIn";

function Home(props) {
   const history = useHistory();
   const { state } = props;

   history.push("/");

   console.log("home->", {state})
   if (state === false) {
      return (
         <HeaderNotLoggedIn state={state} />
      )
   }
   else {
      return (
         <Header state={state} />
      );
   }

}

export default Home;