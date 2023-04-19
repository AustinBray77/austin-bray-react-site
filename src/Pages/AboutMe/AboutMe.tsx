import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./AboutMe.css";
import Typewriter from "../../Typewriter";

const AboutMe = (): JSX.Element => {
	return (
		<Container id="AboutMe">
			<Row
				className="justify-content-center bg-pitch text-light"
				style={{ marginTop: "100px" }}
			>
				<div className="mb-5 text-start p-5">
					<h1>
						<Typewriter text="About Me" speed={100} />
					</h1>
					<br />
					<div className="fly-in-left anim-speed-2">
						<h3>Who am I:</h3>
						<p>
							Hi, I'm Austin! I am a 18 year old developer from Canada. I love
							programming, video games, math, science, and sometimes chess. I
							have experience developing in a multitude of languages and
							environments, alone or in a team, and for work or for fun.
							Currently I serve as the head web master of the{" "}
							<a href="https://chessinthelibrary.com/">
								Chess in the Library organization
							</a>
							, and as freelance web developer working with Tumblewire
							incorporated. I am also a competitive programmer and sometimes
							compete on the{" "}
							<a href="https://dmoj.ca/user/AustinBray05">DMOJ</a> website where
							I am ranked Top 2000 out of 250000 competitve programmers on dmoj
							by rating. I am also currently in school, and go to danforth
							collegiate and technical institute where I am enrolled in the MaST
							(Math, Science and Technology) specialization program.
						</p>
					</div>
					<br />
					<div className="fly-in-left anim-speed-3">
						<h3>Why this:</h3>
						<p>
							I created this website as a way to show off my skills and hold all
							of my projects in one place for people to see. This website is for
							people looking to enjoy themselves but also potential employers
							who want to get a better sense of who I am and my skills.
						</p>
					</div>
					<br />
					<div className="fly-in-left anim-speed-4">
						<h3>Why pick me:</h3>
						<p>
							As seen from my projects, I have a wide range of skills in many
							different programming languages. I am a good solo developer with
							my Block Snake 2D and PSD-Viewer projects, and even this website,
							as good examples of this. But I am also a good team player with my
							Pathfinding AI project and role at Chess in the Library showing
							how I am capable of developing in a team. I am also ruthlessly
							ambitious and ready to make a name for myself, meaning I will
							provide you with the highest quality service possible. With all
							this said, I will only being accepting freelance offers of
							technologies which are already in my repitoir. Those being: C#
							(Unity, Winforms, ASP.NET, Selenium), Java/Typescript (React.js,
							Node.js, Express), C++ (Win32 API, IO Console). If you are
							interest in hiring me for creating an application using one of
							those technologies, please visit the{" "}
							<a href="/Contact">Contact</a> page.
						</p>
					</div>
				</div>
			</Row>
		</Container>
	);
};

export default AboutMe;
