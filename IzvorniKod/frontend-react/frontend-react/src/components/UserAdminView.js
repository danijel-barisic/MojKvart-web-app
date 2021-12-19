import React from "react";
import Card from "./Card";
import ReactSession from "react-client-session/dist/ReactSession";
import './Login.css';
import User from "./User"
import RoleManagement from "./RoleManagement";

/* user
accountNonExpired: true
accountNonLocked: true
addressValid: true
authorities: [{…}]
blocked: false
credentialsNonExpired: true
district: {id: 1, name: 'Rudeš', threads: Array(0), meetings: Array(0)}
email: "stanovnik@stanovnik.com"
enabled: true
firstName: "stanovnik"
id: 4
lastName: "stanovnik"
password: "$2a$10$88weNhiq4e.e2dWpJSGR5uBbMEvjlHAWeHXZalJUN2UtMQaPFWFIy"
username: "stanovnik@stanovnik.com"
*/

export default class UserAdminView extends React.Component {
    constructor(props) {
        super(props);
        const { id } = this.props.match.params; // useParams();
        this.state = {
            user: undefined,
            user_id: id,
            error: undefined,
        }
    }
    fetchUser(id) {
        const options = {
            method: "GET",
        };
        fetch(`/accounts/id/${id}`, options)
            .then(response => {
                /* console.log(response); */
                if (!response.ok) {
                    console.log("error fetchig");
                    this.setError({ message: "Korisnik se nije mogao učitati", });
                } else {
                    console.log("fetched user");
                    response.json().then(data => this.setUser(data));
                }
            })
        ;
    }
    setUser(user) {
        this.setState({ user: user });
    }
    setError(error) {
        this.setState({ error: error });
    }

    render() {
        if (this.state.error !== undefined) {
            return <Card title="Greška"><span>{this.state.error.message + ""}</span></Card>;
        }
        const role = ReactSession.get(ReactSession.get("username"));
        if (role !== "ADMIN") {
            this.props.history.push("/");
        }
        const user = this.state.user;
        // console.log(user);
        if (!user || !user.username) {
            return <Card title="Čekajte da se korisnik učita"></Card>;
        }
        const district = user.district || { name: "nema informacije", id: "?" };
        // console.log(user);
        return (
            <Card title={user.username}>
                <table><tbody>
                    <tr><td>first name:             </td><td>{user.firstName}                    </td></tr>
                    <tr><td>last name:              </td><td>{user.lastName}                     </td></tr>
                    <tr><td>username:               </td><td>{user.username}                     </td></tr>
                    <tr><td>email:                  </td><td>{user.email}                        </td></tr>
                    <tr><td>id:                     </td><td>{user.id}                           </td></tr>
                    <tr><td>district:               </td><td>{district.name} (id: {district.id}) </td></tr>
                    {/*<tr><td>account not expired:    </td><td>{user.accountNonExpired + ""}       </td></tr>*/}
                    {/*<tr><td>account not locked:     </td><td>{user.accountNonLocked + ""}        </td></tr>*/}
                    <tr><td>address is valid:       </td><td>{user.addressValid + ""}            </td></tr>
                    <tr><td>blocked:                </td><td>{user.blocked + ""}                 </td></tr>
                    {/*<tr><td>credentials not expired:</td><td>{user.credentialsNonExpired + ""}   </td></tr>*/}
                    {/*<tr><td>enabled:                </td><td>{user.enabled + ""}                 </td></tr>*/}
                </tbody></table>
                <RoleManagement user={user}></RoleManagement>
            </Card>
        );
    }

    componentDidMount() {
        this.myComponentDidRender();
        this.fetchUser(this.state.user_id);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.myComponentDidRender();
        if (this.state.user_id !== prevState.user_id) {
            this.fetchUser(this.state.user_id);
        }
    }

    myComponentDidRender() {
        ;
    }
}
