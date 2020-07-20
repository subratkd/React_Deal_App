import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserForm } from './components/UserForm';
import Login from './components/Login';
import DealDetails from './components/DealDetails';
import DealTeam from './components/DealTeam';
import DealHomePage from './components/DealHome';


const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Login} />
        <Route path="/DealHome" component={DealHomePage} />
        <Route path="/DealDetails" component={DealDetails} />
        <Route path="/DealTeam" component={DealTeam} />
        <Route path="/logout" component={Login} />

      </Router>
    </div>
  );
}

export default App;
