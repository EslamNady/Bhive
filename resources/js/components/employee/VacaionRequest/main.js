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
            <div className='vacation-form'>
                <input className='form-control' type='date' ref="start" />
                <input className='form-control' type='date' ref="end" />
                <button onClick={this.sendRequest}>Send</button>
            </div>
        </div>);
    }
}

export default VacationRequest;