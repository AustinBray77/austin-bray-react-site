import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = (props: {
	path: string;
	id: string;
	title: string;
}): JSX.Element => {
	let location = useLocation();

	return (
		<Link
			to={props.path}
			className={
				"btn btn-dark bg-dark border border-dark m-2 " +
				(location.pathname == props.path ? "disabled-cursor" : "")
			}
			id={props.id}
		>
			{props.title}
		</Link>
	);
};

export default function Navbar(): JSX.Element {
	const [ShowProjectsDropdown, setShowProjectsDropdown] = useState(0);

	return (
		<div
			className={"navbar navbar-expand-lg navbar-dark bg-dark text-light pl-1"}
		>
			<NavLink path="/" id="HomeBTN" title="Home" />
			<NavLink path="/blog" id="BlogBTN" title="Blog" />
			<div
				onMouseEnter={() => {
					setShowProjectsDropdown(1);
				}}
				onMouseLeave={() => {
					setShowProjectsDropdown(0);
				}}
			>
				<NavLink path="/projects" id="ProjectsBTN" title="Projects" />
				<span
					className="iconify"
					data-icon="simple-line-icons:arrow-down"
					style={{ color: "#f8f9fa" }}
				></span>
				<div
					id="ProjectsDropdown"
					className={
						"bg-dark dropdown-content " +
						(ShowProjectsDropdown == 1 ? "show" : "")
					}
				>
					<NavLink path="/projects/algo" id="AlgoBTN" title="Algo Visualizer" />
					<br />
					<NavLink path="/projects/totris" id="TotrisBTN" title="Totris" />
				</div>
			</div>
			<NavLink path="/download" id="DownloadBTN" title="Download" />
			<NavLink path="/contact" id="ContactBTN" title="Contact" />
		</div>
	);
}
