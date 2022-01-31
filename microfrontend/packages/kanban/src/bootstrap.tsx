import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import CustomRouter from "./app/utils/CustomRouter";
import GlobalStyles from "./styles/GlobalStyles";
import "react-toastify/dist/ReactToastify.min.css";
import { store } from "@store/store";
import { Provider } from "react-redux";

export const useHistory = createBrowserHistory();

const useMount = (
  el: ReactDOM.Container,
  routePrefix: string,
  useRemoteStore: any
) => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <GlobalStyles />
        <ToastContainer position="top-right" hideProgressBar />
        <CustomRouter history={useHistory}>
          <App routePrefix={routePrefix} useRemoteStore={useRemoteStore} />
        </CustomRouter>
      </Provider>
    </React.StrictMode>,
    el
  );
};

const devRoot = document.querySelector("#_kanban-root");

if (devRoot) {
  useMount(devRoot, "app", null);
}

export { useMount };
