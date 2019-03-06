import React, { Component } from "react";
import InputListenerEffect from "./components/InputListenerEffect";
import LightBulbClass from "./components/LightBulbClass";
import LightBulbHooks from "./components/LightBulbHooks";
import UserList from "./components/UserList";
import "./index.css";

class App extends Component {
    state = {
        mountInput: false
    };
    handleMountInput = () => {
        this.setState({
            mountInput: !this.state.mountInput
        });
    };
    render() {
        return (
            <div className="makers-demo">
                <LightBulbHooks />
                <LightBulbClass />
                <hr />
                <UserList />
                <hr />
                <h2>This is NOT how you should handle an input!</h2>
                But it's good for demonstrating <pre>useEffect</pre>
                <div className="input-box">
                    <button onClick={this.handleMountInput}>
                        {this.state.mountInput ? `Unmount ` : `Mount `}Input
                    </button>
                    {this.state.mountInput && <InputListenerEffect />}
                </div>
            </div>
        );
    }
}

export default App;
