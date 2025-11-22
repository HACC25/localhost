import clsx from "clsx";
import PropTypes from "prop-types";
import { Outlet } from "react-router";
import Header from "~/components/layouts/header";
import ErrorBoundary from "~/components/utils/error-boundary";

const propTypes = {
	username: PropTypes.string,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
};

function App({ username, color = "blue", ...attributes }) {
	const appClassName = clsx(
		"flex size-full min-h-fit items-center max-sm:flex-col-reverse sm:flex-col",
		"bg-[url('/background.jpg')] bg-cover bg-fixed",
	);
	return (
		<div className={appClassName} {...attributes}>
			<Header color={color} username={username} />
			<main className="min-h-[calc(100%-5rem)] w-full max-w-screen-lg bg-white shadow-lg shadow-black dark:bg-black">
				<ErrorBoundary>
					<Outlet />
				</ErrorBoundary>
			</main>
		</div>
	);
}
App.propTypes = propTypes;

export default App;
