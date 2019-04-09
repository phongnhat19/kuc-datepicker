import React from "react";
import ReactDOM from "react-dom";
import {Calendar} from "./DatePicker";

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
			<div className="date-time-container">
				<Calendar date={this.state.date} />
				<button
					style={{
						position: 'absolute',
						right: '30px'
					}}
					onClick={()=>{
						this.setState({
							date: new Date(this.state.date.setDate(this.state.date.getDate()+1))
						})
					}}
				>
					test
				</button>
			</div>
		</div>
		);
	}
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
