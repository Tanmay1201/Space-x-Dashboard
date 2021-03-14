import './App.css';
import Header from "./Components/Header"
import Data_Table from "./Components/Data_Table"
import Store from "./Store/Store"
import {Provider} from "react-redux"
function App() {
  return (
    <Provider store={Store}>
      <Header />
      <Data_Table />
    </Provider>
  );
}

export default App;
