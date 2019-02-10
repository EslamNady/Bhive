import React, { Component } from 'react';
import UpcomingTasks from './UpcomingTasks';
import PreviousTasks from './PreviousTasks';
import OutgoingTasks from './OutgoingTasks';

class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <div>
                <div className="row m-0">

                    <div className="col-4">
                        <div className="card tasks-wrapper">
                            <PreviousTasks employeeID={this.props.employeeID}></PreviousTasks>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card tasks-wrapper">
                            <OutgoingTasks employeeID={this.props.employeeID}></OutgoingTasks>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card tasks-wrapper">
                            <UpcomingTasks employeeID={this.props.employeeID}></UpcomingTasks>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tasks;
