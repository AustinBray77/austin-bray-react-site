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
            className={
                "bg-pd fade-in margin-slide-down download-element " +
                props.className
            }
        >
            <Col md={6} xs={12} className="py-4 text-center">
                {props.children}
            </Col>
            <Col md={3} xs={6} className="py-4 text-center">
                <Row className="px-3">
                    {props.filePath !== "" ? (
                        <Button
                            className="btn btn-light text-pd bg-pl"
                            onClick={() => {
                                console.log();
                                if (
                                    props.filePath.substring(
                                        props.filePath.length - 4
                                    ) === ".zip" ||
                                    props.filePath.substring(
                                        props.filePath.length - 4
                                    ) === ".msi"
                                ) {
                                    DownloadFile(props.filePath);
                                } else {
                                    window.location.href = props.filePath;
                                }
                            }}
                        >
                            {props.filePath.substring(
                                props.filePath.length - 4
                            ) === ".zip" ||
                            props.filePath.substring(
                                props.filePath.length - 4
                            ) === ".msi"
                                ? "Download"
                                : "View"}
                        </Button>
                    ) : (
                        <Button
                            className="btn btn-light text-pd bg-pd"
                            disabled
                        >
                            Download
                        </Button>
                    )}
                </Row>
            </Col>
            <Col md={3} xs={6} className="py-4 px-auto text-center">
                <Row className="px-3">
                    {props.sourceCode !== "" ? (
                        <Button
                            className="btn btn-light text-pd bg-pl"
                            onClick={() => {
                                window.location.href = props.sourceCode;
                            }}
                        >
                            Source
                        </Button>
                    ) : (
                        <Button
                            className="btn btn-light text-pd bg-pd"
                            disabled
                        >
                            Source
                        </Button>
                    )}
                </Row>
            </Col>
        </Row>
    );
}

export default function Download(): JSX.Element {
    document.title = "Downloads";

    return (
        <Container id="Download">
            <Row className="justify-content-center mt-5 mt-sm-0">
                <DownloadElement
                    filePath="GameOfLifeWin32.zip"
                    sourceCode="https://github.com/AustinBray77/game-of-life-cpp"
                    className={"anim-speed-1 mt-5 mt-sm-0"}
                >
                    <h3 className="text-sl">Game Of Life Win 32 (Windows)</h3>
                </DownloadElement>
                <DownloadElement
                    filePath="/projects/algo"
                    sourceCode="https://github.com/AustinBray77/austin-bray-react-site/tree/master/src/Pages/Projects/AlgoritmVisualizer"
                    className={"anim-speed-2"}
                >
                    <h3 className="text-sl">Algorithm Visualizer (Web)</h3>
                </DownloadElement>
                <DownloadElement
                    filePath="https://play.google.com/store/apps/details?id=com.SixBeachesGaming.BlockSnake2D"
                    sourceCode="https://github.com/AustinBray77/BlockSnake2D"
                    className={"anim-speed-3"}
                >
                    <h3 className="text-sl">Block Snake 2D (Android)</h3>
                </DownloadElement>
                <DownloadElement
                    filePath=""
                    sourceCode="https://github.com/AustinBray77/ScienceFairProject"
                    className={"anim-speed-4"}
                >
                    <h3 className="text-sl">
                        Brachristochrone AI Pathfinder (N/A)
                    </h3>
                </DownloadElement>
                <DownloadElement
                    filePath="https://github.com/AustinBray77/RSD-Viewer/releases"
                    sourceCode="https://github.com/AustinBray77/RSD-Viewer"
                    className={"anim-speed-5"}
                >
                    <h3 className="text-sl">
                        RSD Viewer (Windows, pending Mac and Linux support)
                    </h3>
                </DownloadElement>
                <DownloadElement
                    filePath="PSD-Viewer-Setup.msi"
                    sourceCode="https://github.com/AustinBray77/PSD-Viewer"
                    className={"anim-speed-6"}
                >
                    <h3 className="text-sl">PSD Viewer (Windows)</h3>
                </DownloadElement>
            </Row>
        </Container>
    );
}
