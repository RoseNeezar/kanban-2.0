import AuthRoute from "@pages/Auth/AuthRoute";
import Login from "@pages/Auth/Login.modal";
import Home from "@pages/Home/Home.page";
import Landing from "@pages/Landing/Landing.page";
import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const App: React.FC = () => {
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
        <Route path="/landing" element={<Landing />} />
        <Route
          path="/home"
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />
        <Route path="/" element={<Navigate replace to="/home" />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/login"
            element={<Login isOpen={!!state?.backgroundLocation} />}
          />
        </Routes>
      )}
    </React.Suspense>
  );
};

export default App;
