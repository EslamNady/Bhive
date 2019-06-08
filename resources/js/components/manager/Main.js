import React, { Component } from "react";
import ReactDOM from "react-dom";
import SystemSkills from "./SystemSkills";
import ProjectListView from './ProjectListView';
import Calendar from "./Calender/Calendar";

// import SubmittedTasks from './SubmittedTasks';
class ManagerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: parseInt(document.getElementById("ManagerProfile").getAttribute("managerID")),
            name: document.getElementById("ManagerProfile").getAttribute("name"),
            systemSkills: [],
        };
    }


    render() {
        return (
            <div className="manager-main">
                <div className="container pt-4 ">
                    <div className="row ">
                        <div className="col-6 pr-5">
                            <div>
                                <a className="btn btn-success" href="/project/create">Create a new project</a>
                                <a className="btn btn-danger" href="/reports">Reports</a>
                            </div>
                            <div>
                                <SystemSkills />
                            </div>

                        </div>
                        <div className="col-6">
                            <div className="mb-3 text-right">
                                <a className="btn btn-primary  " href="/attendance-QR">Generate attendance QR</a>
                            </div>
                            <div className="projectList-wrapper">
                                <div className="bg-wrapper">
                                    <h4 className="title text-center text-white mb-3">All Projects</h4>
                                    <ProjectListView></ProjectListView>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div >
                        <Calendar />
                    </div>


                </div>

            </div>
        );
    }
}

export default ManagerProfile;
if (document.getElementById("ManagerProfile")) {
    ReactDOM.render(
        <ManagerProfile />,
        document.getElementById("ManagerProfile")
    );
}
