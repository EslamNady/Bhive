import React, { Component } from 'react';
import axios from "axios";
class SubmittedTasksList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subtasks: [],
        }
    }

    componentWillMount() {
        axios.get('/project/submittedtasks' + this.props.project_id
        )
            .then(response => {

                this.setState({
                    subtasks: response
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        console.log(this.state.subtasks)
        return (
            <div className="mt-5">
                <h4 className="pl-5 mb-4">Submissions</h4>
                <div className="blue-bg ">
                    <div className="doted-bg">
                    </div>
                </div>
            </div>);
    }
}

export default SubmittedTasksList;