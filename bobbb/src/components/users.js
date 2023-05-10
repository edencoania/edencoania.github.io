import React, { useEffect, useState,useRef } from "react";
import { render } from "react-dom";
import { Routes, Route, useParams,useNavigate } from "react-router-dom";
import '../App.css';


const ShowUsers = () => {
  const [users, setUsers] = useState([])
  const fetchUsers = () => {
	
	fetch('http://77.124.22.61:8000/users')
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
				
			<ul  style ={{ height: "100%",width:"100%" ,"listStyle":"none",  "borderStyle": "dashed" }}> 
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
			let url= 'http://77.124.22.61:8000/users/'+storedUserId;
			console.log(url);
			console.log(url);
			console.log(url);
			console.log(url);
	console.log(url);

	console.log(url);
	  fetch(url,requestOptions)
	  .then(response => response.json())
	  .then(data => {setUser(data);})
	  .catch(error => console.error(error));
	}
  
	useEffect(() => {
		fetchUser();	}, [])
	
  const listStyle = {
	  listStyle: 'none'
	};


  if (storedUserId !== userId) {
	return (
	<div>	
		{
		//	<h1> tried to access wrong page	</h1>
		}
			<UserData data={user}/>
	 </div>
	)}
	else{
		return (
			<div  className="my-component">	
			<UserData  fetchUser={fetchUser} data={user} />
			 </div>
			)
	}
 }

const UserData = ({ fetchUser,data }) => {
	const myData = data;
	
	return (
	  <div className="my-component" style ={{"padding":"50px",flexBasis:"300px","borderColor": '#black' , "borderStyle": "dashed"}}>
		<h2>User Data:</h2>
		<p>ID: {data.id}</p>
		<p>Name: {data.Name}</p>
		<p>Username: {data.userName}</p>
		<p>Password: {data.password}</p>
		<p>Friends ID:</p>
		<ShowArray data={myData.friendsId} />
		<AddFriend fetchUser={fetchUser}/>
		<p>Teams:</p>
		<ShowTeam  fetchUser={fetchUser} data={myData.teams}/>
		<JoinTeam fetchUser={fetchUser}/>
		<br/><br/>
		<CreateTeam fetchUser={fetchUser}/>
		<p>Invited Events:</p>
		<ShowEvents data={myData.invitedEvents} />
		<p>Approved Events:</p>
		<ShowEvents data={myData.approvedEvents} /> <br/><br/>
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
		  let url= "http://www.77.124.22.61:8000/teams/join";
		  fetch(url, requestOptions)
		  .then(response => response.json())
		  .then(data => {
			  if (data.message=="team joined") {
				  setshowJoinExiting(false);
				  props.fetchUser();
			  }
			  else{
				  console.log("data.message")
  
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
			console.log(newTeam)
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ teamName: newTeam, userName: userName, userId: userId })
			};
			let url= "http://www.77.124.22.61:8000/teams/createTeam";
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
			console.log(friendUserName + "    " + friendUserName)
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ friendUserName: friendUserName, userName: userName, userId: userId })
			};
			let url= "http://www.77.124.22.61:8000/users/addFriend";
			fetch(url, requestOptions)
			.then(response => {
				console.log(response);
				return response.json()
				
			}).then(data => {
				console.log(data);
				if (data.message == "friend added") {
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
	const { data, fetchUser } = props;
	const [userId, setUserId] = useState([]);
	const navigate = useNavigate();

	//console.log(data);
	const [teams, setTeams] = useState([]);
	function leaveHandler(teamId,userId)
	{
	console.log(teamId);
	console.log(userId);
	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ teamId: teamId, userId: userId})
		};
	let url= "http://77.124.22.61:8000/teams/deleteUser";
	fetch(url, requestOptions)
	.then(response => response.json())
	.then(data => {
		console.log(data)
		if (data.message == "team deleted") {
			fetchUser();	
		}
		else{
			console.log("data.message");

			alert("username already exist");
		}
	})
	}
	useEffect(() => {
		if (!data) {
		return;
		}
		// Fetch the team data when the component mounts
		Promise.all(
		data.map((team) => fetch(`http://77.124.22.61:8000/teams/${team}`).then((res) => res.json()))
		).then((data) => {
			setUserId(localStorage.getItem('userId'));
		setTeams(data);
		});
	}, [data]);

  function goToTeams(teamId)
  {
	navigate('/teams/' +teamId);
  }
 

  if (!teams || !Array.isArray(teams)) {
    return null;
  }
  return (
    <div style={{flex: 1 , flexBasis:"100px"}}  className="item">
      {teams.map((team) => (
      <div key={team.team.id}  style={{padding:"20px","border":"dotted"}}  >
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
			  <li style={{"cursor": "pointer", 
				"padding": "10",
				"border": "1px solid #ccc",
				"borderRadius": "5",
				"marginBottom": "5"
			  }}  key={index}>{item}</li>
			))}
		  </ul>
		)
}

const ShowEvents = (props) => {
	const navigate = useNavigate();

	function goToEvents(eventId)
	{
	  navigate('/events/' +eventId);
	}
	const {data} = props;
	if (!data || !Array.isArray(data)) {
		return null;
	  }
		return (
			<ul>
			{data.map((item, index) => (
			  <li style={{"cursor": "pointer", 
				"padding": "10",
				"border": "1px solid #ccc",
				"borderRadius": "5",
				"marginBottom": "5"
			  }} onClick={()=>goToEvents(item)} key={index}>{item}</li>
			))}
		  </ul>
		)
}
export default ShowTeam