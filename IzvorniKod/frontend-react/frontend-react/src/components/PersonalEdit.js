import React from "react"
import Card from "./Card"
import { useHistory } from "react-router"
import Select from 'react-select';

//https://react-select.com/styles#styles
const customStyles = {
    option: (provided, state) => ({
        ...provided,
        padding: 20, 
    }),
    menuList: styles => ({  
        ...styles,
        maxHeight: 138
    }),
    control: styles => ({ ...styles, backgroundColor: 'white',borderRadius:'10px' }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        return { ...provided, opacity, transition };
    }
}


function PersonalEdit() {
    const [editPersonalForm, setEditPersonalForm] = React.useState({ firstname: '', lastname: '', email: '', password: '',streetnumber: ''});
    const history = useHistory()

    const [error, setError] = React.useState('');

    const [state,setState] = React.useState({selectedOption:null})
    var { selectedOption } = state;
    
    const [streets, setStreets] = React.useState([]);
    const streets_array = []
    streets.map((street)=> streets_array.push({id:street.id, label:street.name,value:street.name,minNum:street.minStreetNo,maxNum:street.maxStreetNo} ))

    function onChange(event) {
        const { name, value } = event.target
        //console.log(event)
        setEditPersonalForm(oldForm => ({...oldForm, [name]: value}))
    }

    function onSubmit() {

    }

    function handleChange(selectedOption) {
        setState({ selectedOption });
        console.log(selectedOption)   
    }

    return (
        <Card>
            <div className='Login'>
                <form onSubmit={onSubmit}>
                    <div className='FormRow'>
                        <label>FirstName</label>
                        <input name='firstname' required onChange={onChange}value={ editPersonalForm.firstname}/>
                    </div>
                    <div className='FormRow'>
                        <label>LastName</label>
                        <input name='lastname' required onChange={onChange} value={ editPersonalForm.lastname}/>
                    </div>
                    <div className='FormRow'>
                        <label>Email</label>
                        <input name='username' required onChange={onChange} value={ editPersonalForm.username}/>
                    </div>
                    <div className='FormRow'>
                        <label>Password</label>
                        <input name='password' required type='password' onChange={onChange} value={ editPersonalForm.password}/>
                    </div>
                    <div className='FormRow'>
                        <label>Address</label>
                        <Select value={selectedOption} required onChange = {handleChange} styles={customStyles} placeholder="Select your address"
                        options={streets_array}
                    />
                    </div>
                    <div className='FormRow'>
                        <label>Street number</label>
                        <input type="number" name="streetnumber" min={selectedOption ? selectedOption.minNum: 0} max={selectedOption ? selectedOption.maxNum: 0} required onChange={onChange} />
                        </div>
                    <div className='error'>{error}</div>
                    <button className='submit' type='submit'>Register</button>
                    <button className='button' type="button" onClick={() => {history.push("/login")}}>Login</button>
                </form>
            </div>
        </Card>
    );
}

export default PersonalEdit