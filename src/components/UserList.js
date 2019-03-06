import React, { useEffect, useState } from "react";

export default function UserList() {

    // * state variable and state setter function for user data
    const [userList, setUserList] = useState([]);

    // * define dependent functions within useEffect
    // ! useEffect itself can't be async, but can use async functions within
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("https://api.github.com/users")
                .then(
                    res => res.json()
                );
            setUserList(response.slice(0, 10));
        };
        fetchUsers();
    }, []);

    return (
        <div className="dark-container">
            <h2>GitHub User List (<pre style={{color: "#6E6E6E"}}>useEffect</pre>)</h2>
            <ul>
                {userList.map(user => (
                    <li key={user.id}>{user.login}</li>
                ))}
            </ul>
        </div>
    );
}
