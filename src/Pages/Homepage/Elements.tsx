import Typewriter from "../../Typewriter";
import React, { useRef, useState } from "react";
import { useOnScreen, useRecalculateHeight } from "../../Hooks";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getWindowSize, WindowSizes } from "../../Sizing";

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

const RowTitle = (props: {
    children: string;
    showSpeed?: number;
    onScreen?: boolean;
}) => {
    return (
        <h1 className="fw-bold">
            <Typewriter
                speed={props.showSpeed ?? 100}
                shouldPlay={props.onScreen ?? true}
            >
                {props.children}
            </Typewriter>
        </h1>
    );
};

type BodyProps = {
    children: string;
    height?: string;
    showSpeed?: number;
    onScreen?: boolean;
};

const RowBody = (props: BodyProps) => {
    return (
        <p className="fs-4" style={{ height: props.height }}>
            <Typewriter
                speed={props.showSpeed ?? 25}
                shouldPlay={props.onScreen ?? true}
            >
                {props.children}
            </Typewriter>
        </p>
    );
};

const RowButton = (props: {
    children: string;
    path: string;
    showSpeed?: number;
    onScreen?: boolean;
}) => {
    return (
        <LinkButton path={props.path}>
            <Typewriter
                speed={props.showSpeed ?? 100}
                shouldPlay={props.onScreen ?? true}
            >
                {props.children}
            </Typewriter>
        </LinkButton>
    );
};

type ImgProps = {
    src: string;
    style?: React.CSSProperties;
};

const RowImage = (props: ImgProps) => {
    return (
        <div className="img-container mt-4 mt-lg-0">
            <img src={props.src} style={props.style} />
        </div>
    );
};

const StandardRow = (props: {
    title: string;
    body: BodyProps;
    heightFunc: (window: WindowSizes) => number;
    button: string;
    path: string;
    img: ImgProps;
    ratio?: number;
}) => {
    const RowRef = useRef<HTMLDivElement>(null);
    const onScreen = useOnScreen(RowRef);
    const height = useRecalculateHeight(props.heightFunc, 10).toString() + "em";

    let ratio = props.ratio ?? 6;

    let imgStyle = props.img.style;

    if (imgStyle === undefined) {
        imgStyle = {};
    }

    imgStyle["height"] = "20em";

    return (
        <Row className="bg-pl text-pd p-5 top-content-row" ref={RowRef}>
            <Col
                lg={ratio}
                xs={12}
                className="text-center text-lg-start mt-4 mt-sm-0"
            >
                <RowTitle onScreen={onScreen}>{props.title}</RowTitle>
                <br />
                <RowBody
                    height={height}
                    showSpeed={props.body.showSpeed}
                    onScreen={onScreen}
                >
                    {props.body.children}
                </RowBody>
                <RowButton path={props.path} onScreen={onScreen}>
                    {props.button}
                </RowButton>
            </Col>
            <Col lg={12 - ratio} xs={12} className="image-col">
                <Row className="fade-in justify-content-center">
                    <RowImage src={props.img.src} style={imgStyle} />
                </Row>
            </Col>
        </Row>
    );
};

export { StandardRow, LinkButton };
