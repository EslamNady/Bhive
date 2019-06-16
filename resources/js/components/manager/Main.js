import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as firebase from "firebase";
import SystemSkills from "./SystemSkills";
import ProjectListView from './ProjectListView';
import Calendar from "./Calender/Calendar";
import VacationRequest from './vacationRequests/main'

// import SubmittedTasks from './SubmittedTasks';
class ManagerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: parseInt(document.getElementById("ManagerProfile").getAttribute("managerID")),
            name: document.getElementById("ManagerProfile").getAttribute("name"),
            systemSkills: [],
            fireDB: "",
        };
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
                            <div>
                                <VacationRequest fireDB={this.state.fireDB} />
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
                        <Calendar fireDB={this.state.fireDB} />
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
