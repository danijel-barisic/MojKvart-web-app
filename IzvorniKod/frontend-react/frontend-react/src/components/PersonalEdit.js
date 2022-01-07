import React from "react"
import Card from "./Card"
import { useHistory } from "react-router"
import Select from 'react-select'
import { ReactSession } from "react-client-session"
import ComponentCard from "./ComponentCard"
import Card1 from "./Card1"

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        padding: 20,
        borderRadius:'10px'
    }),
    menuList: styles => ({

        ...styles,
        maxHeight: 138,
        color: 'black',
        borderRadius:'10px'
    }),
    control: styles => ({ ...styles, backgroundColor: 'white',borderRadius:'10px' }),
    singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
    }
}

function PersonalEdit() {
    const [editForm, setEditForm] = React.useState({
        firstname: '', lastname: '', password: '', streetnumber: ''
    })
    const [streets, setStreets] = React.useState([]);
    const [error, setError] = React.useState('');
    const [state,setState] = React.useState({selectedOption:null})

    const [account, setAccount] = React.useState({id: undefined})
    const [roles, setRoles] = React.useState()

    const acc_username = ReactSession.get("username")

    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(data => {
            setEditForm({
                firstname: data.firstName,
                lastname: data.lastName,
                streetnumber: data.home.number
            })
        })
    }, [])

    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account))
    }, [])

    React.useEffect(() => {
        if (account !== undefined && account.id !== undefined) {
            fetch(`/accounts/roles/${account.id}`)
            .then(data => data.json())
            .then(roles => setRoles(roles))
        }
    }, [account])

    const history = useHistory();
    var { selectedOption } = state;

    React.useEffect(()=>{
        fetch('/streets').then((data) => data.json()).then((streets) => setStreets(streets))
        
    },[])
    const streets_array = []
    streets.map((street)=> streets_array.push({id:street.id, label:street.name,value:street.name,minNum:street.minStreetNo,maxNum:street.maxStreetNo} ))
   
    React.useEffect(()=>{
        setState({selectedOption:streets_array[1]})
    },[])
    function onChange(event) {
        const { name, value } = event.target;
        setEditForm(oldForm => ({...oldForm, [name]: value}))
    }

    function handleChange(selectedOption) {
        setState({ selectedOption });
        console.log(selectedOption)   
    }

    async function submit(e) {
        e.preventDefault()
        const data = {
            firstName: editForm.firstname,
            lastName: editForm.lastname,
            password: editForm.password,
            homeNum: editForm.streetnumber,
            streetId: selectedOption.id
        }

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(`/accounts/${account.email}`, options).then(response => {
            if (response.ok) {
                history.push("/osobno")
            }
        })
    }

    async function submit_admin(e) {
        e.preventDefault()
        const data = {
            firstName: editForm.firstname,
            lastName: editForm.lastname,
            password: editForm.password
        }
        console.log(data)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(`/accounts/${account.email}`, options).then(response => {
            if (response.ok) {
                history.push("/osobno")
            }
        })
    }
    if (account.home == undefined){
        return <>Wait for page to load</>
    }
    var result = streets_array.filter(obj => {
        return obj.id === account.home.id
      })
    if (account.id !== undefined && roles !== undefined && roles.length > 0) {
        if (roles.filter(r => r.name === "ADMIN").length == 0) return (
            <>
            <div className="current-title">
                PROMJENA OSOBNIH PODATAKA
            </div>
            <Card1>
                
                <div>
                    <div className="Login">
                        <form onSubmit={submit}>
                            <div className="FormRow">
                                <label>Ime</label>
                                <input name='firstname' required onChange={onChange}value={ editForm.firstname}/>
                            </div>
                            <div className="FormRow">
                                <label>Prezime</label>
                                <input name='lastname' required onChange={onChange}value={ editForm.lastname}/>
                            </div>
                            <div className="FormRow">
                                <label>Lozinka</label>
                                <input name='password' required type='password' onChange={onChange} value={ editForm.password}/>
                            </div>
                            <div className="FormRow">
                                <label>Ulica
                                <Select defaultValue={result[0]} required onChange = {handleChange} styles={customStyles} placeholder="Odaberite svoju ulicu"
                                    options={streets_array}/>
                                </label>
                            </div>
                            <div className="FormRow">
                                <label>Kućni broj</label>
                                <input type="number" name="streetnumber" min={selectedOption ? selectedOption.minNum: 0} max={selectedOption ? selectedOption.maxNum: 0} required onChange={onChange} value={editForm.streetnumber}/>
                            </div>
                            <div className='error'>{error}</div>
                            <button className='submit' type='submit'>Potvrdi promjene</button>
                            <button className='button' type="button" onClick={() => {history.goBack()}}>Povratak</button>
                        </form>
                    </div>
                </div>
            </Card1>
            </>
        )
        else return (
            <>
            <div className="current-title">
                PROMJENA OSOBNIH PODATAKA
            </div>
            <Card1>
                <div>
                    <div className="Login">
                        <form onSubmit={submit_admin}>
                            <div className="FormRow">
                                <label>Ime</label>
                                <input name='firstname' required onChange={onChange}value={ editForm.firstname}/>
                            </div>
                            <div className="FormRow">
                                <label>Prezime</label>
                                <input name='lastname' required onChange={onChange}value={ editForm.lastname}/>
                            </div>
                            <div className="FormRow">
                                <label>Lozinka</label>
                                <input name='password' required type='password' onChange={onChange} value={ editForm.password}/>
                            </div>
                            <div className='error'>{error}</div>
                            <button className='submit' type='submit'>Potvrdi promjene</button>
                            <button className='button' type="button" onClick={() => {history.goBack()}}>Povratak</button>
                        </form>
                    </div>
                </div>
            </Card1>
            </>
        )
    } 
    else return (
        <></>
    )
}

export default PersonalEdit