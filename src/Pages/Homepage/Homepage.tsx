import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import "./Homepage.css";
import { StandardRow } from "./Elements";
import { WindowSizes } from "../../Sizing";
import { useOnResize, useOnScreen } from "../../Hooks";

const IntroductionRow = () => {
    return (
        <StandardRow
            title="Hi, I'm Austin."
            heightFunc={(size: WindowSizes): number => {
                if (size === WindowSizes.XS) {
                    return 17.5;
                }
                if (size === WindowSizes.MD) {
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
            img={{ src: "./headshot.jpg", style: { height: "20em" } }}
            ratio={8}
        />
    );
};

const ProjectRow = () => {
    return (
        <StandardRow
            title="My Projects"
            heightFunc={(size: WindowSizes): number => {
                if (size === WindowSizes.XS) {
                    return 17.5;
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
    return (
        <StandardRow
            title="Your Website, Your way"
            heightFunc={(size: WindowSizes): number => {
                if (size === WindowSizes.XS) {
                    return 10;
                }
                if (size <= WindowSizes.MD) {
                    return 7.5;
                }

                return 10;
            }}
            body={{
                children:
                    "I have plenty of experience creating various beautiful websites for my self and for others. To learn more on what I can do for you and the services I offer, visit my freelancing page.",
            }}
            button="See what I can do for you ->"
            path="/freelance"
            img={{ src: "./citl.png" }}
            ratio={6}
        />
    );
};

const ExperienceRow = () => {
    return (
        <StandardRow
            title="Experience and Resume"
            heightFunc={(size: WindowSizes): number => {
                if (size === WindowSizes.XS) {
                    return 15;
                }
                if (size <= WindowSizes.MD) {
                    return 7.5;
                }

                return 10;
            }}
            body={{
                children:
                    "I have experience working with Python and JavaScript professionally, along with projects using TypeScript, Rust, C#, and more. I mostly build web apps, desktop apps, and sometimes games. To see more about my experience and my resume, click below!",
            }}
            button="View more and my resume ->"
            path="/about-me"
            img={{ src: "./experience.png" }}
            ratio={6}
            reversed
        />
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

    const calculateIFrameWidth = (window: Window): number => {
        console.log("Calculating iFrame width");

        return (200 * (window.innerHeight * 16)) / (window.innerWidth * 9);
    };

    let iFrameWidth: number = useOnResize(
        calculateIFrameWidth,
        calculateIFrameWidth(window)
    );

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
            <div className="mt-8 mt-sm-0">
                <IntroductionRow />
            </div>
            <div className="spacer" ref={spacerRef}></div>
            <ProjectRow />
            <FreelanceRow />
            <div className="spacer"></div>
            <ExperienceRow />
        </Container>
    );
}
