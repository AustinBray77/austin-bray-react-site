import React from "react";
import "./AlgorithmVisualizer.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { delay, dist } from "../../../functions";

type GridState = {
	size: number;
	tiles: number;
	grid: number[][];
	speed: number;
	setting: number;
	gort: boolean;
	wawa: boolean;
};

const pathContains2DBuffer = (
	grid: number[][],
	x: number,
	y: number,
	buf: number
): number => {
	let out: number = 0;

	for (
		let i: number = Math.max(x - buf, 0);
		i <= x + buf && i < grid.length;
		i++
	) {
		for (
			let j: number = Math.max(y - buf, 0);
			j <= y + buf && j < grid.length;
			j++
		) {
			if (grid[i][j] != 1) {
				out++;
			}
		}
	}

	return out;
};

const pathContains2D = (path: number[][], x: number, y: number): boolean => {
	for (let i: number = 0; i < path.length; i++) {
		if (path[i][0] == x && path[i][1] == y) {
			return true;
		}
	}

	return false;
};

const pathContains3D = (
	path: number[][],
	x: number,
	y: number,
	h: number
): boolean => {
	for (let i: number = 0; i < path.length; i++) {
		if (path[i][0] == x && path[i][1] == y && path[i][2] == h) {
			return true;
		}
	}

	return false;
};

function copyArr<T>(arr: T[][]): T[][] {
	let out: T[][] = [];

	for (let i = 0; i < arr.length; i++) {
		out.push(arr[i]);
	}

	return out;
}

