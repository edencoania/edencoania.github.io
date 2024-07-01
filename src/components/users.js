import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import '../App.css';
import Navigation from "./nav";
import { BASE_URL } from "../config";
import axios from 'axios';

/*const ShowUsers = () => 
{
  const [users, setUsers] = useState([])
  const fetchUsers = () => {
	const url = `${BASE_URL}/users`;
	fetch(url)
	.then(response => response.json())
	.then(data => {setUsers(data.user);
	})
	.catch(error => console.error(error));
  }

  useEffect(() => {
	fetchUsers();
  }, [])
  
const listStyle = {
	listStyle: 'none'
  };
  return (
    <div>
      {users.length > 0 && (
        <ol  >
			
          {users.map(user => (
            <li key={user.id}>
				
			<ul> 
			<div>
				<li>{"user name----"+user.Name}</li>
				<li>{"userName----"+user.userName}</li>
				<li>{"ID----"+user.id}</li>
				<li>{"password----"+user.password}</li><br/><br/>
				</div>
			</ul><br/>
			
			</li>

          ))}
		  
        </ol>
      )}
    </div>
  )
}

*/
export const User = () => {
	const [user, setUser] = useState([])
	let { userId } = useParams();
	let storedUserId = localStorage.getItem('userId');
	let token = localStorage.getItem('token');

	const fetchUser = () => {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' ,
			'Authorization': 'Bearer ' + token},
			};
			const url = `${BASE_URL}/users/`+storedUserId;

			fetch(url,requestOptions)
	  .then(response => response.json())
	  .then(data => {setUser(data);})
	  .catch(error => console.error(error));
	}
  
	useEffect(() => {
		fetchUser();	},[])


  if (storedUserId !== userId) {
	return (
	<div>	
		{
		//	<h1> tried to access wrong page	</h1>
		}
			<Navigation/>
			<UserData data={user}/>
	 </div>
	)}
	else{
		return (
			<div  className="my-component">	
			<Navigation/>
			<UserData  fetchUser={fetchUser} data={user} />
			 </div>
			)
	}
 }

const UserData = ({ fetchUser,data }) => {
	const myData = data;
	
	return (
	  <div className="user-container">
		<h2>User Data:</h2>
		<p>ID: {data.id}</p>
		<p>Name: {data.Name}</p>
		<p>Username: {data.userName}</p>
		<p>Password: {data.password}</p>
		<p>Friends ID:</p>
		<ShowArray data={myData.friendsId|| []} />
		<AddFriend fetchUser={fetchUser}/>
		<p>Teams:</p>
		<ShowTeam  fetchUser={fetchUser} teamsID={myData.teams|| []}/>
		<JoinTeam fetchUser={fetchUser}/>
		<br/><br/>
		<CreateTeam fetchUser={fetchUser}/>
		<p>Invited Events:</p>
		<ShowEvents data={myData.invitedEvents|| []} />
		<p>Approved Events:</p>
		<ShowEvents data={myData.approvedEvents|| []} /> <br/><br/>
		</div>
	);};

const JoinTeam = (props)=>
	{

		const [teamPassword, setTeamPassword] = useState()

		const [showJoinExiting, setshowJoinExiting] = useState(false);
		const handeChangesetTeamPassword = (event) => {
			setTeamPassword(event.target.value)
		  }
		function joinTeam()
		{
		  let userId = localStorage.getItem('userId');
		  let userName = localStorage.getItem('userName');
		  const requestOptions = {
			  method: 'POST',
			  headers: { 'Content-Type': 'application/json' },
			  body: JSON.stringify({ teamPassword: teamPassword, userName: userName, userId: userId })
			  };
			  const url = `${BASE_URL}/teams/join`;
		  fetch(url, requestOptions)
		  .then(response => response.json())
		  .then(data => {
			  if (data.message==="team joined") {
				  setshowJoinExiting(false);
				  props.fetchUser();
			  }
			  else{  
				  alert("username already exist");
			  }
		  })
		}
		return <div>
		{showJoinExiting ? (
  <div >
    <label htmlFor="teamPassword">Enter team password: </label><br/><br/>
    <textarea value={teamPassword} name="teamPassword" onChange={handeChangesetTeamPassword} /><br/><br/>
	<button onClick={joinTeam}> join </button>
  </div>
) : (
  <button onClick={() => setshowJoinExiting(true)}>join existing team </button>
)}</div>
	}


