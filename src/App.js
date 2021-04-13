
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import NavBar from './Header/NavBar';
import { Route, Switch } from 'react-router';
import Today from './pages/Today'

import Upcoming from './pages/Upcoming'
import Search from './pages/Search';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Today} />
        <Route exact path="/Upcoming" component={Upcoming} />
        <Route extact path="/Search" component={Search} />
      </Switch>
    </>
  );
}

export default App;
