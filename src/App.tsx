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
import Contact from "./Pages/Contact/Contact";
import { Container } from "react-bootstrap";
import Encryptor from "./Pages/Projects/Encryptor/Encryptor";
//import Totris from "./Pages/Projects/Totris/Totris";
//import Blog from "./Pages/Blog/Blog";
import Footer from "./Footer";
import AboutMe from "./Pages/AboutMe/AboutMe";
import DecompressionQuiz from "./Pages/Projects/DecompressionQuiz/DecompressionQuiz";
import Freelance from "./Pages/Freelance/Freelance";

function PageNotFound(): JSX.Element {
	document.title = "Page Not Found";

	return (
		<Container id="PageNotFound" className="text-center bg-pl">
			<h1 className="text-pd">The page you are looking for does not exist.</h1>
		</Container>
	);
}

export default function App(): JSX.Element {
	document.title = "Welcome to Austin's Website!";

	return (
		<div id="app">
			<Router>
				<Navbar />
				<Switch>
					<Route index element={<Homepage />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/projects/algo" element={<AlgorithmVisualizer />} />
					<Route path="/projects/encryptor" element={<Encryptor />} />
					<Route
						path="/projects/decompression-quiz"
						element={<DecompressionQuiz />}
					/>
					{/*<Route path="/projects/totris" element={<Totris />} />*/}
					<Route path="/download" element={<Download />} />
					<Route path="/contact" element={<Contact />} />
					{/*<Route path="/blog" element={<Blog />} />
					<Route path="/blog/:article" element={<Blog />} />*/}
					<Route path="/about-me" element={<AboutMe />} />
					<Route path="/freelance" element={<Freelance />} />
					<Route path="*" element={<PageNotFound />} />
				</Switch>
				<Footer />
			</Router>
		</div>
	);
}
