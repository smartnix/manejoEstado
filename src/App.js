import { UseReducer } from "./Reducer/UseReducer";
import { ClassState } from "./components/ClassState";
import { UseState } from "./components/UseState";
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="UseState"/>
      <UseReducer name = "Class Reducer"/>
    </div>
  );
}

export default App;
