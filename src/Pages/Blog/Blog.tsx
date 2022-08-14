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
					<div className="mb-5">
						<h3>
							Thank you for reading! - Help keep education free by donating to
							our paypal, information on the <a href="/contact">contact</a>{" "}
							page.
						</h3>
					</div>
				</Col>
			</Row>
		</Container>
	);
}
