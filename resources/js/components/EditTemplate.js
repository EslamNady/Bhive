import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import TemplateTask from "./TemplateTask";
import LogReader from "./LogReader";
class EditTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            allskills: []
        };
        this.save = this.save.bind(this);
        this.loadTasks = this.loadTasks.bind(this);
        this.add = this.add.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.addNewTemplate = this.addNewTemplate.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.getLogTasks = this.getLogTasks.bind(this);

    }

    componentWillMount() {
        axios.get("/skills").then(response => {
            this.setState({
                allskills: response.data.data
            });

            this.setState({ allskills: newSkills });
        });
    }

    loadTasks(id) {
        if (id !== 0 && id != 0) {
            axios
                .get("/template/tasks" + id)
                .then(response => {
                    this.setState({
                        tasks: response.data.data
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    save(index, Task) {
        var array = this.state.tasks;
        array[index] = Task;
        this.setState({ tasks: array });
    }
    add() {
        var array = this.state.tasks.slice();
        var ID = 0;
        if (this.state.tasks.length !== 0) {
            ID = this.state.tasks[this.state.tasks.length - 1].id + 1;
        }
        var Task = {
            id: ID,
            name: "Task ",
            duration: 0,
            predecessors: [],
            skills: []
        };
        array.push(Task);
        array.slice();

        this.setState({ tasks: array.slice() });
    }

    onFinish() {
        if (this.state.tasks) {
            axios({
                method: "post",
                url: "../template/submit",
                data: {
                    name: this.refs.projectName.value,
                    description: this.refs.description.value,
                    startDate: this.refs.startDate.value,
                    tasks: this.state.tasks
                }
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        }
    }
    addNewTemplate() {
        if (this.state.tasks) {
            console.log(this.state.tasks);
            axios({
                method: "post",
                url: "../template/addNew",
                data: {
                    name: this.refs.projectName.value,
                    description: this.refs.description.value,
                    tasks: this.state.tasks
                }
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        }
    }
    deleteTask(index) {
        var array = this.state.tasks.slice();
        array.splice(index, 1);
        this.setState({ tasks: array });
    }

    getLogTasks(logTasks) {
        this.setState({
            tasks: logTasks
        });

    }



    render() {

        return (
            <div>
                <LogReader getLog={this.getLogTasks} />
                <div className="create-project-hr" ></div>
                <form className="form-group project-form">
                    <label htmlFor="project-name">Project Name</label>
                    <input className="form-control" id="project-name" type="text" name="projectName" ref="projectName" placeholder="Project Name" />
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" type="text" name="description" ref="description" placeholder="Project Description" />
                    <label htmlFor="startDate">Start date</label>
                    <input className="form-control" id="startDate" type="date" name="startDate" ref="startDate" placeholder="project Start Date" />
                </form>
                <div className="create-project-hr" style={{ height: 2 + "px" }} ></div>
                <div className="tasksContainer">
                    <ul className="list-group tasks-list">
                        {this.state.tasks.map((Task, i) => (
                            <li key={i} className="list-group-item mb-3">
                                <TemplateTask key={i} allSkills={this.state.allskills} onSave={this.save} onDelete={this.deleteTask} allTasks={this.state.tasks} index={i} task={Task} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="btn-group btn-wrapper" role="group">
                    <button className="btn " onClick={this.add}>ADD</button>
                    <button className="btn " onClick={this.addNewTemplate}>Add new Template</button>
                    <button className="btn " data-toggle="modal" data-target="#created" onClick={this.onFinish}>Create New Project</button>
                </div>

                <div className="modal fade" id="created" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">

                            <div className="modal-body">
                                <div className="text-success text-center">
                                    Project is Created
                                </div>
                                <div className="text-center my-2">
                                    <a href="/home">Back Home</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div >
        );
    }
}

export default EditTemplate;
