import { useHistory } from "react-router";

function Button(props) {
   let history = useHistory();
   function handleClick() {
      props.onLogout();
      history.push("/login");
   }

   return (
      <button type='button' onClick={handleClick}>
         Logout
      </button>
   );
}

export default Button;