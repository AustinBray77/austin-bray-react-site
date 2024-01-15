import React from "react";

export default function Footer(): JSX.Element {
	return (
		<div id="Footer" className="text-start p-2">
			<div className="text-light fs-4">
				&copy; Austin Bray {new Date().getFullYear()}
			</div>
		</div>
	);
}
