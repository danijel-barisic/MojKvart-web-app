import React from "react";
import Card from "./Card";
import ReactSession from "react-client-session/dist/ReactSession";
import './Login.css';
import User from "./User";

// class or function?

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
    }

    render() {
        return <div></div>;
    }

    addRole(user_email, role) {

    }

    removeRole(user_email, role) {

    }
}

// export default function RoleManagement(props) {
//     const user = props.user;
//     return <div></div>;
// }