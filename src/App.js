import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import home from './Pages/home'
import profile from './Pages/profile'
import volun from './Pages/volun'
import donate from './Pages/donate'

function App() {
  return (
    <>
    <Router>
      <Navbar />
        <Switch>
          <Route path='/' exact component={home}/>
          <Route path='/profile' component={profile}/>
          <Route path='/volun' component={volun}/>
          <Route path='/donate' component={donate}/>
        </Switch>
    </Router>
    </>
  );
}

export default App;
