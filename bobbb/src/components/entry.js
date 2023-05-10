import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../App.css';

import { useEffect , useState } from "react";



function MannageEntry()
{	
	const [userStatus,setUserStatus] = useState("Login");
	const navigate = useNavigate();

	useEffect(() => {
        if(userStatus !== "Login" && userStatus !== "Signup") {
            localStorage.setItem('isLoggedIn', 'true');
			//localStorage.setItem('tokken', tokken);

            localStorage.setItem('userId',userStatus.id );
            localStorage.setItem('userName',userStatus.username );
            navigate(`/users/${userStatus.id}`);
        }
    }, [userStatus]);
	let show;

	if(userStatus==="Login")
	{
		show = <div className="my-component">
			
			<Login funcsetUserStatus={setUserStatus} />
			<script src="https://apis.google.com/js/platform.js" async defer></script>
			
			</div>
	}
	else if(userStatus==="Signup")
	{
		show =<Signup funcsetUserStatus={setUserStatus} />
	}
	else
	{
		//localStorage.setItem('isLoggedIn', 'true');
		//localStorage.setItem('userId',userStatus.id );
		//localStorage.setItem('userName',userStatus.username );
		//setUserId(userStatus.id);
		//show=<Link to="/users/">Go to Users</Link>
		//return <Link to={`/users/${userStatus.id}`}>Go to user {userStatus.id}</Link>;
		//redirect(`/users/${userStatus.id}`);

		//navigate(`/users/${userStatus.id}`);
	}
	return (<div>
	{show}
	</div>);
}


function Login({funcsetUserStatus})
{
	function setToSignup(funcsetUserStatus)
	{
		funcsetUserStatus("Signup");
	}
	const [userName, setUserName] = useState();
	const [password, setPassword] = useState();

	const handleChangeUserName = (event) => {
		setUserName(event.target.value)
	  }
	const handleChangePassword = (event) => {
		setPassword(event.target.value)
	  }

	  const handleSubmitLogin = async (event) => {
		event.preventDefault();
		
		const { userName, password } = event.target.elements;
		const data = { "userName": userName.value, "password": password.value };

		const url = 'http://www.localhost:8000/login/try'
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		};
		fetch(url, requestOptions)
			.then(response => response.json()).then(data => {
				if (data.message === "Login successful") {
					funcsetUserStatus({
					   "id": data.user.id,
					   "username": data.user.userName
								});
					localStorage.setItem('token', data.token);		

				}
					else
					{
						alert(data.message); // Display error message
					}
				
			
			})
			.catch(error => console.log('Form submit error', error))
	  };
	  
	return <div style={{flex: 1 ,flexbasis:"1000px",padding:"20px", margin: "5px 350px","border": "2px solid black"}}>
		<h2>welcome to my-app</h2>
		<form onSubmit={handleSubmitLogin}>
		<p style={{width: "96px"}}> date with friends and play soccer </p>
		<label htmlFor="userName">Enter your username: </label><br/><br/>
		<input type="text" value={userName} onChange={handleChangeUserName} name="userName" /><br/><br/>
		<label htmlFor="password">Enter your password: </label><br/><br/>
		<input type="password" value={password} onChange={handleChangePassword} name="password" /><br/><br/>

	<input type="submit"  value="sign-in" style={{backgroundColor:"Chartreuse"}} /><br/><br/>
	</form >
	<a style={{color:"black"}} onClick={()=>setToSignup(funcsetUserStatus)}> don't have acount ? </a>

	</div>
}

function Signup({funcsetUserStatus})
{
	function setToLogin(funcsetUserStatus)
	{
		funcsetUserStatus("Login");
	}
	const [Name, setName] = useState();
	const handleChangeName = (event) => {
		setName(event.target.value)
	  }
	  const [userName, setUserName] = useState("");

	const handleChangeUserName = (event) => {
		setUserName(event.target.value)
	  }
	  const [password, setPassword] = useState();
	  const handleChangePassword = (event) => {
		  setPassword(event.target.value)
		}

		function handleSubmitSignup (event) {
			event.preventDefault();
			const {userName,password,Name} = event.target.elements;
			if (!userName.value || !password.value || !Name.value) {
				alert("Please fill out all the fields");
				return;
			  }
			const url = 'http://www.localhost:8000/signup/try'
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userName: userName.value, password: password.value, Name: Name.value })
			};
			fetch(url, requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log('Submitted successfully');
				console.log(data.user);
		
				if (data.message === "signup successful") {
					funcsetUserStatus({
					   "id": data.user.id,
					   "username": data.user.userName
								});
						localStorage.setItem('token', data.token);		
				}
				else{
					alert("username already exist");
				}
			})
			.catch(error => console.log('Form submit error', error))
		  };
	return <div style={{flex: 1,flexbasis:"400px",padding:"20px", margin: "5px 350px","border": "2px solid black"}}>
	<h2>welcome to sign-up</h2>
	<form onSubmit={handleSubmitSignup}>
	<label htmlFor="Name">Enter your Name: </label><br/><br/>
	<input type="text" value={Name} name="Name" onChange={handleChangeName} /><br/><br/>


	<label htmlFor="userName">Enter your username: </label><br/><br/>
	<input type="text" value={userName} name="userName" onChange={handleChangeUserName} /><br/><br/>


	<label htmlFor="password">Enter your password: </label><br/><br/>
	<input type="password" value={password} name="password" onChange={handleChangePassword} /><br/><br/>


	<input type="submit" style={{backgroundColor:"Chartreuse"}} value="sign-up"  /><br/><br/>
	<a style={{color:"black"}} onClick={()=>setToLogin(funcsetUserStatus)}> have acount ? </a>
	</form>
	</div>
}


export {MannageEntry}