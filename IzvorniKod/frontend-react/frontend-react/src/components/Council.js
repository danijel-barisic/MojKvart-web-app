import React from "react";
import Card from "./Card";
import CouncilMeetingCard from "./CouncilMeetingCard";

function Council() {
    const [meetings, setMeetings] = React.useState([])
    React.useEffect(() => {
        fetch('/council')
        .then(data => data.json())
        .then(data => setMeetings(data))
    }, [])

    return (
        <Card title="Izvješća s Vijeća četvrti">
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