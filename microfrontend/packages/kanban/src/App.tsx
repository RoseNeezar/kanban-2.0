import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./app/pages/Home/Home.page";

const App: React.FC<{ routePrefix: string }> = ({ routePrefix }) => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    const el = document.querySelector(".overlay");
    // @ts-ignore
    el.style.display = "none";
  }, []);
  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <Routes location={state?.backgroundLocation || location}>
        <Route path={`${routePrefix}/kanban`} element={<Home />} />
        <Route path={`${routePrefix}/kanban/epic`} element={<h1>Epic</h1>} />
        <Route
          path="/"
          element={<Navigate replace to={`${routePrefix}/kanban`} />}
        />
      </Routes>
      {/* {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/login"
            element={<Login isOpen={!!state?.backgroundLocation} />}
          />
        </Routes>
      )} */}
    </React.Suspense>
  );
};

export default App;
