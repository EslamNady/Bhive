import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

class CrmDiagram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            // ['Research', 'Find sources', new Date(2015, 2, 1), new Date(2015, 2, 5, 8, 0, 0), null, 100, null],

            columns: [
                {
                    id: 'Task ID',
                    type: 'string',
                },
                {
                    id: 'Task Name',
                    type: 'string',
                },
                {
                    id: 'Start Date',
                    type: 'date',
                },
                {
                    id: 'End Date',
                    type: 'date',
                },
                {
                    id: 'Duration',
                    type: 'number',
                },
                {
                    id: 'Percent Complete',
                    type: 'number',
                },
                {
                    id: 'Dependencies',
                    type: 'string',
                },
            ],

        }
    }
    componentWillMount() {
        var newRows = [];
        var projectTasks = this.props.projectTasks;
        for (var i = 0; i < projectTasks.length; i++) {
            var new_row = [];
            new_row.push(projectTasks[i].id.toString());
            new_row.push(projectTasks[i].name);
            new_row.push(new Date(projectTasks[i].startDate.date));
            new_row.push(new Date(projectTasks[i].endDate.date));
            new_row.push(null);
            new_row.push(projectTasks[i].progress);
            var predecessorsID = "";
            if (projectTasks[i].predecessors.length > 0) {
                for (var j = 0; j < projectTasks[i].predecessors.length; j++) {
                    predecessorsID += projectTasks[i].predecessors[j].id.toString() + ",";
                }
                new_row.push(predecessorsID);
            }
            else {
                new_row.push(null);
            }
            newRows.push(new_row);
        }

        this.setState({
            rows: newRows
        });
    }
    render() {

        return <div>
            <div className="blue-bg">
                <div className="doted-bg">
                    <div className="crm">
                        <Chart
                            chartType="Gantt"
                            rows={this.state.rows}
                            columns={this.state.columns}
                            width="100%"
                            height="400px"

                        />
                    </div>
                </div>
            </div>


        </div>

            ;
    }
}

export default CrmDiagram;
