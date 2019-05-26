import React, { Component } from 'react';
import Day from "./Day"
class EmployeeTimeTable extends Component {
    constructor(props) {
        super(props);
        this.state = { days: "", timeTableStatus: "" }

        this.setToDEfault = this.setToDEfault.bind(this);
        this.ShowEditBtn = this.ShowEditBtn.bind(this);
        this.requestTimeTabeChange = this.requestTimeTabeChange.bind(this);
        this.updateDay = this.updateDay.bind(this);

    }




    componentWillMount() {

        if (!this.props.editingMode) {
            this.props.fireDB.child("Employees/" + this.props.empID + "/timeTable").on("value", snap => {
                var days = snap.val();
                this.setState({ days: this.orderDaysObject(days) });
            })
        }
        else {

            this.props.fireDB.child(`ChangeTimetableRequests/requests/${this.props.empID}`).once("value", snap => {
                if (snap.exists()) {
                    var days = snap.child('timeTable').val();
                    var status = snap.child('timeTableStatus').val();
                    this.setState({ days: this.orderDaysObject(days), timeTableStatus: status });
                }
                else {
                    this.props.fireDB.child("Employees/" + this.props.empID).once("value", snap => {
                        var days = snap.child('timeTable').val();
                        var status = snap.child('timeTableStatus').val();
                        this.setState({ days: this.orderDaysObject(days), timeTableStatus: status });

                    })
                }
            })
        }

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
    setToDEfault() {
        this.props.fireDB.child("TimeTable").once('value', snap => {
            var table = snap.val();
            this.setState({ days: this.orderDaysObject(table), timeTableStatus: 'default' });
        });
    }
    requestTimeTabeChange() {
        this.props.fireDB.child(`ChangeTimetableRequests/requests/${this.props.empID}`).set({ 'timeTable': this.state.days, 'timeTableStatus': this.state.timeTableStatus, 'seen': false });

    }
    ShowEditBtn() {
        if (this.props.editingMode) {
            return (
                <React.Fragment>
                    <div className="container my-2 text-center">
                        <button onClick={this.setToDEfault} className="btn btn-primary mx-1">Set to default</button>
                        <button onClick={this.requestTimeTabeChange} data-toggle="modal" data-target="#confirmSend" className="btn btn-success mx-1">Request change</button>
                        <hr />
                    </div>
                    <div className="modal fade" id="confirmSend" tabIndex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">

                                <div className="modal-body">
                                    <div className="text-success text-center">
                                        Your request has been sent to your manager
                                     </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }
    updateDay(day) {
        var days = this.state.days;
        days[day.name].in = day.in;
        days[day.name].out = day.out;
        this.setState({ days: days, timeTableStatus: 'custom' });
        console.log(day);
    }

    render() {
        // alert(this.state.timeTableStatus);
        return (<div>
            <div className="container mt-2">
                <div className="emp-wrapper w-80 mx-auto" >
                    <div className="tab-content mt-1  " id={"emp" + this.props.index}>
                        <div>
                            {Object.keys(this.state.days).map((key, i) => (

                                <Day key={i} name={key} day={this.state.days[key]} target={"Employees/" + this.props.empID + "/timeTable/"} empPath={"Employees/" + this.props.empID + "/"} fireDB={this.props.fireDB} onUpdate={this.updateDay} editingMode={this.props.editingMode} />

                            ))}
                        </div>
                        {this.ShowEditBtn()}


                    </div>

                </div>

            </div>
        </div>);
    }
}

export default EmployeeTimeTable;