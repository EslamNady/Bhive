import React, { Component } from 'react';
import Day from "./Day";
import $ from 'jquery';
class EmployeeTimeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: "",
            seen: '',
            timeTableState: '',
            empTitle: '',
            empFirstname: '',
            empLastname: ''
        }
        this.requestSeen = this.requestSeen.bind(this);
        this.declineReq = this.declineReq.bind(this);
        this.approveReq = this.approveReq.bind(this);

    }

    componentWillMount() {
        this.props.fireDB.child("ChangeTimetableRequests/requests/" + this.props.empID).once("value", snap => {
            var days = snap.val().timeTable;
            var seen = snap.val().seen;
            var timeTableState = snap.val().timeTableStatus;


            this.setState({ days: this.orderDaysObject(days), seen, timeTableState });
        })
        this.props.fireDB.child("Employees/" + this.props.empID).on("value", snap => {
            var empTitle = snap.val().info.title;
            var empFirstname = snap.val().info.first_name;
            var empLastname = snap.val().info.last_name;
            this.setState({ empTitle, empFirstname, empLastname });
        })


    }

    componentWillReceiveProps(nextprops) {
        nextprops.fireDB.child("ChangeTimetableRequests/requests/" + nextprops.empID).once("value", snap => {
            var days = snap.val().timeTable;
            var seen = snap.val().seen;
            var timeTableState = snap.val().timeTableStatus;


            this.setState({ days: this.orderDaysObject(days), seen, timeTableState });
        })
        nextprops.fireDB.child("Employees/" + nextprops.empID).on("value", snap => {
            var empTitle = snap.val().info.title;
            var empFirstname = snap.val().info.first_name;
            var empLastname = snap.val().info.last_name;
            this.setState({ empTitle, empFirstname, empLastname });
        })
    }
    orderDaysObject(days) {
        const sorter = {
            // "sunday": 0, // << if sunday is first day of week
            "mon": 1,
            "tue": 2,
            "wed": 3,
            "thu": 4,
            "fri": 5,
            "sat": 6,
            "sun": 7
        }

        const ordered = {};
        Object.keys(days).sort(function sortByDay(a, b) {
            let day1 = a.toLowerCase();
            let day2 = b.toLowerCase();
            return sorter[day1] - sorter[day2];
        }).forEach(function (key) {
            ordered[key] = days[key];
        });
        return ordered;
    }
    tabColor() {
        if (this.state.seen) {
            return (
                <div className="tab btn btn-secondary btn-block " data-toggle="collapse" id={`tab-${this.props.index}`} data-target={"#emp" + this.props.index} >
                    <span>{this.state.empTitle + "/ "}</span>
                    <strong> {this.state.empFirstname + " " + this.state.empLastname}</strong>
                </div>
            )
        } else {
            return (
                <div className="tab btn btn-primary btn-block " onClick={this.requestSeen} data-toggle="collapse" id={`tab-${this.props.index}`} data-target={"#emp" + this.props.index} >
                    <span>{this.state.empTitle + "/ "}</span>
                    <strong> {this.state.empFirstname + " " + this.state.empLastname}</strong>
                </div>
            );
        }
    }
    declineReq() {
        $(`#tab-${this.props.index}`).click();
        $(`#tab-${this.props.index}`).addClass('btn-danger');
        setTimeout(() => {
            $(`#tab-${this.props.index}`).removeClass('btn-danger');
            this.props.fireDB.child(`ChangeTimetableRequests/requests/${this.props.empID}`).remove();
        }, 400)


    }
    approveReq() {
        $(`#tab-${this.props.index}`).click();
        $(`#tab-${this.props.index}`).addClass('btn-success');
        setTimeout(() => {
            $(`#tab-${this.props.index}`).removeClass('btn-success');
            this.props.fireDB.child(`Employees/${this.props.empID}/timeTable`).set(this.state.days);
            this.props.fireDB.child(`Employees/${this.props.empID}/timeTableStatus`).set(this.state.timeTableState);
            this.props.fireDB.child(`ChangeTimetableRequests/requests/${this.props.empID}`).remove();
        }, 400);




    }
    requestSeen() {
        this.props.fireDB.child(`ChangeTimetableRequests/requests/${this.props.empID}/seen`).set(true);
        this.setState({ seen: true });
    }

    render() {
        return (<div>
            <div className="container mt-2">
                <div className="emp-wrapper w-80 mx-auto" >
                    {this.tabColor()}
                    <div className="tab-content mt-1 collapse " onClick={this.requestSeen} id={"emp" + this.props.index}>
                        <div>
                            {Object.keys(this.state.days).map((key, i) => (
                                <Day key={i} name={key} day={this.state.days[key]} EditingMode={false} fireDB={this.props.fireDB} />
                            ))}
                        </div>
                        <div className="container my-2 text-center">
                        </div>
                        <div className="text-center py-2">
                            <button onClick={this.approveReq} className="btn btn-success mr-1">Approve</button>
                            <button onClick={this.declineReq} className="btn btn-danger ml-1">Decline</button>
                        </div>
                        <hr />
                    </div>

                </div>

            </div>
        </div>);
    }
}

export default EmployeeTimeTable;