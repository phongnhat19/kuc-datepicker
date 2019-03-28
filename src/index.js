import React from "react";
import ReactDOM from "react-dom";
import DatePicker from "./DatePicker";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }
  onChange = (date) => {
    this.setState({date})
  }
  render(){
    return (
      <div className="App">
        <DatePicker date={this.state.date} onChange={this.onChange}/>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
