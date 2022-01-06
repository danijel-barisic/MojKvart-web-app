import React from "react"
import Card from "./Card"
import { useHistory } from "react-router"
import Select from 'react-select';

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
        firstName: '', lastName: '', password: '', streetnumber: ''
    })
    const [streets, setStreets] = React.useState([]);
    const [error, setError] = React.useState('');
    const [state,setState] = React.useState({selectedOption:null})

    const history = useHistory();
    var { selectedOption } = state;

    React.useEffect(()=>{
        fetch('/streets').then((data) => data.json()).then((streets) => setStreets(streets))
        
    },[])
    const streets_array = []
    streets.map((street)=> streets_array.push({id:street.id, label:street.name,value:street.name,minNum:street.minStreetNo,maxNum:street.maxStreetNo} ))
    
    function onChange(event) {
        const { name, value } = event.target;
        setEditForm(oldForm => ({...oldForm, [name]: value}))
    }

    function handleChange(selectedOption) {
        setState({ selectedOption });
        console.log(selectedOption)   
    }

    async function onSubmit(e) {

    }

    return (
        <Card title="Promjena osobnih podataka">
            <div>
                <div className="Login">
                    
                </div>
            </div>
        </Card>
    )
}

export default PersonalEdit