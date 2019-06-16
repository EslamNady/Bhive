import React, { Component } from 'react';
class VacationRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.sendRequest = this.sendRequest.bind(this);
    }


    sendRequest() {

        var empKey = this.props.email.replace(/\./g, ',');
        // console.log(this.refs.start.value)
        if (this.refs.start.value != "" && this.refs.end.value != "") {

            this.props.fireDB.child(`vacationRequests/requests/${empKey}/start`).set(this.refs.start.value);
            this.props.fireDB.child(`vacationRequests/requests/${empKey}/end`).set(this.refs.end.value);

        }
    }

    render() {
        return (<div>
            <h4>Vacation request</h4>
            <div className='vacation-form'>
                <div className="row">
                    <div className="col-6">
                        <span>From: </span>
                        <input className='form-control' type='date' ref="start" />
                    </div>
                    <div className="col-6">
                        <span>To: </span>
                        <input className='form-control' type='date' ref="end" />
                    </div>
                </div>
                <div className="text-center mt-2">
                    <button className="btn btn-primary mt-2" onClick={this.sendRequest}>Send</button>
                </div>
            </div>
            <hr />
        </div>);
    }
}

export default VacationRequest;