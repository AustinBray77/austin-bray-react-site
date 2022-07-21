import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { convertToObject } from "typescript";
import { create2DArr, delay } from "../../../functions";

type TotrisState = {
	grid: number[][];
};

const size = 75;
const height = 20;
const width = 10;

const patterns = [
	[
		[true, true, true],
		[true, true, true],
		[true, true, true],
	],
	[
		[true, true, true],
		[false, false, true],
		[false, false, true],
	],
	[
		[false, true, false],
		[true, true, true],
		[false, true, false],
	],
	[[true], [true], [true], [true], [true]],
];

class Piece {
	orientation: number;
	pattern: boolean[][];
	posX: number;
	posY: number;
	type: number;

	constructor(type: number) {
		this.orientation = 0;
		this.pattern = patterns[type];
		this.type = type;
		this.posY = -1;
		this.posX = 3;

		console.log(type);

		this.getOccupyingSquares = this.getOccupyingSquares.bind(this);
	}

	getOccupyingSquares(): number[][] {
		let output: number[][] = [];

		for (let i: number = 0; i < this.pattern[0].length; i++) {
			for (let j: number = 0; j < this.pattern.length; j++) {
				if (this.pattern[j][i]) {
					switch (this.orientation) {
						case 0:
							output.push([this.posY + j, this.posX + i]);
							break;
						case 1:
							output.push([
								this.posY + i,
								this.posX + this.pattern[0].length - 1 - j,
							]);
							break;
						case 2:
							output.push([
								this.posY + this.pattern[0].length - 1 - j,
								this.posX + this.pattern.length - 1 - i,
							]);
							break;
						case 3:
							output.push([
								this.posY + this.pattern.length - 1 - i,
								this.posX + j,
							]);
							break;
					}
				}
			}
		}

		return output;
	}

	getStoppingPattern(): number[][] {
		let output: number[][] = [];

		if (this.orientation == 0) {
			for (let i: number = 0; i < this.pattern[0].length; i++) {
				for (let j: number = this.pattern.length - 1; j >= 0; j--) {
					if (this.pattern[j][i]) {
						output.push([this.posY + j + 1, this.posX + i]);
						break;
					}
				}
			}
		} else if (this.orientation == 1) {
			for (let i: number = 0; i < this.pattern.length; i++) {
				for (let j: number = this.pattern[0].length - 1; j >= 0; j--) {
					if (this.pattern[i][j]) {
						output.push([
							this.posY + i + 1,
							this.posX + this.pattern[0].length - 1 - j,
						]);
						break;
					}
				}
			}
		} else if (this.orientation == 2) {
			for (let i: number = 0; i < this.pattern[0].length; i++) {
				for (let j: number = 0; j < this.pattern.length; j++) {
					if (this.pattern[j][i]) {
						output.push([
							this.posY + this.pattern.length - j,
							this.posX + this.pattern[0].length - 1 - i,
						]);
						break;
					}
				}
			}
		} else {
			for (let i: number = 0; i < this.pattern.length; i++) {
				for (let j: number = 0; j < this.pattern[0].length; j++) {
					if (this.pattern[i][j]) {
						output.push([this.posY + this.pattern.length - i, this.posX + j]);
						break;
					}
				}
			}
		}

		return output;
	}
}

export default class Totris extends React.Component<any, TotrisState> {
	speed = 400;
	colors: string[] = [
		"#f8f9fa",
		"#212529",
		"#198754",
		"#0d6efd",
		"#ffc107",
		"#dc3545",
		"#20c997",
	];

	curPiece: Piece = new Piece(Math.floor(Math.random() * patterns.length));
	constructor(props: TotrisState) {
		super(props);
		this.state = {
			grid: create2DArr<number>(height, width, 0),
		};

		this.render = this.render.bind(this);
		this.drawTiles = this.drawTiles.bind(this);
		this.renderBoard = this.renderBoard.bind(this);
		this.gameLoop = this.gameLoop.bind(this);
		this.keyPressHandler = this.keyPressHandler.bind(this);

		this.gameLoop();
	}

