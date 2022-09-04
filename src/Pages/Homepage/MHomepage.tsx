import React from "react";
import { Container, Row } from "react-bootstrap";
import "./MHomepage.css";
import HPCard from "./HPCard";

export default function MHomepage(): JSX.Element {
	console.log("here");

	return (
		<Container id="MHomepage">
			<Row className="justify-contenct-center">
				<HPCard>
					<h1>Welcome To Austin's Website</h1>
					<p>
						This website is a hub for viewing all of my projects and progress in
						the field of computer science. Through this, I hope to give you a
						look at what I am capable of and what I could possibly do for you.
					</p>
				</HPCard>
			</Row>
			<Row className="justify-contenct-center">
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
			<Row className="justify-contenct-center">
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
			</Row>
			<Row className="justify-contenct-center">
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
			</Row>
		</Container>
	);
}
