import React, { EventHandler, MouseEventHandler, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { finished } from "stream";
import "./DecompressionQuiz.css";

class Question {
	question: string;
	answers: string[];
	correct: number;

	constructor(q: string, a: string[], c: number) {
		this.question = q;
		this.answers = a;
		this.correct = c;
	}

	getQuestion() {
		return this.question;
	}

	getAnswers() {
		return this.answers;
	}
}

const questions = [
	new Question(
		"When can you get decompression sickness?",
		[
			"When moving from low to high pressure too quickly",
			"When moving from high to low pressure too quickly",
			"When using instagram while driving",
			"When re-entering earth's orbit from space",
		],
		1
	),
	new Question(
		"What is Nitrogen soluble in?",
		["Water", "Fat", "Both", "Neither"],
		2
	),
	new Question(
		"What are the notable symptoms of severe decompression sickness?",
		["Rashes", "Paralysis", "Expansion of limbs", "Brain Contusions"],
		1
	),
	new Question(
		"True or False: Decompression sickness commonly occurs in commercial airplanes",
		["True", "False"],
		1
	),
	new Question(
		"True or False: Rapid pressure changes affects all gases in the body",
		["True", "False"],
		0
	),
	new Question(
		"What is the equation for the chemical equilibrium for decompression sickness?",
		[
			"N2(g) <=> N2(aq) && He(g) <=> He(aq)",
			"Fr(s) <=> Fr(g)",
			"N2(g) <=> N2(aq)",
			"H2(g) <=> H2(aq)",
		],
		0
	),
	new Question(
		"What is NOT a way to treat decompression sickness?",
		[
			"Drink lots of fluids",
			"Hyberbaric Oxygen Therapy",
			"Rest",
			"Take ibuprofen or acetaminophen",
		],
		3
	),
	new Question(
		"What else is decompression sickness also called?",
		["Diver Sickness", "The Bends", "Diver's Brain", "The Sickness"],
		1
	),
];

export default function DecompressionQuiz(): JSX.Element {
	const [incorrectAnswers, updateAnswersWrong] = useState(0);
	const [buttonClicked, updateButtonClicked] = useState(-1);
	const [ranQuestionOrder, updateQuestionOrder] = useState([-1]);
	const [currentQuestionIndex, updateCurrentQuestionIndex] = useState(-1);
	const [showNextButton, updateShowNextButton] = useState(false);
	const [showRestartButton, updateShowRestartButton] = useState(false);
	const [moveBackground, updateMoveBackground] = useState(false);
	const [isFinished, updateFinished] = useState(false);

	const generateQuestions = (): number[] => {
		let questionOrder: number[] = Array.from(Array(questions.length).keys());
		let randomizedQuestions: number[] = [];

		for (let i = 0; i < 5; i++) {
			randomizedQuestions.push(
				questionOrder.splice(
					Math.floor(Math.random() * questionOrder.length),
					1
				)[0]
			);
		}

		return randomizedQuestions;
	};

	const OnClickAnswerCorrect = (button: number) => {
		updateButtonClicked(button);
		updateShowNextButton(true);
	};

	const OnClickAnswerIncorrect = (button: number) => {
		updateButtonClicked(button);
		updateAnswersWrong(incorrectAnswers + 1);

		if (incorrectAnswers < 1) {
			updateShowNextButton(true);
		} else {
			updateShowRestartButton(true);
		}
	};

	const NextQuestion = () => {
		var newQuestionOrder = ranQuestionOrder;

		let newIndex = newQuestionOrder.splice(0, 1)[0];
		if (newIndex == undefined) {
			console.log(newQuestionOrder);
			alert(newQuestionOrder[0]);
			return;
		}

		updateCurrentQuestionIndex(newIndex);
		updateQuestionOrder(newQuestionOrder);
		updateShowNextButton(false);
		updateButtonClicked(-1);
		updateMoveBackground(true);
	};

	const Restart = () => {
		let randomizedQuestions = generateQuestions();
		updateCurrentQuestionIndex(randomizedQuestions.splice(0, 1)[0]);
		updateQuestionOrder(randomizedQuestions);
		updateAnswersWrong(0);
		updateShowNextButton(false);
		updateShowRestartButton(false);
		updateButtonClicked(-1);
		updateFinished(false);
	};

	const Finish = () => {
		updateMoveBackground(true);
		updateFinished(true);
	};

	const LoadQuestion = (index: number): JSX.Element[] => {
		let output: JSX.Element[] = [];

		console.log(index);
		console.log(questions[index].question);

		output.push(<h1>{questions[index].question}</h1>);

		for (let i: number = 0; i < questions[index].answers.length; i++) {
			let x = i;

			output.push(
				<Row className="my-5">
					<Button
						onClick={
							questions[index].correct == i
								? () => OnClickAnswerCorrect(x)
								: () => OnClickAnswerIncorrect(x)
						}
						variant={
							(buttonClicked != i && questions[index].correct != i) ||
							buttonClicked == -1
								? "primary"
								: buttonClicked == i && questions[index].correct != i
								? "danger"
								: "success"
						}
					>
						{questions[index].answers[i]}
					</Button>
				</Row>
			);
		}

		if (showNextButton) {
			output.push(
				<Row className="my-5">
					<Col xs={8}></Col>
					<Col xs={4}>
						<Button
							onClick={ranQuestionOrder.length > 0 ? NextQuestion : Finish}
						>
							{ranQuestionOrder.length > 0 ? "Next Question" : "Finish"}
						</Button>
					</Col>
				</Row>
			);
		} else if (showRestartButton) {
			output.push(
				<Row className="my-5">
					<Col xs={8}></Col>
					<Col xs={4}>
						<Button onClick={Restart}>Restart</Button>
					</Col>
				</Row>
			);
		}

		return output;
	};

	if (ranQuestionOrder[0] == -1 || currentQuestionIndex == -1) {
		let randomizedQuestions = generateQuestions();
		console.log(randomizedQuestions);
		updateCurrentQuestionIndex(randomizedQuestions.splice(0, 1)[0]);
		updateQuestionOrder(randomizedQuestions);
	}
	return (
		<Container
			id="DecompQuiz"
			className={
				"text-light " +
				(moveBackground && isFinished
					? "move-bg-fin"
					: moveBackground
					? "move-bg-" + (4 - ranQuestionOrder.length)
					: isFinished
					? "bg-pos-fin"
					: "bg-pos-" + (4 - ranQuestionOrder.length))
			}
			onAnimationEnd={() => {
				updateMoveBackground(false);
			}}
		>
			{!isFinished || moveBackground ? (
				<Row className={isFinished ? "row-fin" : ""}>
					<Col xs={6} className="p-5">
						{currentQuestionIndex != -1
							? LoadQuestion(currentQuestionIndex)
							: ""}
					</Col>
					<Col xs={6}>
						<Row>
							<Col xs={8}>
								<img
									src={"/DecompressionQuiz/diver" + incorrectAnswers + ".png"}
									width={600}
									height={400}
								/>
							</Col>
							<Col xs={4} className="py-5">
								<h1>Depth {ranQuestionOrder.length + 1}00m.</h1>
							</Col>
						</Row>
						<Row>
							{incorrectAnswers == 1 ? (
								<div>
									<h3>
										Oh no, you answered a question wrong so you ascended too
										quickly.
									</h3>
									<h3>
										You are currently experiencing minor symptoms like
										inflammation in muscle and joints, rashes, trouble with
										balance, fatigue, joint & muscle pain, weakened urinary
										tract.
									</h3>
								</div>
							) : incorrectAnswers == 2 ? (
								<div>
									<h3>
										Oh no, you answered another question wrong so you ascended
										too quickly again.
									</h3>
									<h3>
										You are now paralyzed and are unable to continue ascending,
										causing you to drown as your air tank runs out.
									</h3>
								</div>
							) : (
								<div></div>
							)}
						</Row>
					</Col>
				</Row>
			) : (
				<div className="text-dark text-center py-5">
					<h1>
						Congrats you completed the quiz with a {5 - incorrectAnswers}/5 and
						survived!
					</h1>
					<img src="/DecompressionQuiz/capy.gif" />
					<h3>You still not this cool tho</h3>
				</div>
			)}
		</Container>
	);
}
