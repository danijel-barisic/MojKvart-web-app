import React from "react";
import Header from "./Header";

function Home(props) {
   const { state } = props;

   //console.log("home->", {state})
   return (
      <Header state={state}/>
   );
}

export default Home;