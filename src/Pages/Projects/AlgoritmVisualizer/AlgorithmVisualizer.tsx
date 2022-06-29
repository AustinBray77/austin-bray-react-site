import React, { useEffect, useState } from "react";
import "./AlgorithmVisualizer.css";
import { Button, Row } from "react-bootstrap";
import { isConstructorDeclaration } from "typescript";

type GridState = {
	size: number;
	tiles: number;
};

export default class AlgorithmVisualizer extends React.Component<
	any,
	GridState
> {
	constructor(props: any) {
		super(props);

		this.state = {
			size: 500,
			tiles: 10,
		};

		this.updateTileCount = this.updateTileCount.bind(this);
		this.generateGrid = this.generateGrid.bind(this);
	}

	async updateTileCount(): Promise<void> {
		await this.setState((state) => {
			return {
				size: state.size,
				tiles: state.tiles + 1,
			};
		});
	}

	generateGrid(): JSX.Element[] {
		const { size, tiles }: GridState = this.state;
		let output: JSX.Element[] = [];

		console.log(tiles);

		for (let i: number = 0; i < tiles; i++) {
			for (let j: number = 0; j < tiles; j++) {
				output.push(
					<div
						style={{ backgroundColor: (i + j) % 2 == 0 ? "blue" : "red" }}
					></div>
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
					width: size.toString() + "px",
					height: size.toString() + "px",
					gridTemplateRows: gridData,
					gridTemplateColumns: gridData,
				}}
				className="grid-container"
			>
				{this.generateGrid()}
			</div>
		);
	}

	render() {
		const { size, tiles }: GridState = this.state;

		return (
			<div id="AlgorithmVisualizer">
				<Row>{this.renderAlgoTest()}</Row>
				<Row>
					<Button onClick={this.updateTileCount}>Increase Tile Count</Button>
				</Row>
			</div>
		);
	}
}
