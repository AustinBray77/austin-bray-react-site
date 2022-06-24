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
			<div className="my-5 p-5 bg-dark text-info">
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
					<p>Block Snake 2D is my first major Unity project coded in C#</p>
				</ProjRow>
			</Container>
		</div>
	);
}
