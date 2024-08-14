import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Homepage.css";
import Typewriter from "../../Typewriter";
import { LinkButton, StandardRow } from "./Elements";
import { WindowSizes } from "../../Sizing";

const IntroductionRow = () => {
    return (
        <Row className="bg-pl text-pd p-5 top-content-row">
            <Col
                lg={8}
                xs={12}
                className="text-center text-lg-start mt-4 mt-sm-0"
            >
                <h1 className="fw-bold mt-5 mt-md-0">
                    <Typewriter speed={100}>Hi, I'm Austin.</Typewriter>
                </h1>
                <br />
                <p className="fs-4 vh-lg-35">
                    <Typewriter speed={25}>
                        I am a student at McMaster University currently entering
                        my second year in the Computer Science program. My
                        experience includes working as a QA Analyst (Co-Op) with
                        CIBC and as a Software Developer (Part-Time) with
                        Tumblewire Inc. To learn more about me, click below or
                        keep scrolling!
                    </Typewriter>
                </p>
                <LinkButton path="/about-me">
                    <Typewriter speed={100}>
                        {"Learn more about me ->"}
                    </Typewriter>
                </LinkButton>
            </Col>
            <Col lg={4} xs={12} className="image-col">
                <Row className="fade-in justify-content-center">
                    <div className="img-container">
                        <img src="./headshot.jpg" style={{ height: "45vh" }} />
                    </div>
                </Row>
            </Col>
        </Row>
    );
};

const NewIntro = () => {
    return (
        <StandardRow
            title="Hi, I'm Austin."
            body={{
                heightFunc: (size: WindowSizes) => {
                    console.log("Called");
                    if (size < WindowSizes.XS) {
                        return 45;
                    }
                    if (size < WindowSizes.MD) {
                        return 35;
                    }

                    return 40;
                },
                children:
                    "I am a student at McMaster University currently entering my second year in the Computer Science program. My experience includes working as a QA Analyst (Co-Op) with CIBC and as a Software Developer (Part-Time) with Tumblewire Inc. To learn more about me, click below or keep scrolling!",
            }}
            button="Learn more about me ->"
            path="/about-me"
            img={{ src: "./headshot.jpg", style: { height: "45vh" } }}
            ratio={8}
        />
    );
};

const FreelanceRow = () => {
    const FreelanceRef = useRef<HTMLDivElement>(null);
    const [animateFreelanceRow, setAnimateFreelanceRow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            let entry = entries[0];
            if (entry.isIntersecting) {
                setAnimateFreelanceRow(true);
            }
        });

        if (FreelanceRef.current != null) {
            observer.observe(FreelanceRef.current);
        }
    }, []);

    return (
        <div ref={FreelanceRef} className="content-row">
            <Row className="bg-pl text-pd p-5">
                {animateFreelanceRow ? (
                    <>
                        {" "}
                        <Col
                            lg={6}
                            xs={12}
                            className="text-center text-lg-start"
                        >
                            <h1 className="fw-bold">
                                <Typewriter speed={100}>
                                    Your Website, Your Way
                                </Typewriter>
                            </h1>
                            <br />
                            <p className="fs-4 info-paragraph">
                                <Typewriter speed={25}>
                                    I have plenty of experience creating various
                                    beatiful websites for my self and for
                                    others. To learn more on what I can do for
                                    you and the services I offer, visit my
                                    freelancing page.
                                </Typewriter>
                            </p>
                            <LinkButton path="/freelance">
                                <Typewriter
                                    children={"See what I can do for you ->"}
                                    speed={100}
                                />
                            </LinkButton>
                        </Col>
                        <Col lg={6} xs={12} className="image-col">
                            <Row className="justify-content-center fade-in">
                                <div className="img-container">
                                    <img src="./citl.png" />
                                </div>
                            </Row>
                        </Col>{" "}
                    </>
                ) : (
                    ""
                )}
            </Row>
        </div>
    );
};

