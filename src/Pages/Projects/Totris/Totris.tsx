import React from "react";
import { Container } from "react-bootstrap";
import { create2DArr, delay } from "../../../functions";

type TotrisState = {
	grid: number[][];
};

const size = 75;
const height = 20;
const width = 4;

export default class Totris extends React.Component<any, TotrisState> {
	colors: string[] = [
		"#f8f9fa",
		"#212529",
		"#198754",
		"#0d6efd",
		"#ffc107",
		"#dc3545",
		"#20c997",
	];
	speed = 200;
	constructor(props: TotrisState) {
		super(props);
		this.state = {
			grid: create2DArr<number>(height, width, 0),
		};

		this.render = this.render.bind(this);
		this.drawTiles = this.drawTiles.bind(this);
		this.renderBoard = this.renderBoard.bind(this);
	}

	drawTiles(): JSX.Element[] {
		const { grid }: TotrisState = this.state;

		let output: JSX.Element[] = [];

		for (let i: number = 0; i < 20; i++) {
			for (let j: number = 0; j < 4; j++) {
				output.push(
					<div
						style={{
							backgroundColor: this.colors[grid[i][j]],
							border: "none",
						}}
					></div>
				);
			}
		}

		return output;
	}

	renderBoard(): JSX.Element {
		let gridData: string = "";

		for (let i: number = 0; i < 20; i++) {
			for (let j: number = 0; j < 4; j++) {
				gridData += (size - (0.2 * (height - 1)) / height).toString();
			}
		}

		return (
			<div
				style={{
					width: size.toString() + "vh",
					height: size.toString() + "vh",
					gridTemplateRows: gridData,
					gridTemplateColumns: gridData,
				}}
				className="grid-container"
			>
				{this.drawTiles()}
			</div>
		);
	}

	async gameLoop(): Promise<void> {
		while (true) {
			await delay(this.speed);
		}
	}

	render(): JSX.Element {
		return (
			<Container id="Totris">
				<div id="Board">{this.renderBoard()}</div>
			</Container>
		);
	}
}
