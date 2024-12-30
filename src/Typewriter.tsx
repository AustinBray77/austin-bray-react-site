import React, { useState, useEffect, useRef } from "react";

const Typewriter = (props: {
    children: string;
    speed: number;
    shouldPlay?: boolean;
}) => {
    const [currentText, setCurrentText] = useState("");
    const currentStringIndex = useRef(0);
    const [cursorEnabled, setCursorEnabled] = useState(true);

    useEffect(() => {
        if (currentStringIndex.current >= props.children.length) {
            return;
        }

        let timeoutTime = props.speed;

        if (props.children.charCodeAt(currentStringIndex.current - 1) === 32) {
            timeoutTime *= 2;
        }

        const timeoutId = setTimeout(() => {
            if (props.shouldPlay !== undefined && !props.shouldPlay) {
                return;
            }

            setCurrentText(
                (value) =>
                    value + props.children.charAt(currentStringIndex.current++)
            );
        }, timeoutTime);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [currentStringIndex.current, props.shouldPlay]);

    useEffect(() => {
        if (currentStringIndex.current >= props.children.length) {
            return;
        }

        const timeoutId = setTimeout(() => {
            if (props.shouldPlay !== undefined && !props.shouldPlay) {
                return;
            }

            setCursorEnabled((value) => !value);
        }, 200);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [cursorEnabled, props.shouldPlay]);

    return (
        <div>
            {currentText}
            {cursorEnabled &&
            currentStringIndex.current < props.children.length ? (
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
