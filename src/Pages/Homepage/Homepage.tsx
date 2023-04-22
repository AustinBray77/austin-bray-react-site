import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Homepage.css";
import Typewriter from "../../Typewriter";

const LinkButton = (props: {
	children: string | string[] | JSX.Element | JSX.Element[];
	path: string;
}) => {
	const [isHovering, setIsHovering] = useState(false);

	const navigate = useNavigate();

	return (
		<button
			className={
				"LinkButton fs-3 text-light " + (isHovering ? "bg-lpitch" : "bg-pitch")
			}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onClick={() => navigate(props.path)}
		>
			{props.children}
		</button>
	);
};

const IntroductionRow = () => {
	return (
		<Row className="bg-pitch text-light p-5 top-content-row">
			<Col xs={6}>
				<h1 style={{ fontWeight: "bold" }}>
					<Typewriter text={"Welcome to Austin's Website!"} speed={100} />
				</h1>
				<br />
				<p className="fs-4">
					<Typewriter
						text={
							"This website is a hub for viewing all of my projects and progress in the field of computer" +
							" science. Through this, I hope to give you a look at what I am capable of and what I could" +
							" possibly do for you."
						}
						speed={25}
					/>
				</p>
			</Col>
			<Col xs={6}>
				<Row className="fade-in justify-content-center">
					<img
						style={{
							height: "250px",
							maxWidth: "250px",
						}}
						src="./headshot.jpg"
					/>
				</Row>
			</Col>
		</Row>
	);
};

const FreelanceRow = () => {
	const FreelanceRef = useRef<HTMLDivElement>(null);
	const [animateFreelanceRow, setAnimateFreelanceRow] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			let entry = entries[0];
			if (entry.isIntersecting) {
				setAnimateFreelanceRow(true);
			}
		});

		if (FreelanceRef.current != null) {
			observer.observe(FreelanceRef.current);
		}
	}, []);

	return (
		<div ref={FreelanceRef} className="content-row">
			<Row className="bg-pitch text-light p-5">
				{animateFreelanceRow ? (
					<>
						{" "}
						<Col xs={6}>
							<h1 style={{ fontWeight: "bold" }}>
								<Typewriter text={"Your Website, Your Way"} speed={100} />
							</h1>
							<br />
							<p className="fs-4" style={{ height: "250px" }}>
								<Typewriter
									text={
										"I have plenty of experience creating various beatiful" +
										" websites for my self and for others. To learn more on what" +
										" I can do for you and the services I offer, visit my freelancing page."
									}
									speed={25}
								/>
							</p>
							<LinkButton path="/freelance">
								<Typewriter text={"See what I can do for you ->"} speed={100} />
							</LinkButton>
						</Col>
						<Col xs={6}>
							<Row className="justify-content-center fade-in">
								<img src="./citl.png" />
							</Row>
						</Col>{" "}
					</>
				) : (
					""
				)}
			</Row>
		</div>
	);
};

const ProjectRow = () => {
	const ProjectsRef = useRef<HTMLDivElement>(null);
	const [animateProjectsRow, setAnimateProjectsRow] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			let entry = entries[0];
			if (entry.isIntersecting) {
				setAnimateProjectsRow(true);
			}
		});

		if (ProjectsRef.current != null) {
			observer.observe(ProjectsRef.current);
		}
	}, []);

	return (
		<div ref={ProjectsRef} className="content-row">
			<Row className="bg-pitch text-light p-5">
				{animateProjectsRow ? (
					<>
						{" "}
						<Col xs={6}>
							<h1 style={{ fontWeight: "bold" }}>
								<Typewriter text={"Projects"} speed={100} />
							</h1>
							<br />
							<p className="fs-4" style={{ height: "350px" }}>
								<Typewriter
									text={
										"I have created many different coding projects through my 4+ years of" +
										" programming. These span from web design to game development," +
										" and from personal to paid projects. To see all of this visit the projects" +
										" page."
									}
									speed={25}
								/>
							</p>
							<LinkButton path="/projects">
								<Typewriter text={"See all of my projects ->"} speed={100} />
							</LinkButton>
						</Col>
						<Col xs={6}>
							<Row className="fade-in justify-content-center">
								<img src="./projects_back.png" />
							</Row>
						</Col>{" "}
					</>
				) : (
					""
				)}
			</Row>
		</div>
	);
};

const ExperienceRow = () => {
	const ExperienceRef = useRef<HTMLDivElement>(null);
	const [animateExperienceRow, setAnimateExperienceRow] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			let entry = entries[0];
			if (entry.isIntersecting) {
				setAnimateExperienceRow(true);
			}
		});

		if (ExperienceRef.current != null) {
			observer.observe(ExperienceRef.current);
		}
	}, []);

	return (
		<div ref={ExperienceRef} className="content-row">
			<Row className="bg-pitch text-light p-5">
				{animateExperienceRow ? (
					<>
						{" "}
						<Col xs={6}>
							<h1 style={{ fontWeight: "bold" }}>
								<Typewriter text={"Experience and Resume"} speed={100} />
							</h1>
							<br />
							<p className="fs-4" style={{ height: "350px" }}>
								<Typewriter
									text={
										"I have experience working with C#, C++, Java, Javascript, and" +
										" Python, among other languages. I also have experience working with" +
										" many different technologies involved with this languages such as" +
										" Unity, the MERN stack, WIN32 etc. To get more about my expierence" +
										" and skills check out my resume."
									}
									speed={25}
								/>
							</p>
							<LinkButton path="/about-me">
								<Typewriter text={"View more and my resume ->"} speed={100} />
							</LinkButton>
						</Col>
						<Col xs={6}>
							<Row className="fade-in justify-content-center">
								<img src="./mern.jpeg" />
							</Row>
						</Col>{" "}
					</>
				) : (
					""
				)}
			</Row>
		</div>
	);
};

export default function Homepage(): JSX.Element {
	return (
		<Container id="Homepage">
			<IntroductionRow />
			<FreelanceRow />
			<ProjectRow />
			<ExperienceRow />
		</Container>
	);
}
