import React, { Component } from 'react';
import ReactDOM from "react-dom";
import EmployeeInfo from "./EmployeeInfo";
import SkillsWrapper from './SkillsWrapper';
import Tasks from "./Tasks";
import * as firebase from 'firebase';

class EmployeeProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: parseInt(document.getElementById('employeeProfile').getAttribute('employeeID')),
            first_name: document.getElementById('employeeProfile').getAttribute('first_name'),
            last_name: document.getElementById('employeeProfile').getAttribute('last_name'),
            title: document.getElementById('employeeProfile').getAttribute('Emptitle'),
            email: document.getElementById('employeeProfile').getAttribute('Empemail'),
            score: document.getElementById('employeeProfile').getAttribute('score'),

            fireDB: ""
        }
        var config = {
            apiKey: "AIzaSyAdoW2AdbGL1ml7v2PZ7d4Urt3LPPQ1dx8",
            authDomain: "bhive-7020b.firebaseapp.com",
            databaseURL: "https://bhive-7020b.firebaseio.com",
            projectId: "bhive-7020b",
            storageBucket: "bhive-7020b.appspot.com",
            messagingSenderId: "889361602878"
        };

        firebase.initializeApp(config);



    }
    componentWillMount() {
        this.setState({ fireDB: firebase.database().ref() });

    }
    render() {
        return (
            <div className="employee-wrapper mt-2">
                <EmployeeInfo email={this.state.email} name={this.state.first_name + " " + this.state.last_name} id={this.state.id} title={this.state.title} score={this.state.score} fireDB={this.state.fireDB}></EmployeeInfo>
                <div className="px-5 my-4">
                    <h4 className="ml-5">Skills</h4>
                    <SkillsWrapper employeeID={this.state.id}></SkillsWrapper>
                </div>
                <div className="container">
                    <hr />
                </div>
                <div className="mb-4">
                    <h3 className="text-center my-3">Tasks</h3>
                    <Tasks employeeID={this.state.id}></Tasks>
                </div>
            </div>
        );
    }
}


export default EmployeeProfile;

if (document.getElementById("employeeProfile")) {
    ReactDOM.render(
        <EmployeeProfile />,
        document.getElementById("employeeProfile")
    );
}
