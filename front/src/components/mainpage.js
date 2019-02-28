import React, {Component} from 'react';
import MainDisplay from "./main_display";
//import Footer from "./footer";
import NavBar from "./navbar";

export default class MainPage extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <MainDisplay/>

            </div>
        );
    }
}