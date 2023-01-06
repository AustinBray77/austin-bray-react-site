import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Projects.css";

const ProjRow = (props: {
	children: JSX.Element | JSX.Element[];
	title: string;
	img: string;
}): JSX.Element => {
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
					students to learn about how different search algorithms work. This
					also includes a visualization for a custom maze generation algorithm.
					I used React and Typescript to create this project. My goal with this
					project was to practice different search algorithms and learning about
					creating a practical user interface. To use this project, click{" "}
					<a href="/projects/algo">here</a>. To see the source code for this
					project, visit the <a href="/download">downloads</a> page.
				</p>
			</ProjRow>
			{/* <ProjRow title="Totris" img="/totris.png">
				<p>
					Totris is a different spin on the popular game Tetris. I used React
					and Typescript to create this project. My goal with this project to
					learn about creating an interactable system in react as well as
					different algorithms reloving around the game. To use this project,
					click <a href="/projects/totris">here</a>. To see the source code for
					this project, visit the <a href="/download">downloads</a> page.
				</p>
			</ProjRow> */}
			<ProjRow title="Pathfinding AI" img="/AI.png">
				<p>
					For my grade 11 physics class, I was instructed to create an
					experiment which incorporated the concepts of physics for a science
					fair. What my partner and I decided to do was create a machine
					learning algorithm and see if it could solve for the brachistochrone
					curve. We accomplished this by placing it in an environment where
					there was a ball and an endpoint, and the goal of the AI was to draw a
					path or ramp that would cause the ball to reach the endpoint. If the
					AI worked correctly this would eventually result in the
					brachistochrone curve bein generated. Our AI was able to solve for
					something close to this, but there were some bugs in our training so
					it was imcomplete. This was accomplished using the Unity Physics
					Engine (game engine) and the TensorFlow library, and it was all done
					in C#. To see the report for this project, click{" "}
					<a href="https://docs.google.com/document/d/1WCK0FexNg3sInjDyLThfPBmfUKq7GCzCT0iAbQmWQQg/edit?usp=sharing">
						here
					</a>
					. To see the source code for this project, visit the{" "}
					<a href="/download">downloads</a> page.
				</p>
			</ProjRow>
			<ProjRow title="Password Manager" img="/psdviewer.png">
				<p>
					As a project for myself, I created a tool to manage and encrypt my
					passwords. The goal of this project was to create a secure desktop
					appliction with a practical and effective use. This was built using
					the WinForms library using the C# programming language. To use this
					project or download the source code, visit the{" "}
					<a href="/download">downloads</a> page.
				</p>
			</ProjRow>
		</Container>
	);
}
