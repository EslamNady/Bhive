import React, { Component } from 'react';
import NextVacationList from './NextVacationList'
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
        return (
            <React.Fragment>
                <div>
                    <div className="row">
                        <div className='col-6'>
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
                                    <button className="btn btn-primary mt-2" onClick={this.sendRequest} data-toggle="modal" data-target="#confirmSend1">Send</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <NextVacationList fireDB={this.props.fireDB} empKey={this.props.email.replace(/\./g, ',')} />
                        </div>

                    </div>


                    <hr />
                </div>
                <div className="modal fade" id="confirmSend1" tabIndex="-1" role="dialog" aria-hidden="true">
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

export default VacationRequest;