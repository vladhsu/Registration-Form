// Importing necessary hooks and modules from react and react-router-dom
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Importing the CSS for the Hello component
import "./styles/hello.css";

// Defining the Hello component
const Hello = () => {
    // Using the useLocation hook to get the state passed in the navigation
    const { state } = useLocation();
    // Using the useNavigate hook for navigation
    const navigate = useNavigate();

    // Function to handle the click of the back button
    const handleBackClick = () => navigate('/');

    // If there is no state (i.e., the user is not authorized), render the Unauthorized message
    if(!state){
        return (
            <div className="greetingContainer">
                <h1 className="greetingTitle redTitle">Unauthorized</h1>
                <button onClick={handleBackClick} aria-label="Logout" className="logoutButton">Logout</button>
            </div>
        );
    }

    // Destructuring the username from the state
    const { username } = state;

    // Rendering the greeting message
    return (
        <div className="greetingContainer">
            <h1 className="greetingTitle">Hello, {username}!</h1>
            <button onClick={handleBackClick} aria-label="Logout" className="logoutButton">Logout</button>
        </div>
    );
}

// Exporting the Hello component
export default Hello;
