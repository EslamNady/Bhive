import React, { Component } from 'react';
class Holiday extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    removeHoliDay() {
        this.props.fireDB.child("Holidays/" + this.props.date).remove();
    }
    render() {
        return (<React.Fragment>
            <li className="list-group-item">
                <div className="row">
                    <div className="col-2 text-center" style={{ borderRight: "1px solid black" }}>
                        <strong className="text-danger">{this.props.date}</strong>
                    </div>
                    <div className="col-8 pl-2 text-nowrap" style={{ overflowX: "auto" }}>
                        {this.props.name}
                    </div>
                    <div className="col-2 text-right">
                        <strong onClick={this.removeHoliDay.bind(this)} style={{ cursor: "pointer" }}>×</strong>
                    </div>
                </div>
            </li>
        </React.Fragment>);
    }
}

export default Holiday;