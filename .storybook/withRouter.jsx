import { createContext, useState } from "react";
import { RouterProvider, createMemoryRouter } from "react-router";

// --- Default context values ---
const defaultLoaderData = null;
const defaultTransitionData = {
	data: { state: "idle", type: "idle" },
	_changeData: () => {},
};
const defaultTestOptionData = {
	form: { simulateSubmit: true, submissionTimeSeconds: 3 },
};

// --- Contexts ---
export const LoaderContext = createContext(defaultLoaderData);
export const TransitionContext = createContext(defaultTransitionData);
export const RemixTestOptionsContext = createContext(defaultTestOptionData);

// --- Storybook Decorator ---
export const withRouter = (Story, context) => {
	const initialEntries = context.parameters?.router?.initialEntries || ["/"];
	const loaderData =
		context.parameters?.router?.loaderData || defaultLoaderData;
	const transitionData = context.parameters?.router?.transitionData || {};

	const [transitionState, setTransitionState] = useState({
		...defaultTransitionData,
		data: { ...defaultTransitionData.data, ...transitionData },
	});

	const router = createMemoryRouter(
		[
			{
				path: "*",
				element: (
					<RemixTestOptionsContext.Provider value={defaultTestOptionData}>
						<LoaderContext.Provider value={loaderData}>
							<TransitionContext.Provider
								value={{
									data: transitionState.data,
									_changeData: (newData) =>
										setTransitionState((prev) => ({
											...prev,
											data: { ...prev.data, ...newData },
										})),
								}}
							>
								<Story />
							</TransitionContext.Provider>
						</LoaderContext.Provider>
					</RemixTestOptionsContext.Provider>
				),
			},
		],
		{ initialEntries },
	);

	return <RouterProvider router={router} />;
};
