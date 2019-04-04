import React, { Component } from 'react';
import * as firebase from "firebase";
import WorkingDays from "./WorkingDays"




class Calendar extends Component {
    constructor(props) {
        super(props);
        var config = {
            apiKey: "AIzaSyAdoW2AdbGL1ml7v2PZ7d4Urt3LPPQ1dx8",
            authDomain: "bhive-7020b.firebaseapp.com",
            databaseURL: "https://bhive-7020b.firebaseio.com",
            projectId: "bhive-7020b",
            storageBucket: "bhive-7020b.appspot.com",
            messagingSenderId: "889361602878"
        };

        firebase.initializeApp(config);
        this.state = { fireDB: "" }


    }
    componentWillMount() {
        this.setState({ fireDB: firebase.database().ref() })
    }

    render() {
        return (<div>
            {this.state.name}
            <ul className="nav nav-pills nav-justified mb-3 mt-5 pt-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-WorkingDays" role="tab" aria-selected="true">Default Working Days</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-Holidays" role="tab" aria-selected="false">Holidays</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-EmployeesWD" role="tab" aria-selected="false">Employees Working days</a>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-WorkingDays" role="tabpanel" aria-labelledby="pills-home-tab"><WorkingDays fireDB={this.state.fireDB} /></div>
                <div className="tab-pane fade" id="pills-Holidays" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
                <div className="tab-pane fade" id="pills-EmployeesWD" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
            </div>

        </div>);
    }
}

export default Calendar;