import clsx from "clsx";
import PropTypes from "prop-types";

const propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

function InputRow({ children, className: additionalClassName, ...attributes }) {
	const inputRowClassName = clsx("flex flex-row gap-1.5", additionalClassName);

	return (
		<div className={inputRowClassName} {...attributes}>
			{children}
		</div>
	);
}

InputRow.propTypes = propTypes;

export default InputRow;
