import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Projects.css";
import Project from "./Elements";

enum ContentState {
    Show = "project show-project",
    Hide = "project hide-project",
}

const Dropdown = (props: {
    children: JSX.Element[];
    title: string;
    className?: string;
}): JSX.Element => {
    const [contentState, setContentState] = useState(ContentState.Hide);

    return (
        <Row className={"text-pl anim-speed-1 dropdown-row " + props.className}>
            <button
                className="bg-pl text-pd p-5 no-default"
                onClick={() => {
                    if (contentState === ContentState.Hide) {
                        setContentState(ContentState.Show);
                    } else if (contentState === ContentState.Show) {
                        setContentState(ContentState.Hide);
                    }
                }}
                style={{ zIndex: "1" }}
            >
                <Row>
                    <Col xs={12} md={6}>
                        <h1 className="display-1 fw-lighter">{props.title}</h1>
                    </Col>
                    <Col xs={12} md={6}>
                        <h1 className="display-1">+</h1>
                    </Col>
                </Row>
            </button>
            <div
                className={contentState}
                style={{
                    padding: 0,
                    zIndex: "1",
                }}
            >
                {props.children}
            </div>
        </Row>
    );
};

const ProjRow = (props: {
    children: JSX.Element | JSX.Element[];
    title: string;
    img: string;
    topRow?: boolean;
}): JSX.Element => {
    return (
        <Row>
            <div className="p-5 bg-pd text-pl">
                <Row>
                    <Col sm={12} md={6}>
                        <h1 className="text-start text-sl">{props.title}</h1>
                        {props.children}
                    </Col>
                    <Col
                        sm={12}
                        md={6}
                        className="img-col position-relative text-center"
                    >
                        <img src={props.img} className="rounded img-fluid" />
                    </Col>
                </Row>
            </div>
        </Row>
    );
};

const GameDevDropdown = (): JSX.Element => {
    return (
        <Dropdown title="Game Dev">
            <ProjRow title="Block Snake 2D" img="/blcksnk.png">
                <p>
                    Block Snake 2D is my first major Unity project coded in C#.
                    The goal of this project was to see through the full
                    publication of an app on a major distrubting platform
                    (google play store) and to develop a game for android
                    through Unity, which I had not done before. I believe I was
                    successful in both of these goals and it really taught me
                    alot about how much it actaully takes to make a fully
                    functioning app and how to push it to production. To
                    download and play Block Snake 2D , click{" "}
                    <a href="https://play.google.com/store/apps/details?id=com.SixBeachesGaming.BlockSnake2D">
                        here
                    </a>
                    . To see the source code for this project, go to the source
                    code page.
                </p>
            </ProjRow>
            <ProjRow title="Conway's Game Of Life" img="/gameoflife(temp).png">
                <p>
                    A replication of conway's game of life was another one of my
                    major projects. I used to C++ and the WIN 32 Api for windows
                    to create this project. My goal from this project was to
                    learn more about object oriented C++ and the WIN 32 Api,
                    which I believe I was successful in doing. To use this
                    project simply go to the <a href="/download">downloads</a>{" "}
                    page and download it from there, it is only available for
                    windows computers.
                </p>
            </ProjRow>
        </Dropdown>
    );
};

