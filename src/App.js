import './App.css';
import Header from "./Components/Header"
import Data_Table from "./Components/Data_Table"
import Store from "./Store/Store"
import Modal from '../src/Components/Modal'
import {
  Route,
} from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux"
function App() {
  return (
     <Router>
      <Provider store={Store}>
        <Header />
        <Route path='/' component={Data_Table} />
        <Route path=':page' component={Data_Table} />
          
          <Modal />
      </Provider>
    </Router>
  );
}

export default App;
