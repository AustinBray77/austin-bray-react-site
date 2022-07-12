import React from "react";
import { Col } from "react-bootstrap";

export default function HPCard(props: {
	children: JSX.Element | JSX.Element[];
}): JSX.Element {
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
}
