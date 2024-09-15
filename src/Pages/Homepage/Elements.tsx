import Typewriter from "../../Typewriter";
import React, { useRef, useState } from "react";
import { useOnScreen } from "../../Hooks";
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
    heightFunc: (size: WindowSizes) => number;
    showSpeed?: number;
    onScreen?: boolean;
};

const RowBody = (props: BodyProps) => {
    const height = props.heightFunc(getWindowSize(window)).toString() + "vh";

    return (
        <p className="fs-4" style={{ height: height }}>
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
        <div className="img-container">
            <img src={props.src} style={props.style} />
        </div>
    );
};

const StandardRow = (props: {
    title: string;
    body: BodyProps;
    button: string;
    path: string;
    img: ImgProps;
    ratio?: number;
}) => {
    const RowRef = useRef<HTMLDivElement>(null);
    const onScreen = useOnScreen(RowRef);

    let ratio = props.ratio ?? 6;

    let imgStyle = props.img.style;

    if (imgStyle === undefined) {
        imgStyle = {};
    }

    imgStyle["height"] =
        props.body.heightFunc(getWindowSize(window)).toString() + "vh";

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
                    heightFunc={props.body.heightFunc}
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
