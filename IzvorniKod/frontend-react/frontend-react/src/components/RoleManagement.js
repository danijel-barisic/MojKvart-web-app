import React from "react";
import ReactSession from "react-client-session/dist/ReactSession";
import Card from "./Card";
import './RoleManagement.css'

function trueEquals(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (typeof(a) !== 'object') {
        if (typeof(b) === 'object') return false;
        return a === b;
    }
    if (a.length !== b.length) return false;

    for (let i in a) {
        if (!trueEquals(a[i], b[i])) return false;
    }
    return true;
}

function trueContains(o, e) {
    for (const a of o) {
        if (trueEquals(a, e)) {
            return true;
        }
    }
    return false;
}

export function addRole(admin_id, user_id, username, role_name) {
    if (role_name === "ADMIN") {
        alert("Ne možete dodati ulogu ADMINA");
        return undefined;
    }
    // prompt if sure
    if (!window.confirm(`Jeste li sigurni da želite korisniku ${username} dodati ${role_name}?`)) {
        return undefined;
    }
    // authenticate admin
    // TODO
    // send PUT
    return fetch(`/accounts/grantRole/${user_id}`, {
        method: "PUT",
        body: role_name,
    });
}

export function removeRole(admin_id, user_id, username, role_name) {
    if (role_name === "Stanovnik") {
        alert("Nikome se ne može oduzeti Stanovnik");
    }
    // prompt if sure
    if (!window.confirm(`Jeste li sigurni da želite korisniku ${username} oduzeti ${role_name}?`)) {
        return undefined;
    }
    // authenticate admin
    // TODO
    // send PUT
    return fetch(`/accounts/roles/${user_id}`, {
        method: "DELETE",
        body: role_name,
    });
}

// used in UserAdminView (and maybe Users)

// probably two buttons (something like dropdown?)
// or table with rows of available and owned roles, with buttons to add/remove
// postojeće   | dostupne
// ------------|------------
// Stanovnik X | Admin     +
//             | Vijećnik  +
//             | Moderator +

export default class RoleManagement extends React.Component {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = {
            roles: [], // [[1,2], [5, 6]],
            all_roles: [], // [[1,2], [3, 4], [5, 6]],
            error: undefined,
        }
    }

    render() {
        if (this.state.error !== undefined) {
            return <Card title="Greška!">{this.state.error.message}</Card>
        }
        if (ReactSession.get(ReactSession.get("username")) !== "ADMIN") {
            return (
                <Card title="Greška">Vi niste ADMIN</Card>
            );
        }
        return (
            <div className="RoleManagement">
                <Card title="Uloge">
                    <table>
                        <thead>
                            <tr><th>Postojeće</th><th>Dostupne</th></tr>
                        </thead>
                        {/*<tbody>*/}
                        {/*    <tr>*/}
                        {/*        <td>Stanovnik<button onClick={() => this.removeRole(0, 0)}>Oduzmi</button></td>*/}
                        {/*        <td>Admin<button onClick={() => this.addRole(0, 0)}>Dodaj</button></td>*/}
                        {/*    </tr>*/}
                        {/*</tbody>*/}
                        {this.getRoleTableContents()}
                    </table>
                </Card>
            </div>
        );
    }

    componentDidMount() {
        this.fetchRoles();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!trueEquals(this.state.roles, prevState.roles)) {
            this.fetchOwnedRoles();
        }
    }

    getRoleTableContents() {
        const owned = this.state.roles;
        if (owned === undefined) { return; }
        const all_roles = this.state.all_roles;
        if (all_roles === undefined) { return; }
        const available = all_roles.filter(role => !trueContains(owned, role));
        const n = (owned.length > available.length) ? owned.length : available.length;
        const role_pairs = [];
        for (let i = 0; i < n; i++) {
            role_pairs.push([owned[i], available[i]]);
        }
        return (
            <tbody>
                {role_pairs.map(([a, b]) =>
                    <tr>
                        {a !== undefined
                            ? <td>
                                {a.name}
                                {a.name !== "Stanovnik" && a.name !== "ADMIN"
                                    ? <button onClick={() => this.removeRole(a)}>Oduzmi</button>
                                    : null
                                }
                              </td>
                            : null
                        }
                        {b !== undefined
                            ? <td>
                                {b.name}
                                {b.name !== "ADMIN"
                                    ? <button onClick={() => this.addRole   (b)}>Dodaj </button>
                                    : null
                                }
                              </td>
                            : null
                        }
                    </tr>
                )}
            </tbody>
        );
    }

    addRole(role) {
        console.log("addaddaddaddaddaddaddaddaddaddadd");
        console.log(role);
        const owned = this.state.roles;
        if (trueContains(owned, role)) {
            return;
        }
        const fetch_promise = addRole(1, this.user.id, this.user.username, role.name);
        if (fetch_promise !== undefined) {
            fetch_promise.then(response => this.setRoles(owned.concat([role])));
        }
    }

    removeRole(role) {
        console.log("rmrmrmrmrrmrmrmrmrmrmrmrmrmrmr");
        console.log(role);
        const owned = this.state.roles;
        if (!trueContains(owned, role)) {
            return;
        }
        const fetch_promise = removeRole(1, this.user.id, this.user.username, role.name);
        if (fetch_promise !== undefined) {
            fetch_promise.then(response => this.setRoles(owned.filter(r => !trueEquals(r, role))));
        }
    }

    fetchRoles() {
        this.fetchOwnedRoles().then(success => {
            if (success) {
                this._fetchAllRoles();
            } else {
                console.log("wut?");
            }
        });
    }
    async fetchOwnedRoles() {
        if (this.user === undefined) {
            this.setError({ message: "Nema korisnika" });
            return false;
        }
        const id = this.user.id;
        const response = await fetch(`/accounts/roles/${id}` /* GET */);

        if (!response.ok) {
            console.log("error fetchig roles");
            this.setError({ message: "Uloge se misu mogle učitati", });
            return false;
        } else {
            console.log("fetched roles");
            response.json().then(data => this.setRoles(data));
            return true;
        }
    }
    _fetchAllRoles() {
        fetch(`/roles` /* GET */)
            .then(response => {
                if (!response.ok) {
                    console.log("error fetchig all roles");
                    this.setError({ message: "Uloge se misu mogle učitati", });
                } else {
                    console.log("fetched all roles");
                    response.json().then(data => this.setAllRoles(data));
                }
            })
        ;
    }
    setRoles(roles) {
        console.log("rllllllllllllllrrrrrrrrrrrrrr");
        console.log(roles);
        this.setState({ roles });
    }
    setAllRoles(roles) {
        console.log("raaaaaaaaaaaaaarrrrrrrrrrrrrr");
        console.log(roles);
        this.setState({ all_roles: roles });
    }
    setError(error) {
        this.setState({ error });
    }
}

/* exports
* default: RoleManagement
*
* addRole
* removeRole
* */