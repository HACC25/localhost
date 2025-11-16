import clsx from "clsx";
import PropTypes from "prop-types";
import { Outlet } from "react-router";
import Header from "~/components/layouts/header";

const propTypes = {
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
};

function App({ color = "blue", ...attributes }) {
	const appClassName = clsx(
		"flex size-full items-center justify-center max-sm:flex-col-reverse sm:flex-col",
		"bg-[url(background.jpg)] bg-cover bg-fixed",
	);
	return (
		<div className={appClassName} {...attributes}>
			<Header color={color} />
			<main className="h-full w-full max-w-screen-lg bg-white shadow-lg shadow-black dark:bg-black">
				<Outlet />
			</main>
		</div>
	);
}
App.propTypes = propTypes;

export default App;
