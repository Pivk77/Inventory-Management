import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import FindPage from "./Pages/FindPage";
import InsertPage from "./Pages/InsertPage";

function App() {
  return (
    <Routes>
      <Route path='*' element={<Navigate to='/home' />} />
      <Route exact path="/home" Component={HomePage} />
      <Route exact path="/find" Component={FindPage} />
      <Route exact path="/insert" Component={InsertPage} />
    </Routes>
  );
}

export default App;
