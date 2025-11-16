import clsx from "clsx";
import PropTypes from "prop-types";

const propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

function Report({ className: additionalClassName, children, ...attributes }) {
	const reportClassName = clsx("", additionalClassName);
	return (
		<div className={reportClassName} {...attributes}>
			{children}
		</div>
	);
}
Report.propTypes = propTypes;

export default Report;
