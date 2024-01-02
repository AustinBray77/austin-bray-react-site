import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Freelance.css";

const Freelance = (): JSX.Element => {
	return (
		<Container id="Freelance">
			<Row className="bg-pd p-5 content" style={{ marginTop: "10vh" }}>
				<Col xs={6}>
					<Row>
						<h1>Why Austin?</h1>
						<p>
							Austin has extensive creating websites using web technology,
							including but not limited to:
							<ul>
								<li>React JS</li>
								<li>WordPress</li>
								<li>Webflow</li>
							</ul>
							This means Austin can create any site that you need! From his work
							with Chess In The Library.com for 2 years as the Senior Web Master
							To his work with Tumblewire as their current Website Developer.
							Austin can do what you need!
						</p>
						<h3>
							Want to learn more? Visit the <a href="/contact">contact</a> page
							and send me a message!
						</h3>
					</Row>
				</Col>
				<Col xs={6}>
					<Row className="justify-content-center">
						<Col xs={10}>
							<img src="../tumble.png" width={"100%"} height={300} />
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default Freelance;
