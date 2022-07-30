import React from "react";
import CreatingAReactSite from "./Articles/CreatingAReactSite";
import NotFound from "./Articles/NotFound";

let ArticleTitles: string[] = ["Creating A React Site", "Not Found"];
let ArticleIds: string[] = ["creating-a-react-site", "not-found"];
let ArticleElements: JSX.Element[] = [CreatingAReactSite(), NotFound()];

const getArticle = (id: string): JSX.Element => {
	let index: number = ArticleIds.findIndex((x) => x === id);
	if (index == -1) {
		return ArticleElements[ArticleElements.length - 1];
	}

	return ArticleElements[index];
};

export { ArticleTitles, ArticleIds, ArticleElements, getArticle };
