import clsx from "clsx";
import PropTypes from "prop-types";

const propTypes = {
	label: PropTypes.string,
	labelPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
	required: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
};

function InputWrapper({
	label,
	labelPosition = "top",
	required = false,
	children,
	className: additionalClassName,
	...attributes
}) {
	const wrapperClassName = clsx(
		"flex gap-1",
		{
			"flex-col justify-center": labelPosition === "top",
			"flex-col-reverse justify-center": labelPosition === "bottom",
			"flex-row items-center": labelPosition === "left",
			"flex-row-reverse items-center": labelPosition === "right",
		},
		additionalClassName,
	);
	const labelClassName = clsx(
		"flex text-sm font-bold",
		required && "after:text-xs after:text-red-500 after:content-['*']",
	);

	return (
		<div className={wrapperClassName} {...attributes}>
			{label && <label className={labelClassName}>{label}</label>}
			{children}
		</div>
	);
}

InputWrapper.propTypes = propTypes;

export default InputWrapper;
