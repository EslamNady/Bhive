import React, { Component } from 'react';
import Day from "./Day";


class WorkingDays extends Component {
    constructor(props) {
        super(props);
        this.state = { days: "" }

    }
    componentWillMount() {
        this.props.fireDB.child("TimeTable").on("value", snap => {
            var days = snap.val();
            this.setState({ days: days });

            this.props.fireDB.child("Employees").once('value', EmpSnap => {

                var emps = EmpSnap.val()
                for (var key in emps) {
                    if (emps[key]['timeTableStatus'] == "default") {
                        this.props.fireDB.child("Employees/" + key + "/timeTable").set(days);
                    }
                }
            });
        })

    }
    render() {

        return (<div className="py-4">
            {Object.keys(this.state.days).map((key, i) => (
                <Day key={i} name={key} day={this.state.days[key]} target="TimeTable/" fireDB={this.props.fireDB} />
            ))}
        </div>);
    }
}

export default WorkingDays;