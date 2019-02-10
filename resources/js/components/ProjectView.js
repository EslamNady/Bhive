import React, { Component } from 'react';
import ReactDOM from "react-dom";
import CrmDiagram from "./Crm";
import ProjectTasksList from "./ProjectTasksList";
class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project_id: document.getElementById("ProjectView").getAttribute("projectID"),
            project_name: document.getElementById("ProjectView").getAttribute("projectName"),
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
            <div className="projectWrapper">
                <div className="project-name">{this.state.project_name}</div>
                <div className="row px-0 mx-0">
                    <div className="col-2">
                        <ProjectTasksList tasks={this.state.tasks}></ProjectTasksList>
                    </div>
                    <div className="col-10">
                        <CrmDiagram project={this.state.project_id} projectTasks={this.state.tasks}></CrmDiagram>
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
