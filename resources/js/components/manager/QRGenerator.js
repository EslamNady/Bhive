import React, { Component } from 'react';
import ReactDOM from "react-dom";
import QRCode from 'qrcode.react'
import * as firebase from "firebase";
class QRGenerator extends Component {
    constructor(props) {
        super(props);

        var config = {
            apiKey: "AIzaSyAdoW2AdbGL1ml7v2PZ7d4Urt3LPPQ1dx8",
            authDomain: "bhive-7020b.firebaseapp.com",
            databaseURL: "https://bhive-7020b.firebaseio.com",
            projectId: "bhive-7020b",
            storageBucket: "bhive-7020b.appspot.com",
            messagingSenderId: "889361602878"
        };

        firebase.initializeApp(config);

        this.state = {
            QrValue: " "
        }
    }
    componentWillMount() {
        axios.get("/getCurrentTime").then(response => {
            this.setState({
                QrValue: response.data.toLowerCase()
            });
            firebase.database().ref().child('sysDate').set(response.data.toLowerCase());
            console.log(response.data)
        });
        setInterval(() => {

            axios.get("/getCurrentTime").then(response => {
                // console.log(response.data.substring(0, response.data.indexOf('.')));
                this.setState({
                    QrValue: response.data.toLowerCase()
                });
                firebase.database().ref().child('sysDate').set(response.data.toLowerCase());
                console.log(response.data)
            });

        }, 60 * 1000);



    }
    render() {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ "height": "100vh" }}>

                <QRCode value={this.state.QrValue} size={300} bgColor="rgba(255,255,255,0.2)" />
            </div >

        );
    }
}

export default QRGenerator;
if (document.getElementById("QR-container")) {
    ReactDOM.render(
        <QRGenerator />,
        document.getElementById("QR-container")
    );
}