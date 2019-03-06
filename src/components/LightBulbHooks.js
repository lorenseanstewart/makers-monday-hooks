import React, { useState } from "react";
import LightBulbSVG from "./LightBulbSVG";

export default function LightBulbHooks() {
    // using state in a function component, whaaaaaa?
    const [isOn, toggleIsOn] = useState(false);

    // handler function uses the state setter function
    const handleLightSwitch = () => {
        toggleIsOn(prev => !prev);
    };

    const color = isOn ? "orange" : "black";

    // notice there is not `this` attached to the click handler
    // in a class component, you would need to code `this.handleLightSwitch`
    return (
        <div 
            className="dark-container" 
            onClick={handleLightSwitch}>
            <h1 style={{ color: "#eee" }}>Light Bulb Hooks</h1>
            <LightBulbSVG color={color} />
        </div>
    );
}
