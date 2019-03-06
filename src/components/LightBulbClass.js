import React, { Component } from "react";
import LightBulbSVG from "./LightBulbSVG";

export default class LightBulbClass extends Component {
    state = {
        isOn: false
    };
    handleLightSwitch = () => {
        this.setState({ isOn: !this.state.isOn });
    };
    render() {
        const color = this.state.isOn ? "orange" : "black";
        return (
            <div
                className="dark-container"
                onClick={this.handleLightSwitch}>
                <h1 style={{ color: "#eee" }}>Light Bulb Class</h1>
                <LightBulbSVG color={color} />
            </div>
        );
    }
}
