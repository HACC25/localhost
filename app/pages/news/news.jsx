import clsx from "clsx";
import PropTypes from "prop-types";

const propTypes = {};

function News({ ...attributes }) {
	const newsClassName = clsx(
		"flex size-full items-center justify-center text-xl font-black",
	);
	return (
		<div className={newsClassName} {...attributes}>
			News Page
		</div>
	);
}
News.propTypes = propTypes;

export default News;
