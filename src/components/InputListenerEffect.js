import React, { useEffect, useRef, useState } from "react";

export default function InputListenerEffect() {
    const [message, setMessage] = useState("");
    const inputRef = useRef(); // useRef

    const handleInputChange = e => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        // LOGIC
        inputRef.current.focus(); // basic example of useRef
        console.log("mounted input");
        document
            .querySelector(".input")
            .addEventListener("input", handleInputChange);

        // CLEAN UP FUNCTION
        return () => {
            console.log("unmounting input...");
            document
                .querySelector(".input")
                .removeEventListener("input", handleInputChange);
        };

        // ? THE ARRAY ARGUMENT BELOW
        // * (1) An empty array means run the effect on MOUNT and UNMOUNT. 

        // * (2) Any additional properties in the array mean 
        // *        it will run MOUNT, UNMOUNT, and whenever 
        // *        the PROPERTIES CHANGE.

        // * (3) If you use an outside function you must add 
        // *     it as a dependency in this array.
    }, [handleInputChange]);

    return (
        <div>
            <input ref={inputRef} className="input" type="text" />
            <p className="input-message">{message}</p>
        </div>
    );
}
