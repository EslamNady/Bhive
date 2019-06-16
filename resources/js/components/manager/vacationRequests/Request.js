import React, { Component } from 'react';
import axios from "axios";
class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empName: '',
            empTitle: '',
            start: '',
            end: ''
        }
        this.approveRequest = this.approveRequest.bind(this)
        this.rejectRequest = this.rejectRequest.bind(this)
    }
    componentWillReceiveProps(nextProp) {
        nextProp.fireDB.child(`Employees/${nextProp.empID}`).once('value', snap => {
            var data = snap.val();
            this.setState({
                empName: data.info.first_name + " " + data.info.last_name,
                empTitle: data.info.title,
            })
            nextProp.fireDB.child(`vacationRequests/requests/${nextProp.empID}`).once('value', snap => {
                var data = snap.val();
                this.setState({
                    start: data.start,
                    end: data.end,
                })
            })
        })
    }
    componentWillMount() {
        this.props.fireDB.child(`Employees/${this.props.empID}`).once('value', snap => {
            var data = snap.val();
            this.setState({
                empName: data.info.first_name + " " + data.info.last_name,
                empTitle: data.info.title,
            })
            this.props.fireDB.child(`vacationRequests/requests/${this.props.empID}`).once('value', snap => {
                var data = snap.val();
                this.setState({
                    start: data.start,
                    end: data.end,
                })
            })
        })
    }
    approveRequest() {
        // axios({
        //     method: "post",
        //     url: "vacationRequest/accept",
        //     data: {
        //         empID: this.props.empID,
        //         start: this.state.start,
        //         end: this.state.end,
        //     }
        // })
        //     .then(response => {

        //         // this.props.fireDB.child(`vacationRequests/requests/${this.props.empID}`).remove();
        //         console.log(response.data);

        //     })
        //     .catch(function (error) {
        //         console.log(error.response.data);
        //     });
        var start = [
            parseInt(this.state.start.substring(0, 4)),
            parseInt(this.state.start.substring(5, 7)),
            parseInt(this.state.start.substring(8, 10))
        ]
        var s = this.convertDateToString(start);
        while (s != this.state.end) {
            this.props.fireDB.child(`Employees/${this.props.empID}/vacations/${s}/reason`).set('none');
            start[2]++;
            if (start[2] == 32) {
                start[2] = 1;
                start[1]++;
            }
            if (start[1] == 13) {
                start[1] = 1;
                start[0]++;
            }
            s = this.convertDateToString(start);
        }
        this.props.fireDB.child(`Employees/${this.props.empID}/vacations/${s}/reason`).set('none');


    }

    rejectRequest() {
        this.props.fireDB.child(`vacationRequests/requests/${this.props.empID}`).remove();
    }
    convertDateToString(Start) {
        var date = Start[0] + "-";
        if (parseInt(Start[1] / 10) !== 0) {
            date = date + Start[1] + '-';
        } else {
            date = date + '0' + Start[1] + '-';
        }
        if (parseInt(Start[2] / 10) !== 0) {
            date = date + Start[2];
        } else {
            date = date + '0' + Start[2];
        }
        return date;
    }
    render() {
        return (<li className="list-group-item">
            <div>
                <small className="text-muted">{this.state.empTitle}/</small>
                <span>{this.state.empName}</span>
            </div>
            <div className="row">
                <div className="col-6">
                    <div><small className="text-muted">start: </small>{this.state.start}</div>
                    <div><small className="text-muted">end: </small> {this.state.end}</div>
                </div>
                <div className="col-6">
                    <div className="d-flex justify-content-end align-items-end">
                        <button onClick={this.approveRequest} className="btn btn-small btn-success">Approve</button>
                        <button onClick={this.rejectRequest} className="btn btn-small ml-1 btn-danger">Reject</button>
                    </div>
                </div>
            </div>
        </li>);
    }
}

export default Request;