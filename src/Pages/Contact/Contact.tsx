import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Contact.css";

export default function Contact(): JSX.Element {
	return (
		<Container id="Contact">
			<Row className="justify-content-center my-5">
				<Col xs={4} className="bg-dark text-light text-center py-4 br-10">
					<h1>Contact Information</h1>
					<p>
						Email Address: austin.bray77@gmail.com
						<br />
						<br />
						Github: <a href="https://github.com/AustinBray77">AustinBray77</a>
						<br />
						<br />
						LinkedIn:{" "}
						<a href="https://www.linkedin.com/in/austin-bray-63061522b/">
							Austin Bray
						</a>
					</p>
				</Col>
			</Row>
		</Container>
	);
}
