import clsx from "clsx";
import PropTypes from "prop-types";
import { Outlet } from "react-router";

const propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

function Home({ className: additionalClassName, children, ...attributes }) {
	const homeClassName = clsx(
		"flex size-full flex-col items-center justify-center gap-2 p-4",
		additionalClassName,
	);
	return (
		<main className={homeClassName} {...attributes}>
			<Outlet />
			{children}
		</main>
	);
}
Home.propTypes = propTypes;

export default Home;
