import React, { Component } from 'react';
import Day from "./Day"
class EmployeeTimeTable extends Component {
    constructor(props) {
        super(props);
        this.state = { days: "" }

        this.setToDEfault = this.setToDEfault.bind(this);
    }

    componentWillMount() {
        this.props.fireDB.child("Employees/" + this.props.empID + "/timeTable").on("value", snap => {
            var days = snap.val();
            this.setState({ days: days });
        })

    }
    setToDEfault() {
        this.props.fireDB.child("TimeTable").once('value', snap => {
            var table = snap.val();
            this.props.fireDB.child("Employees/" + this.props.empID + "/timeTableStatus").set("default");
            this.props.fireDB.child("Employees/" + this.props.empID + "/timeTable").set(table);
        });
    }
    render() {
        return (<div>
            <div className="container mt-2">
                <div className="emp-wrapper w-80 mx-auto" >
                    <div className="tab btn btn-secondary btn-block " data-toggle="collapse" data-target={"#emp" + this.props.index} >
                        <span>{this.props.emp.info.title + "/ "}</span>
                        <strong> {this.props.emp.info.first_name + " " + this.props.emp.info.last_name}</strong>
                    </div>
                    <div className="tab-content mt-1 collapse " id={"emp" + this.props.index}>
                        <div>
                            {Object.keys(this.state.days).map((key, i) => (
                                <Day key={i} name={key} day={this.state.days[key]} target={"Employees/" + this.props.empID + "/timeTable/"} empPath={"Employees/" + this.props.empID + "/"} fireDB={this.props.fireDB} />
                            ))}
                        </div>
                        <div className="container my-2 text-center">
                            <button onClick={this.setToDEfault} className="btn btn-success ">Set to default</button>
                        </div>
                        <hr />
                    </div>

                </div>

            </div>
        </div>);
    }
}

export default EmployeeTimeTable;