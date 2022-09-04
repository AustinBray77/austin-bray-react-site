import React from "react";
import { DateTime } from "luxon";

export default function Footer(): JSX.Element {
	return (
		<div id="Footer" className="text-end bg-dark p-2 text-light">
			&copy; Austin Bray {DateTime.local().year} - Help keep this site free by{" "}
			<a href="https://www.paypal.com/donate/?business=M9JLUXRAW3GKS&no_recurring=0&item_name=Help+keep+Austin+Bray+.com+free+by+donating+to+help+with+development+and+server+costs.&currency_code=CAD">
				donating
			</a>
			.
		</div>
	);
}
