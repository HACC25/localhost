import clsx from "clsx";
import PropTypes from "prop-types";

const propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

function InputRow({ className: additionalClassName, children, ...attributes }) {
	const inputRowClassName = clsx("flex flex-wrap gap-2", additionalClassName);
	return (
		<div className={inputRowClassName} {...attributes}>
			{children}
		</div>
	);
}
InputRow.propTypes = propTypes;

export default InputRow;
