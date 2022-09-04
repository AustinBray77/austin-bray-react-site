import React from "react";
import { ArticleTitles, ArticleIds } from "../Articles";

function ShowArticles(): JSX.Element[] {
	let output: JSX.Element[] = [];

	for (let i: number = 0; i < ArticleTitles.length - 1; i++) {
		output.push(
			<div
				onClick={() => {
					window.location.href = ArticleIds[i];
				}}
				className="text-info p-4"
			>
				<h3>{ArticleTitles[i]}</h3>
			</div>
		);
	}

	return output;
}

export default function NotFound(): JSX.Element {
	return (
		<div>
			<h1>
				This article does not exist, here is a list of available articles:
			</h1>
			{ShowArticles()}
		</div>
	);
}
