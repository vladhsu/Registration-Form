import React from "react";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Form from "./form";
import Hello from "./hello";
function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/hello" element={<Hello/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;