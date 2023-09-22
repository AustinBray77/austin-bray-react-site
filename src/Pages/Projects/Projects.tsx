import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Projects.css";

enum ContentState {
	Hidden = "hidden",
	Show = "fly-in-top",
	Hide = "fly-out-top",
}

type DropdownState = {
	contentState: ContentState;
	setContentState: React.Dispatch<React.SetStateAction<ContentState>>;
	activeDropdown: number;
	setActiveDropdown: React.Dispatch<React.SetStateAction<number>>;
	activeRowReference: React.RefObject<HTMLDivElement>;
};

const Dropdown = (props: {
	children: JSX.Element[];
	title: string;
	state: DropdownState;
	index: number;
}): JSX.Element => {
	if (props.state.contentState.toString() == "fly-out-top") {
		setTimeout(() => {
			props.state.setContentState(ContentState.Hidden);
			props.state.setActiveDropdown(-1);
		}, 1000);
	}

	const [animatedHeight, setAnimatedHeight] = useState(0);
	const [firstCall, setFirstCall] = useState(true);

	const animateDown = () => {
		if (
			props.state.activeRowReference == null ||
			props.state.activeRowReference.current == null
		) {
			return;
		}

		if (firstCall) {
			setFirstCall(false);
			setAnimatedHeight(
				props.state.activeRowReference.current.clientHeight - 200
			);
		}

		if (animatedHeight < 0) {
			setAnimatedHeight(0);
			return;
		}

		let speed: number =
			(props.state.activeRowReference.current.clientHeight - 200) / 200;

		const timeoutId = setTimeout(() => {
			setAnimatedHeight((value) => value - speed);
		}, 1);

		return () => {
			clearTimeout(timeoutId);
		};
	};

	const animateUp = () => {
		if (
			props.state.activeRowReference == null ||
			props.state.activeRowReference.current == null
		) {
			return;
		}

		if (firstCall) {
			setFirstCall(false);
			setAnimatedHeight(0);
		}

		if (
			animatedHeight >
			props.state.activeRowReference.current.clientHeight - 200
		) {
			setAnimatedHeight(0);
			return;
		}

		let speed: number =
			(props.state.activeRowReference.current.clientHeight - 200) / 200;

		const timeoutId = setTimeout(() => {
			setAnimatedHeight((value) => value + speed);
		}, 1);

		return () => {
			clearTimeout(timeoutId);
		};
	};

	useEffect(() => {
		if (
			props.state.activeDropdown >= props.index ||
			props.state.activeDropdown == -1 ||
			props.state.activeRowReference == null ||
			props.state.activeRowReference.current == null
		) {
			setFirstCall(true);
			return;
		}

		if (props.state.contentState == ContentState.Show) animateDown();
		else animateUp();
	}, [props.state.activeDropdown, animatedHeight]);

	console.log(animatedHeight);

	return (
		<Row
			className={"text-pl anim-speed-1 dropdown-row"}
			style={{
				transform: "translateY(" + -animatedHeight + "px)",
			}}
			ref={
				props.state.activeDropdown == props.index
					? props.state.activeRowReference
					: null
			}
		>
			<button
				className="bg-pd btn text-pl p-5"
				onClick={() => {
					if (props.state.contentState.toString() == "hidden") {
						props.state.setContentState(ContentState.Show);
						props.state.setActiveDropdown(props.index);
					} else if (props.state.contentState.toString() == "fly-in-top") {
						props.state.setContentState(ContentState.Hide);
					}
				}}
				style={{ zIndex: "10" }}
			>
				<Row>
					<Col xs={12} md={6}>
						<h1 className="display-1">{props.title}</h1>
					</Col>
					<Col xs={12} md={6}>
						<h1 className="display-1">+</h1>
					</Col>
				</Row>
			</button>
			<div
				className={
					props.state.activeDropdown == props.index
						? props.state.contentState
						: "hidden"
				}
				style={{
					padding: 0,
					zIndex: "1",
				}}
			>
				{props.children}
			</div>
		</Row>
	);
};

