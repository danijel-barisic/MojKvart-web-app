import React from "react";
import Card from "./Card";

function CouncilMeetingReport() {

    const currentURL = window.location.href
    const splitURL = currentURL.split("/")
    const id = splitURL.at(-1)

    const [meeting, setMeeting] = React.useState([])
    React.useEffect(() => {
        fetch(`/council/${id}`)
        .then(data => data.json())
        .then(data => setMeeting(data))
    }, [])

    console.log(meeting)

    return (
        <Card title={meeting.title}>
            <div>
                <b>Datum: </b>
                <span>{meeting.dateTime}</span>
            </div>
            <div>
                <b>Izvješće: </b>
                <span>{meeting.report}</span>
            </div>
        </Card>
    )
}

export default CouncilMeetingReport;