import React from "react";
import { Col, Container, Row } from "react-bootstrap";
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
	[[true]],
	[[true], [true], [true], [true], [true]],
	[
		[true, false],
		[true, true],
	],
	[
		[true, false, true],
		[true, true, true],
	],
	[[true, true, true]],
	[
		[true, true, true],
		[false, true, false],
		[false, true, false],
	],
	[
		[true, true, true],
		[true, true, true],
	],
];

class Piece {
	_orientation: number;
	_pattern: boolean[][];
	_occupyingSquares: number[][];
	_stoppingPattern: number[][][];
	_posX: number;
	_posY: number;
	_type: number;
	_canMove: boolean;

	constructor(type: number) {
		this._orientation = 0;
		this._pattern = patterns[type];
		this._type = type;
		this._posY = -1;
		this._posX = 3;
		this._canMove = true;

		this.calcOccupyingSquares = this.calcOccupyingSquares.bind(this);
		this.calcStoppingPattern = this.calcStoppingPattern.bind(this);

		this._occupyingSquares = this.calcOccupyingSquares();
		this._stoppingPattern = this.calcStoppingPattern();
	}

	calcOccupyingSquares(): number[][] {
		let output: number[][] = [];

		for (let i: number = 0; i < this._pattern[0].length; i++) {
			for (let j: number = 0; j < this._pattern.length; j++) {
				if (this._pattern[j][i]) {
					switch (this._orientation) {
						case 0:
							output.push([this._posY + j, this._posX + i]);
							break;
						case 1:
							output.push([
								this._posY + i,
								this._posX + this._pattern.length - 1 - j,
							]);
							break;
						case 2:
							output.push([
								this._posY + this._pattern.length - 1 - j,
								this._posX + this._pattern[0].length - 1 - i,
							]);
							break;
						case 3:
							output.push([
								this._posY + this._pattern[0].length - 1 - i,
								this._posX + j,
							]);
							break;
					}
				}
			}
		}

		return output;
	}

	calcStoppingPattern(): number[][][] {
		let right: number[][] = [];
		let left: number[][] = [];
		let down: number[][] = [];

		if (this._orientation == 0) {
			for (let i: number = 0; i < this._pattern.length; i++) {
				for (let j: number = 0; j < this._pattern[0].length; j++) {
					if (this._pattern[i][j]) {
						right.push([this._posY + i, this._posX + j - 1]);
						break;
					}
				}
			}

			for (let i: number = 0; i < this._pattern[0].length; i++) {
				for (let j: number = this._pattern.length - 1; j >= 0; j--) {
					if (this._pattern[j][i]) {
						down.push([this._posY + j + 1, this._posX + i]);
						break;
					}
				}
			}

			for (let i: number = 0; i < this._pattern.length; i++) {
				for (let j: number = this._pattern[0].length; j >= 0; j--) {
					if (this._pattern[i][j]) {
						left.push([this._posY + i, this._posX + j + 1]);
						break;
					}
				}
			}
		} else if (this._orientation == 1) {
			for (let i: number = 0; i < this._pattern.length; i++) {
				for (let j: number = this._pattern[0].length - 1; j >= 0; j--) {
					if (this._pattern[i][j]) {
						down.push([
							this._posY + j + 1,
							this._posX + this._pattern.length - 1 - i,
						]);
						break;
					}
				}
			}
		} else if (this._orientation == 2) {
			for (let i: number = 0; i < this._pattern[0].length; i++) {
				for (let j: number = 0; j < this._pattern.length; j++) {
					if (this._pattern[j][i]) {
						down.push([
							this._posY + this._pattern.length - j,
							this._posX + this._pattern[0].length - 1 - i,
						]);
						break;
					}
				}
			}
		} else {
			for (let i: number = 0; i < this._pattern.length; i++) {
				for (let j: number = 0; j < this._pattern[0].length; j++) {
					if (this._pattern[i][j]) {
						down.push([
							this._posY + this._pattern[0].length - j,
							this._posX + i,
						]);
						break;
					}
				}
			}
		}

		return [right, down, left];
	}

	getSide(x: number, y: number): number {
		return x < 0 ? 0 : y > 0 ? 1 : 2;
	}

	getPattern(): boolean[][] {
		return this._pattern;
	}

	getOrientation(): number {
		return this._orientation;
	}

	getOccupyingSquares(): number[][] {
		return this._occupyingSquares;
	}

	getStoppingPattern(): number[][][] {
		return this._stoppingPattern;
	}

	getPosX(): number {
		return this._posX;
	}

	getPosY(): number {
		return this._posY;
	}

	getType(): number {
		return this._type;
	}

	getCanMove(): boolean {
		return this._canMove;
	}

