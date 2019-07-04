import React, { Component } from 'react';
class NextVacationList extends Component {
    constructor(props) {
        super(props);
        this.state = { vacations: {} }
        this.showVacations = this.showVacations.bind(this);
    }
    componentWillMount() {
        this.props.fireDB.child(`Employees/${this.props.empKey}/vacations`).on('value', (snap => {
            this.setState({ vacations: snap.val() });
        }));
    }
    showVacations() {
        if (!this.isEmpty(this.state.vacations)) {
            var d = new Date();

            var dateArr = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
            var date = this.convertDateToString(dateArr);
            console.log(date)
            return (
                <React.Fragment>
                    <ul className='list-group'>
                        {Object.keys(this.state.vacations).map((key, i) => (
                            <React.Fragment key={i}>
                                {(key >= date) ? <li className='list-group-item'>{key}</li> : ''}
                            </React.Fragment>
                        ))}
                    </ul>
                </React.Fragment>
            );
        } else {
            return (
                <div className='d-flex justify-content-center align-items-center' style={{ height: '100%', width: '100%' }}>
                    <p>No upcoming vacations</p>
                </div>
            );
        }
    }
    convertDateToString(Start) {
        var date = Start[0] + "-";
        if (parseInt(Start[1] / 10) !== 0) {
            date = date + Start[1] + '-';
        } else {
            date = date + '0' + Start[1] + '-';
        }
        if (parseInt(Start[2] / 10) !== 0) {
            date = date + Start[2];
        } else {
            date = date + '0' + Start[2];
        }
        return date;
    }
    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    render() {
        return (
            <div className='px-1'>
                <h4>Upcoming Vacation days</h4>
                <div style={{ border: '1px solid rgba(0,0,0,0.3)', borderRadius: '3px', height: '200px', overflowY: 'auto' }}>
                    {this.showVacations()}
                </div>
            </div>
        );
    }
}

export default NextVacationList;