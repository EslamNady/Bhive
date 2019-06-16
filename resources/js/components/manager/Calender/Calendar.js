import React, { Component } from 'react';
import * as firebase from "firebase";
import WorkingDays from "./WorkingDays";
import Holidays from "./Holidays";
import EmployeesWorkingDays from './EmployeesWorkingDays'




class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = { numOfNewReq: 0 }



    }
    componentWillMount() {

        this.props.fireDB.child("ChangeTimetableRequests/unSeenReq").on("value", snap => {
            var num = snap.val();
            this.setState({ numOfNewReq: num });
        });



    }


    showNumOfReq() {

        if (this.state.numOfNewReq > 0) {
            return (
                <strong className="badge badge-danger" style={{ float: 'right' }}>{this.state.numOfNewReq}</strong>
            )
        }
    }
    render() {

        const carkenderStyle = {
            backgroundColor: "rgba(220,220,220,0.2)",
            borderRadius: "5px",
            padding: "0px 30px"
        }

        return (<div className="pb-4">
            {this.state.name}
            <ul className="nav nav-pills nav-justified mb-3 mt-5 pt-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-WorkingDays" role="tab" aria-selected="true">Default Working Days</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-Holidays" role="tab" aria-selected="false">Holidays</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-EmployeesWD" role="tab" aria-selected="false">Change time table req  {this.showNumOfReq()}</a>

                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-WorkingDays" role="tabpanel" aria-labelledby="pills-home-tab"><div style={carkenderStyle}> <WorkingDays fireDB={this.props.fireDB} /></div></div>
                <div className="tab-pane fade" id="pills-Holidays" role="tabpanel" aria-labelledby="pills-profile-tab"><div style={carkenderStyle}> <Holidays fireDB={this.props.fireDB} /> </div></div>
                <div className="tab-pane fade" id="pills-EmployeesWD" role="tabpanel" aria-labelledby="pills-contact-tab"><div style={carkenderStyle}> <EmployeesWorkingDays fireDB={this.props.fireDB} /></div></div>
            </div>

        </div>);
    }
}

export default Calendar;