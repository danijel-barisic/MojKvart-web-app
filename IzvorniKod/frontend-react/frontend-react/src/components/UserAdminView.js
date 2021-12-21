import React from "react";
import Card from "./Card";
import ReactSession from "react-client-session/dist/ReactSession";
import RoleManagement from "./RoleManagement";
import * as authentication from "../authentication" // iako, mislim da se odmah na routerima onemogučio pristup

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
        }
        this.has_already_fetched_user = false;
    }

    render() {
        if (this.state.error !== undefined) {
            return <Card title="Greška"><span>{this.state.error.message + ""}</span></Card>;
        }
        const role = ReactSession.get(ReactSession.get("username"));
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
        if (!user || !user.username) {
            return <Card title="Čekajte da se korisnik učita" />;
        }
        const district = user.district || { name: "nema informacije", id: "?" };
        return (
            <Card title={user.username}>
                <table><tbody>
                <tr><td><b>E-mail:</b>                  </td><td>{user.email}                        </td></tr>
                <tr><td><b>Ime:</b>                     </td><td>{user.firstName}                    </td></tr>
                <tr><td><b>Prezime:</b>                 </td><td>{user.lastName}                     </td></tr>
                <tr><td><b>id:</b>                      </td><td>{user.id}                           </td></tr>
                <tr><td><b>Kvart:</b>                   </td><td>{district.name} (id: {district.id}) </td></tr>
                {/*<tr><td>account not expired:         </td><td>{user.accountNonExpired + ""}       </td></tr>*/}
                {/*<tr><td>account not locked:          </td><td>{user.accountNonLocked + ""}        </td></tr>*/}
                <tr><td><b>Adresa valjana:</b>          </td><td>{user.addressValid + ""}            </td></tr>
                <tr><td><b>Korisnik blokiran:</b>       </td><td>{user.blocked + ""}                 </td></tr>
                {/*<tr><td>credentials not expired:</td><td>{user.credentialsNonExpired + ""}   </td></tr>*/}
                {/*<tr><td>enabled:                </td><td>{user.enabled + ""}                 </td></tr>*/}
                </tbody></table>
                <RoleManagement user={user} />
            </Card>
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
                    response.json().then(data => this.setUser(data));
                }
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
}
