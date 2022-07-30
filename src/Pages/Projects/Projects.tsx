import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Projects.css";

const ProjRow = (props: {
	children: JSX.Element | JSX.Element[];
	title: string;
	img: string;
}) => {
	return (
		<Row className="p-5">
			<div className="br-15 bg-dark text-info p-5">
				<Row>
					<Col sm={12} md={6}>
						<h1 className="text-center">{props.title}</h1>
						{props.children}
					</Col>
					<Col sm={12} md={6} className="img-col position-relative text-center">
						<img src={props.img} className="rounded img-fluid" />
					</Col>
				</Row>
			</div>
		</Row>
	);
};

export default function Projects(): JSX.Element {
	return (
		<Container id="Projects">
			<ProjRow title="Block Snake 2D" img="/blcksnk.png">
				<p>
					Block Snake 2D is my first major Unity project coded in C#. The goal
					of this project was to see through the full publication of an app on a
					major distrubting platform (google play store) and to develop a game
					for android through Unity, which I had not done before. I believe I
					was successful in both of these goals and it really taught me alot
					about how much it actaully takes to make a fully functioning app and
					how to push it to production. To download and play Block Snake 2D ,
					click{" "}
					<a href="https://play.google.com/store/apps/details?id=com.SixBeachesGaming.BlockSnake2D">
						here
					</a>
					. To see the source code for this project, go to the source code page.
				</p>
			</ProjRow>
			<ProjRow title="Conway's Game Of Life" img="/gameoflife(temp).png">
				<p>
					A replication of conway's game of life was another one of my major
					projects. I used to C++ and the WIN 32 Api for windows to create this
					project. My goal from this project was to learn more about object
					oriented C++ and the WIN 32 Api, which I believe I was successful in
					doing. To use this project simply go to the{" "}
					<a href="/download">downloads</a> page and download it from there, it
					is only available for windows computers.
				</p>
			</ProjRow>
			<ProjRow title="Chess In The library" img="/citl.png">
				<p>
					<a href="https://www.chessinthelibrary.com">
						Chees In The Library.com
					</a>{" "}
					is a wordpress site used to manage a chess club in Toronto. I am not
					the creator of this site but I have been the manager of it since
					August 2021. This is not a paid position as I am working as a
					volunteer. Through this I have learned alot about wordpress as well as
					managing and hosting a website.
				</p>
			</ProjRow>
			<ProjRow title="Algorithm Visualizer" img="/algovisualizer.png">
				<p>
					Algorithm Visualizer is a visual grid interface allowing beginner
					students to learn about how different search algorithms work. I used
					React and Typescript to create this project. My goal with this project
					was to practice different search algorithms and learning about
					creating a practical user interface. To use this project, click{" "}
					<a href="/projects/algo">here</a>. To see the source code for this
					project, visit the <a href="/download">downloads</a> page.
				</p>
			</ProjRow>
			<ProjRow title="Totris" img="/algovisualizer.png">
				<p>
					Totris is a different spin on the popular game Tetris. I used React
					and Typescript to create this project. My goal with this project to
					learn about creating an interactable system in react as well as
					different algorithms reloving around the game. To use this project,
					click <a href="/projects/totris">here</a>. To see the source code for
					this project, visit the <a href="/download">downloads</a> page.
				</p>
			</ProjRow>
			<ProjRow title="Web Testing Software" img="/mern.jpeg">
				<p>
					I have created software for managing and testing live production sites
					of a large corporation. This software was made using node.js, react,
					and javascript. My goal with this project was to create reliable
					software, learn how to use the fetch api, and to create a project
					based on a clients demands. I believe all of these goals were well
					met. This software is currently not publically available.
				</p>
			</ProjRow>
		</Container>
	);
}
