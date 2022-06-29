import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Projects.css";

const ProjRow = (props: {
	children: JSX.Element | JSX.Element[];
	title: string;
	img: string;
}) => {
	return (
		<Row>
			<div className="my-5 p-5 bg-dark text-info br-15">
				<h1>{props.title}</h1>
				<Row>
					<Col sm={12} md={6}>
						{props.children}
					</Col>
					<Col sm={12} md={6}>
						<img src={props.img} className="rounded img-fluid" />
					</Col>
				</Row>
			</div>
		</Row>
	);
};

export default function Projects(): JSX.Element {
	return (
		<div id="Projects">
			<Container>
				<ProjRow
					title="Block Snake 2D"
					img="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
				>
					<p>
						Block Snake 2D is my first major Unity project coded in C#. The goal
						of this project was to see through the full publication of an app on
						a major distrubting platform (google play store) and to develop a
						game for android through Unity, which I had not done before. I
						believe I was successful in both of these goals and it really taught
						me alot about how much it actaully takes to make a fully functioning
						app and how to push it to production. To download and play Block
						Snake 2D , click <a href="www.googleplaystore.com/">here</a>. To see
						the source code for this project, go to the source code page.
					</p>
				</ProjRow>
				<ProjRow
					title="Conway's Game Of Life"
					img="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
				>
					<p>
						A replication of conway's game of life was another one of my major
						projects. I used to C++ and the WIN 32 Api for windows to create
						this project. My goal from this project was to learn more about
						object oriented C++ and the WIN 32 Api, which I believe I was
						successful in doing. To use this project simply go to the downloads
						page and download it from there, it is only available for windows
						computers.
					</p>
				</ProjRow>
				<ProjRow
					title="Algorithm Visualizer"
					img="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
				>
					<p></p>
				</ProjRow>
				<ProjRow
					title="Web Testing Software"
					img="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
				>
					<p></p>
				</ProjRow>
			</Container>
		</div>
	);
}
