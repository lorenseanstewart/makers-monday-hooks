1. Brief intro
2. useState as first example

# General

-   Hooks "hook into" various React functionality.
-   Hooks are opt-in. You do not _have_ to use hooks.
-   The React team has no plans to remove class components.
-   Function components that use hooks can be used side-by-side with class components.
-   Traditional React concepts are still valid using hooks
    -   props
    -   state
    -   refs
    -   context
    -   lifecycle methods (although hooks combines and simplifies these methods)
-   Hooks eliminate the need for Higher Order Components (HOCs), and render props. Both of these patterns produces needless wrappers that create "wrapper hell" in React Dev Tools.
-   When using hooks you will never need to use `this`.
-   Easier to learn than component classes.
-   The React team claims functional components that use hooks are easier to optimize and compile down to a smaller size than class components.
-

# useRef

# Gotchas

-   Hooks are executed in the order they are declared in a component.
-   Hooks run only at the top level of a function. That means you cannot use hooks in:

    -   nested functions
    -   loops
    -   conditionals

-   Here is an example of using a hook inside a conditional. This will throw an error.

```javascript
// This copied from the Hooks documentation
// 🔴 We're breaking the first rule by using a Hook in a condition
if (name !== "") {
    useEffect(function persistForm() {
        localStorage.setItem("formData", name);
    });
}
```

-   Hooks can only be used in function components, never in class components.
-   They can only be used in a React component. You cannot use hooks in a regular .js file with a regular javascript function.
    -   But you can my _custom hooks_. These will live outside a component, and may be imported to be used.

---

# Introduction

As of React version 16.8, we have a new way to write components.

Previously we could write:

1. **Class components**, which give you access to all of React's functionality (state, lifecycle methods, etc.)
2. **(Stateless) functional components**

-   which are lightweight components that accept props and render JSX.
-   but there's no state and no lifecycle methods in these function components.

**Hooks** combines these two types of components. You can have the functionality of a class component along with the smaller/optimized compilation of function components.

If you really like function components with hooks, there is no reason you have to ever write a class component again.

If you're not already accustomed to class components, I'm guessing that function components with hooks maybe easier to learn.

# (Slide 1) This is a list of all the Hooks available

Today I'm only goint to discuss `useState`, `useEffect`, and `useRef` today. But,as you can see, there's quite a few more hooks to take advantage of.

---

-   Until the release of Hooks, function components were often referred to as "statelss functional components". That's not the case anymore! Function components can pull in state by using the `useState` hook.

-   In function components, the values of variables in the function body are flushed every time the function is called. The `useState` hook lets you preserved component state across renders.

# (Slides 2 - 4) Introducing useState

-   Calling `useState` returns the initial value you give it, as well as a setter function (slide)

-   There is an important difference between `this.setState`, and `useState`. The former merges data, the later replaces data.

# (Slides 5 - 9)

Before I go into any detail, let's compare a class component with a function component that uses a very basic hooks, `useState`.

# Show Demo App

The code shown in the slides is taken from this demo app. The functionality is the same, and, to be honest the components aren't very different. useState by itself if great, but it's not too different than React as we've always known it.

# (Slide 10) useEffect

With `useEffect`, we start to see some more interesting uses of hooks.

`useEffect` is the hook to use whenever you're performing _actions with "side effects"_.

# Slide 11 (side effect examples)

For example: 
    - data fetching 
    - DOM manipulation outside of React's control 
    - Subscribing to events or web sockets

```javascript
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
            setUserList(response);
        };
        fetchUsers();
    }, []);

    // return JSX derived from the userList state
    return (
        <React.Fragment>
            <h2>GitHub User List</h2>
            <ul>
                {userList.map(user => (
                    <li key={user.id}>{user.login}</li>
                ))}
            </ul>
        </React.Fragment>
    );
}
```

-   useEffect is run after every render.
    -   Watch out for infinite renders that will crash your browser (the same kind of browser crasing that happens with a bad `componentDidUpdate` method).

*   `useEffect` combines the functionality of `componentDidMount`, `componentWillUnmount` and `componentDidUpdate`.

-   You can customized when a `useEffect` function will run by adding a second argument to the function.

    -   `useEffect(() => someFunction(), [])`: The empty brakets mean run on `componentDidMount` and `componentWillUnmount`.
    -   `useEffect(() => someFunction(), [userObject.name])`: will run on `componentDidMount`, `componentWillUnmount`, and whenever `useObject.name` changes (like a very simplified `componentDidUpdate`).

-   Every render, the effect function (1st arg of useEffect) is replaced with a new copy. Each new copy "belongs" to that render.

### useEffect clean up function

-   `useEffect` returns a clean up function. Put any logic that you previously would put in `componentWillUnmount` here.
    -   Data fetching, DOM manipulation, and logging do not require cleaning up.
    -   The clean up function should remove subscriptions, event listeners, etc.

*   The clean up function can be an arrow function, anonymous function, or named function.

-   A component can have as many `useEffect` as you would like, so keep your concerns separated (i.e. keep your unrelated logic separated).

*   `useEffect` functions are executed in the order that they are declared. Keep in mind, they are also asychronous.
