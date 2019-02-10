import React, { Component } from "react";
import ReactDOM from "react-dom";

import TemplateSelection from "./TemplateSelection";
import EditTemplate from "./EditTemplate";
class CreateProject extends Component {
    constructor() {
        super();
        this.state = {
            templateID: 0
        };
        this.getTemplateID = this.getTemplateID.bind(this); //hna
        this.child = React.createRef();
    }
    getTemplateID(id) {
        this.setState({
            templateID: id
        });
        this.child.current.loadTasks(id);
    }

    render() {
        return (
            <div id="create-project-container" >
                <div className="logo-container">
                    <img src="/images/logo 1.png" alt="logo"></img>
                </div>
                <div className="create-project-label">
                    <h3>Create Project</h3>
                </div>
                <div className="container ">
                    <div className="create-project-wrapper mb-4">
                        <div className="bg-wrapper p-4 ">
                            <div>
                                <div className="text-muted my-1">
                                    <small>You can select a template</small>
                                </div>
                                <TemplateSelection getTemp={this.getTemplateID} />
                            </div>

                            <div>
                                <div className="text-muted my-1">
                                    <small>Or upload a project log</small>
                                </div>
                                <EditTemplate ref={this.child} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById("CreateProject")) {
    ReactDOM.render(
        <CreateProject />,
        document.getElementById("CreateProject")
    );
}
export default CreateProject;
