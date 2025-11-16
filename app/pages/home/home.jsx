import clsx from "clsx";
import PropTypes from "prop-types";

const propTypes = {
	users: PropTypes.object,
};

function Home({ users, ...attributes }) {
	const homeClassName = clsx(
		"flex size-full items-center justify-center text-xl font-black",
	);
	return (
		<div className={homeClassName} {...attributes}>
			Home Page
		</div>
	);
}
Home.propTypes = propTypes;

export default Home;
