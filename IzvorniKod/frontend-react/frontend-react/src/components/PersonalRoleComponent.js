import React from "react";

function PersonalRoleComponent(props) {
    const account = props.account
    const roles = props.roles
    const target = props.target
    const targetId = props.targetId

    const [roleRequests, setRoleRequests] = React.useState([])

    React.useEffect(() => {
        fetch("/role-requests")
        .then(data => data.json())
        .then(data => setRoleRequests(data
            .filter(r => r.status === "Pending")
            .filter(r => r.account.id === account.id)
            .filter(r => r.role.name === target)))
    }, [])

    console.log(roleRequests)

    function sendRoleRequest() {
        const data = {
            account: {
                id: account.id
            },
            role: {
                id: targetId
            },
            status: "Pending"
        }
        console.log(data)
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        return fetch("/role-requests", options).then(response => {
            if (!response.ok) {
                console.log(response.body)
            } else {
                window.location.reload()
            }
        })
    }

    if (roleRequests !== undefined) {
        if (roles.filter(r => r.name === target).length > 0) 
        return (
            <div>
                <b>{target}: </b>
                <span>Dodijeljena Vam je ova uloga!</span>
            </div>
        )
        else if (roleRequests.length > 0)
        return (
            <div>
                <b>{target}: </b>
                <span>Vaš zahtjev je poslan!</span>
            </div>
        )
        else
        return (
            <div>
                <b>{target}: </b>
                <button className='button' type="button" onClick={() => {sendRoleRequest()}}>Zatraži ovu ulogu</button>
            </div>
        )
    }
    else return (
        <>
        </>
    )
}

export default PersonalRoleComponent;