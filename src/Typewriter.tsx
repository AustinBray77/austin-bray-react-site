import React, { useState, useEffect, useRef } from "react";

const Typewriter = (props: { text: string; speed: number }) => {
	const [currentText, setCurrentText] = useState("");
	const currentStringIndex = useRef(0);
	const [cursorEnabled, setCursorEnabled] = useState(true);

	useEffect(() => {
		if (currentStringIndex.current >= props.text.length) {
			return;
		}

		let timeoutTime = props.speed;

		if (props.text.charCodeAt(currentStringIndex.current - 1) == 32) {
			timeoutTime *= 2;
		}

		const timeoutId = setTimeout(() => {
			setCurrentText(
				(value) => value + props.text.charAt(currentStringIndex.current++)
			);
		}, timeoutTime);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [currentText]);

	useEffect(() => {
		if (currentStringIndex.current >= props.text.length) {
			setCursorEnabled(false);
		}

		const timeoutId = setTimeout(() => {
			setCursorEnabled((value) => !value);
		}, 200);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [cursorEnabled]);

	return (
		<div>
			{currentText}
			{cursorEnabled ? (
				<span id="TypewriterCursor" style={{ fontWeight: "bold" }}>
					_
				</span>
			) : (
				""
			)}
		</div>
	);
};
export default Typewriter;
