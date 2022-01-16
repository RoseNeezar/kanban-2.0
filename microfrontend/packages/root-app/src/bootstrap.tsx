import { createBrowserHistory } from 'history'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'
import App from './App'
import CustomRouter from './app/utils/CustomRouter'
import GlobalStyles from './styles/GlobalStyles'
import 'react-toastify/dist/ReactToastify.min.css'

export const useHistory = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <ToastContainer position="top-right" hideProgressBar />
    <CustomRouter history={useHistory}>
      <App />
    </CustomRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
