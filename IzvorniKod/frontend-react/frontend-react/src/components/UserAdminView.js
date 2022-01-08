import React from "react";
import Card from "./Card";
import ReactSession from "react-client-session/dist/ReactSession";
import RoleManagement from "./RoleManagement";
import * as authentication from "../authentication" // iako, mislim da se odmah na routerima onemogučio pristup
import ComponentCard from "./ComponentCard"
import CardClone from "./CardClone";
import "./Card.css";

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
            is_admin: undefined,
            user_is_admin: undefined,
            user_roles: undefined,
        }
        this.has_already_fetched_user = false;
    }

    render() {
        if (this.state.error !== undefined) {
            return <Card title="Greška"><span>{this.state.error.message + ""}</span></Card>;
        }
        // const role = ReactSession.get(ReactSession.get("username"));
        // if (role !== "ADMIN") {
        //     this.props.history.push("/");
        // }
        if (this.state.is_admin === undefined) {
            return <Card title="Pričekajte">Provjeravamo jeste li admin</Card>;
        } else if (!this.state.is_admin) {
            console.log("UserAdminView.js: nije admin");
            //     this.props.history.push("/");
            return null;
        }
        const user = this.state.user;
        if (!user || !user.username || this.state.user_is_admin === undefined) {
            return <Card title="Čekajte da se korisnik učita" />;
        }
        const district = user.district || { name: "nema informacije", id: "?" };

        return (
            <>
            <div className="current-title">{user.username}</div>
            <ComponentCard>
                <table><tbody>
                <tr><td style={{padding: "3px 15px"}}><b>E-mail:</b>                  </td><td style={{padding: "3px 15px"}}>{user.email}                        </td></tr>
                <tr><td style={{padding: "3px 15px"}}><b>Ime:</b>                     </td><td style={{padding: "3px 15px"}}>{user.firstName}                    </td></tr>
                <tr><td style={{padding: "3px 15px"}}><b>Prezime:</b>                 </td><td style={{padding: "3px 15px"}}>{user.lastName}                     </td></tr>
                <tr><td style={{padding: "3px 15px"}}><b>id:</b>                      </td><td style={{padding: "3px 15px"}}>{user.id}                           </td></tr>
                { this.state.user_is_admin === false
                    ? <>
                        <tr><td style={{padding: "3px 15px"}}><b>Kvart:</b>                   </td><td style={{padding: "3px 15px"}}>{district.name} (id: {district.id}) </td></tr>
                        <tr><td style={{padding: "3px 15px"}}><b>Adresa valjana:</b>          </td><td style={{padding: "3px 15px"}}>{user.addressValid + ""}            </td></tr>
                        <tr><td style={{padding: "3px 15px"}}><b>Korisnik blokiran:</b>       </td><td style={{padding: "3px 15px"}}>{user.blocked + ""}                 </td></tr>
                    </>
                    : null
                }
                </tbody></table>
                <div className="Login flex-container">
                    <button onClick={() => this.props.history.push("/")}>Natrag</button>
                </div>
                { this.state.user_is_admin ? null : <RoleManagement user={user} roles={this.state.user_roles} did_passin_roles={true} /> }
            </ComponentCard>
            </>
        );
    }

    componentDidMount() {
        authentication.asyncCurrentUserHasRole("ADMIN").then(is_admin => this.setState({ is_admin }));
        this.myComponentDidRender();
        // this.fetchUser(this.state.user_id);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.myComponentDidRender();
        if (this.state.is_admin && (!this.has_already_fetched_user || this.state.user_id !== prevState.user_id)) {
            this.fetchUser(this.state.user_id);
        }
    }

    fetchUser(id) {
        this.has_already_fetched_user = true;
        const options = {
            method: "GET",
        };
        fetch(`/accounts/id/${id}`, options)
            .then(response => {
                if (!response.ok) {
                    console.log("UserAdminView.js: error fetchig account");
                    this.setError({ message: "Korisnik se nije mogao učitati", });
                } else {
                    console.log("UserAdminView.js: fetched user");
                    response.json().then(data => {
                        this.setUser(data);
                        this.checkRoles(data);
                    });
                }
            })
            .catch(reason => {
                console.log("UserAdminView.js: error fetchig account");
                this.setError({ message: "Korisnik se nije mogao učitati", });
            })
        ;
    }
    setUser(user) {
        this.setState({ user });
    }
    setError(error) {
        this.setState({ error });
    }

    myComponentDidRender() {}

    checkRoles(user) {
        if (user === undefined) {
            this.setError({ message: "Nema korisnika" });
            return false;
        }
        const id = user.id;
        fetch(`/accounts/roles/${id}` /* GET */)
            .then(response => {

                if (!response.ok) {
                    console.log("UserAdminView.js: error fetchig roles");
                    this.setError({message: "Uloge se misu mogle učitati",});
                    return false;
                } else {
                    console.log("UserAdminView.js: fetched roles");
                    response.json().then(data => {
                        this.setRoles(data);
                    });
                    return true;
                }
            })
            .catch(reason => {
                console.log("UserAdminView.js: error fetchig roles");
                this.setError({ message: "Korisnikove uloge se nisu mogle učitati", });
            })
        ;
    }
    setRoles(roles) {
        this.setState({ user_roles: roles });
        for (const role of roles) {
            if (role.name === "ADMIN") {
                this.setState({ user_is_admin: true });
                return;
            }
        }
        this.setState({ user_is_admin: false });
    }
}
