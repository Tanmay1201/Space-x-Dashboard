import './App.css';
import Header from "./Components/Header"
import Data_Table from "./Components/Data_Table"
import Store from "./Store/Store"
import Modal from '../src/Components/Modal'
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom'
import { Provider } from "react-redux"
function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Header />
          <Switch>
            <Route path={'/data'} component={Data_Table} />
          </Switch>
        <Modal />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