	_updateGrid(grid: number[][]): number[][] {
		if (this._posY > 0) {
			for (let i: number = 0; i < this._occupyingSquares.length; i++) {
				grid[this._occupyingSquares[i][0]][this._occupyingSquares[i][1]] = 0;
			}
		}

		this._occupyingSquares = this.calcOccupyingSquares();
		this._stoppingPattern = this.calcStoppingPattern();

		console.log(this._stoppingPattern);

		for (let i: number = 0; i < this._occupyingSquares.length; i++) {
			grid[this._occupyingSquares[i][0]][this._occupyingSquares[i][1]] =
				this._type + 1;
		}

		return grid;
	}

	move(x: number, y: number, grid: number[][]): number[][] {
		if (
			this._posX + x < 0 ||
			(this._posX + x + this._pattern[0].length - 1 >= width &&
				this._orientation % 2 == 0) ||
			(this._posX + x + this._pattern.length - 1 >= width &&
				this._orientation % 2 != 0) ||
			this._posY + y < 0
		) {
			return grid;
		}

		if (
			(this._posY + y + this._pattern.length - 1 >= height &&
				this._orientation % 2 == 0) ||
			(this._posY + y + this._pattern[0].length - 1 >= height &&
				this._orientation % 2 != 0)
		) {
			this._canMove = false;
			return grid;
		}

		let side: number = this.getSide(x, y);

		for (let i: number = 0; i < this._stoppingPattern[side].length; i++) {
			if (this._stoppingPattern[side][i][0] > height) {
				this._canMove = false;
				return grid;
			}

			if (
				grid[this._stoppingPattern[side][i][0]][
					this._stoppingPattern[side][i][1]
				] != 0
			) {
				console.log(
					`Value at stop ${
						grid[this._stoppingPattern[side][i][0]][
							this._stoppingPattern[side][i][0]
						]
					}`
				);
				this._canMove = false;
				return grid;
			}
		}

		this._posX += x;
		this._posY += y;

		console.log(`Moving by: (${x},${y})`);

		return this._updateGrid(grid);
	}

	rotate(dir: number, grid: number[][]): number[][] {
		this._orientation += dir;

		if (this._orientation > 3) this._orientation = 0;
		if (this._orientation < 0) this._orientation = 3;

		return this._updateGrid(grid);
	}
}

export default class Totris extends React.Component<any, TotrisState> {
	speed = 400;
	colors: string[] = [
		"#f8f9fa",
		"#198754",
		"#0d6efd",
		"#ffc107",
		"#dc3545",
		"#20c997",
		"#fd7e14",
		"#d63384",
		"#6610f2",
		"#6f42c1",
	];

	pieceCounter: number = 0;
	curPiece: Piece = this.newPiece();
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

	newPiece(): Piece {
		return new Piece(Math.floor(Math.random() * patterns.length));
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
			await delay(this.speed);

			await this.setState((state) => {
				return {
					grid: this.curPiece.move(0, 1, state.grid),
				};
			});

			if (!this.curPiece.getCanMove()) {
				//Check for line breaks
				let lines: number[][] = this.curPiece.getOccupyingSquares();

				for (let i: number = 0; i < lines.length; i++) {
					let breakLine = true;

					for (let j: number = 0; j < width; j++) {
						if (this.state.grid[lines[i][0]][j] == 0) {
							breakLine = false;
							break;
						}
					}

					if (breakLine) {
						for (let j: number = lines[i][0]; j > 0; j--) {
							for (let k: number = 0; k < width; k++) {
								this.state.grid[j][k] = this.state.grid[j - 1][k];
							}
						}

						for (let j: number = 0; j < width; j++) {
							this.state.grid[0][j] = 0;
						}

						for (let j: number = i + 1; j < lines.length; j++) {
							if (lines[j][0] == lines[i][0]) {
								lines.splice(j, 1);
							} else if (lines[j][0] < lines[i][0]) {
								lines[j][0]++;
							}
						}
					}
				}

				console.log(`Spawn Piece: ${++this.pieceCounter}`);
				this.curPiece = this.newPiece();
			}
		}
	}

	keyPressHandler(event: React.KeyboardEvent<HTMLDivElement>): void {
		console.log(event.code);
		console.log(event.code.substring(0, 5));

		if (this.curPiece.getPosY() < 0) return;

		if (event.code == "KeyD") {
			if (this.curPiece.getPosX() < width - 1) {
				this.setState((state) => {
					return { grid: this.curPiece.move(1, 0, state.grid) };
				});
			}
		} else if (event.code == "KeyA") {
			if (this.curPiece.getPosX() > 0) {
				this.setState((state) => {
					return { grid: this.curPiece.move(-1, 0, state.grid) };
				});
			}
		} else if (event.code.substring(0, 5) == "Arrow") {
			this.setState((state) => {
				return {
					grid: this.curPiece.rotate(
						event.code.substring(5) == "Right" ? 1 : -1,
						state.grid
					),
				};
			});
		} else if (event.code == "KeyS") {
			this.setState((state) => {
				return { grid: this.curPiece.move(0, 1, state.grid) };
			});
		}
	}

	render(): JSX.Element {
		document.title = "Totris by Austin Bray";

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
