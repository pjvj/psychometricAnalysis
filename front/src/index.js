import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,browserHistory} from 'react-router';
import RegisterPageUser from "./components/RegisterPageUser";
import RegisterPageAdmin from "./components/RegisterPageAdmin";
import MainPage from "./components/mainpage";
import SignPageUser from "./components/signInUser";
import SignPageAdmin from "./components/signInAdmin";
import LogPage from "./components/loggedin";
import DashBoard from './components/userdashboard';

class App extends React.Component {
    render(){
        return(
        <Router history={browserHistory}>
        <Route path={"/"} component={MainPage}/>
        <Route path={"registerUser"} component={RegisterPageUser}/>
        <Route path={"signInUser"} component={SignPageUser}/>
        <Route path={"registerAdmin"} component={RegisterPageAdmin}/>
        <Route path={"signInAdmin"} component={SignPageAdmin}/>
        <Route path={"logIn"} component={LogPage}/>
        <Route path={"Dashboard"} component={DashBoard}/>
        </Router>
    );
    }
}
ReactDOM.render(<App/>, document.querySelector(".container"));