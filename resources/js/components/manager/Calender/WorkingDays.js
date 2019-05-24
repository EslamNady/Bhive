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

            this.setState({ days: this.orderDaysObject(days) });




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
    render() {

        return (<div className="py-4">
            {Object.keys(this.state.days).map((key, i) => (
                <Day key={i} name={key} day={this.state.days[key]} target="TimeTable/" fireDB={this.props.fireDB} />
            ))}
        </div>);
    }
}

export default WorkingDays;