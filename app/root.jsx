import {
	useLoaderData,
	useRouteError,
	useMatches,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";
import App from "~/pages/app";

import "./app.css";
import { authenticate } from "~/lib/auth";
import PropTypes from "prop-types";
import RootErrorBoundary from "~/components/utils/error-boundary";
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
	const matches = useMatches();
	const current = matches[matches.length - 1];
	const color = current.handle?.appColor ?? "blue";
	return <App username={user?.username} color={color} />;
}

export function ErrorBoundary() {
	const error = useRouteError();
	return <RootErrorBoundary error={error} />;
}

ErrorBoundary.propTypes = {
	error: PropTypes.object,
};