const timer = async (fn: any): Promise<number> => {
	let start: number = new Date().getTime();

	await fn();

	let end: number = new Date().getTime();

	return new Promise((resolve, reject) => {
		resolve(end - start);
	});
};

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
	paths: number[][][] = [];
	abort: boolean = false;
	start: number[] = [0, 0];
	end: number[] = [9, 9];

	constructor(props: any) {
		super(props);

		this.state = {
			size: 80,
			tiles: 10,
			grid: this.createGrid(10),
			speed: 50,
			setting: 0,
			gort: false,
			wawa: false,
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
		this.animatePath = this.animatePath.bind(this);
		this.createMaze = this.createMaze.bind(this);
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

	resetGrid(): void {
		let newGrid = this.state.grid;

		for (let i: number = 0; i < this.state.tiles; i++) {
			for (let j: number = 0; j < this.state.tiles; j++) {
				if (newGrid[i][j] > 3) {
					newGrid[i][j] = 0;
				}
			}
		}

		this.paths = [];

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
		const { tiles, grid, setting, size }: GridState = this.state;
		let output: JSX.Element[] = [];

		for (let i: number = 0; i < tiles; i++) {
			for (let j: number = 0; j < tiles; j++) {
				output.push(
					<button
						style={{
							backgroundColor: this.colors[grid[i][j]],
							border: "none",
						}}
						className="text-center p-0"
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
			gridData += ((size - 0.2 * (tiles - 1)) / tiles).toString() + "vh ";
		}

		return (
			<div
				style={{
					width: size.toString() + "vh",
					height: size.toString() + "vh",
					gridTemplateRows: gridData,
					gridTemplateColumns: gridData,
				}}
				className="grid-container p-0"
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
		let res: boolean = await this.aStar();

		if (res) {
			await this.animatePath();
		}
	}

	async aStar(): Promise<boolean> {
		let queue: number[][] = [
			[this.start[0], this.start[1], dist(this.start, this.end), 0],
		];

		this.paths.push([queue[0]]);

		for (let pos: number = 0; pos < queue.length; pos++) {
			let current: number[] = queue[pos];

			if (pos != 0) {
				this.paths.push(copyArr(this.paths[current[3]]));
				this.paths[this.paths.length - 1].push(current);
			}

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
				next.push(dist(next, this.end));
				next.push(this.paths.length - 1);
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!pathContains3D(queue, next[0], next[1], next[2])
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
				next.push(dist(next, this.end));
				next.push(this.paths.length - 1);
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!pathContains3D(queue, next[0], next[1], next[2])
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
				next.push(dist(next, this.end));
				next.push(this.paths.length - 1);
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!pathContains3D(queue, next[0], next[1], next[2])
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
				next.push(dist(next, this.end));
				next.push(this.paths.length - 1);
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!pathContains3D(queue, next[0], next[1], next[2])
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
		let res: boolean = await this.dfs(this.start, []);

		if (res) {
			await this.animatePath();
		}
	}

	async dfs(current: number[], path: number[][]): Promise<boolean> {
		path.push(current);

		if (this.abort) {
			return false;
		}

		if (current[0] == this.end[0] && current[1] == this.end[1]) {
			this.paths.push(copyArr(path));
			return true;
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
				pathContains2D(path, nextCoords[i][0], nextCoords[i][1])
			) {
				continue;
			}

			await delay(speed);

			let res: boolean = await this.dfs(nextCoords[i], copyArr(path));

			if (this.abort) {
				return false;
			}

			if (res == true) {
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
		let res: boolean = await this.bfs();

		if (res) {
			await this.animatePath();
		}
	}

	async bfs(): Promise<boolean> {
		let queue: number[][] = [[this.start[0], this.start[1], 0]];

		this.paths.push([queue[0]]);

		for (let pos: number = 0; pos < queue.length; pos++) {
			let current: number[] = queue[pos];

			if (pos != 0) {
				this.paths.push(copyArr(this.paths[current[2]]));
				this.paths[this.paths.length - 1].push(current);
			}

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
				let next: number[] = [
					current[0] - 1,
					current[1],
					this.paths.length - 1,
				];
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!pathContains2D(queue, next[0], next[1])
				) {
					queue.push(next);
				}
			}
			if (current[0] < tiles - 1) {
				let next: number[] = [
					current[0] + 1,
					current[1],
					this.paths.length - 1,
				];
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!pathContains2D(queue, next[0], next[1])
				) {
					queue.push(next);
				}
			}
			if (current[1] >= 1) {
				let next: number[] = [
					current[0],
					current[1] - 1,
					this.paths.length - 1,
				];
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!pathContains2D(queue, next[0], next[1])
				) {
					queue.push(next);
				}
			}
			if (current[1] < tiles - 1) {
				let next: number[] = [
					current[0],
					current[1] + 1,
					this.paths.length - 1,
				];
				if (
					grid[next[0]][next[1]] != 1 &&
					grid[next[0]][next[1]] != 5 &&
					!pathContains2D(queue, next[0], next[1])
				) {
					queue.push(next);
				}
			}

			await delay(speed);
		}

		return false;
	}

	async animatePath(): Promise<void> {
		let newPaths: number[][][] = [];
		let smallest: number = 0;

		for (let i: number = 0, j = -1; i < this.paths.length; i++) {
			let current: number[] = this.paths[i][this.paths[i].length - 1];
			if (current[0] == this.end[0] && current[1] == this.end[1]) {
				newPaths.push(this.paths[i]);
				j++;

				if (newPaths[smallest].length > newPaths[j].length) {
					smallest = j;
				}
			}
		}

		const { speed }: GridState = this.state;

		for (let i: number = 1; i < newPaths[smallest].length - 1; i++) {
			await delay(speed);

			if (this.abort) {
				break;
			}

			this.updateTile(newPaths[smallest][i][0], newPaths[smallest][i][1], 6);
		}
	}

	async createMaze(): Promise<void> {
		const { grid, tiles, speed }: GridState = this.state;
		let newGrid: number[][] = copyArr(grid);

		for (let i: number = 0; i < tiles; i++) {
			for (let j: number = 0; j < tiles; j++) {
				if (newGrid[i][j] != 3) {
					newGrid[i][j] = 1;
				}
			}
		}

		let cur: number[] = [this.end[0], this.end[1]];
		let path: number[][] = [cur];
		let buffer: number = 1;

		while (path.length > 0) {
			if (this.abort) {
				return;
			}

			if (newGrid[cur[0]][cur[1]] == 1) {
				await delay(speed);
				path.push(cur);
			}

			if (
				(cur[0] != this.start[0] || cur[1] != this.start[1]) &&
				(cur[0] != this.end[0] || cur[1] != this.end[1])
			) {
				newGrid[cur[0]][cur[1]] = 0;

				if (speed > 0) {
					this.updateTile(cur[0], cur[1], 0);
				}
			} else if (cur[0] == this.start[0] && cur[1] == this.start[1]) {
				newGrid[cur[0]][cur[1]] = 2;

				if (speed > 0) {
					this.updateTile(cur[0], cur[1], 2);
				}
			}

			let nextCoords: number[][] = [];

			if (cur[0] > 0) {
				let next: number[] = [cur[0] - 1, cur[1]];

				if (
					pathContains2DBuffer(grid, next[0], next[1], buffer) <
						buffer * 2 + 1 &&
					newGrid[next[0]][next[1]] != 0
				) {
					nextCoords.push(next);
				}
			}
			if (cur[0] < tiles - 1) {
				let next: number[] = [cur[0] + 1, cur[1]];

				if (
					pathContains2DBuffer(grid, next[0], next[1], buffer) <
						buffer * 2 + 1 &&
					newGrid[next[0]][next[1]] != 0
				) {
					nextCoords.push(next);
				}
			}
			if (cur[1] > 0) {
				let next: number[] = [cur[0], cur[1] - 1];

				if (
					pathContains2DBuffer(grid, next[0], next[1], buffer) <
						buffer * 2 + 1 &&
					newGrid[next[0]][next[1]] != 0
				) {
					nextCoords.push(next);
				}
			}
			if (cur[1] < tiles - 1) {
				let next: number[] = [cur[0], cur[1] + 1];

				if (
					pathContains2DBuffer(grid, next[0], next[1], buffer) <
						buffer * 2 + 1 &&
					newGrid[next[0]][next[1]] != 0
				) {
					nextCoords.push(next);
				}
			}
			if (nextCoords.length > 0) {
				cur = nextCoords[Math.round(Math.random() * (nextCoords.length - 1))];
			} else {
				path.pop();
				cur = path[path.length - 1];
			}
		}

		newGrid[this.start[0]][this.start[1]] = 2;

		this.setState(() => {
			return {
				grid: newGrid,
			};
		});

		alert("Maze Generated");
	}

	render(): JSX.Element {
		const { tiles, speed, setting, size, gort, wawa }: GridState = this.state;

		document.title = "Algorithm Visualizer by Austin Bray";

		return (
			<Container id="AlgorithmVisualizer">
				<Row>
					{gort ? (
						<img
							src="/gort.jpg"
							style={{
								height: size.toString() + "vh",
								width: size.toString() + "vh",
							}}
							className="px-0 gort"
						/>
					) : (
						""
					)}
					{wawa ? (
						<img
							src="/wawa.jpg"
							style={{
								height: size.toString() + "vh",
								width: size.toString() + "vh",
							}}
							className="px-0 gort"
						/>
					) : (
						""
					)}
					{this.renderAlgoTest()}

					<div style={{ width: `calc(100% - ${size}vh)` }}>
						<Row className="p-2 justify-content-center text-light text-center">
							<h1>{document.title}</h1>
							<p className="px-5">
								To start, draw obstacles on the grid or generate a maze, and
								then pick a search algorithm to search from the start (green
								point) to the finish (blue point).
							</p>
						</Row>
						<Row className="p-2 justify-content-center text-light">
							<Col xs={3}>
								<div className="text-center">
									Tile Count: {tiles}x{tiles}
								</div>
								<input
									type="range"
									className="form-range"
									min="5"
									max="60"
									defaultValue={10}
									onChange={(e) => {
										this.updateTileCount(parseInt(e.target.value));
									}}
								/>
							</Col>
							<Col xs={3}>
								<div className="text-center">Speed: {speed}ms</div>
								<input
									type="range"
									className="form-range"
									min="0"
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
							<Col xs={3}>
								<div className="form-check text-center">
									<label>Gort Mode</label>
									<input
										type="checkbox"
										className="form-check-input"
										checked={gort}
										onChange={() => {
											this.setState((state) => {
												return {
													gort: !state.gort,
													wawa: false,
												};
											});
										}}
									/>
								</div>
								<div className="form-check text-center">
									<label>Wawa Mode</label>
									<input
										type="checkbox"
										className="form-check-input"
										checked={wawa}
										onChange={() => {
											this.setState((state) => {
												return {
													wawa: !state.wawa,
													gort: false,
												};
											});
										}}
									/>
								</div>
							</Col>
						</Row>
						<Row className="justify-content-center  p-2">
							<Col xs={3}>
								<Row className="px-1">
									<Button
										onClick={() => {
											timer(this.startAStar).then((res) => console.log(res));
										}}
									>
										Start A*
									</Button>
								</Row>
							</Col>
							<Col xs={3}>
								<Row className="px-1">
									<Button
										onClick={() => {
											timer(this.startDFS).then((res) => console.log(res));
										}}
									>
										Start DFS
									</Button>
								</Row>
							</Col>
							<Col xs={3}>
								<Row className="px-1">
									<Button
										onClick={() => {
											timer(this.startBFS).then((res) => console.log(res));
										}}
									>
										Start BFS
									</Button>
								</Row>
							</Col>
						</Row>
						<Row className="justify-content-center  p-2">
							<Col xs={3}>
								<Row className="px-1">
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
							<Col xs={3}>
								<Row className="px-1">
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
							<Col xs={3}>
								<Row className="px-1">
									<Button
										onClick={async () => {
											this.abort = true;
											await delay(50);
											this.abort = false;
											this.createMaze();
										}}
									>
										Generate Maze
									</Button>
								</Row>
							</Col>
						</Row>
						<Row className="justify-content-center  p-2">
							<Col xs={4}>
								<Row className="px-1">
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
								<Row className="px-1">
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
				</Row>
			</Container>
		);
	}
}
