import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import '../App.css';
import { BASE_URL } from "../config";
import { format } from 'date-fns';

export const ShowEvents = () => {
		const [events, setEvents] = useState([]);
		
		const fetchEvents = () => {
			const url = `${BASE_URL}/events`;
		fetch(url)
		.then(response => response.json())
		.then(data => {
			setEvents(data.event);
			console.log(data.event);
		})
		.catch(error => console.error(error));
		}
	
		useEffect(() => {
			fetchEvents();
		}, []);
		
		return (
			<div className="my-Events">
			{events.length > 0 && (
				<ol  >
					
				{events.map(event => (
					<li key={event.id}>
						
					<ul> 
					<div>
						<li>{"event id----"+event.id}</li>
						<li>{"event name----"+event.name}</li>
						<li>{"event time----"+event.time}</li>
						<li>{"event place----"+event.place}</li><br/><br/>
						<li>{"event info----"+event.info}</li><br/><br/>
						
						{event.members.map(member => (
						<div style={{"background":"lightgreen"}} key={member.id}>
							<p>{"member username: " + member.username}</p>
							<p>{"member status: " + member.status}</p>
						</div>
							))}
						</div>
					</ul><br/>
					</li>
				))}
				</ol>
				)}
			</div>
		)
}
	
export const Event = () => {
	const [event, setEvent] = useState([])
	let { eventId } = useParams();
	let storedUserName = localStorage.getItem('userName');
	let storedUserId = localStorage.getItem('userId');

	const [show, setShow] = useState(false)

	const fetchEvent = () => 
	{
		//console.log(teamId)
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify()
		};
		
		const url = `${BASE_URL}/events/${eventId}`;
		//console.log(url);
		
		fetch(url, requestOptions)
		.then(response => response.json())
		.then(data => {
			//console.log(data.team);
			setEvent(data.event);
			console.log(storedUserName);
			console.log(data.event.members)

			for (let i = 0; i < data.event.members.length; i++) {
				console.log(data.event.members)
				if (data.event.members[i].username === storedUserName) {
					setShow(true);
					console.log(show);
				  break;
				}
			  }
		})
		.catch(error => console.error(error));
	}

	const approveEvent = () => 
	{

		//console.log(teamId)
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userName: storedUserName, eventId: eventId, userId: storedUserId })
		};
		
		const url = `${BASE_URL}/events/RSVP`;
		//console.log(url);
		
		fetch(url, requestOptions)
		.then(response => response.json())
		.then(data => {
			//console.log(data.team);
				if(data.message === "event approved")
				{
					fetchEvent();
				}
			  })
		
		.catch(error => console.error(error));
	}

	useEffect(() => {
		fetchEvent();	
		//console.log(team);
	},[])

	if (show) {
		return (
		  <div className="my-Events">
			<ul>
			  <li>{"event id----" + event.id}</li>
			  <li>{"event name----" + event.name}</li>
			  <EventTime time={event.time} />

			  <li>{"event place----" + event.place}</li>
			  <li>{"event info ----" + event.info}</li>
			
			  {event && event.members && event.members.map(member => (
					<div key={member.username}>
					
				  		{"username: " + member.username + "------"}
				  		{JSON.stringify(member.status)}
				  	
				  {member.username === storedUserName && member.status === "invited" ? (
					<button onClick={approveEvent}>approve event</button>
				  ) : null}
				  
				</div>
			  ))}
			</ul>
		  </div>
		);
	  } else {
		return <h1>You are not invited to this event.</h1>;
	  }
	  
}
 
const EventTime = ({ time }) => {
	const formattedTime = format(new Date(time), 'MMMM d, yyyy h:mm a');
  
	return <p className="event-time">{formattedTime}</p>;
  };