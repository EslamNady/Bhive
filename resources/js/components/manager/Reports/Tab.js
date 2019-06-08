import React, { Component } from 'react';
import $ from 'jquery'
class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.getID = this.getID.bind(this);

    }
    componentDidMount() {

        $(".nav-item").click(function () {
            $(".nav-item").removeClass('active');
            $(this).addClass("active");
        });


    }
    getID() {
        this.props.getID({ "id": this.props.obj.id, "type": this.props.type });

    }
    renderProjectTab() {
        const elementStyle = {
            borderRadius: 0,
            borderBottom: "2px",
            cursor: 'pointer'

        }
        const project = this.props.obj;
        return (<li onClick={this.getID} className="nav-item list-group-item list-group-item-action" style={elementStyle}>
            <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: '15px' }} >{project.name}</div>

        </li>);
    }
    renderEmployeeTab() {
        const elementStyle = {
            borderRadius: 0,
            borderBottom: "2px ",
            cursor: 'pointer'
        }
        const employee = this.props.obj;
        return (<li onClick={this.getID} className="nav-item list-group-item list-group-item-action" style={elementStyle}>
            <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <small className="font-weight-bold">{`${employee.title}/`}</small>
                <span style={{ fontSize: '14px' }}>{` ${employee.first_name} ${employee.last_name}`}</span>
            </div>
        </li>);
    }
    render() {

        if (this.props.type === "project") {
            return (this.renderProjectTab())
        } else if (this.props.type === "employee") {
            return (this.renderEmployeeTab())
        }
    }
}

export default Tab;