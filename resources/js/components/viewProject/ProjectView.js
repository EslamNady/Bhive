import React, { Component } from 'react';
import ReactDOM from "react-dom";
import CrmDiagram from "./Crm";
import ProjectTasksList from "./ProjectTasksList";
import SubmittedTasksList from "./SubmittedTasksList";
class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project_id: document.getElementById("ProjectView").getAttribute("projectID"),
            project_name: document.getElementById("ProjectView").getAttribute("projectName"),
            project_description: document.getElementById("ProjectView").getAttribute("projectDescription"),

            tasks: []
        }
    }
    componentWillMount() {
        axios.get('/project/tasks' + this.state.project_id
        )
            .then(response => {

                this.setState({
                    tasks: response.data.data
                });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        if (this.state.tasks.length === 0) {
            return false;
        }

        return (
            <div className="projectWrapper ">
                <div className="project-info mb-3">
                    <div className="project-name">{this.state.project_name}</div>
                    <div className="project-description ml-4 h5"><span className="font-weight-bold "> Project Description: &nbsp;&nbsp;</span>{this.state.project_description}</div>
                </div>
                <div className="row px-0 mx-0 mt-2">
                    <div className="col-2 px-1 mx-0 ">

                        <ProjectTasksList tasks={this.state.tasks}></ProjectTasksList>
                    </div>
                    <div className="col-10 px-1">

                        <CrmDiagram project={this.state.project_id} projectTasks={this.state.tasks}></CrmDiagram>
                    </div>
                    <div className="col-12 px-1">
                        <SubmittedTasksList project_id={this.state.project_id}></SubmittedTasksList>
                    </div>
                </div>

            </div>);

    }
}

export default ProjectView;

if (document.getElementById("ProjectView")) {
    ReactDOM.render(
        <ProjectView />,
        document.getElementById("ProjectView")
    );
}
