import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./AboutMe.css";
import Typewriter from "../../Typewriter";
import { saveAs } from "file-saver";

const AboutMe = (): JSX.Element => {
    document.title = "About Me";

    const [isHovering, setIsHovering] = useState(false);

    return (
        <Container id="AboutMe">
            <Row
                className="justify-content-center"
                style={{ marginTop: "100px" }}
            >
                <div className="mb-5 text-start p-5 bg-pd">
                    <h1>
                        <Typewriter children="About Me" speed={100} />
                    </h1>
                    <br />
                    <div className="fly-in-left anim-speed-2">
                        <h3>Who am I:</h3>
                        <p>
                            Hi, I'm Austin! I am a 18 year old developer from
                            Canada. I love programming, video games, math,
                            science, and chess. I have experience developing in
                            a multitude of languages and environments, alone or
                            in a team, and for work or for fun. Currently I am
                            in my first year of the computer science program at
                            McMaster University and am looking for a co-op
                            position for the Summer of 2024.
                        </p>
                    </div>
                    <br />
                    <div className="fly-in-left anim-speed-3">
                        <h3>My Experience:</h3>
                        <p>
                            I have professional and have been educating on the
                            use of many different programming languages and
                            technologies. I have professional experience with:
                            <ul>
                                <li>C# (Unity, WinForms)</li>
                                <li>Typescript (React.js, Node.js)</li>
                                <li>C++</li>
                                <li>Rust (Tauri)</li>
                            </ul>
                            And I have been formally educated on:
                            <ul>
                                <li>Python (2 Courses)</li>
                                <li>Elm</li>
                                <li>Java</li>
                            </ul>
                        </p>
                    </div>
                    <br />
                    <div className="fly-in-left anim-speed-4">
                        <h3>Why pick me:</h3>
                        <p>
                            As seen from the paragraph, I have the experience
                            and technical knowledge to code (or learn to)
                            anything that you could need me to. However, the
                            real reason you should hire me is because of my
                            drive and passion for programming. I am passionate
                            for creating elegant solutions to problems,
                            personally I believe the art of the solution is just
                            that, an art. There is a beauty to elegant and
                            efficient algorithms and systems, and I am very
                            driven to create this beauty. For you, this means
                            the best product possible; I wouldn't feel right
                            delivering code I didn't think was beatiful and
                            efficient.
                        </p>
                    </div>
                    <button
                        className={
                            "LinkButton mt-5 fs-3 text-light btn-dark " +
                            (isHovering ? "bg-lpitch" : "bg-pitch")
                        }
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onClick={() => {
                            saveAs("AboutMe/resume.pdf", "Austin_Resume.pdf");
                        }}
                    >
                        <Typewriter
                            children="Click here to download my resume"
                            speed={50}
                        />
                    </button>
                </div>
            </Row>
        </Container>
    );
};

export default AboutMe;
