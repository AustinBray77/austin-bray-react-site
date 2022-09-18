import React from "react";
import { Link } from "react-router-dom";
import CrackingTheCodeInterview from "./Articles/CrackingTheCodeInterview";
import CreatingAReactSite from "./Articles/CreatingAReactSite";
import NotFound from "./Articles/NotFound";
import Top10Tools from "./Articles/Top10Tools";

let ArticleTitles: string[] = [
	"Creating A React Site",
	"Top Tools for Developers in 2022",
	"Cracking the Coding Interview",
	"Not Found",
];
let ArticleIds: string[] = [
	"creating-a-react-site",
	"top-tools-for-devs-2022",
	"cracking-the-coding-interview",
	"not-found",
];
let ArticleElements: JSX.Element[] = [
	CreatingAReactSite(),
	Top10Tools(),
	CrackingTheCodeInterview(),
	NotFound(),
];

const getArticle = (id: string): JSX.Element => {
	let index: number = ArticleIds.findIndex((x) => x === id);
	if (index == -1) {
		return ArticleElements[ArticleElements.length - 1];
	}

	return ArticleElements[index];
};

export { ArticleTitles, ArticleIds, ArticleElements, getArticle };
