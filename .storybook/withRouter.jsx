import React from "react";
import { MemoryRouter } from "react-router";

export const withRouter = (Story, context) => {
	const initialEntries = context.parameters?.router?.initialEntries || ["/"];

	return (
		<MemoryRouter initialEntries={initialEntries}>
			<Story />
		</MemoryRouter>
	);
};