	drawTiles(): JSX.Element[] {
		const { grid }: TotrisState = this.state;

		let output: JSX.Element[] = [];

		for (let i: number = 0; i < height; i++) {
			for (let j: number = 0; j < width; j++) {
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
		let gridDataX: string = "",
			gridDataY: string = "";

		for (let i: number = 0; i < width; i++) {
			gridDataX += ((size - 0.2 * (height - 1)) / height).toString() + "vh ";
		}

		for (let i: number = 0; i < height; i++) {
			gridDataY += ((size - 0.2 * (height - 1)) / height).toString() + "vh ";
		}

		return (
			<div
				style={{
					width: size.toString() + "vh",
					height: size.toString() + "vh",
					gridTemplateRows: gridDataY,
					gridTemplateColumns: gridDataX,
				}}
				className="grid-container"
			>
				{this.drawTiles()}
			</div>
		);
	}

	async gameLoop(): Promise<void> {
		while (true) {
			let newGrid: number[][] = this.state.grid;

			await delay(this.speed);

			if (this.curPiece.posY > -1) {
				let positions: number[][] = this.curPiece.getOccupyingSquares();

				for (let j: number = 0; j < positions.length; j++) {
					newGrid[positions[j][0]][positions[j][1]] = 0;
				}
			}

			this.curPiece.posY++;

			{
				let positions: number[][] = this.curPiece.getOccupyingSquares();

				for (let j: number = 0; j < positions.length; j++) {
					newGrid[positions[j][0]][positions[j][1]] = this.curPiece.type + 2;
				}
			}

			await this.setState(() => {
				return {
					grid: newGrid,
				};
			});

			let stoppingPattern: number[][] = this.curPiece.getStoppingPattern();

			for (let j: number = 0; j < stoppingPattern.length; j++) {
				if (stoppingPattern[j][0] >= height || stoppingPattern[j][1] >= width) {
					/*await this.setState(() => {
						return {
							this.curPiece: new Piece(0),
						};
					});*/
					this.curPiece = new Piece(
						Math.floor(Math.random() * patterns.length)
					);
					console.log("new piece made at" + this.curPiece.posY);
					break;
				}

				let k: number = 0;

				while (newGrid[stoppingPattern[j][0]][stoppingPattern[j][1]] != 0) {
					/*await this.setState(() => {
						return {
							this.curPiece: new Piece(0),
						};
					});*/

					if (k >= 3) {
						this.curPiece = new Piece(
							Math.floor(Math.random() * patterns.length)
						);
						break;
					}
					k++;
				}

				if ((this.curPiece.posY = -1)) {
					break;
				}
			}
		}
	}

	keyPressHandler(event: React.KeyboardEvent<HTMLDivElement>): void {
		console.log(event.code);
		if (event.code == "KeyD") {
			if (this.curPiece.posX < width - 1) {
				const { grid }: TotrisState = this.state;
				{
					let positions: number[][] = this.curPiece.getOccupyingSquares();

					for (let j: number = 0; j < positions.length; j++) {
						grid[positions[j][0]][positions[j][1]] = 0;
					}
				}

				this.curPiece.posX++;

				{
					let positions: number[][] = this.curPiece.getOccupyingSquares();

					for (let j: number = 0; j < positions.length; j++) {
						grid[positions[j][0]][positions[j][1]] = this.curPiece.type + 2;
					}
				}

				this.setState(() => {
					return { grid: grid };
				});
			}
		}
		if (event.code == "KeyA") {
			if (this.curPiece.posX > 0) {
				const { grid }: TotrisState = this.state;
				{
					let positions: number[][] = this.curPiece.getOccupyingSquares();

					for (let j: number = 0; j < positions.length; j++) {
						grid[positions[j][0]][positions[j][1]] = 0;
					}
				}

				this.curPiece.posX--;

				{
					let positions: number[][] = this.curPiece.getOccupyingSquares();

					for (let j: number = 0; j < positions.length; j++) {
						console.warn(positions[j][0]);
						grid[positions[j][0]][positions[j][1]] = this.curPiece.type + 2;
					}
				}

				this.setState(() => {
					return { grid: grid };
				});
			}
		}
		if (event.code == "ArrowRight") {
			const { grid }: TotrisState = this.state;
			{
				let positions: number[][] = this.curPiece.getOccupyingSquares();

				for (let j: number = 0; j < positions.length; j++) {
					console.warn(positions[j][0]);
					grid[positions[j][0]][positions[j][1]] = 0;
				}
			}

			this.curPiece.orientation++;

			if (this.curPiece.orientation > 3) this.curPiece.orientation = 0;

			{
				let positions: number[][] = this.curPiece.getOccupyingSquares();

				for (let j: number = 0; j < positions.length; j++) {
					grid[positions[j][0]][positions[j][1]] = this.curPiece.type + 2;
				}
			}

			this.setState(() => {
				return { grid: grid };
			});
		}
	}

	render(): JSX.Element {
		return (
			<Container id="Totris" tabIndex={0} onKeyDown={this.keyPressHandler}>
				<Row className="text-center">
					<Col className="text-center" xs={12}>
						{this.renderBoard()}
					</Col>
				</Row>
			</Container>
		);
	}
}
