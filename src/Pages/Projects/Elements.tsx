import { Col, Container, Row } from "react-bootstrap";

type Technology = {
    logo: string;
    name: string;
    link: string;
};

type Information = {
    mainFeatures: string[];
    mostProudOf: string[];
};

const ProjectInfo = (props: { information: Information }): JSX.Element => {
    return (
        <Row>
            <Col xs={6}></Col>
            <Col xs={6}></Col>
        </Row>
    );
};

const ProjectHeader = (props: {
    project: Technology;
    technologies: Technology[];
}): JSX.Element => {
    const displayTechnologies = props.technologies.map((technology) => {
        return (
            <a
                href={technology.link}
                target="_blank"
                rel="noreferrer"
                style={{ flex: 1, textAlign: "center" }}
            >
                <img
                    src={technology.logo}
                    alt={technology.name}
                    style={{ height: "15vh" }}
                />
            </a>
        );
    });

    return (
        <Row>
            <Col
                xs={4}
                className="d-flex align-items-center justify-content-center"
            >
                <img
                    src={props.project.logo}
                    alt={props.project.name}
                    style={{ height: "30vh " }}
                />
            </Col>
            <Col xs={8}>
                <Row>
                    <h1
                        className="display-1"
                        style={{ flex: 1, textAlign: "center" }}
                    >
                        {props.project.name}
                    </h1>
                </Row>
                <Row>{displayTechnologies}</Row>
            </Col>
        </Row>
    );
};

const Project = (props: {
    project: Technology;
    technologies: Technology[];
    information: Information;
}): JSX.Element => {
    return (
        <div id={props.project.name} className="bg-pd text-pl p-5">
            <ProjectHeader
                project={props.project}
                technologies={props.technologies}
            />
            <ProjectInfo information={props.information} />
        </div>
    );
};

export default Project;
