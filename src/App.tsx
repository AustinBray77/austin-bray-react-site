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
import AlgorithmVisualizer from "./Pages/Projects/AlgoritmVisualizer/AlgorithmVisualizer";

function PageNotFound(): JSX.Element {
	return (
		<div id="PageNotFound" className="text-center bg-light">
			<h1>The page you are looking for does not exist.</h1>
		</div>
	);
}

export default function App(): JSX.Element {
	return (
		<div id="app">
			<Router>
				<Navbar />
				<Switch>
					<Route index element={<Homepage />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/projects/algo" element={<AlgorithmVisualizer />} />
					<Route path="/download" element={<Download />} />
					<Route path="*" element={<PageNotFound />} />
				</Switch>
			</Router>
		</div>
	);
}
