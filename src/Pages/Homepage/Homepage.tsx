import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Homepage.css";
import Typewriter from "../../Typewriter";

const LinkButton = (props: {
    children: string | string[] | JSX.Element | JSX.Element[];
    path: string;
}) => {
    const [isHovering, setIsHovering] = useState(false);

    const navigate = useNavigate();

    return (
        <button
            className={
                "LinkButton fs-3 " +
                (isHovering ? "bg-sd text-pl" : "bg-pl text-pd")
            }
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => navigate(props.path)}
        >
            {props.children}
        </button>
    );
};

const IntroductionRow = () => {
    return (
        <Row className="bg-pl text-pd p-5 top-content-row">
            <Col
                md={8}
                xs={12}
                className="text-center text-md-start mt-5 mt-sm-0"
            >
                <h1 className="fw-bold mt-5 mt-md-0 ">
                    <Typewriter speed={100}>
                        Welcome to Austin's Website!
                    </Typewriter>
                </h1>
                <br />
                <p className="fs-4">
                    <Typewriter speed={25}>
                        This website is a hub for viewing all of my projects and
                        progress in the field of computer science. Through this,
                        I hope to give you a look at what I am capable of and
                        what I could possibly do for you.
                    </Typewriter>
                </p>
            </Col>
            <Col md={4} xs={12} className="image-col">
                <Row className="fade-in justify-content-center">
                    <img
                        style={{
                            maxWidth: "250px",
                        }}
                        src="./headshot.jpg"
                    />
                </Row>
            </Col>
        </Row>
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
                            md={6}
                            xs={12}
                            className="text-center text-md-start"
                        >
                            <h1 style={{ fontWeight: "bold" }}>
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
                        <Col md={6} xs={12} className="image-col">
                            <Row className="justify-content-center fade-in">
                                <img src="./citl.png" />
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
                            md={6}
                            xs={12}
                            className="text-center text-md-start"
                        >
                            <h1 style={{ fontWeight: "bold" }}>
                                <Typewriter speed={100}>Projects</Typewriter>
                            </h1>
                            <br />
                            <p className="fs-4 info-paragraph">
                                <Typewriter speed={25}>
                                    I have created many different coding
                                    projects through my 4+ years of programming.
                                    These span from web design to game
                                    development, and from personal to paid
                                    projects. To see all of this visit the
                                    projects page.
                                </Typewriter>
                            </p>
                            <LinkButton path="/projects">
                                <Typewriter speed={100}>
                                    {"See all of my projects ->"}
                                </Typewriter>
                            </LinkButton>
                        </Col>
                        <Col md={6} xs={12} className="image-col">
                            <Row className="fade-in justify-content-center">
                                <img src="./algovisualizer.png" />
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
                        <Col md={6} xs={12} className="image-col">
                            <Row className="fade-in justify-content-center">
                                <img src="./experience.png" />
                            </Row>
                        </Col>
                        <Col md={6} xs={12} className="text-center text-md-end">
                            <h1 style={{ fontWeight: "bold" }}>
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

export default function Homepage(): JSX.Element {
    const spacerRef = useRef<HTMLDivElement>(null);
    const [videoState, setVideoState] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            console.log(entries.length);

            if (entries[0].isIntersecting) {
                setVideoState(1);
            } else {
                setVideoState(0);
            }
        });

        if (spacerRef.current != null) {
            observer.observe(spacerRef.current);
        }
    }, []);

    let iFrameWidth: number =
        (125 * (window.innerHeight * 16)) / (window.innerWidth * 9);

    document.title = "Welcome to Austin's Website!";

    return (
        <Container id="Homepage">
            <iframe
                src="https://www.youtube.com/embed/lRTtMcx6rSM?si=PwEwqr1AbDoQqppL&autoplay=1&mute=1&controls=0&loop=1&amp;showinfo=0"
                title="YouTube video player"
                className={
                    (videoState == 1 ? "hidden" : "") + " youtube-container"
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                style={{
                    width: `${iFrameWidth}vw`,
                }}
            ></iframe>
            <iframe
                src="https://www.youtube.com/embed/y9PTNTSpGJs?autoplay=1&mute=1&controls=0&loop=1&playlist=y9PTNTSpGJs&amp;showinfo=0"
                title="YouTube video player"
                className={
                    (videoState == 0 ? "hidden" : "") + " youtube-container"
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                style={{
                    width: `${iFrameWidth}vw`,
                }}
            ></iframe>
            <IntroductionRow />
            <div className="spacer" ref={spacerRef}></div>
            <FreelanceRow />
            <ProjectRow />
            <div className="spacer"></div>
            <ExperienceRow />
        </Container>
    );
}
