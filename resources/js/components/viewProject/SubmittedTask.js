import React, { Component } from 'react';
import axios from "axios";
class SubmittedTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskFeedback_completed: 100,
            taskFeedback_complexty: 2,
            feedbackGiven: this.props.task.gave_feedback
        }
        this.link = this.link.bind(this);
        this.note = this.note.bind(this);
        this.changeFeedbackCompleted = this.changeFeedbackCompleted.bind(this);
        this.changeFeedbackComplexty = this.changeFeedbackComplexty.bind(this);
        this.sendFeedback = this.sendFeedback.bind(this);
    }
    changeFeedbackCompleted() {
        this.setState({
            taskFeedback_completed: this.refs.feedback_completed.value
        })
    }
    changeFeedbackComplexty() {
        this.setState({
            taskFeedback_complexty: this.refs.feedback_complexty.value
        });

    }
    sendFeedback() {
        axios({
            method: "post",
            url: "../task/submit/feedback",
            data: {
                submissionID: this.props.task.id,
                completeness: this.state.taskFeedback_completed,
                complexity: this.state.taskFeedback_complexty,

            }
        })
            .then(response => {
                this.setState({
                    feedbackGiven: parseInt(response.data)
                })
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
            });

    }
    link() {
        if (this.props.task.link !== null) {
            return <div className="text-doted">
                <small className="text-muted">Link/ </small>
                <a target="_blank" href={this.props.task.link}>{this.props.task.link}</a>
            </div>
        }
        else {
            return <React.Fragment>
                <small className="text-muted">Link/ </small>
                <small>No link is Submitted</small>
            </React.Fragment>
        }
    }
    note() {
        if (this.props.task.note !== null) {
            return <div className="text-doted">
                <small className="text-muted">Note/ </small>
                <span>{this.props.task.note}</span>
            </div>
        } else {
            return <React.Fragment>
                <small className="text-muted">Note/ </small>
                <small>No note is Submitted</small>
            </React.Fragment>
        }

    }
    noteCompleted() {
        if (this.props.task.note !== null) {
            return <div className="text-doted">
                <small className="text-muted">Note </small>
                <div className="m-2 p-2 note-completed">{this.props.task.note}</div>
            </div>
        } else {
            return <React.Fragment>
                <small className="text-muted">Note/ </small>
                <small>No note is Submitted</small>
            </React.Fragment>
        }

    }

    subBtn() {
        if (this.state.feedbackGiven == 0) {
            return <React.Fragment>
                <button className="btn btn-primary btn-sm btn-block font-weight-bold" data-toggle="modal" data-target={"#modal-" + this.props.task.id}>Give feedback</button>

                {/* modal */}
                <div className="modal fade" id={"modal-" + this.props.task.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-doted">
                                <h5 className="modal-title" >{this.props.task.name}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body pt-1">
                                <div className="emp-info text-center">
                                    {this.props.task.emp_first_name}
                                    <small className="text-muted">/{this.props.task.emp_title} </small>

                                </div>
                                <div className="sub-link mt-2">
                                    {this.link()}
                                </div>
                                <div className="sub-note">
                                    {this.noteCompleted()}
                                </div>
                                <div className="sub-time">
                                    <small className="text-muted">Submitted at/ </small>
                                    {this.props.task.submission_date}
                                </div>
                                <hr />
                                <small className="text-muted">By what percent you find the task is completed?</small>
                                <input className="form-control" ref="feedback_completed" onChange={this.changeFeedbackCompleted} value={this.state.taskFeedback_completed} type="range" min="0" max="100" style={{ "cursor": "col-resize" }} />
                                <small className="d-block text-right">{this.state.taskFeedback_completed + "%"}</small>

                                <small className="text-muted">How complex was the task ?</small>
                                <select className="form-control mt-2" ref="feedback_complexty" value={this.state.taskFeedback_complexty} onChange={this.changeFeedbackComplexty}>
                                    <option value={1}>Trivial</option>
                                    <option value={2}>Normal</option>
                                    <option value={3}>Complex</option>

                                </select>

                            </div>
                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                <button type="button" onClick={this.sendFeedback} className="btn btn-success" data-dismiss="modal">Send feedback</button>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        } else {
            return <button className="btn btn-dark btn-sm btn-block font-weight-bold " disabled >Feedback is sent</button>
        }

    }
    render() {
        console.log(this.props.task.note);
        return (

            <div className="subTask">
                <div className="card">
                    <div className="card-header text-doted">
                        <h5>{this.props.task.name}</h5>
                        {/* sldk */}
                    </div>
                    <div className="card-body pt-1">
                        <div className="emp-info text-center">
                            {this.props.task.emp_first_name}
                            <small className="text-muted">/{this.props.task.emp_title} </small>

                        </div>
                        <div className="sub-link mt-2">
                            {this.link()}
                        </div>
                        <div className="sub-note">
                            {this.note()}
                        </div>
                        <div className="sub-time">
                            <small className="text-muted">Submitted at/ </small>
                            {this.props.task.submission_date}
                        </div>
                        <div className="sub-btn mt-2">
                            {this.subBtn()}
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default SubmittedTask;