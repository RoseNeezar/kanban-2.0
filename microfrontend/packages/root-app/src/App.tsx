import AuthRoute from "@pages/Auth/AuthRoute";
import Login from "@pages/Auth/Login.modal";
import Register from "@pages/Auth/Register.modal";
import Home from "@pages/Home/Home.page";
import Landing from "@pages/Landing/Landing.page";
import NotFound from "@pages/NotFound/NotFound";
import { useAuthStore } from "@store/useAuth.store";
import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const Kanban = React.lazy(() => import("./app/remote/Kanban.remote"));
// const Game = React.lazy(() => import("./app/remote/Game.remote"));

const App: React.FC = () => {
  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };
  const { getMe } = useAuthStore();
  useEffect(() => {
    const el = document.querySelector(".overlay");
    // @ts-ignore
    el.style.display = "none";
    getMe();
  }, []);
  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/landing" element={<Landing />} />
        <Route
          path="app"
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        >
          <Route path="kanban/*" element={<Kanban />} />
          {/* <Route path="game/*" element={<Game />} /> */}
          <Route path="/app" element={<Navigate replace to="kanban" />} />
        </Route>
        <Route path="/" element={<Navigate replace to="/app/kanban" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/login"
            element={<Login isOpen={!!state?.backgroundLocation} />}
          />
          <Route
            path="/register"
            element={<Register isOpen={!!state?.backgroundLocation} />}
          />
        </Routes>
      )}
    </React.Suspense>
  );
};

export default App;
