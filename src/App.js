import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './pages/login';
import welcome from './pages/welcome';
import Accepted from './pages/accepted';
import Rjected from './pages/rejected';
import Pending from './pages/pending';
import Edit from './pages/edit';
import Result from './pages/result';
import Last from './pages/last';
import Find from './pages/find';
import Daily from './pages/daily';
import Print from './pages/print'
import Printpen from './pages/printpen';;

function App() {
  return (
    <div>
    <Router>
      <switch>
        <Route exact path="/" component={Login} />
        <Route path="/welcome" component={welcome} />
        <Route path="/accepted" component={Accepted} />
        <Route path="/rejected" component={Rjected} />
        <Route path="/pending" component={Pending} /> 
        <Route path="/edit/:id" component={Edit} /> 
        <Route path="/result/:id" component={Result} />
        <Route path="/last/:id" component={Last} />
        <Route path="/find/all" component={Find} />
        <Route path="/find/daily" component={Daily} />
        <Route path="/print/acc/:id" component={Print} />
        <Route path="/print/pen/:id" component={Printpen} />

      </switch>
    </Router>
    </div>
  );
}

export default App;
