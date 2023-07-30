import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { relogin } from "./actions/userData/user.js";
import routes from "./routes.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(relogin());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.index && (
              <Route index={route.index} element={route.element} />
            )}
            {route.children &&
              route.children.map((childRoute, childIndex) => (
                <Route
                  index={childRoute.index}
                  key={childIndex}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
