import React from "react";
import Login from './components/Login'
import FarmsList from './components/FarmsList'
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (<Router>
    <div className="App">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/farms" component={FarmsList} />
          </Switch>
    </div></Router>
  );
}

export default App;