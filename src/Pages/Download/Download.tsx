import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Download.css";
import { saveAs } from "file-saver";

function DownloadFile(file: string): void {
	saveAs("Programs/" + file, file);
}

function DownloadElement(props: {
	children: string | JSX.Element | JSX.Element[];
	filePath: string;
	sourceCode: string;
}): JSX.Element {
	return (
		<Row className="bg-dark mt-4 br-20">
			<Col xs={6} className="py-4 text-center">
				{props.children}
			</Col>
			<Col xs={3} className="py-4 text-center">
				<Row className="px-3">
					{props.filePath != "" ? (
						<Button onClick={() => DownloadFile(props.filePath)}>
							Download
						</Button>
					) : (
						<Button disabled>Download</Button>
					)}
				</Row>
			</Col>
			<Col xs={3} className="py-4 px-auto text-center">
				<Row className="px-3">
					{props.sourceCode != "" ? (
						<Button
							onClick={() => {
								window.location.href = props.sourceCode;
							}}
						>
							Source
						</Button>
					) : (
						<Button disabled>Source</Button>
					)}
				</Row>
			</Col>
		</Row>
	);
}

export default function Download(): JSX.Element {
	return (
		<Container id="Download" className="">
			<Row className="justify-content-center">
				<Col xs={8}>
					<DownloadElement filePath="GameOfLifeWin32.zip" sourceCode="">
						<h3 className="text-light">Game Of Life Win 32</h3>
					</DownloadElement>
					<DownloadElement
						filePath=""
						sourceCode="https://github.com/AustinBray77/austin-bray-react-site/tree/master/src/Pages/Projects/AlgoritmVisualizer"
					>
						<h3 className="text-light">Algorithm Visualizer</h3>
					</DownloadElement>
				</Col>
			</Row>
		</Container>
	);
}
