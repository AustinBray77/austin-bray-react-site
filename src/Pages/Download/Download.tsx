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
}): JSX.Element {
	return (
		<Row className="bg-dark mb-4 br-20">
			<Col xs={6} md={3} className="p-4 text-center">
				{props.children}
			</Col>
			<Col xs={0} md={6}></Col>
			<Col xs={6} md={3} className="p-3 text-center">
				<Button onClick={() => DownloadFile(props.filePath)}>Download</Button>
			</Col>
		</Row>
	);
}

export default function Download(): JSX.Element {
	return (
		<div id="Download">
			<Container className="pt-5">
				<Row>
					<Col xs={2}></Col>
					<Col xs={8}>
						<DownloadElement filePath="GameOfLifeWin32.zip">
							<div className="text-light">Game Of Life Win 32</div>
						</DownloadElement>
						<DownloadElement filePath="GameOfLifeWin32.zip">
							<div className="text-light">Game Of Life Win 32</div>
						</DownloadElement>
						<DownloadElement filePath="GameOfLifeWin32.zip">
							<div className="text-light">Game Of Life Win 32</div>
						</DownloadElement>
						<DownloadElement filePath="GameOfLifeWin32.zip">
							<div className="text-light">Game Of Life Win 32</div>
						</DownloadElement>
						<DownloadElement filePath="GameOfLifeWin32.zip">
							<div className="text-light">Game Of Life Win 32</div>
						</DownloadElement>
					</Col>
					<Col xs={2}></Col>
				</Row>
			</Container>
		</div>
	);
}
