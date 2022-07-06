import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Contact.css";

export default function Contact(): JSX.Element {
	return (
		<Container id="Contact" className="bg-light">
			<Row className="justify-content-center">
				<Col xs={4} className="bg-dark text-light text-center py-5">
					<h1>Contact Information</h1>
					<p>
						Email Address: austin.bray77@gmail.com
						<br />
						Phone Number: +1 (647) 982-3309
					</p>
				</Col>
			</Row>
		</Container>
	);
}
