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
						<h3 className={"list-item anim-speed-1  fly-in-left"}>
							Multiple Years Experience in many promenient languages
						</h3>
						<h3 className={"list-item anim-speed-2  fly-in-left"}>
							Multiple Years Experience using industry standard source control
							and development tools.
						</h3>
						<h3 className={"list-item anim-speed-3  fly-in-left"}>
							Experience developing many different project types
						</h3>
						<h3 className={"list-item anim-speed-4  fly-in-left"}>
							Expert communication and coperative skills allow me to create your
							project your way
						</h3>
						<h3 className={"list-item anim-speed-5 fly-in-left"}>
							Low price for expert level value!
						</h3>
					</Row>
				</Col>
				<Col xs={6}>
					<Row className="justify-content-center">
						<img
							src="../Freelance/csharp.png"
							className={"anim-speed-1 fade-in"}
						/>
						<img
							src="../Freelance/cpp.png"
							className={"anim-speed-1 fade-in"}
						/>
						<img src="../Freelance/ts.png" className={"anim-speed-1 fade-in"} />
						<img src="../Freelance/js.png" className={"anim-speed-1 fade-in"} />
					</Row>
					<Row className="justify-content-center">
						<img
							src="../Freelance/java.png"
							className={"anim-speed-2 margin-slide-down m-25"}
						/>
						<img
							src="../Freelance/py.png"
							className={"anim-speed-2 margin-slide-down m-25"}
						/>
						<img
							src="../Freelance/gh.png"
							className={"anim-speed-2 margin-slide-down m-25"}
						/>
						<img
							src="../Freelance/git.png"
							className={"anim-speed-2 margin-slide-down m-25"}
						/>
					</Row>
					{/*<Row className="justify-content-center">
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
	</Row>*/}
				</Col>
			</Row>
		</Container>
	);
};

export default Freelance;
