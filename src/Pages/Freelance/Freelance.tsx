import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Freelance.css";

const Freelance = (): JSX.Element => {
	return (
		<Container id="Freelance">
			<Row
				className="bg-pitch p-5 text-light content"
				style={{ marginTop: "10vh" }}
			>
				<Col xs={6}>
					<Row>
						<h1>Why Austin?</h1>
						<h3 className={"list-item anim-speed-1  fly-in-left"}>Line 1</h3>
						<h3 className={"list-item anim-speed-2  fly-in-left"}>Line 2</h3>
						<h3 className={"list-item anim-speed-3  fly-in-left"}>Line 3</h3>
						<h3 className={"list-item anim-speed-4  fly-in-left"}>Line 4</h3>
						<h3 className={"list-item anim-speed-5 fly-in-left"}>Line 5</h3>
					</Row>
				</Col>
				<Col xs={6}>
					<Row className="justify-content-center">
						<img src="wawa.jpg" className={"anim-speed-1 fade-in"} />
						<img src="wawa.jpg" className={"anim-speed-1 fade-in"} />
						<img src="wawa.jpg" className={"anim-speed-1 fade-in"} />
						<img src="wawa.jpg" className={"anim-speed-1 fade-in"} />
					</Row>
					<Row className="justify-content-center">
						<img
							src="wawa.jpg"
							className={"anim-speed-2 margin-slide-down m-25"}
						/>
						<img
							src="wawa.jpg"
							className={"anim-speed-2 margin-slide-down m-25"}
						/>
						<img
							src="wawa.jpg"
							className={"anim-speed-2 margin-slide-down m-25"}
						/>
						<img
							src="wawa.jpg"
							className={"anim-speed-2 margin-slide-down m-25"}
						/>
					</Row>
					<Row className="justify-content-center">
						<img
							src="wawa.jpg"
							className={"anim-speed-3 margin-slide-down m-25"}
						/>
						<img
							src="wawa.jpg"
							className={"anim-speed-3 margin-slide-down m-25"}
						/>
						<img
							src="wawa.jpg"
							className={"anim-speed-3 margin-slide-down m-25"}
						/>
						<img
							src="wawa.jpg"
							className={"anim-speed-3 margin-slide-down m-25"}
						/>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default Freelance;
