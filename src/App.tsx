import React from "react";
import {
	Route,
	Routes as Switch,
	BrowserRouter as Router,
} from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import MHomepage from "./Pages/Homepage/MHomepage";
import Navbar from "./Navbar";
import Projects from "./Pages/Projects/Projects";
import Download from "./Pages/Download/Download";
import AlgorithmVisualizer from "./Pages/Projects/AlgoritmVisualizer/AlgorithmVisualizer";
import Contact from "./Pages/Contact/Contact";
import { Container } from "react-bootstrap";
import Encryptor from "./Pages/Projects/Encryptor/Encryptor";
import Totris from "./Pages/Projects/Totris/Totris";
import Blog from "./Pages/Blog/Blog";
import Footer from "./Footer";
import AboutMe from "./Pages/AboutMe/AboutMe";

function PageNotFound(): JSX.Element {
	return (
		<Container id="PageNotFound" className="text-center bg-light">
			<h1>The page you are looking for does not exist.</h1>
		</Container>
	);
}

const isMobile = (): boolean => {
	return window.innerWidth < window.innerHeight;
};

export default function App(): JSX.Element {
	document.title = "Austin Bray's React Site";

	return (
		<div id="app">
			<Router>
				<Navbar />
				<Switch>
					<Route index element={isMobile() ? <MHomepage /> : <Homepage />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/projects/algo" element={<AlgorithmVisualizer />} />
					<Route path="/projects/encryptor" element={<Encryptor />} />
					<Route path="/projects/totris" element={<Totris />} />
					<Route path="/download" element={<Download />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/blog/:article" element={<Blog />} />
					<Route path="/about-me" element={<AboutMe />} />
					<Route path="*" element={<PageNotFound />} />
				</Switch>
				<Footer />
			</Router>
		</div>
	);
}
