import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './nav';
import '../App.css';

function About() {
	return (
	  <div className='container'>
			<Navigation/>

		<h1>About Friends Groups and Creating Events</h1>
		<p>
		  Our app is designed to make it easy for you to create and manage events
		  with your friends. You can create groups for different activities, and
		  invite your friends to join them. Once you've created a group, you can
		  schedule events, share details and chat with other members of the group.
		</p>
		<p>
		  Whether you're planning a weekend getaway, a dinner party or a game
		  night, Friends Groups and Creating Events has got you covered. Sign up
		  today and start organizing your next event!
		</p>
		<Link to="/">Back to Home</Link>
	  </div>
	);
  }
  
  export default About;
  