import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./AboutMe.css";

const AboutMe = (): JSX.Element => {
	return (
		<Container id="AboutMe">
			<Row className="justify-content-center">
				<Col xs={8} className="bg-dark text-light">
					<div className="mb-5 text-center">
						<h1>About Me</h1>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default AboutMe;
