import React, { Component } from 'react';
import EmployeeTimeTable from './EmployeeTimeTable'
class TimeTableWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empKey: "",

        }
    }

    componentWillMount() {
        var empKey = this.props.email.replace(/\./g, ',');
        this.setState({ empKey: empKey });
    }
    render() {
        const carkenderStyle = {
            backgroundColor: "rgba(220,220,220,0.2)",
            borderRadius: "5px",
            padding: "3px 30px"
        }
        return (<div>
            <ul className="nav nav-pills nav-justified mb-3  pt-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-WorkingDays" role="tab" aria-selected="true">Working Days</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-Holidays" role="tab" aria-selected="false">Request changing workdays</a>
                </li>

            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-WorkingDays" role="tabpanel" aria-labelledby="pills-home-tab">
                    <div style={carkenderStyle}>
                        <EmployeeTimeTable empID={this.state.empKey} fireDB={this.props.fireDB} editingMode={false} />
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-Holidays" role="tabpanel" aria-labelledby="pills-profile-tab">
                    <div style={carkenderStyle}>
                        <EmployeeTimeTable empID={this.state.empKey} fireDB={this.props.fireDB} editingMode={true} />
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default TimeTableWrapper;
// {Object.keys(this.state.timeTable).map((key, i) => (
//     <div key={i} className="row">
//         <div className="col-2">
//             {key}
//         </div>
//         <div className="col-2">
//             {this.state.timeTable[key].in}
//         </div>
//         <div className="col-2">
//             {this.state.timeTable[key].out}
//         </div>

//     </div>
// ))}