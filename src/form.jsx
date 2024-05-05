// Importing necessary hooks and modules from react and react-router-dom
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Importing the CSS for the form
import "./styles/form.css";

// Defining the Form component
const Form = () => {
    // Using the useNavigate hook for navigation
    const navigate = useNavigate();
    // Using the useState hook to manage the form state
    const [formState, setFormState] = useState({
        email: "",
        password: "",
        username: "",
        seePassword: false,
        error: "",
        passwordLength: 0,
        passwordContainsNumber: false,
        passwordContainsSpecialCharacter: false
    });

    // Function to toggle the visibility of the password
    const handleSeePassword = (e) => {
        e.preventDefault();
        setFormState(prevState => ({ ...prevState, seePassword: !prevState.seePassword }));
    };

    // Function to validate the input fields
    const validateInput = () => {
        const { username, email, password } = formState;
        // Checking if all fields are filled
        if(username === "" || email === "" || password === ""){
            setFormState(prevState => ({ ...prevState, error: "All fields are required" }));
            return false;
        }
        // Checking if the email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            setFormState(prevState => ({ ...prevState, error: "Invalid email" }));
            return false;
        }
        // Checking if the password is valid
        if(password.length < 8 || !formState.passwordContainsNumber || !formState.passwordContainsSpecialCharacter){
            setFormState(prevState => ({ ...prevState, error: "Invalid password" }));
            return false;
        }
        return true;
    }

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!validateInput()){
            return;
        }
        // Navigating to the '/hello' route with the username as state
        navigate('/hello', { state: { username: formState.username } });
    }

    // Function to handle input change and update the form state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));

        // If the password field is being updated, update the password requirements in the state
        if(name === "password"){
            setFormState(prevState => ({ 
                ...prevState, 
                passwordLength: value.length,
                passwordContainsNumber: /\d+/g.test(value),
                passwordContainsSpecialCharacter: /[^a-zA-Z0-9]/g.test(value)
            }));
        }
    }

    // Destructuring the form state
    const { username, email, password, seePassword, error, passwordLength, passwordContainsNumber, passwordContainsSpecialCharacter } = formState;

    // Rendering the form
    return (
        <div className="mainForm">
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="usernameContainer inputContainer">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" value={username} onChange={handleInputChange} tabIndex="1" className="emailInput"/>
                </div>
                <div className="emailContainer inputContainer">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" value={email} onChange={handleInputChange} tabIndex="2" className="passwordInput"/>
                </div>
                <div className="passwordContainer inputContainer">
                    <label htmlFor="password">Password:</label>
                    <div className="passwordInputContainer">    
                        <input type={seePassword ? 'text' : 'password'} name="password" value={password} onChange={handleInputChange} tabIndex="3" className="passwordInput"/>
                        <div aria-label="Toggle password visibility" onClick={handleSeePassword} tabIndex="4" className="showPassButton">{seePassword ? 'Hide':'Show'}</div>
                    </div>
                    <br></br>
                    <p className="passwordRequirementsText">Password requirements:</p>
                    <ul className="requirementsContainer">
                        <li className={passwordLength>=8 ? "completed" : ""}>Needs to be at least 8 characters long</li>
                        <li className={passwordContainsNumber ? "completed" : ""}>Needs to contain at least one number</li>
                        <li className={passwordContainsSpecialCharacter ? "completed" : ""}>Needs to contain at one special character</li>
                    </ul>
                </div>
                {error && <div className="error">{error}</div>}
                <button aria-label="Submit" type="submit" tabIndex="5" className="submitButton">Login</button>
            </form>
        </div>
    );
};

// Exporting the Form component
export default Form;
