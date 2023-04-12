import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import CardDetail from "./components/CardDetail/CardDetail";
import Form from "./components/Form/Form";
import NotPath from "./components/NotPath/NotPath";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="*" element={<NotPath />} />
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/detail/:id" element={<CardDetail />} />
        <Route exact path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
