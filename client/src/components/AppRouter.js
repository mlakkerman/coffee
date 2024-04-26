import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import { ALLEVENTS_ROUTE } from "../utils/consts";

const AppRouter = () => {
    const isAuth = false;
    return (
        <div>
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
        </Routes>
        </div>  
    );
};

export default AppRouter;