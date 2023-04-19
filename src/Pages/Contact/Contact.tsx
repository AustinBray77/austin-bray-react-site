import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Contact.css";
import Typewriter from "../../Typewriter";

export default function Contact(): JSX.Element {
	return (
		<Container id="Contact">
			<Row style={{ marginTop: "200px" }}>
				<Col className="bg-pitch p-5 text-light" xs={12}>
					<h1>
						<Typewriter text={"Contact Information:"} speed={100} />
					</h1>
					<button
						onClick={() => {
							navigator.clipboard.writeText("austin.bray77@gmail.com");
						}}
						className="fly-in-left"
					>
						<img src="../Contact/email-icon.png" />
					</button>
					<a
						href="https://github.com/AustinBray77"
						className="margin-slide-right anim-speed-2"
					>
						<img src="../Freelance/gh.png" />
					</a>
					<a
						href="https://www.linkedin.com/in/austin-bray-63061522b/"
						className="margin-slide-right anim-speed-3"
					>
						<img src="../Contact/linkedin-icon.png" />
					</a>
					<a
						href="https://www.paypal.com/donate/?business=M9JLUXRAW3GKS&no_recurring=0&item_name=Help+keep+Austin+Bray+.com+free+by+donating+to+help+with+development+and+server+costs.&currency_code=CAD"
						className="margin-slide-right anim-speed-4"
					>
						<img src="../Contact/paypal-icon.png" />
					</a>
				</Col>
			</Row>
		</Container>
	);
}
