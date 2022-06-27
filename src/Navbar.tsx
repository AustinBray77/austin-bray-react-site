import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar(): JSX.Element {
	let location = useLocation();

	return (
		<div className="navbar navbar-expand-lg navbar-dark bg-dark text-light">
			<Link
				to="/"
				className={
					"btn btn-dark bg-dark border border-dark m-1" +
					(location.pathname == "/" ? "disabledCursor" : "")
				}
				id="HomeBTN"
			>
				Home
			</Link>
			<Link
				to="/projects"
				className={
					"btn btn-dark bg-dark border border-dark m-1" +
					(location.pathname == "/projects" ? "disabledCursor" : "")
				}
				id="ProjectsBTN"
			>
				Projects
			</Link>
			<Link
				to="/download"
				className={
					"btn btn-dark bg-dark border border-dark m-1" +
					(location.pathname == "/download" ? "disabledCursor" : "")
				}
				id="DownloadBTN"
			>
				Download
			</Link>
			<Link
				to="/contact"
				className={
					"btn btn-dark bg-dark border border-dark m-1" +
					(location.pathname == "/contact" ? "disabledCursor" : "")
				}
				id="ContactBTN"
			>
				Contact
			</Link>
		</div>
	);
}
