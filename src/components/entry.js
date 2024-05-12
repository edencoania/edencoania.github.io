import React from "react";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Navigation from "./nav";
import { useEffect , useState } from "react";
import { BASE_URL } from "../config";



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
		show = <div className="signin">
			
			<Login funcsetUserStatus={setUserStatus} />			
			</div>
	}
	else if(userStatus==="Signup")
	{
		show =<Signup   funcsetUserStatus={setUserStatus} />
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
	<Navigation/>
	{
		show
	}
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
		const url = `${BASE_URL}/login/try`;
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		};
		fetch(url, requestOptions)
			.then(response => response.json()).then(data => {
				if (data.message == "Login successful") {
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
	  
	return <div>
		<h2>Welcome to my-app</h2>
		<form onSubmit={handleSubmitLogin}>
		<p> Date with friends and play soccer </p>
		<label htmlFor="userName">Enter your username: </label>    
		<input type="text" value={userName} onChange={handleChangeUserName} name="userName" />    
		<label htmlFor="password">Enter your password: </label>    
		<input type="password" value={password} onChange={handleChangePassword} name="password" />    

	<input type="submit"  value="sign-in" />    
	</form >
	<a onClick={()=>setToSignup(funcsetUserStatus)}> don't have acount ? </a>

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
			const url = `${BASE_URL}/signup/try`;
		//app.post("/signup/try", async (req, res) => {

			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userName: userName.value, password: password.value, Name: Name.value })
			};
			fetch(url, requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log('Submitted successfully');
		
				if (data.message === "signup successful") {
					funcsetUserStatus({
					   "id": data.user.id,
					   "username": data.user.userName
								});
						localStorage.setItem('token', data.token);	
						alert("if it is your first time try to join a group with the password 4463")	
				}
				else{
					alert("username already exist");
				}
			})
			.catch(error => console.log('Form submit error', error))
		  };
	return <div className="Signup">
	<h2 className="signup h2">welcome to sign-up</h2>
	<form onSubmit={handleSubmitSignup}>
	<label htmlFor="Name">Enter your Name: </label>    
	<input type="text" value={Name} name="Name" onChange={handleChangeName} />    


	<label htmlFor="userName">Enter your username: </label>
	<input type="text" value={userName} name="userName" onChange={handleChangeUserName} />


	<label htmlFor="password">Enter your password: </label>
	<input type="password" value={password} name="password" onChange={handleChangePassword} />


	<input type="submit" value="sign-up" className="signup button" />
	<a onClick={()=>setToLogin(funcsetUserStatus)}> have acount ? </a>
	</form>
	</div>
}


export {MannageEntry}