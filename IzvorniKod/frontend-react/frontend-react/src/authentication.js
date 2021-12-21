/** exports
 *
 * isLoggedIn
 * authenticateCurrentUser
 * asyncUserHasRole
 * asyncCurrentUserHasRole
 * asyncAuthenticateCurrentUserHasRole
 */

import ReactSession from "react-client-session/dist/ReactSession";

var current_user = {
    email: undefined,
    id: undefined,
};

async function asyncGetCurrentUser({ email, id }) {
    if (id !== undefined) {
        if (current_user.id !== id) {
            const response = await fetch(`/accounts/id/${id}`);
            if (!response.ok) return undefined;
            current_user = await response.json();
        }
        return current_user;
    }
    if (email === undefined) {
        email = ReactSession.get("username");
    }
    if (current_user.email !== email) {
        const response = await fetch(`/accounts/${email}`);
        if (!response.ok) return undefined;
        current_user = await response.json();
    }
    return current_user;
}

export function isLoggedIn() {
    return ReactSession.get("username") ? true : false;
}

/**
 * will ask user for password
 * @returns boolean
 */
export function authenticateCurrentUser() {
    // TODO: check password
    // probably redirect to login
    // and then redirect back where we were
    return isLoggedIn();
}

export async function asyncUserHasRole(user_id, role_name) {
    if (user_id === undefined || role_name === undefined) {
        return false;
    }
    const response = await fetch(`/accounts/roles/${user_id}` /* GET */);

    if (!response.ok) {
        console.log("authentication.js: error fetchig roles");
        return false;
    } else {
        const roles = await response.json();
        for (const role of roles) {
            if (role.name === role_name) {
                return true;
            }
        }
        return false;
    }
}

export async function asyncCurrentUserHasRole(role_name) {
    const user = await asyncGetCurrentUser({});
    if (user === undefined) return false;
    return await asyncUserHasRole(user.id, role_name);
}

export async function asyncAuthenticateCurrentUserHasRole(role_name) {
    if (!authenticateCurrentUser()) {
        return false;
    }
    const user = await asyncGetCurrentUser({});
    if (user === undefined) {
        return false;
    }
    if (!await asyncUserHasRole(user.id, role_name)) {
        return false;
    }
    return true;
}

/** exports
 *
 * isLoggedIn
 * authenticateCurrentUser
 * asyncUserHasRole
 * asyncCurrentUserHasRole
 * asyncAuthenticateCurrentUserHasRole
 */