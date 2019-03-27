import React from "react";
import ReactDOM from "react-dom";
import DatePicker from "./components/DatePicker";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <DatePicker />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
