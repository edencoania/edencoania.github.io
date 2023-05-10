import React, { useEffect, useState } from "react"
import { render } from "react-dom";
import { Routes, Route, useParams } from 'react-router-dom';

	export const ShowEvents = () => {
		const [events, setEvents] = useState([]);
		
		const fetchEvents = () => {
		fetch('http://77.124.22.61:8000/events')
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
			<div className="my-component" style={{"width":"1100px"}}>
			{events.length > 0 && (
				<ol  >
					
				{events.map(event => (
					<li key={event.id}>
						
					<ul  style ={{"width":"600px" ,"listStyle":"none",  "borderStyle": "dashed" }}> 
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
		let url= `http://77.124.22.61:8000/events/${eventId}`;
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
		let url= `http://77.124.22.61:8000/events/RSVP`;
		//console.log(url);
		
		fetch(url, requestOptions)
		.then(response => response.json())
		.then(data => {
			//console.log(data.team);
				if(data.message == "event approved")
				{
					fetchEvent();
				}
			  })
		
		.catch(error => console.error(error));
	}
	const addToCallander = () => 
	{
		//console.log(teamId)
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userName: storedUserName, eventId: eventId, userId: storedUserId })
		};
		let url= `http://77.124.22.61:8000/events/addToCallander`;
		//console.log(url);
		
		fetch(url, requestOptions)
		.then(response => response.json())
		.then(data => {
			//console.log(data.team);
				if(data.message == "event approved")
				{
					fetchEvent();
				}
			  })
		
		.catch(error => console.error(error));
	}
	useEffect(() => {
		fetchEvent();	
		//console.log(team);
	}, [])
	
  const listStyle = {
	  listStyle: 'none'
	};

	if (show) {return (
		<div  className="my-component" style={{flex: 1,"border":"dotted","width":"600px"}}>
			<li>{"event id----"+event.id}</li>
			<li>{"event name----"+event.name}</li>
			<li>{"event password----"+event.time}</li>
			<li>{"event members----"+event.place}</li><br/><br/>
			<li>{"event events----"+event.info}</li><br/><br/>	
			<button onClick={addToCallander}>add event to calendar</button><br/><br/><br/>

			{event && event.members && event.members.map(member => (
					<div style={{"background":"lightgreen"}} key={member.username}>
						<p>{"username: " + member.username+"------"}		
						{member.status}</p>
						{member.username == storedUserName && member.status == "invited" ? (
      				      <button onClick={approveEvent}>approve event</button>
      					  ) : null}
					</div>
				))}
		</div>
		)}
		
		else{
			return <h1>you are not invited to this Event </h1>
		}
}
 