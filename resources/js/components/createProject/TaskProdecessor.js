import React, { Component } from "react";
class TaskPredecessor extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.delete = this.delete.bind(this);
    }

    delete() {
        this.props.onDelete(this.props.index);
    }

    renderEdit() {
        return (
            <div className="predecessor mx-3 my-2 px-2 py-1">
                <div className="predecessor-name">{this.props.name}</div>
                <div className="predecessor-duration ml-4">{this.props.duration} <small>Days</small></div>

                <div className="delete-btn ml-3" onClick={this.delete}> <img src="/images/icons/cancel.png" alt="delete" /></div>
            </div>
        )
    }
    renderNormal() {
        return (
            <div className="predecessor mx-3 my-2 px-2 py-1 " >
                <div className="predecessor-name">{this.props.name}</div>
                <div className="predecessor-duration ml-4">{this.props.duration} <small>Days</small></div>
            </div>
        );
    }

    render() {
        if (this.props.edit) {
            return this.renderEdit();
        } else {
            return this.renderNormal()
        }
    }
}

export default TaskPredecessor;