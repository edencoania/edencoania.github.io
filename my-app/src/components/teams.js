import React, { useEffect, useState } from "react"
import { render } from "react-dom";
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import {DateTimePicker} from './utils componnents';

export const ShowTeams = () => {
	const [teams, setTeams] = useState([])
	
	const fetchTeams = () => {
	  fetch('http://localhost:8000/teams')
	  .then(response => response.json())
	  .then(data => {setTeams(data.teams.team);
		//console.log(data.teams.team);
	})
	  .catch(error => console.error(error));
	}
  
	useEffect(() => {
		fetchTeams();
	}, []);
	
	return (
		<div className="container" style={{width:"100%",height: "100%"}}>
		  {teams.length > 0 && (
			<ol  >
				
			  {teams.map(team => (
				<li key={team.id}>
					
				<ul  style ={{"width":"600px" ,"listStyle":"none",  "borderStyle": "dashed" }}> 
				<div>
					<li>{"team id----"+team.id}</li>
					<li>{"team name----"+team.name}</li>
					<li>{"team password----"+team.password}</li>
					<li>{"team members----"+team.members}</li><br/><br/>
					<li>{"team events----"+team.events}</li><br/><br/>
					</div>
				</ul><br/>
				</li>
			  ))}
			</ol>
			  )}
		</div>
	  )
	}
	
export const Team = () => {
	const [team, setTeam] = useState([])
	let { teamId } = useParams();
	const fetchTeam = () => {
		//console.log(teamId)
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify()
		};
	let url= `http://localhost:8000/teams/${teamId}`;
	//console.log(url);
	
	fetch(url, requestOptions)
	  .then(response => response.json())
	  .then(data => {
		//console.log(data.team);
		setTeam(data.team);})
	  .catch(error => console.error(error));
	}
  
	useEffect(() => {
		fetchTeam();	
		//console.log(team);
	}, [])
	
  const listStyle = {
	  listStyle: 'none'
	};

	return (
		<div  className="container" style={{flex: 1, backgroundColor: '#black',"border":"dotted","width":"600px"}}>
			<li>{"team id----"+team.id}</li>
			<li>{"team name----"+team.name}</li>
			<li>{"team password----"+team.password}</li>
			<li>{"team members----"+team.members}</li><br/><br/>
		
			<TeamEvents events={team.events || []} />
			
			<CreateEvent  fetchTeam={fetchTeam}/>	 
		</div>
		)
}
function TeamEvents({ events }) {
	const navigate = useNavigate();

	function handleClick(eventId) {
	  navigate('/events/' + eventId);
	}
  
	return (
	  <div>
		<h2>Team Events:</h2>
		<ul>
		  {events.map(eventId => (
			<li key={eventId} onClick={() => handleClick(eventId)}>
			  {eventId}
			</li>
		  ))}
		</ul>
	  </div>
	);
  }
const CreateEvent = (props)=>
	{
		const [show, setShow] = useState(false);
		let { teamId } = useParams();
		const [selectedDate, setSelectedDate] = useState(null);

		const [newEvent, setNewEvent] = useState({
			eventName: '',
			eventTime: '',
			eventPlace:'',
			eventInfo:''
		  });

		  const handleChangeSetNewEvent = (event) => {
			const { name, value } = event.target;
			setNewEvent(prevState => ({
			  ...prevState,
			  [name]: value
			}));
		}
			function createEvent()
		{

			let userName = localStorage.getItem('userName');
			let userId = localStorage.getItem('userId');

			if (!newEvent.eventName || !selectedDate || !newEvent.eventPlace || !newEvent.eventInfo) {
				alert("Please fill in all the fields");
				return;
			  }
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ eventName: newEvent.eventName, userName: userName,eventTime : selectedDate,
					eventPlace:newEvent.eventPlace , eventInfo:newEvent.eventInfo,userId:userId,
					teamId:teamId
				})
			};
			let url= "http://www.localhost:8000/events/createEvent";
			fetch(url, requestOptions)
			.then(response => response.json())
			.then(data => {
				if (data.message === "event created") {
					setShow(false);
					props.fetchTeam();
				}
				else{
					alert("username already exist");
				}
			})
			.catch(error => console.log('Form submit error', error))
		  };
		  
		return <div>
	{show ? (
	  <div>
	    <label htmlFor="newEvent.eventName">Enter new Event name: </label><br/><br/>
	    <input value={newEvent.eventName} name="eventName" onChange={handleChangeSetNewEvent} /><br/><br/>
		
		<label htmlFor="newEvent.eventTime">Enter event Time: </label><br/><br/>
	    {//<input value={newEvent.eventTime} name="eventTime" onChange={handleChangeSetNewEvent} /><br/><br/>
	}
		<DateTimePicker setSelectedDate={setSelectedDate} selectedDate={selectedDate} /><br/><br/>

		<label htmlFor="newEvent.eventPlace">Enter event Place: </label><br/><br/>
	    <input value={newEvent.eventPlace} name="eventPlace" onChange={handleChangeSetNewEvent} /><br/><br/>

		<label htmlFor="newEvent.eventInfo">Enter event info: </label><br/><br/>
	    <input value={newEvent.eventInfo} name="eventInfo" onChange={handleChangeSetNewEvent} /><br/><br/>
		<button onClick={createEvent}> Create </button>
		  </div>
		) : (
		  <button onClick={() => setShow(true)}>CreateEvent</button> 
		)}
			</div>
		}