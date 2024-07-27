import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Contact.css";
import Typewriter from "../../Typewriter";

export default function Contact(): JSX.Element {
    document.title = "Contact Austin";

    return (
        <Container id="Contact">
            <Row style={{ marginTop: "200px" }}>
                <Col className="bg-pd p-5 text-light" xs={12}>
                    <h1>
                        <Typewriter children={"Contact Austin:"} speed={100} />
                    </h1>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(
                                "austin.bray77@gmail.com"
                            );
                            alert(
                                '"austin.bray77@gmail.com" copied to clipboard!'
                            );
                        }}
                        className="fly-in-left"
                    >
                        <img src="../Contact/email-icon.png" />
                    </button>
                    <a
                        href="https://github.com/AustinBray77"
                        className="margin-slide-right anim-speed-2"
                    >
                        <img src="../Contact/gh.png" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/austin-bray-63061522b/"
                        className="margin-slide-right anim-speed-3"
                    >
                        <img src="../Contact/linkedin-icon.png" />
                    </a>
                    <a
                        href="https://www.paypal.com/donate/?business=M9JLUXRAW3GKS&no_recurring=0&item_name=Help+keep+Austin+Bray+.com+free+by+donating+to+help+with+development+and+server+costs.&currency_code=CAD"
                        className="margin-slide-right anim-speed-4"
                    >
                        <img src="../Contact/paypal-icon.png" />
                    </a>
                    <a
                        href="https://www.fiverr.com/austinbraysbg"
                        className="margin-slide-right anim-speed-5"
                    >
                        <img src="../Contact/fiverr-icon.png" />
                    </a>
                    <a
                        href="https://www.freelancer.com/u/AustinBraySBG"
                        className="margin-slide-right anim-speed-6"
                    >
                        <img src="../Contact/freelancer-icon.png" />
                    </a>
                </Col>
            </Row>
        </Container>
    );
}
