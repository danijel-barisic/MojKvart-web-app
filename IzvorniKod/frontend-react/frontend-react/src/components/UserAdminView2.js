import React from "react";
import Card from "./Card";
import ReactSession from "react-client-session/dist/ReactSession";

function UserAdminView2(props) {
   const [user, setUser] = React.useState('');
   const { email,district } = props.location.state;

   React.useEffect(() => {
      fetch(`/accounts/${email}`)
         .then(data => data.json())
         .then(user => setUser(user))
   }, [email]);

   const role = ReactSession.get(ReactSession.get("username"));

   if (role !== "ADMIN") {
      this.props.history.push("/");
   }
   return (
      <Card title={user.username}>
         <table><tbody>
            <tr><td>first name:               </td><td>{user.firstName}                           </td></tr>
            <tr><td>last name:                </td><td>{user.lastName}                            </td></tr>
            <tr><td>username:                 </td><td>{user.username}                            </td></tr>
            <tr><td>email:                    </td><td>{user.email}                               </td></tr>
            <tr><td>id:                       </td><td>{user.id}                                  </td></tr>
            <tr><td>district:                 </td><td>{district.name} (id: {district.id})        </td></tr>
            <tr><td>address is valid:         </td><td>{user.addressValid + ""}                        </td></tr>
            <tr><td>blocked:                  </td><td>{user.blocked + ""}                             </td></tr>
         </tbody></table>
      </Card>
   );

}

export default UserAdminView2;