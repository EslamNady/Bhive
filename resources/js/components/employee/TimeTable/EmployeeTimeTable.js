import React, { Component } from 'react';
import Day from "./Day"
class EmployeeTimeTable extends Component {
    constructor(props) {
        super(props);
        this.state = { days: "" }

        this.setToDEfault = this.setToDEfault.bind(this);
        this.ShowEditBtn = this.ShowEditBtn.bind(this);
    }




    componentWillMount() {
        this.props.fireDB.child("Employees/" + this.props.empID + "/timeTable").on("value", snap => {
            var days = snap.val();
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
            this.setState({ days: ordered });

        })


    }
    setToDEfault() {
        this.props.fireDB.child("TimeTable").once('value', snap => {
            var table = snap.val();
            this.props.fireDB.child("Employees/" + this.props.empID + "/timeTableStatus").set("default");
            this.props.fireDB.child("Employees/" + this.props.empID + "/timeTable").set(table);
        });
    }
    ShowEditBtn() {
        if (this.props.editingMode) {
            return (<div className="container my-2 text-center">
                <button onClick={this.setToDEfault} className="btn btn-success ">Set to default</button>
                <hr />
            </div>
            );
        }
    }
    render() {
        return (<div>
            <div className="container mt-2">
                <div className="emp-wrapper w-80 mx-auto" >
                    <div className="tab-content mt-1  " id={"emp" + this.props.index}>
                        <div>
                            {Object.keys(this.state.days).map((key, i) => (
                                <div>
                                    <Day key={i} name={key} day={this.state.days[key]} target={"Employees/" + this.props.empID + "/timeTable/"} empPath={"Employees/" + this.props.empID + "/"} fireDB={this.props.fireDB} editingMode={this.props.editingMode} />
                                </div>
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