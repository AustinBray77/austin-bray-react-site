import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ReactDOM from "react-dom";
import { create2DArr, delay } from "../../../functions";

type TotrisState = {
    grid: number[][];
    storedGrid: number[][];
    queueGrid: number[][];
    score: number;
    gameIsRunning: boolean;
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
    _deadDropping: boolean;

    constructor(type: number) {
        this._orientation = 0;
        this._pattern = patterns[type];
        this._type = type;
        this._posY = -1;
        this._posX = 3;
        this._canMove = true;
        this._deadDropping = false;

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

        if (this._orientation === 0) {
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
        } else if (this._orientation === 1) {
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
        } else if (this._orientation === 2) {
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

    setDeadDrop(value: boolean): void {
        this._deadDropping = value;
    }

    isDeadDropping(): boolean {
        return this._deadDropping;
    }

    _updateGrid(grid: number[][]): number[][] {
        if (this._posY > 0) {
            for (let i: number = 0; i < this._occupyingSquares.length; i++) {
                grid[this._occupyingSquares[i][0]][
                    this._occupyingSquares[i][1]
                ] = 0;
            }
        }

        this._occupyingSquares = this.calcOccupyingSquares();
        this._stoppingPattern = this.calcStoppingPattern();

        //console.log(this._stoppingPattern);

        for (let i: number = 0; i < this._occupyingSquares.length; i++) {
            grid[this._occupyingSquares[i][0]][this._occupyingSquares[i][1]] =
                this._type + 1;
        }

        return grid;
    }

    move(x: number, y: number, grid: number[][]): number[][] {
        if (x !== 0 && (this._posY <= 0 || this._deadDropping)) {
            return grid;
        }

        if (
            this._posX + x < 0 ||
            (this._posX + x + this._pattern[0].length - 1 >= width &&
                this._orientation % 2 === 0) ||
            (this._posX + x + this._pattern.length - 1 >= width &&
                this._orientation % 2 !== 0) ||
            this._posY + y < 0
        ) {
            return grid;
        }

        if (
            (this._posY + y + this._pattern.length - 1 >= height &&
                this._orientation % 2 === 0) ||
            (this._posY + y + this._pattern[0].length - 1 >= height &&
                this._orientation % 2 !== 0)
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
                ] !== 0
            ) {
                /*console.log(
					`Value at stop ${
						grid[this._stoppingPattern[side][i][0]][
							this._stoppingPattern[side][i][0]
						]
					}`
				);*/
                this._canMove = false;
                return grid;
            }
        }

        this._posX += x;
        this._posY += y;

        //console.log(`Moving by: (${x},${y})`);

        return this._updateGrid(grid);
    }

    deadDrop(grid: number[][]): number[][] {
        while (this.getCanMove()) {
            grid = this.move(0, 1, grid);
        }

        return grid;
    }

    rotate(dir: number, grid: number[][]): number[][] {
        if (this._posY === 0) {
            return grid;
        }

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
        "#212529",
    ];

    pieceCounter: number = 0;
    curPiece: Piece = this.newPiece();
    pieceQueue: number[] = [];
    bankedPiece: undefined | number = undefined;
    stopGame: boolean = false;

    constructor(props: TotrisState) {
        super(props);
        this.state = {
            grid: create2DArr<number>(height, width, 0),
            storedGrid: create2DArr<number>(5, 5, this.colors.length - 1),
            queueGrid: create2DArr<number>(5, 25, this.colors.length - 1),
            score: 0,
            gameIsRunning: false,
        };

        this.render = this.render.bind(this);
        this.drawTiles = this.drawTiles.bind(this);
        this.renderBoard = this.renderBoard.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
        this.keyPressHandler = this.keyPressHandler.bind(this);
    }

    randomPiece(): number {
        return Math.floor(Math.random() * patterns.length);
    }

    newPiece(): Piece {
        return new Piece(this.randomPiece());
    }

    drawTiles(grid: number[][]): JSX.Element[] {
        let output: JSX.Element[] = [];

        for (let i: number = 0; i < grid.length; i++) {
            for (let j: number = 0; j < grid[0].length; j++) {
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

    loadPieceQueueFromPieces() {
        let newQueueGrid: number[][] = create2DArr<number>(25, 25, 0);
        let nextPiece: Piece = new Piece(this.pieceQueue[0]);
        newQueueGrid = nextPiece.move(0, 1, newQueueGrid);

        this.setState((state) => {
            return { queueGrid: newQueueGrid };
        });
    }

    renderBoard(
        x: number,
        y: number,
        s: number,
        grid: number[][]
    ): JSX.Element {
        let gridDataX: string = "",
            gridDataY: string = "";

        for (let i: number = 0; i < x; i++) {
            gridDataX += ((s - 0.2 * (y - 1)) / y).toString() + "vh ";
        }

        for (let i: number = 0; i < y; i++) {
            gridDataY += ((s - 0.2 * (y - 1)) / y).toString() + "vh ";
        }

        return (
            <div
                style={{
                    width: s.toString() + "vh",
                    height: s.toString() + "vh",
                    gridTemplateRows: gridDataY,
                    gridTemplateColumns: gridDataX,
                }}
                className="grid-container"
            >
                {this.drawTiles(grid)}
            </div>
        );
    }

    async gameLoop(): Promise<void> {
        this.speed = 400;
        this.setState(() => {
            return { grid: create2DArr<number>(height, width, 0), score: 0 };
        });

        this.setState(() => {
            return { gameIsRunning: true };
        });

        for (let i: number = 0; i < 5; i++) {
            this.pieceQueue.push(this.randomPiece());
        }

        this.loadPieceQueueFromPieces();

        while (true) {
            if (this.stopGame) {
                break;
            }

            await delay(this.speed);

            await this.setState((state) => {
                return {
                    grid: this.curPiece.move(0, 1, state.grid),
                };
            });

            let didDeadDrop = false;

            if (this.curPiece.isDeadDropping()) {
                await this.setState((state) => {
                    return {
                        grid: this.curPiece.deadDrop(state.grid),
                    };
                });
                this.curPiece.setDeadDrop(false);
                didDeadDrop = true;
                console.log(didDeadDrop);
            }

            if (!this.curPiece.getCanMove()) {
                console.log(didDeadDrop);

                if (!didDeadDrop) {
                    await delay(20);
                    console.log("here2");

                    if (this.curPiece.getCanMove()) {
                        continue;
                    }
                }

                //Check for line breaks
                let lines: number[][] = this.curPiece.getOccupyingSquares();

                if (
                    lines[0][0] === undefined ||
                    lines[0][0] > height ||
                    lines[0][0] < 0
                ) {
                    alert("Game Over");
                    break;
                }

                for (let i: number = 0; i < lines.length; i++) {
                    let breakLine = true;

                    for (let j: number = 0; j < width; j++) {
                        if (this.state.grid[lines[i][0]][j] === 0) {
                            breakLine = false;
                            break;
                        }
                    }

                    if (breakLine) {
                        for (let j: number = lines[i][0]; j > 0; j--) {
                            for (let k: number = 0; k < width; k++) {
                                this.state.grid[j][k] =
                                    this.state.grid[j - 1][k];
                            }
                        }

                        for (let j: number = 0; j < width; j++) {
                            this.state.grid[0][j] = 0;
                        }

                        for (let j: number = i + 1; j < lines.length; j++) {
                            if (lines[j][0] === lines[i][0]) {
                                lines.splice(j, 1);
                            } else if (lines[j][0] < lines[i][0]) {
                                lines[j][0]++;
                            }
                        }

                        this.setState((state) => {
                            return { score: state.score + 1 };
                        });
                    }
                }

                this.curPiece.setDeadDrop(false);
                this.curPiece = new Piece(this.pieceQueue[0]);
                this.pieceQueue.splice(0, 1);
                this.pieceQueue.push(this.randomPiece());

                this.loadPieceQueueFromPieces();

                if (this.speed > 10) {
                    this.speed -= 2.5;
                }
            }
        }

        this.setState(() => {
            return { gameIsRunning: false };
        });
    }

    async keyPressHandler(
        event: React.KeyboardEvent<HTMLDivElement>
    ): Promise<void> {
        //console.log(event.code);
        //console.log(event.code.substring(0, 5));

        if (this.curPiece.getPosY() < 0) return;

        if (event.code === "KeyD") {
            if (this.curPiece.getPosX() < width - 1) {
                await this.setState((state) => {
                    return { grid: this.curPiece.move(1, 0, state.grid) };
                });
                await delay(1);
            }
        } else if (event.code === "KeyA") {
            if (this.curPiece.getPosX() > 0) {
                await this.setState((state) => {
                    return { grid: this.curPiece.move(-1, 0, state.grid) };
                });
                await delay(1);
            }
        } else if (event.code === "KeyC") {
            let nextBank: number = this.curPiece.getType();
            let newGrid: number[][] = this.state.grid;
            let occupying: number[][] = this.curPiece.getOccupyingSquares();

            for (let i: number = 0; i < occupying.length; i++) {
                newGrid[occupying[i][0]][occupying[i][1]] = 0;
            }

            this.curPiece = new Piece(
                this.bankedPiece !== undefined
                    ? this.bankedPiece
                    : Math.floor(Math.random() * patterns.length)
            );

            this.bankedPiece = nextBank;

            let newStoredGrid: number[][] = this.state.storedGrid;

            newStoredGrid = create2DArr<number>(5, 5, this.colors.length - 1);

            for (
                let i: number = 0;
                i < patterns[this.bankedPiece].length;
                i++
            ) {
                for (
                    let j: number = 0;
                    j < patterns[this.bankedPiece][0].length;
                    j++
                ) {
                    newStoredGrid[i][j] = patterns[this.bankedPiece][i][j]
                        ? this.bankedPiece + 1
                        : this.colors.length - 1;
                }
            }

            this.setState(() => {
                return { grid: newGrid, storedGrid: newStoredGrid };
            });
        } else if (event.code.substring(0, 5) === "Arrow") {
            await this.setState((state) => {
                return {
                    grid: this.curPiece.rotate(
                        event.code.substring(5) === "Right" ? 1 : -1,
                        state.grid
                    ),
                };
            });
            await delay(1);
        } else if (event.code === "KeyS") {
            await this.setState((state) => {
                return { grid: this.curPiece.move(0, 1, state.grid) };
            });
            await delay(1);
        } else if (event.code.substring(0, 5) === "Space") {
            this.curPiece.setDeadDrop(true);
        }
    }

    async restartGame(): Promise<void> {
        this.stopGame = true;
        this.curPiece = this.newPiece();
        await delay(this.speed * 2);
        this.stopGame = false;

        this.gameLoop();
    }

    render(): JSX.Element {
        document.title = "Totris by Austin Bray";
        const { grid, storedGrid, queueGrid, score, gameIsRunning } =
            this.state;

        console.log(`Stored grid state: ${storedGrid.length}`);

        return (
            <Container
                id="Totris"
                tabIndex={0}
                onKeyDown={this.keyPressHandler}
            >
                <Row className="text-center justify-content-center text-light">
                    <Col xs={4}>
                        <h1>Totris</h1>
                        <h3>Controls</h3>
                        <p>
                            A: Move Piece Left <br /> S: Move Piece Down <br />{" "}
                            D: Move Piece Right <br /> &lt;-: Rotate Piece
                            Counter Clockwise <br /> -&gt;: Rotate Piece
                            Clockwise
                        </p>
                    </Col>
                    <Col xs={4}>
                        {this.renderBoard(width, height, size, grid)}
                        <Row className="mt-4">
                            <Col xs={4}>
                                <Row>
                                    <Button
                                        id="startBTN"
                                        disabled={gameIsRunning}
                                        onClick={() => {
                                            this.restartGame();
                                        }}
                                    >
                                        Start
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={4} className="text-start">
                        <h1>Score: {score}</h1>
                        <h3>Stored Piece:</h3>
                        {this.renderBoard(5, 5, 10, storedGrid)}
                        <h3>Next Pieces:</h3>
                        {this.renderBoard(5, 25, 40, queueGrid)}
                    </Col>
                </Row>
            </Container>
        );
    }
}
