import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import CustomRouter from "./app/utils/CustomRouter";
import GlobalStyles from "./styles/GlobalStyles";
import "react-toastify/dist/ReactToastify.min.css";

export const useHistory = createBrowserHistory();

const useMount = (
  el: ReactDOM.Container,
  routePrefix: string,
  authStore: any
) => {
  ReactDOM.render(
    <React.StrictMode>
      <GlobalStyles />
      <ToastContainer position="top-right" hideProgressBar />
      <CustomRouter history={useHistory}>
        <App routePrefix={routePrefix} />
      </CustomRouter>
    </React.StrictMode>,
    el
  );
};

const devRoot = document.querySelector("#_kanban-root");

if (devRoot) {
  useMount(devRoot, "app", null);
}

// We are running through root app
// and we should export the mount function
export { useMount };
