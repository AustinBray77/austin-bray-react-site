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
	className?: string | null;
}): JSX.Element {
	return (
		<Row
			className={"bg-pitch fade-in margin-slide-down m-25 " + props.className}
		>
			<Col xs={6} className="py-4 text-center">
				{props.children}
			</Col>
			<Col xs={3} className="py-4 text-center">
				<Row className="px-3">
					{props.filePath != "" ? (
						<Button
							onClick={() => {
								console.log();
								if (
									props.filePath.substring(props.filePath.length - 4) ==
										".zip" ||
									props.filePath.substring(props.filePath.length - 4) == ".msi"
								) {
									DownloadFile(props.filePath);
								} else {
									window.location.href = props.filePath;
								}
							}}
						>
							{props.filePath.substring(props.filePath.length - 4) == ".zip" ||
							props.filePath.substring(props.filePath.length - 4) == ".msi"
								? "Download"
								: "View"}
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
				<DownloadElement
					filePath="GameOfLifeWin32.zip"
					sourceCode="https://github.com/AustinBray77/game-of-life-cpp"
					className={"anim-speed-1"}
				>
					<h3 className="text-light">Game Of Life Win 32 (Windows)</h3>
				</DownloadElement>
				<DownloadElement
					filePath="/projects/algo"
					sourceCode="https://github.com/AustinBray77/austin-bray-react-site/tree/master/src/Pages/Projects/AlgoritmVisualizer"
					className={"anim-speed-2"}
				>
					<h3 className="text-light">Algorithm Visualizer (Web)</h3>
				</DownloadElement>
				<DownloadElement
					filePath="https://play.google.com/store/apps/details?id=com.SixBeachesGaming.BlockSnake2D"
					sourceCode="https://github.com/AustinBray77/BlockSnake2D"
					className={"anim-speed-3"}
				>
					<h3 className="text-light">Block Snake 2D (Android)</h3>
				</DownloadElement>
				<DownloadElement
					filePath=""
					sourceCode="https://github.com/AustinBray77/ScienceFairProject"
					className={"anim-speed-4"}
				>
					<h3 className="text-light">Brachristochrone AI Pathfinder (N/A)</h3>
				</DownloadElement>
				<DownloadElement
					filePath="PSD-Viewer-Setup.msi"
					sourceCode="https://github.com/AustinBray77/PSD-Viewer"
					className={"anim-speed-5"}
				>
					<h3 className="text-light">PSD Viewer (Windows)</h3>
				</DownloadElement>
			</Row>
		</Container>
	);
}
