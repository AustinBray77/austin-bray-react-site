import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Freelance.css";

const Freelance = (): JSX.Element => {
	const [hasLoaded, setHasLoaded] = useState(false);

	setTimeout(() => {
		setHasLoaded(true);
	}, 1);

	return (
		<Container id="Freelance">
			<Row
				className="bg-pitch p-5 text-light content"
				style={{ marginTop: "10vh" }}
			>
				<Col xs={6}>
					<Row>
						<h1>Why Austin?</h1>
						<h3
							className={
								"list-item anim-speed-1 " +
								(hasLoaded ? "fly-in" : "hidden-anim-left")
							}
						>
							Line 1
						</h3>
						<h3
							className={
								"list-item anim-speed-2 " +
								(hasLoaded ? "fly-in" : "hidden-anim-left")
							}
						>
							Line 2
						</h3>
						<h3
							className={
								"list-item anim-speed-3 " +
								(hasLoaded ? "fly-in" : "hidden-anim-left")
							}
						>
							Line 3
						</h3>
						<h3
							className={
								"list-item anim-speed-4 " +
								(hasLoaded ? "fly-in" : "hidden-anim-left")
							}
						>
							Line 4
						</h3>
						<h3
							className={
								"list-item anim-speed-5 " +
								(hasLoaded ? "fly-in" : "hidden-anim-left")
							}
						>
							Line 5
						</h3>
					</Row>
				</Col>
				<Col xs={6}>
					<Row className="justify-content-center">
						<img
							src="wawa.jpg"
							className={
								"anim-speed-1 " +
								(hasLoaded ? "margin-slide-down" : "hidden-anim-slide-down")
							}
						/>
						<img
							src="wawa.jpg"
							className={
								"anim-speed-1 " +
								(hasLoaded ? "margin-slide-down" : "hidden-anim-slide-down")
							}
						/>
						<img
							src="wawa.jpg"
							className={
								"anim-speed-1 " +
								(hasLoaded ? "margin-slide-down" : "hidden-anim-slide-down")
							}
						/>
						<img
							src="wawa.jpg"
							className={
								"anim-speed-1 " +
								(hasLoaded ? "margin-slide-down" : "hidden-anim-slide-down")
							}
						/>
					</Row>
					<Row className="justify-content-center">
						<img
							src="wawa.jpg"
							className={
								"anim-speed-2 " +
								(hasLoaded ? "margin-slide-down" : "hidden-anim-slide-down")
							}
						/>
						<img
							src="wawa.jpg"
							className={
								"anim-speed-2 " +
								(hasLoaded ? "margin-slide-down" : "hidden-anim-slide-down")
							}
						/>
						<img
							src="wawa.jpg"
							className={
								"anim-speed-2 " +
								(hasLoaded ? "margin-slide-down" : "hidden-anim-slide-down")
							}
						/>
						<img
							src="wawa.jpg"
							className={
								"anim-speed-2 " +
								(hasLoaded ? "margin-slide-down" : "hidden-anim-slide-down")
							}
						/>
					</Row>
					<Row className="justify-content-center">
						<img
							src="wawa.jpg"
							className={
								"anim-speed-3 " +
								(hasLoaded ? "margin-slide-down" : "hidden-anim-slide-down")
							}
						/>
						<img
							src="wawa.jpg"
							className={
								"anim-speed-3 " +
								(hasLoaded ? "margin-slide-down" : "hidden-anim-slide-down")
							}
						/>
						<img
							src="wawa.jpg"
							className={
								"anim-speed-3 " +
								(hasLoaded ? "margin-slide-down" : "hidden-anim-slide-down")
							}
						/>
						<img
							src="wawa.jpg"
							className={
								"anim-speed-3 " +
								(hasLoaded ? "margin-slide-down" : "hidden-anim-slide-down")
							}
						/>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default Freelance;
