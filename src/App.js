import { Route, Routes} from 'react-router';
import {HashRouter} from 'react-router-dom';
import {MannageEntry} from './components/entry';
import ShowUsers from './components/users';
import {ShowTeams,Team} from './components/teams';
import { ShowEvents,Event } from './components/events';
import { User } from './components/users';
import { Test } from './components/tests';

import About from './components/about';
import './App.css';
import Contact from './components/contact';


//import Users from './components/users';
function App() {
  return (
    <div className='App'>
    <HashRouter>
  <Routes >
    <Route path="/" element={<MannageEntry />} />
    <Route path="/users" element={<ShowUsers />} />
    <Route path="/users/:userId" element={<User />} />
    <Route path="/teams" element={<ShowTeams />} />
    <Route path="/teams/:teamId" element={<Team  />} />
    <Route path="/events" element={<ShowEvents/>}/>
    <Route path="/events/:eventId" element={<Event/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
  </Routes>
</HashRouter>

</div>
  );
}

export default App;
