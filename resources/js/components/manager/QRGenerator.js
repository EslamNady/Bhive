import React, { Component } from 'react';
import ReactDOM from "react-dom";
import QRCode from 'qrcode.react'
class QRGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            QrValue: " "
        }
    }
    componentWillMount() {
        axios.get("/getCurrentTime").then(response => {
            this.setState({
                QrValue: response.data.toLowerCase()
            });
            console.log(response.data)
        });
        setInterval(() => {

            axios.get("/getCurrentTime").then(response => {
                // console.log(response.data.substring(0, response.data.indexOf('.')));
                this.setState({
                    QrValue: response.data.toLowerCase()
                });
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