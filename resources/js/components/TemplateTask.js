import React, { Component } from "react";
import TaskSkill from "./TaskSkill";

class TemplateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            predecessors: this.props.task.predecessors,
            skills: this.props.task.skills,
            edit: true,
            allSkills: this.props.allSkills,
            allTasks: []
        };
        this.edit = this.edit.bind(this); //hna
        this.save = this.save.bind(this);
        this.add = this.add.bind(this);
        this.deletePredecessor = this.deletePredecessor.bind(this);
        this.saveSkillLevel = this.saveSkillLevel.bind(this);
        this.addSkill = this.addSkill.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);
    }
    componentWillMount() {
        var allTasks = this.props.allTasks.slice();
        allTasks.splice(this.props.index, 1);
        this.setState({
            allTasks: allTasks
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
            skills: this.state.skills
        };
        this.props.onSave(this.props.index, task);
    }
    add() {
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
    deletePredecessor(index) {
        var array = this.state.predecessors;
        array.splice(index, 1);
        this.setState({ predecessors: array });
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
                                <div className="predecessor mx-3 my-2 px-2 py-1 " key={j}>
                                    <div className="predecessor-name">{predecessor.name}</div>
                                    <div className="predecessor-duration ml-4">{predecessor.duration} <small>Days</small></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="skills-wrapper">
                    <h4>Required skills</h4>
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
                        <input className="form-control d-inline" type="number" ref="duration" placeholder="Task duration" defaultValue={this.props.task.duration} />
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

                                <div key={i} className="predecessor mx-3 my-2 px-2 py-1">
                                    <div className="predecessor-name">{predecessor.name}</div>
                                    <div className="predecessor-duration ml-4">{predecessor.duration} <small>Days</small></div>

                                    <div className="delete-btn ml-3" onClick={this.deletePredecessor.bind(i)}> <img src="/images/icons/cancel.png" alt="delete" /></div>
                                </div>


                            ))}
                        </div>
                    </div>
                </div>
                <div className="skills-wrapper">

                    <h4>Required skills</h4>

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