const ProjRow = (props: {
	children: JSX.Element | JSX.Element[];
	title: string;
	img: string;
	topRow?: boolean;
}): JSX.Element => {
	return (
		<Row>
			<div className="p-5 bg-pd text-pl">
				<Row>
					<Col sm={12} md={6}>
						<h1 className="text-start text-sl">{props.title}</h1>
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
	const [contentState, setContentState] = useState(ContentState.Hidden);
	const [activeDropdown, setActiveDropdown] = useState(-1);

	let dropDownState = {
		contentState: contentState,
		setContentState: setContentState,
		activeDropdown: activeDropdown,
		setActiveDropdown: setActiveDropdown,
		activeRowReference: useRef<HTMLDivElement>(null),
	};

	return (
		<Container id="Projects">
			<Dropdown title="Game Dev" state={dropDownState} index={0}>
				<ProjRow title="Block Snake 2D" img="/blcksnk.png">
					<p>
						Block Snake 2D is my first major Unity project coded in C#. The goal
						of this project was to see through the full publication of an app on
						a major distrubting platform (google play store) and to develop a
						game for android through Unity, which I had not done before. I
						believe I was successful in both of these goals and it really taught
						me alot about how much it actaully takes to make a fully functioning
						app and how to push it to production. To download and play Block
						Snake 2D , click{" "}
						<a href="https://play.google.com/store/apps/details?id=com.SixBeachesGaming.BlockSnake2D">
							here
						</a>
						. To see the source code for this project, go to the source code
						page.
					</p>
				</ProjRow>
				<ProjRow title="Conway's Game Of Life" img="/gameoflife(temp).png">
					<p>
						A replication of conway's game of life was another one of my major
						projects. I used to C++ and the WIN 32 Api for windows to create
						this project. My goal from this project was to learn more about
						object oriented C++ and the WIN 32 Api, which I believe I was
						successful in doing. To use this project simply go to the{" "}
						<a href="/download">downloads</a> page and download it from there,
						it is only available for windows computers.
					</p>
				</ProjRow>
			</Dropdown>
			<Dropdown title="Web Dev" state={dropDownState} index={1}>
				<ProjRow title="Chess In The library" img="/citl.png">
					<p>
						<a href="https://www.chessinthelibrary.com">
							Chees In The Library.com
						</a>{" "}
						is a wordpress site used to manage a chess club in Toronto. I am not
						the creator of this site but I have been the manager of it since
						August 2021. This is not a paid position as I am working as a
						volunteer. Through this I have learned alot about wordpress as well
						as managing and hosting a website.
					</p>
				</ProjRow>
				<ProjRow title="Algorithm Visualizer" img="/algovisualizer.png">
					<p>
						Algorithm Visualizer is a visual grid interface allowing beginner
						students to learn about how different search algorithms work. This
						also includes a visualization for a custom maze generation
						algorithm. I used React and Typescript to create this project. My
						goal with this project was to practice different search algorithms
						and learning about creating a practical user interface. To use this
						project, click <a href="/projects/algo">here</a>. To see the source
						code for this project, visit the <a href="/download">downloads</a>{" "}
						page.
					</p>
				</ProjRow>
			</Dropdown>
			<Dropdown title="Other Apps" state={dropDownState} index={2}>
				<ProjRow title="Pathfinding AI" img="/AI.png">
					<p>
						For my grade 11 physics class, I was instructed to create an
						experiment which incorporated the concepts of physics for a science
						fair. What my partner and I decided to do was create a machine
						learning algorithm and see if it could solve for the brachistochrone
						curve. We accomplished this by placing it in an environment where
						there was a ball and an endpoint, and the goal of the AI was to draw
						a path or ramp that would cause the ball to reach the endpoint. If
						the AI worked correctly this would eventually result in the
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
				<ProjRow title="RSD-Viewer (Password Manager 2.0)" img="/rsd_icon.png">
					<p>
						To expand my knowledge base, I decided to rebuild my original
						password viewer project in the tauri framework. For the back end
						rust was used as is standard with tauri apps, for the front end I
						used React JS, Typescript, and tailwind which was new for me.
						Through this I learned more about front and back end communication,
						building windows apps and installers, as well as Rust and tailwind.
						The app is currently under LTS and still has active updates, to
						download or view the source code, visit the{" "}
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
			</Dropdown>
		</Container>
	);
}