const WebDevDropdown = (): JSX.Element => {
    return (
        <Dropdown title="Web Dev">
            {/* <Project
                project={{
                    logo: "/rsd_icon.png",
                    name: "RSD-Viewer",
                    link: "/about-me",
                }}
                technologies={[
                    {
                        logo: "/rsd_icon.png",
                        name: "Rust",
                        link: "https://www.rust-lang.org/",
                    },
                    {
                        logo: "/rsd_icon.png",
                        name: "React",
                        link: "https://reactjs.org/",
                    },
                    {
                        logo: "/rsd_icon.png",
                        name: "Typescript",
                        link: "https://www.typescriptlang.org/",
                    },
                    {
                        logo: "/rsd_icon.png",
                        name: "Tailwind",
                        link: "https://tailwindcss.com/",
                    },
                ]}
                information={{
                    mainFeatures: [
                        "Secure password storage",
                        "Cross platform",
                        "Easy to use",
                    ],
                    mostProudOf: [
                        "Learning React",
                        "Learning Tailwind",
                        "Learning Rust",
                    ],
                }}
            ></Project> */}
            <ProjRow title="Chess In The library" img="/citl.png">
                <p>
                    <a href="https://www.chessinthelibrary.com">
                        Chees In The Library.com
                    </a>{" "}
                    is a wordpress site used to manage a chess club in Toronto.
                    I am not the creator of this site but I have been the
                    manager of it since August 2021. This is not a paid position
                    as I am working as a volunteer. Through this I have learned
                    alot about wordpress as well as managing and hosting a
                    website.
                </p>
            </ProjRow>
            <ProjRow title="Algorithm Visualizer" img="/algovisualizer.png">
                <p>
                    Algorithm Visualizer is a visual grid interface allowing
                    beginner students to learn about how different search
                    algorithms work. This also includes a visualization for a
                    custom maze generation algorithm. I used React and
                    Typescript to create this project. My goal with this project
                    was to practice different search algorithms and learning
                    about creating a practical user interface. To use this
                    project, click <a href="/projects/algo">here</a>. To see the
                    source code for this project, visit the{" "}
                    <a href="/download">downloads</a> page.
                </p>
            </ProjRow>
        </Dropdown>
    );
};

const DesktopDevDropdown = (): JSX.Element => {
    return (
        <Dropdown title="Desktop Dev">
            <ProjRow
                title="RSD-Viewer (Password Manager 2.0)"
                img="/rsd_icon.png"
            >
                <p>
                    To expand my knowledge base, I decided to rebuild my
                    original password viewer project in the tauri framework. For
                    the back end rust was used as is standard with tauri apps,
                    for the front end I used React JS, Typescript, and tailwind
                    which was new for me. Through this I learned more about
                    front and back end communication, building windows apps and
                    installers, as well as Rust and tailwind. The app is
                    currently under LTS and still has active updates, to
                    download or view the source code, visit the{" "}
                    <a href="/download">downloads</a> page.
                </p>
            </ProjRow>
            <ProjRow title="Password Manager" img="/psdviewer.png">
                <p>
                    As a project for myself, I created a tool to manage and
                    encrypt my passwords. The goal of this project was to create
                    a secure desktop appliction with a practical and effective
                    use. This was built using the WinForms library using the C#
                    programming language. To use this project or download the
                    source code, visit the <a href="/download">downloads</a>{" "}
                    page.
                </p>
            </ProjRow>
        </Dropdown>
    );
};

const AIDropdown = (): JSX.Element => {
    return (
        <Dropdown title="AI">
            <ProjRow title="Pathfinding AI" img="/AI.png">
                <p>
                    For my grade 11 physics class, I was instructed to create an
                    experiment which incorporated the concepts of physics for a
                    science fair. What my partner and I decided to do was create
                    a machine learning algorithm and see if it could solve for
                    the brachistochrone curve. We accomplished this by placing
                    it in an environment where there was a ball and an endpoint,
                    and the goal of the AI was to draw a path or ramp that would
                    cause the ball to reach the endpoint. If the AI worked
                    correctly this would eventually result in the
                    brachistochrone curve bein generated. Our AI was able to
                    solve for something close to this, but there were some bugs
                    in our training so it was imcomplete. This was accomplished
                    using the Unity Physics Engine (game engine) and the
                    TensorFlow library, and it was all done in C#. To see the
                    report for this project, click{" "}
                    <a href="https://docs.google.com/document/d/1WCK0FexNg3sInjDyLThfPBmfUKq7GCzCT0iAbQmWQQg/edit?usp=sharing">
                        here
                    </a>
                    . To see the source code for this project, visit the{" "}
                    <a href="/download">downloads</a> page.
                </p>
            </ProjRow>
            <></>
        </Dropdown>
    );
};

export default function Projects(): JSX.Element {
    document.title = "Projects";

    return (
        <Container id="Projects">
            <div className="mt-6 mt-sm-0">
                <WebDevDropdown />
            </div>
            <DesktopDevDropdown />
            <AIDropdown />
            <GameDevDropdown />
        </Container>
    );
}
