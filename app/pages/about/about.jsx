import clsx from "clsx";
import PropTypes from "prop-types";

const propTypes = {};

function About({ ...attributes }) {
	const aboutClassName = clsx(
		"flex size-full items-center justify-center text-xl font-black",
	);
	return (
		<div className={aboutClassName} {...attributes}>
			About Page
		</div>
	);
}
About.propTypes = propTypes;

export default About;
