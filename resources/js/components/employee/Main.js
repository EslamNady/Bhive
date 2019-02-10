import React, { Component } from 'react';
import ReactDOM from "react-dom";
import EmployeeInfo from "./EmployeeInfo";
import SkillsWrapper from './SkillsWrapper';
import Tasks from "./Tasks";

class EmployeeProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: parseInt(document.getElementById('employeeProfile').getAttribute('employeeID')),
            name: document.getElementById('employeeProfile').getAttribute('name'),
            title: document.getElementById('employeeProfile').getAttribute('Emptitle'),
            score: document.getElementById('employeeProfile').getAttribute('score')
        }
    }

    render() {
        return (
            <div className="employee-wrapper mt-2">
                <EmployeeInfo name={this.state.name} id={this.state.id} title={this.state.title} score={this.state.score}></EmployeeInfo>
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
