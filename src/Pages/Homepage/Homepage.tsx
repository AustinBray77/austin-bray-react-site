import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Homepage.css";
import HPCard from "./HPCard";
import Typewriter from "../../Typewriter";

const IntroductionRow = () => {
	return (
		<Row className="bg-pitch text-light p-5">
			<Col xs={6}>
				<h1 style={{ fontWeight: "bold" }}>
					<Typewriter text={"Welcome to Austin's Website!"} speed={150} />
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

const ProjectRow = forwardRef(
	(
		props: { startAnimation: boolean },
		ref: React.LegacyRef<HTMLDivElement>
	) => {
		return (
			<div ref={ref}>
				<Row className="bg-pitch text-light p-5">
					{props.startAnimation ? (
						<>
							{" "}
							<Col xs={6}>
								<h1 style={{ fontWeight: "bold" }}>
									<Typewriter text={"Projects"} speed={300} />
								</h1>
								<br />
								<p className="fs-4">
									<Typewriter
										text={
											"I have created many different coding projects through my 4+ years of" +
											" programming. The button below will take you to a page showing off" +
											" all of my projects."
										}
										speed={25}
									/>
								</p>
							</Col>
							<Col xs={6}>
								<Row className="fade-in justify-content-center">
									<img
										style={{
											height: "100%",
											width: "250px",
										}}
										src="./AI.png"
									/>
									<img
										style={{
											height: "100%",
											width: "250px",
										}}
										src="./algovisualizer.png"
									/>
									<img
										style={{
											height: "100%",
											width: "250px",
										}}
										src="./blcksnk.png"
									/>
									<img
										style={{
											height: "100%",
											width: "250px",
										}}
										src="./citl.png"
									/>
									<img
										style={{
											height: "100%",
											width: "250px",
										}}
										src="./psdviewer.png"
									/>
									<img
										style={{
											height: "100%",
											width: "250px",
										}}
										src="./gameoflife(temp).png"
									/>
								</Row>
							</Col>{" "}
						</>
					) : (
						""
					)}
				</Row>
			</div>
		);
	}
);

export default function Homepage(): JSX.Element {
	const ProjectsRef = useRef<HTMLDivElement>(null);
	const [animateProjectsRow, setAnimateProjectsRow] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];

			console.log(entry.isIntersecting);

			if (entry.isIntersecting) {
				setAnimateProjectsRow(true);
			}
		});

		if (ProjectsRef.current != null) {
			observer.observe(ProjectsRef.current);
		}
	});

	return (
		<Container id="Homepage">
			<div style={{ height: "100px" }}></div>

			<IntroductionRow />

			<div style={{ height: "400px" }}></div>

			<ProjectRow ref={ProjectsRef} startAnimation={animateProjectsRow} />

			<div style={{ height: "400px" }}></div>

			{/*<Row className="justify-content-center">
				<HPCard>
					<h1>Welcome To Austin's Website</h1>
					<p>
						This website is a hub for viewing all of my projects and progress in
						the field of computer science. Through this, I hope to give you a
						look at what I am capable of and what I could possibly do for you.
					</p>
				</HPCard>
				<HPCard>
					<div
						className="d-flex align-items-center justify-content-center p-4"
						style={{ minHeight: "300px" }}
					>
						<img
							className="py-4"
							style={{ height: "300px", width: "auto" }}
							src="./headshot.jpg"
						/>
					</div>
				</HPCard>
			</Row>
			<Row className="justify-content-center">
				<HPCard>
					<h1>Coding Projects</h1>
					<p style={{ paddingBottom: 60 }}>
						I have created many different coding projects through my 4+ years of
						programming. The button below will take you to a page showing off
						all of my projects.
					</p>
					<button
						className="btn btn-info bottom-banner"
						onClick={() => document.getElementById("ProjectsBTN")!.click()}
					>
						Click Here!
					</button>
				</HPCard>
				<HPCard>
					<h1>Experience And Resume</h1>
					<p style={{ paddingBottom: 60 }}>
						I have experience working with C#, C++, Java, Javascript, and
						Python, among other languages. I also have experience working with
						many different technologies involved with this languages such as
						Unity, the MERN stack, WIN32 etc.
					</p>
					<button
						className="btn btn-info bottom-banner"
						onClick={() => document.getElementById("AboutMeBTN")!.click()}
					>
						My Resume
					</button>
				</HPCard>
	</Row>*/}
		</Container>
	);
}
