import React, { Component } from "react";
import Request from './Request'
class VacationRequests extends Component {
    constructor(props) {
        super(props);


        this.state = { fireDB: "", requests: {} }

    }
    componentWillMount() {
        // this.setState({ fireDB: firebase.database().ref() });
        this.props.fireDB.child('vacationRequests/requests').on('value', (snap) => {
            this.setState({ requests: snap.val() }, () => {
                console.log(this.state.requests);
            })
        })
    }
    showRequests() {
        if (!this.isEmpty(this.state.requests)) {
            return (
                <React.Fragment>
                    <hr />
                    <h4>Vacation requests</h4>
                    <ul className="list-group">
                        {Object.keys(this.state.requests).map((key, i) => (
                            <Request key={i} requestInfo={this.state.requests[key]} empID={key} fireDB={this.props.fireDB} />
                        ))}
                    </ul>
                </React.Fragment>
            );
        }
    }
    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    render() {
        return (<div className="my-2">
            {this.showRequests()}
        </div>);
    }
}

export default VacationRequests;