const ProjectRow = () => {
    const ProjectsRef = useRef<HTMLDivElement>(null);
    const [animateProjectsRow, setAnimateProjectsRow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            let entry = entries[0];
            if (entry.isIntersecting) {
                setAnimateProjectsRow(true);
            }
        });

        if (ProjectsRef.current != null) {
            observer.observe(ProjectsRef.current);
        }
    }, []);

    return (
        <div ref={ProjectsRef} className="content-row">
            <Row className="bg-pl text-pd p-5">
                {animateProjectsRow ? (
                    <>
                        {" "}
                        <Col
                            lg={6}
                            xs={12}
                            className="text-center text-lg-start"
                        >
                            <h1 className="fw-bold">
                                <Typewriter speed={100}>My Projects</Typewriter>
                            </h1>
                            <br />
                            <p className="fs-4 vh-lg-40 vh-sm-30 vh-xs-45">
                                <Typewriter speed={25}>
                                    During my spare time I like to experiment
                                    and learn new technologies by creating
                                    projects. Through this, I have crossed many
                                    fields of software development. I have
                                    projects in web development, desktop
                                    development, AI modeling, game development,
                                    and more. To view my projects click below!
                                </Typewriter>
                            </p>
                            <LinkButton path="/projects">
                                <Typewriter speed={100}>
                                    {"See all of my projects ->"}
                                </Typewriter>
                            </LinkButton>
                        </Col>
                        <Col lg={6} xs={12} className="image-col">
                            <Row className="fade-in justify-content-center">
                                <div className="img-container">
                                    <img src="./algovisualizer.png" />
                                </div>
                            </Row>
                        </Col>{" "}
                    </>
                ) : (
                    ""
                )}
            </Row>
        </div>
    );
};

const ExperienceRow = () => {
    const ExperienceRef = useRef<HTMLDivElement>(null);
    const [animateExperienceRow, setAnimateExperienceRow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            let entry = entries[0];
            if (entry.isIntersecting) {
                setAnimateExperienceRow(true);
            }
        });

        if (ExperienceRef.current != null) {
            observer.observe(ExperienceRef.current);
        }
    }, []);

    return (
        <div ref={ExperienceRef} className="content-row">
            <Row className="bg-pl text-pd p-5">
                {animateExperienceRow ? (
                    <>
                        <Col lg={6} xs={12} className="image-col">
                            <Row className="fade-in justify-content-center">
                                <div className="img-container">
                                    <img src="./experience.png" />
                                </div>
                            </Row>
                        </Col>
                        <Col lg={6} xs={12} className="text-center text-lg-end">
                            <h1 className="fw-bold">
                                <Typewriter speed={100}>
                                    Experience and Resume
                                </Typewriter>
                            </h1>
                            <br />
                            <p className="fs-4 info-paragraph">
                                <Typewriter speed={25}>
                                    I have experience working with C#, C++,
                                    Java, Javascript, and Python, among other
                                    languages. I also have experience working
                                    with many different technologies involved
                                    with this languages such as Unity, the MERN
                                    stack, WIN32 etc. To get more about my
                                    expierence and skills check out my resume.
                                </Typewriter>
                            </p>
                            <LinkButton path="/about-me">
                                <Typewriter speed={100}>
                                    {"View more and my resume ->"}
                                </Typewriter>
                            </LinkButton>
                        </Col>
                    </>
                ) : (
                    ""
                )}
            </Row>
        </div>
    );
};

enum BackgroundState {
    Video1,
    Video2,
}

export default function Homepage(): JSX.Element {
    const spacerRef = useRef<HTMLDivElement>(null);
    const [videoState, setVideoState] = useState(BackgroundState.Video1);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            let topSpacer = entries[0];

            if (topSpacer.isIntersecting) {
                setVideoState(BackgroundState.Video1);
            } else {
                setVideoState(BackgroundState.Video2);
            }
        });

        if (spacerRef.current != null) {
            observer.observe(spacerRef.current);
        }
    }, []);

    let iFrameWidth: number = useMemo(() => {
        return (200 * (window.innerHeight * 16)) / (window.innerWidth * 9);
    }, [window.innerWidth, window.innerHeight]);

    document.title = "Welcome to Austin's Website!";

    let video1State = videoState === BackgroundState.Video1 ? "hidden" : "";
    let video2State = videoState === BackgroundState.Video2 ? "hidden" : "";

    return (
        <Container id="Homepage">
            <iframe
                src="https://www.youtube.com/embed/lRTtMcx6rSM?si=PwEwqr1AbDoQqppL&autoplay=1&mute=1&controls=0&loop=1&amp;showinfo=0"
                title="YouTube video player"
                className={video1State + " youtube-container"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                style={{
                    width: `${iFrameWidth}vw`,
                    left: `${(100 - iFrameWidth) / 2}vw`,
                }}
            ></iframe>
            <iframe
                src="https://www.youtube.com/embed/y9PTNTSpGJs?autoplay=1&mute=1&controls=0&loop=1&playlist=y9PTNTSpGJs&amp;showinfo=0"
                title="YouTube video player"
                className={video2State + " youtube-container"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                style={{
                    width: `${iFrameWidth}vw`,
                    left: `${(100 - iFrameWidth) / 2}vw`,
                }}
            ></iframe>
            <NewIntro />
            <div className="spacer" ref={spacerRef}></div>
            <ProjectRow />
            <FreelanceRow />
            <div className="spacer"></div>
            <ExperienceRow />
        </Container>
    );
}
