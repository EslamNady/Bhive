import React, { Component } from 'react';
import ReactDOM from "react-dom";
class SubmitTaskMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: {}
        }
        this.submit = this.submit.bind(this);

    }
    componentWillMount() {
        this.setState({
            task: JSON.parse(document.getElementById("submissionView").getAttribute("task")),
        })
    }
    submit() {
        var link = this.refs.link.value;
        var comment = this.refs.link.value;
        axios({
            method: "post",
            url: "../../employees/submit",
            data: {
                link: link,
                comment: comment,
                task: this.state.task,
            }
        }).
            then(response => {
                window.location = "/employees";
                // console.log(response.data);

            })
            .catch(function (error) {
                console.log(error.response.data);
            });

    }
    render() {
        return (
            <div className="submit-wrapper">
                <div className="container">
                    <div className="task-info">
                        <div className="task-name">{this.state.task.name}</div>
                        <div className="task-startdate">{this.state.task.startDate.substring(0, this.state.task.startDate.indexOf(" "))}</div>
                        <div className="task-enddate">{this.state.task.endDate.substring(0, this.state.task.endDate.indexOf(" "))}</div>
                    </div>
                    <div>
                        <div className="form-group" >
                            <label>Link:</label><input ref="link" className="form-control" type="url" placeholder="Repositry link" />
                            <label> Comment:</label><textarea ref="comment" className="form-control" placeholder="Any comment"></textarea>
                            <button onClick={this.submit} className="btn btn-block btn-success mt-2" >Submit Task</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubmitTaskMain;
if (document.getElementById("submissionView")) {
    ReactDOM.render(
        <SubmitTaskMain />,
        document.getElementById("submissionView")
    );
}