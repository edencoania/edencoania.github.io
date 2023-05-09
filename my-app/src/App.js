import React, { useState } from 'react';
import { Route, Routes,useParams} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {MannageEntry} from './components/entry';
import ShowUsers from './components/users';
import {ShowTeams,Team} from './components/teams';
import { ShowEvents,Event } from './components/events';
import { User } from './components/users';
import './App.css';

//import Users from './components/users';
function App() {
  return (
    <div className='App'>
    <BrowserRouter>
  <Routes >
    <Route path="/" element={<MannageEntry />} />
    <Route path="/users" element={<ShowUsers />} />
    <Route path="/users/:userId" element={<User />} />
    <Route path="/teams" element={<ShowTeams />} />
    <Route path="/teams/:teamId" element={<Team  />} />
    <Route path="/events" element={<ShowEvents/>}/>
    <Route path="/events/:eventId" element={<Event/>}/>
  </Routes>
</BrowserRouter>
</div>
  );
}

export default App;
