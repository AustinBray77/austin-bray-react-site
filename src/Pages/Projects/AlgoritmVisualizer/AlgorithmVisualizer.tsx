import React, { useEffect, useState } from "react";
import "./AlgorithmVisualizer.css";
import { Button, Col, Row as div, Row } from "react-bootstrap";
import { isConstructorDeclaration } from "typescript";
import { copyFileSync } from "fs";

type GridState = {
	size: number;
	tiles: number;
	grid: number[][];
	speed: number;
	setting: number;
};

const delay = (ms: number): Promise<void> =>
	new Promise((res) => setTimeout(res, ms));
const manhattanDist = (a: number[], b: number[]): number =>
	Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

let mouseState = 0;

document.body.onmousedown = () => {
	mouseState++;
};

document.body.onmouseup = () => {
	mouseState--;
};

export default class AlgorithmVisualizer extends React.Component<
	any,
	GridState
> {
	colors: string[] = [
		"#f8f9fa",
		"#212529",
		"#198754",
		"#0d6efd",
		"#ffc107",
		"#dc3545",
		"#20c997",
	];
	usedCoords: Set<number[]> = new Set();
	abort: boolean = false;
	start: number[] = [0, 0];
	end: number[] = [9, 9];

	constructor(props: any) {
		super(props);

		this.state = {
			size: 500,
			tiles: 10,
			grid: this.createGrid(10),
			speed: 50,
			setting: 0,
		};

		this.updateTileCount = this.updateTileCount.bind(this);
		this.generateGrid = this.generateGrid.bind(this);
		this.createGrid = this.createGrid.bind(this);
		this.startAStar = this.startAStar.bind(this);
		this.aStar = this.aStar.bind(this);
		this.updateTile = this.updateTile.bind(this);
		this.startDFS = this.startDFS.bind(this);
		this.dfs = this.dfs.bind(this);
		this.startBFS = this.startBFS.bind(this);
		this.bfs = this.bfs.bind(this);
	}

	createGrid(size: number): number[][] {
		let grid: number[][] = Array.from(Array(size), () => new Array(size));

		for (let i: number = 0; i < size; i++) {
			for (let j: number = 0; j < size; j++) {
				grid[i][j] = 0;
			}
		}

		grid[0][0] = 2;
		this.start = [0, 0];
		grid[size - 1][size - 1] = 3;
		this.end = [size - 1, size - 1];

		return grid;
	}

	resetGrid() {
		let newGrid = this.state.grid;

		for (let i: number = 0; i < this.state.tiles; i++) {
			for (let j: number = 0; j < this.state.tiles; j++) {
				if (newGrid[i][j] > 3) {
					newGrid[i][j] = 0;
				}
			}
		}

		this.setState((state) => {
			return {
				grid: newGrid,
			};
		});
	}

	updateTileCount(amount: number): void {
		this.setState((state) => {
			return {
				tiles: amount,
				grid: this.createGrid(amount),
			};
		});
	}

	gridCellClick(i: number, j: number): void {
		let newGrid: number[][] = this.state.grid;

		newGrid[i][j] = newGrid[i][j] == 1 ? 0 : 1;

		this.setState((state) => {
			return {
				grid: newGrid,
			};
		});
	}

	setStart(x: number, y: number): void {
		this.updateTile(this.start[0], this.start[1], 0);
		this.updateTile(x, y, 2);
		this.start = [x, y];

		this.setState(() => {
			return {
				setting: 0,
			};
		});
	}

	setEnd(x: number, y: number): void {
		this.updateTile(this.end[0], this.end[1], 0);
		this.updateTile(x, y, 3);
		this.end = [x, y];

		this.setState(() => {
			return {
				setting: 0,
			};
		});
	}

	generateGrid(): JSX.Element[] {
		const { tiles, grid, setting }: GridState = this.state;
		let output: JSX.Element[] = [];

		for (let i: number = 0; i < tiles; i++) {
			for (let j: number = 0; j < tiles; j++) {
				output.push(
					<button
						style={{
							backgroundColor: this.colors[grid[i][j]],
							border: "none",
						}}
						onMouseDown={() => {
							if (setting == 0 && (i != this.start[0] || j != this.start[1])) {
								this.gridCellClick(i, j);
							} else if (setting == 1) {
								this.setStart(i, j);
							} else {
								this.setEnd(i, j);
							}
						}}
						onMouseEnter={() => {
							if (mouseState == 1) {
								this.gridCellClick(i, j);
							}
						}}
					></button>
				);
			}
		}

		return output;
	}

	renderAlgoTest(): JSX.Element {
		const { size, tiles }: GridState = this.state;

		let gridData = "";

		for (let i: number = 0; i < tiles; i++) {
			gridData += (size / tiles).toString() + "px ";
		}

		return (
			<div
				style={{
					width: (size + 5 * (tiles - 1)).toString() + "px",
					height: (size + 5 * (tiles - 1)).toString() + "px",
					gridTemplateRows: gridData,
					gridTemplateColumns: gridData,
				}}
				className="grid-container"
			>
				{this.generateGrid()}
			</div>
		);
	}

	updateTile(x: number, y: number, value: number): void {
		let newGrid: number[][] = this.state.grid;

		newGrid[x][y] = value;

		this.setState((state) => {
			return {
				grid: newGrid,
			};
		});
	}

	async startAStar(): Promise<void> {
		await this.aStar();
	}

	pathContains2(path: number[][], x: number, y: number): boolean {
		for (let i: number = 0; i < path.length; i++) {
			if (path[i][0] == x && path[i][1] == y) {
				return true;
			}
		}

		return false;
	}

	pathContains(path: number[][], x: number, y: number, h: number): boolean {
		for (let i: number = 0; i < path.length; i++) {
			if (path[i][0] == x && path[i][1] == y && path[i][2] == h) {
				return true;
			}
		}

		return false;
	}

	async aStar(): Promise<boolean> {
		let queue: number[][] = [
			[this.start[0], this.start[1], manhattanDist(this.start, this.end)],
		];

		for (let pos: number = 0; pos < queue.length; pos++) {
			let current: number[] = queue[pos];

			if (current[0] == this.end[0] && current[1] == this.end[1]) {
				return true;
			}

			if (this.abort) {
				return false;
			}

			const { grid, tiles, speed }: GridState = this.state;

			const allowUpdates: boolean =
				current[0] != this.start[0] || current[1] != this.start[1];

			if (allowUpdates) {
				this.updateTile(current[0], current[1], 4);
			}

			if (current[0] >= 1) {
				let next: number[] = [current[0] - 1, current[1]];
				next.push(manhattanDist(next, this.end));
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!this.pathContains(queue, next[0], next[1], next[2])
				) {
					let i: number = pos + 1;

					for (; i < queue.length; i++) {
						if (queue[i][2] > next[2]) {
							break;
						}
					}

					queue.splice(i, 0, next);
				}
			}
			if (current[0] < tiles - 1) {
				let next: number[] = [current[0] + 1, current[1]];
				next.push(manhattanDist(next, this.end));
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!this.pathContains(queue, next[0], next[1], next[2])
				) {
					let i: number = pos + 1;

					for (; i < queue.length; i++) {
						if (queue[i][2] > next[2]) {
							break;
						}
					}

					queue.splice(i, 0, next);
				}
			}
			if (current[1] >= 1) {
				let next: number[] = [current[0], current[1] - 1];
				next.push(manhattanDist(next, this.end));
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!this.pathContains(queue, next[0], next[1], next[2])
				) {
					let i: number = pos + 1;

					for (; i < queue.length; i++) {
						if (queue[i][2] > next[2]) {
							break;
						}
					}

					queue.splice(i, 0, next);
				}
			}
			if (current[1] < tiles - 1) {
				let next: number[] = [current[0], current[1] + 1];
				next.push(manhattanDist(next, this.end));
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!this.pathContains(queue, next[0], next[1], next[2])
				) {
					let i: number = pos + 1;

					for (; i < queue.length; i++) {
						if (queue[i][2] > next[2]) {
							break;
						}
					}

					queue.splice(i, 0, next);
				}
			}

			await delay(speed);
		}

		return false;
	}

	async startDFS(): Promise<void> {
		await this.dfs(this.start, []);
	}

	async dfs(current: number[], path: number[][]): Promise<boolean> {
		if (current[0] == this.end[0] && current[1] == this.end[1]) {
			return true;
		}

		if (this.abort) {
			return false;
		}

		const { grid, tiles, speed }: GridState = this.state;

		path.push(current);

		const allowUpdates: boolean =
			current[0] != this.start[0] || current[1] != this.start[1];

		if (allowUpdates) {
			this.updateTile(current[0], current[1], 4);
		}

		let nextCoords: number[][] = [];

		if (current[0] >= 1) {
			let next: number[] = [current[0] - 1, current[1]];
			if (grid[next[0]][next[1]] != 1 && !path.includes(next)) {
				nextCoords.push(next);
			}
		}
		if (current[0] < tiles - 1) {
			let next: number[] = [current[0] + 1, current[1]];
			if (grid[next[0]][next[1]] != 1 && !path.includes(next)) {
				nextCoords.push(next);
			}
		}
		if (current[1] >= 1) {
			let next: number[] = [current[0], current[1] - 1];
			if (grid[next[0]][next[1]] != 1 && !path.includes(next)) {
				nextCoords.push(next);
			}
		}
		if (current[1] < tiles - 1) {
			let next: number[] = [current[0], current[1] + 1];
			if (grid[next[0]][next[1]] != 1 && !path.includes(next)) {
				nextCoords.push(next);
			}
		}

		for (let i: number = 0; i < nextCoords.length; i++) {
			if (
				this.state.grid[nextCoords[i][0]][nextCoords[i][1]] == 5 ||
				this.pathContains2(path, nextCoords[i][0], nextCoords[i][1])
			) {
				continue;
			}

			await delay(speed);

			let res: boolean = await this.dfs(nextCoords[i], path);

			if (this.abort) {
				return false;
			}

			if (res == true) {
				await delay(speed);

				if (allowUpdates) {
					this.updateTile(current[0], current[1], 6);
				}

				return true;
			}
		}

		await delay(speed);

		if (allowUpdates) {
			this.updateTile(current[0], current[1], 5);
		}

		return false;
	}

	async startBFS(): Promise<void> {
		await this.bfs();
	}

	async bfs(): Promise<boolean> {
		let queue: number[][] = [this.start];

		for (let pos: number = 0; pos < queue.length; pos++) {
			let current: number[] = queue[pos];

			if (current[0] == this.end[0] && current[1] == this.end[1]) {
				return true;
			}

			if (this.abort) {
				return false;
			}

			const { grid, tiles, speed }: GridState = this.state;

			const allowUpdates: boolean =
				current[0] != this.start[0] || current[1] != this.start[1];

			if (allowUpdates) {
				this.updateTile(current[0], current[1], 4);
			}

			let nextCoords: number[][] = [];

			if (current[0] >= 1) {
				let next: number[] = [current[0] - 1, current[1]];
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!this.pathContains2(queue, next[0], next[1])
				) {
					queue.push(next);
				}
			}
			if (current[0] < tiles - 1) {
				let next: number[] = [current[0] + 1, current[1]];
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!this.pathContains2(queue, next[0], next[1])
				) {
					queue.push(next);
				}
			}
			if (current[1] >= 1) {
				let next: number[] = [current[0], current[1] - 1];
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!this.pathContains2(queue, next[0], next[1])
				) {
					queue.push(next);
				}
			}
			if (current[1] < tiles - 1) {
				let next: number[] = [current[0], current[1] + 1];
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!this.pathContains2(queue, next[0], next[1])
				) {
					queue.push(next);
				}
			}

			await delay(speed);
		}

		return false;
	}

	render() {
		const { tiles, speed, setting }: GridState = this.state;
		return (
			<div id="AlgorithmVisualizer">
				<Row className="justify-content-center mx-auto">
					{this.renderAlgoTest()}
				</Row>
				<Row className="mx-auto p-2 justify-content-center">
					<Col xs={3}>
						<div className="text-center text-light">
							Tile Count: {tiles}x{tiles}
						</div>
						<input
							type="range"
							className="form-range"
							min="5"
							max="20"
							defaultValue={10}
							onChange={(e) => {
								this.updateTileCount(parseInt(e.target.value));
							}}
						/>
					</Col>
					<Col xs={3}>
						<div className="text-center text-light">Speed: {speed}ms</div>
						<input
							type="range"
							className="form-range"
							min="10"
							max="500"
							defaultValue={50}
							step={10}
							onChange={(e) => {
								this.setState((state) => {
									return {
										speed: parseInt(e.target.value),
									};
								});
							}}
						/>
					</Col>
				</Row>
				<Row className="justify-content-center mx-auto p-2">
					<Col xs={3}>
						<Row className="px-5">
							<Button onClick={this.startAStar}>Start A*</Button>
						</Row>
					</Col>
					<Col xs={3}>
						<Row className="px-5">
							<Button onClick={this.startDFS}>Start DFS</Button>
						</Row>
					</Col>
					<Col xs={3}>
						<Row className="px-5">
							<Button onClick={this.startBFS}>Start BFS</Button>
						</Row>
					</Col>
				</Row>
				<Row className="justify-content-center mx-auto p-2">
					<Col xs={4}>
						<Row className="px-5">
							<Button
								onClick={async () => {
									this.abort = true;
									this.resetGrid();
									await delay(50);
									this.abort = false;
								}}
							>
								Reset
							</Button>
						</Row>
					</Col>
					<Col xs={4}>
						<Row className="px-5">
							<Button
								onClick={async () => {
									this.abort = true;
									this.setState((state) => {
										return {
											grid: this.createGrid(state.tiles),
										};
									});
									await delay(50);
									this.abort = false;
								}}
							>
								Restart
							</Button>
						</Row>
					</Col>
				</Row>
				<Row className="justify-content-center mx-auto p-2">
					<Col xs={4}>
						<Row className="px-5">
							<Button
								disabled={setting == 1}
								onClick={() => {
									this.setState(() => {
										return {
											setting: 1,
										};
									});
								}}
							>
								Set Start
							</Button>
						</Row>
					</Col>
					<Col xs={4}>
						<Row className="px-5">
							<Button
								disabled={setting == 2}
								onClick={() => {
									this.setState(() => {
										return {
											setting: 2,
										};
									});
								}}
							>
								Set Finish
							</Button>
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}
