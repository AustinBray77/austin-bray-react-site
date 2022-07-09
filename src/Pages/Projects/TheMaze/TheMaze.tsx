import React from "react";
import { Container, Row } from "react-bootstrap";

type MazeProps = {};

type MazeState = {
	posX: number;
	posY: number;
	grid: number[][];
};

//empty undiscovered/filled start/character finish
const gridColors: string[] = ["", "", "", ""];

export default class TheMaze extends React.Component {
	constructor(props: MazeProps) {
		super(props);
	}

	createGrid(size: number): JSX.Element {
		return (
			<div>
				<p></p>
			</div>
		);
	}

	render(): JSX.Element {
		return (
			<Container id="TheMaze">
				<Row></Row>
			</Container>
		);
	}
}
