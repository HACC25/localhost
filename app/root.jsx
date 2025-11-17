import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";
import App from "~/pages/app";

import "./app.css";
import { useLoaderData } from "react-router";
import { authenticate } from "~/lib/auth";
import PropTypes from "prop-types";
import DarkModeScript from "~/components/utils/dark-mode-script";

export function Layout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<DarkModeScript />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

Layout.propTypes = {
	children: PropTypes.node,
};

export async function loader({ request }) {
	const user = await authenticate(request);
	return { user };
}

export default function AppRoute() {
	const { user } = useLoaderData();
	return <App username={user?.username} />;
}

export function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="container mx-auto p-4 pt-16">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full overflow-x-auto p-4">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}

ErrorBoundary.propTypes = {
	error: PropTypes.object,
};
