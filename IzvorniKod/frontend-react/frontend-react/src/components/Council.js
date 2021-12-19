import React from "react";
import Card from "./Card";
import CouncilMeetingCard from "./CouncilMeetingCard";
import "./Login.css";
import { useHistory } from "react-router";

function Council() {
    const [meetings, setMeetings] = React.useState([])
    React.useEffect(() => {
        fetch('/council')
        .then(data => data.json())
        .then(data => setMeetings(data))
    }, [])
    const history = useHistory()

    return (
        <Card title="Izvješća s Vijeća četvrti">
            <div>
                <div className='Login'>
                    <button className='button' type="button" onClick={() => {history.push("/council/new_report")}}>Novo izvješće</button>
                </div>
            </div>
            <div>
                <div className='innerEvent'>
                    <div className='wrapper'>
                        {meetings.map(function (meeting) {
                            return (
                                <div className="inner">
                                    <CouncilMeetingCard meeting={meeting}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Council;