import React,{ Component } from 'react';
import { BrowserRouter as Router , Route ,Switch} from 'react-router-dom';
import './App.css';
import home from './home';
import about from './about';
import team from './team';
import Header from './Header';
import Errorr from './Errorr';

class App extends Component{
  render(){
    return(
      <Router><div>
         <Header />
         <Switch>
         <Route exact path='/' component={home}></Route>
         <Route exact path='/about' component={about}></Route>
         <Route exact path='/team' component={team}></Route>
         <Route component={Errorr}></Route>
         </Switch>
      </div></Router>
      );
  }
}

export default App;
