import React, { Component } from "react";
import TaskSkill from "./TaskSkill";
import TaskPredecessor from "./TaskProdecessor";

class TemplateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            predecessors: this.props.task.predecessors,
            skills: this.props.task.skills,
            edit: false,
            allSkills: this.props.allSkills,
            allTasks: [],
            emps_number: 0

        };
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.add = this.add.bind(this);
        this.deletePredecessor = this.deletePredecessor.bind(this);
        this.saveSkillLevel = this.saveSkillLevel.bind(this);
        this.addSkill = this.addSkill.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);
        this.setEmpsNumber = this.setEmpsNumber.bind(this);





    }
    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        // if (nextProps.startTime !== this.state.startTime) {
        //   this.setState({ startTime: nextProps.startTime });
        // }

        var allTasks = nextProps.allTasks.slice();
        var predecessors = this.state.predecessors.slice();
        allTasks.splice(nextProps.index, 1);
        for (var j = 0; j < predecessors.length; j++) {
            var found = false;
            for (var i = 0; i < allTasks.length; i++) {

                // console.log(this.state.predecessors[j].id + " " + allTasks[i].id);
                if (predecessors[j].id == allTasks[i].id) {
                    predecessors[j].name = allTasks[i].name;
                    predecessors[j].duration = allTasks[i].duration;
                    allTasks.splice(i, 1);
                    found = true;
                }
            }
            if (!found) {
                predecessors.splice(j, 1);
            }

        }

        this.setState({
            allTasks: allTasks,
            predecessors: predecessors
        });

    }
    componentWillMount() {
        var allTasks = this.props.allTasks.slice();
        allTasks.splice(this.props.index, 1);
        this.setState({
            allTasks: allTasks,
            emps_number: this.props.task.empNum,
        });

        var newSkills = this.state.allSkills.slice();

        for (var j = 0; j < this.state.skills.length; j++) {
            var index = -1;
            for (var i = 0; i < newSkills.length; i++) {
                if (newSkills[i].id === this.state.skills[j].id) {
                    index = i;
                    break;
                }
            }
            if (index == -1) continue;
            else {
                newSkills.splice(index, 1);
            }
        }
        this.setState({ allSkills: newSkills });
    }

    edit() {

        this.setState({
            edit: true
        });
    }

    save() {
        this.setState({
            edit: false
        });
        var predecessors = new Array();
        predecessors = this.state.predecessors;

        var task = {
            id: this.props.task.id,
            name: this.refs.name.value,
            duration: parseInt(this.refs.duration.value),
            predecessors: predecessors,
            skills: this.state.skills,
            empNum: this.state.emps_number
        };
        this.props.onSave(this.props.index, task);
    }
    add() {
        if (this.refs.allTasksContainer.value != "") {
            var array = this.state.predecessors;
            var Task = this.state.allTasks[this.refs.allTasksContainer.value];
            array.push(Task);
            var allTasks = this.state.allTasks.slice();
            allTasks.splice(this.refs.allTasksContainer.value, 1);
            this.setState({
                predecessors: array,
                allTasks: allTasks
            });
        }
    }
    deletePredecessor(index) {

        var array = this.state.predecessors.slice();
        var array2 = this.state.allTasks;
        var obj = array.splice(index, 1);

        for (var i = 0; i < this.props.allTasks.length; i++) {
            if (this.props.allTasks[i].id == obj[0].id) {
                array2.push(this.props.allTasks[i]);
                break;
            }
        }


        this.setState({
            predecessors: array,
            allTasks: array2
        });
    }
    saveSkillLevel(skillID, value) {
        var array = this.state.skills;
        array[skillID].level = value;
        this.setState({ skills: array });
    }
    addSkill() {
        var array = this.state.skills.slice();
        var index = this.refs.allSkillsSelect.value;
        array.push({
            id: this.state.allSkills[index].id,
            name: this.state.allSkills[index].name,
            level: this.refs.skillLevel.value
        });
        this.setState({ skills: array });
        var newSkills = this.state.allSkills;
        newSkills.splice(index, 1);
        this.setState({ allSkills: newSkills });
    }
    delete() {
        this.props.onDelete(this.props.index);
    }
    deleteSkill(index) {
        var array = this.state.skills.slice();
        var allSkillsArr = this.state.allSkills;
        allSkillsArr.push(array[index]);
        array.splice(index, 1);
        this.setState({ skills: array });
    }
    setEmpsNumber() {

        this.setState({
            emps_number: this.refs.emps_number.value
        })

    }
    renderNormal() {
        return (
            <div className="task-body normal-body">
                <div>
                    <label className="task-label">Task Name</label><h3 className="task-name">{this.props.task.name}</h3>
                </div>
                <div>
                    <label className="task-label">Task Duration</label><span className="task-duration">{this.props.task.duration} Days</span>
                </div>
                <div className="predecessors-wrapper">
                    <h4>Predecessors</h4>
                    <div className="predecessors-box">
                        <div className="predecessors-box-insider d-flex flex-wrap justify-content-start">
                            {this.props.task.predecessors.map((predecessor, j) => (
                                <TaskPredecessor key={j} index={j} name={predecessor.name} onDelete={this.deletePredecessor} duration={predecessor.duration} edit={false}></TaskPredecessor>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="skills-wrapper">

                    <h4 className="mt-2 d-inline-block">Required skills </h4>
                    <small className=" text-muted"> No. of employees: {this.state.emps_number}</small>
                    <div className="skills-box " >
                        <div className="skills-box-insider d-flex flex-wrap justify-content-start">
                            {this.state.skills.map((skill, i) => (
                                <TaskSkill key={i} onSave={this.saveSkillLevel} name={skill.name} id={i} edit={false} level={skill.level} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="edit-btn" onClick={this.edit}><img src="/images/icons/edit.png" alt="edit" /></div>
                <div className="delete-btn" onClick={this.delete}><img src="/images/icons/cancel.png" alt="delete" /></div>
            </div>
        );
    }
    renderForm() {
        return (
            <div className="task-body edit-body">
                <div className="row form">
                    <div className="col-6 ">
                        <label>Task Name</label>
                        <input className="form-control d-inline" type="text" ref="name" placeholder="Task name" defaultValue={this.props.task.name} />
                    </div>
                    <div className="col-6">
                        <label>Duration <small className="text-muted">In Days</small></label>
                        <input className="form-control d-inline" type="number" min={1} ref="duration" placeholder="Task duration" defaultValue={this.props.task.duration} />
                    </div>
                </div>
                <div className="predecessors-wrapper mt-3">
                    <h4>Edit predecessors</h4>

                    <div className="add-predecessors">
                        <div className="form-inline">
                            <select className="form-control" ref="allTasksContainer" type="text">
                                {this.state.allTasks.map((task, i) => (
                                    <option key={i} value={i}>
                                        {task.name}
                                    </option>
                                ))}
                            </select>
                            <button className="btn btn-primary ml-2" onClick={this.add}>ADD</button>
                        </div>

                    </div>
                    <div className="predecessors-box mt-2">
                        <div className="predecessors-box-insider d-flex flex-wrap justify-content-start">
                            {this.state.predecessors.map((predecessor, i) => (
                                <TaskPredecessor key={i} index={i} name={predecessor.name} onDelete={this.deletePredecessor} duration={predecessor.duration} edit={true}></TaskPredecessor>

                            ))}
                        </div>
                    </div>
                </div>
                <div className="skills-wrapper">

                    <h4>Number of employees</h4>
                    <select defaultValue={this.state.emps_number} onChange={this.setEmpsNumber} className="form-control emp-number-select" ref="emps_number">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>


                    <h4 className="mt-2">Required skills</h4>

                    <div className="form-group form-inline">
                        <select className="form-control" id="allSkillsSelect" ref="allSkillsSelect">
                            {this.state.allSkills.map((skill, i) => (
                                <option key={i} value={i}>
                                    {skill.name}
                                </option>
                            ))}
                        </select>
                        <select className="form-control ml-2" id="skill_level_select" ref="skillLevel">
                            <option value={1}>Little Knowledge</option>
                            <option value={2}>Beginner</option>
                            <option value={3}>Intermediate</option>
                            <option value={4}>Consultant</option>
                            <option value={5}>Professional</option>
                        </select>
                        <button className="btn btn-primary ml-2" onClick={this.addSkill}>Add Skill</button>
                    </div>

                    <div className="skills-box " >
                        <div className="skills-box-insider d-flex flex-wrap justify-content-start">
                            {this.state.skills.map((skill, i) => (
                                <TaskSkill key={i} onSave={this.saveSkillLevel} onDelete={this.deleteSkill} name={skill.name} id={i} edit={true} level={skill.level} />
                            ))}
                        </div>
                    </div>


                </div>

                <div className="save-btn" onClick={this.save}><img src="/images/icons/save.png" alt="save" /></div>
                <button className="btn btn-success mt-2 ml-2" onClick={this.save}>Save</button>

            </div>
        );
    }
    render() {

        if (this.state.edit) {
            return this.renderForm();
        } else {
            return this.renderNormal();
        }
    }
}

export default TemplateTask;
