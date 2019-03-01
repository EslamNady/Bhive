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
    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    submit() {
        var link = this.refs.link.value;
        var comment = this.refs.comment.value;
        console.log(this.validURL(link));
        if (!(link == "" && comment == "") && this.validURL(link)) {
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