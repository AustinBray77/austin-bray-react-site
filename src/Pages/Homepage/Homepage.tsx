import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Homepage.css";
import Typewriter from "../../Typewriter";
import { LinkButton, StandardRow } from "./Elements";
import { WindowSizes } from "../../Sizing";
import { useOnScreen } from "../../Hooks";

const IntroductionRow = () => {
    return (
        <StandardRow
            title="Hi, I'm Austin."
            heightFunc={(size: WindowSizes): number => {
                if (size == WindowSizes.XS) {
                    return 25;
                }
                if (size == WindowSizes.MD) {
                    return 7.5;
                }

                return 10;
            }}
            body={{
                children:
                    "I am a student at McMaster University currently entering my second year in the Computer Science program. My experience includes working as a QA Analyst (Co-Op) with CIBC and as a Software Developer (Part-Time) with Tumblewire Inc. To learn more about me, click below or keep scrolling!",
            }}
            button="Learn more about me ->"
            path="/about-me"
            img={{ src: "./headshot.jpg" }}
            ratio={8}
        />
    );
};

const ProjectRow = () => {
    return (
        <StandardRow
            title="My Projects"
            heightFunc={(size: WindowSizes): number => {
                if (size == WindowSizes.XS) {
                    return 25;
                }
                if (size <= WindowSizes.MD) {
                    return 7.5;
                }

                return 10;
            }}
            body={{
                children:
                    "During my spare time I like to experiment and learn new technologies by creating projects. Through this, I have crossed many fields of software development. I have projects in web development, desktop development, AI modeling, game development, and more. To view my projects click below!",
            }}
            button="See all of my projects ->"
            path="/projects"
            img={{ src: "./algovisualizer.png" }}
            ratio={6}
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
                                    beautiful websites for my self and for
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

    const videoState = useOnScreen(spacerRef)
        ? BackgroundState.Video2
        : BackgroundState.Video1;

    let iFrameWidth: number = useMemo(() => {
        return (200 * (window.innerHeight * 16)) / (window.innerWidth * 9);
    }, [window.innerWidth, window.innerHeight]);

    document.title = "Welcome to Austin's Website!";

    let video1State = videoState === BackgroundState.Video2 ? "hidden" : "";
    let video2State = videoState === BackgroundState.Video1 ? "hidden" : "";

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
            <IntroductionRow />
            <div className="spacer" ref={spacerRef}></div>
            <ProjectRow />
            <FreelanceRow />
            <div className="spacer"></div>
            <ExperienceRow />
        </Container>
    );
}
