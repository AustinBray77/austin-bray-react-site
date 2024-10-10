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
                            Hi, I'm Austin! I am a 19-year-old developer from
                            Canada. I love programming, video games, and math. I
                            have experience developing in a multitude of
                            languages and environments, alone or in a team, and
                            for work or fun. Currently, I am in my second year
                            of the Honours Computer Science program at McMaster
                            University and I am looking for a co-op position for
                            the Summer of 2025.
                        </p>
                    </div>
                    <br />
                    <div className="fly-in-left anim-speed-3">
                        <h3>My Experience:</h3>
                        <p>
                            I have professional experience with:
                            <ul>
                                <li>Rust (Tauri, Rocket)</li>
                                <li>
                                    Typescript (React.js, Node.js, Express.js)
                                </li>
                                <li>Python (Databricks, Pandas)</li>
                                <li>SQL (Databricks, MySQL)</li>
                                <li>C# (Unity, WinForms)</li>
                                <li>C++</li>
                            </ul>
                            I have been formally educated on:
                            <ul>
                                <li>Python</li>
                                <li>C</li>
                                <li>Java</li>
                                <li>Assembly</li>
                                <li>Elm</li>
                            </ul>
                        </p>
                    </div>
                    <br />
                    <div className="fly-in-left anim-speed-4">
                        <h3>Why pick me:</h3>
                        <p>
                            As seen from my experience, I have a wide breadth of
                            knowledge covering various technologies. I am a
                            quick learner and a self-starter, always creating
                            new projects in the hope of expanding my knowledge.
                            Along with my technical skills, I am a great team
                            player and have experience working in a team
                            environment. So whether you need a solo dev to carry
                            your project, or a new addition to your agile team,
                            I am the right choice for you. If you are interested
                            in my services you can download my resume below or
                            find my contact information on the{" "}
                            <a href="/contact">contact</a> page. I look forward
                            to hearing from you!
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
