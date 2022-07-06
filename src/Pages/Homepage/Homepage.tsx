import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Homepage.css";

const HPCard = (props: { children: JSX.Element | JSX.Element[] }) => {
	return (
		<Col
			sm={12}
			md={5}
			align="center"
			className="bg-dark pt-5 px-5 pb-3 m-4 text-info position-relative br-10"
		>
			{props.children}
		</Col>
	);
};

export default function Homepage(): JSX.Element {
	return (
		<Container id="Homepage">
			<Row className="justify-content-center">
				<HPCard>
					<h1>Welcome To Austin's Website</h1>
					<p>
						This website is a hub for viewing all of my projects and progress in
						the field of computer science. Through this, I hope to give you a
						look at what I am capable of and what I could possibly do for you.
					</p>
				</HPCard>
				<HPCard>
					<h1>Welcome To Austin's Website</h1>
					<p>
						This website is a hub for viewing all of my projects and progress in
						the field of computer science. Through this, I hope to give you a
						look at what I am capable of and what I could possibly do for you.
					</p>
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
						onClick={() => document.getElementById("ContactBTN")!.click()}
					>
						My Resume
					</button>
				</HPCard>
			</Row>
		</Container>
	);
}
