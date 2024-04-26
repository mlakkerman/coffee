import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {Spinner} from "react-bootstrap";

const App = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
