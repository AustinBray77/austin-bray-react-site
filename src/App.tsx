import React from "react";
import {
	Route,
	Routes as Switch,
	BrowserRouter as Router,
} from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Navbar from "./Navbar";
import Projects from "./Pages/Projects/Projects";
import Download from "./Pages/Download/Download";

export default function App(): JSX.Element {
	return (
		<div id="app">
			<Router>
				<Navbar />
				<Switch>
					<Route path="/projects" element={<Projects />} />
					<Route path="/download" element={<Download />} />
					<Route path="/" element={<Homepage />} />
				</Switch>
			</Router>
		</div>
	);
}
