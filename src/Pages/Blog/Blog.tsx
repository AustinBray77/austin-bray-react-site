import React from "react";
import { useParams } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import { getArticle } from "./Articles";
import "./Blog.css";

export default function Blog() {
	const { article } = useParams();

	return (
		<Container id="Blog">
			<Row className="justify-content-center">
				<Col xs={8} className="text-light bg-dark p-4">
					{getArticle(article!)}
				</Col>
			</Row>
		</Container>
	);
}
