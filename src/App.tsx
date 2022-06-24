import React from "react";
import {
	Route,
	Routes as Switch,
	BrowserRouter as Router,
} from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Navbar from "./Navbar";
import Projects from "./Pages/Projects/Projects";

export default function App(): JSX.Element {
	return (
		<div id="app">
			<Router>
				<Navbar />
				<Switch>
					<Route path="/projects" element={<Projects />} />
					<Route path="/" element={<Homepage />} />
				</Switch>
			</Router>
		</div>
	);
}