const CreateTeam = (props)=>
	{
		const [show, setShow] = useState(false);
		const [newTeam, setNewTeam] = useState('');

	
		const handeChangeSetNewTeam = (event) => {
			setNewTeam(event.target.value)
		  }
		function createTeam()
		{
			let userId = localStorage.getItem('userId');
			let userName = localStorage.getItem('userName');
			if (!newTeam) {
				alert("can't create name-less Team");
				return;
			}
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ teamName: newTeam, userName: userName, userId: userId })
			};
			const url = `${BASE_URL}/teams/createTeam`;
			fetch(url, requestOptions)
			.then(response => response.json())
			.then(data => {
				if (data.message === "team added") {
					setShow(false);
					props.fetchUser();
	
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
	    <label htmlFor="newTeam">Enter newTeam name: </label><br/><br/>
	    <textarea value={newTeam} name="newTeam" onChange={handeChangeSetNewTeam} /><br/><br/>
		<button onClick={createTeam}> Create </button>
	  </div>
	) : (
	  <button onClick={() => setShow(true)}>create new team</button> 
	)}
		</div>
	}

const AddFriend = (props)=>
	{
		const [show, setShow] = useState(false);
		const [friendUserName, setFriendUserName] = useState([]);
		function handleAddFriend()
		{
			let userId = localStorage.getItem('userId');
			let userName = localStorage.getItem('userName');
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ friendUserName: friendUserName, userName: userName, userId: userId })
			};
			const url = `${BASE_URL}/users/addFriend`;
			fetch(url, requestOptions)
			.then(response => {
				return response.json()
				
			}).then(data => {
				if (data.message === "friend added") {
					setShow(false);
					props.fetchUser();	
				}
				else{
					alert(data.message);
				}
			})
			.catch(error => console.log('Form submit error', error))
		  };

return (
	  <div>
	
{show ? (
  <div >
    <label htmlFor="friendUserName">Enter friend username: </label><br/><br/>
    <textarea value={friendUserName} name="friendUserName" onChange={(e) => setFriendUserName(e.target.value)} /><br/><br/>
	<button onClick={()=>handleAddFriend(friendUserName)}> add friend </button>
  </div>
) : (
  <button onClick={() => setShow(true)}>Add friend </button>
)}</div>)
}


const ShowTeam = (props) => {
	const { teamsID, fetchUser } = props;
	const [userId, setUserId] = useState([]);
	const navigate = useNavigate();
	const [teams, setTeams] = useState([]);
	function leaveHandler(teamId,userId)
	{
		const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ teamId: teamId, userId: userId})
		};
		const url = `${BASE_URL}/teams/deleteUser`;
	fetch(url, requestOptions)
	.then(response => response.json())
	.then(data => {
		if (data.message === "team deleted") {
			fetchUser();	
		}
		else{
			alert("username already exist");
		}
	})
	}
	useEffect(() => {
	  
		const fetchedTeams = [];
		setUserId(localStorage.getItem('userId'));

		const fetchTeams = async () => {
			try {
			  for (const teamId of teamsID) {
				const url = `${BASE_URL}/teams/${teamId}`;
				const response = await axios.get(url);
				const team = response.data;
				fetchedTeams.push(team);
			  }
			  setTeams(fetchedTeams);
			} catch (error) {
			  console.error('Error fetching teams:', error);
			}
		  };
		  fetchTeams();

	  
		}, [teamsID]); // Empty dependency array ensures the effect runs only once on component mount	   

  function goToTeams(teamId)
  {
	navigate('/teams/' +teamId);
  }
  if (!teams || !Array.isArray(teams)) {
    return null;
  }
  return (
    <div >
      {teams.map((team) => (
      <div   className="teams-inUsers" key={team.team.id} >
	  <div onClick={()=>goToTeams(team.team.id)}>
	  <h4>team name - {team.team.name}</h4>
	  <p>team id - {team.team.id}</p>
	  <p>team members - {team.team.members.join(", ")}</p>
	  <p>team password -{team.team.password}</p>
	  </div>
	  <button onClick={()=>leaveHandler(team.team.id,userId)}> leave group </button>
	</div>
      ))}
    </div>
  );
}

const ShowArray = (props) => {
	const {data} = props;
	if (!data || !Array.isArray(data)) {
		return null;
	  }
		return (
			<ul>
			{data.map((item, index) => (
			  <li  key={index}>{item}</li>
			))}
		  </ul>
		)
}
const ShowEvents = (props) => {
  const navigate = useNavigate();

  function goToEvent(eventId) {
    navigate(`/events/${eventId}`);
  }

  const { data } = props;

  if (!data || !Array.isArray(data)) {
    return null;
  }

  return (
    <ul>
      {data.map((eventId, index) => (
        <li onClick={() => goToEvent(eventId)} key={index}>
          Event ID: {eventId}
        </li>
      ))}
    </ul>
  );
};


export default UserData