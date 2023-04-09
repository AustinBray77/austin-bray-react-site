import React from "react";
import { DateTime } from "luxon";

export default function Footer(): JSX.Element {
	return (
		<div id="Footer" className="text-start p-2">
			<div className="text-light fs-4">
				&copy; Austin Bray {DateTime.local().year}
			</div>
		</div>
	);
}
