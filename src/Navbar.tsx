import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArticleIds, ArticleTitles } from "./Pages/Blog/Articles";

const NavLink = (props: {
    path: string;
    id: string;
    title: string;
    children?: string | JSX.Element | JSX.Element[];
}): JSX.Element => {
    let location = useLocation();

    return (
        <Link
            to={props.path}
            className={
                "btn btn-dark bg-pd my-2 mx-4 " +
                (location.pathname === props.path ? "disabled-cursor" : "")
            }
            id={props.id}
        >
            {props.title}
            {props.children}
        </Link>
    );
};

const blogLinkList = (): JSX.Element[] => {
    let output: JSX.Element[] = [];

    for (let i: number = 0; i < ArticleIds.length - 1; i++) {
        output.push(
            <NavLink
                path={"/blog/" + ArticleIds[i]}
                id={`Blog${i}BTN`}
                title={ArticleTitles[i]}
            />
        );
        output.push(<br />);
    }

    return output;
};

export default function Navbar(): JSX.Element {
    const [ShowProjectsDropdown, setShowProjectsDropdown] = useState(0);
    //const [ShowBlogsDropdown, setShowBlogsDropdown] = useState(0);

    return (
        <div className="navbar navbar-expand-lg bg-pd text-pl pl-1">
            <NavLink path="/" id="HomeBTN" title="Home" />
            {/*<div
					onMouseEnter={() => {
						setShowBlogsDropdown(1);
					}}
					onMouseLeave={() => {
						setShowBlogsDropdown(0);
					}}
				>
					<NavLink path="/blog" id="BlogBTN" title="Blog">
						<span
							className="iconify mx-2 text-pl"
							data-icon="simple-line-icons:arrow-down"
						></span>
					</NavLink>
					<div
						id="BlogsDropdown"
						className={
							"bg-pd dropdown-content " + (ShowBlogsDropdown === 1 ? "show" : "")
						}
					>
						{blogLinkList()}
					</div>
					</div> */}
            <div
                onMouseEnter={() => {
                    setShowProjectsDropdown(1);
                }}
                onMouseLeave={() => {
                    setShowProjectsDropdown(0);
                }}
            >
                <NavLink path="/projects" id="ProjectsBTN" title="Projects">
                    <span
                        className="iconify mx-2 text-pl"
                        data-icon="simple-line-icons:arrow-down"
                    ></span>
                </NavLink>
                <div
                    id="ProjectsDropdown"
                    className={
                        "bg-pd dropdown-content " +
                        (ShowProjectsDropdown === 1 ? "show" : "")
                    }
                >
                    <NavLink
                        path="/projects/algo"
                        id="AlgoBTN"
                        title="Algo Visualizer"
                    />
                    {/*<br />
					<NavLink path="/projects/totris" id="TotrisBTN" title="Totris" />*/}
                </div>
            </div>
            <NavLink path="/download" id="DownloadBTN" title="Download" />
            <NavLink path="/about-me" id="AboutMeBTN" title="About Me" />
            <NavLink path="/contact" id="ContactBTN" title="Contact" />
        </div>
    );
}
