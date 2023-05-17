import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import {DateTimePicker} from './utils componnents';
import Navigation from "./nav";
import { BASE_URL } from "../config";


import '../App.css';

export const ShowTeams = () => {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null);

  const fetchTeams = () => {
	const url = `${BASE_URL}/teams`;
		//const url =http://localhost:8000/teams'
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setTeams(data.teams.team);
        setError(null);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch teams.');
      });
  }

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {teams.length > 0 && (
        <ol>
          {teams.map(team => (
            <li key={team.id}>
              <ul>
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
  const [error, setError] = useState(null);
  let { teamId } = useParams();

  const fetchTeam = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    };
	const url =`${BASE_URL}/teams/${teamId}`;

//    let url= `http://localhost:8000/teams/${teamId}`;
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setTeam(data.team);
        setError(null);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch team.');
      });
  }

  useEffect(() => {
    fetchTeam();
  }, [])


  return (
	<div  className="team">	
	<Navigation/>
      {error && <p>{error}</p>}
      <li>{"team id----"+team.id}</li>
      <li>{"team name----"+team.name}</li>
      <li>{"team password----"+team.password}</li>
      <li>{"team members----"+team.members}</li><br/><br/>

      <TeamEvents  events={team.events || []} />

      <CreateEvent fetchTeam={fetchTeam} setError={setError} />
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
  
  const CreateEvent = (props) => {
	const [show, setShow] = useState(false);
	const { teamId } = useParams();
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
  
	function createEvent() {
	  let userName = localStorage.getItem('userName');
	  let userId = localStorage.getItem('userId');
  
	  if (!newEvent.eventName || !selectedDate || !newEvent.eventPlace || !newEvent.eventInfo) {
		alert("Please fill in all the fields");
		return;
	  }
  
	  const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
		  eventName: newEvent.eventName,
		  userName: userName,
		  eventTime : selectedDate,
		  eventPlace: newEvent.eventPlace,
		  eventInfo: newEvent.eventInfo,
		  userId: userId,
		  teamId: teamId
		})
	  };
	  
	  const url = `${BASE_URL}/events/createEvent`;
	  //let url= "http://localhost:8000/events/createEvent";
	  fetch(url, requestOptions)
		.then(response => {
		  if (!response.ok) {
			throw new Error('Error creating event');
		  }
		  return response.json();
		})
		.then(data => {
		  if (data.message === "event created") {
			setShow(false);
			props.fetchTeam();
		  } else {
			alert("Username already exists");
		  }
		})
		.catch(error => {
		  console.log('Form submit error:', error);
		  alert('Error creating event');
		});
	};
  
	return (
	  <div>
		{show ? (
		  <div>
			<label htmlFor="newEvent.eventName">Enter new Event name: </label><br/><br/>
			<input value={newEvent.eventName} name="eventName" onChange={handleChangeSetNewEvent} /><br/><br/>
  
			<label htmlFor="newEvent.eventTime">Enter event Time: </label><br/><br/>
  
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
	);
  }
  