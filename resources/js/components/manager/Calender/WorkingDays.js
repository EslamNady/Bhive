import React, { Component } from 'react';
import Day from "./Day";


class WorkingDays extends Component {
    constructor(props) {
        super(props);
        this.state = { days: "" }

    }
    componentDidMount() {
        this.props.fireDB.child("TimeTable").on("value", snap => {
            this.setState({ days: snap.val() })
        })
    }
    render() {
        console.log(this.state.days);
        return (<div>
            {Object.keys(this.state.days).map((key, i) => (
                <Day key={i} name={key} day={this.state.days[key]} fireDB={this.props.fireDB} />
            ))}
        </div>);
    }
}

export default WorkingDays;