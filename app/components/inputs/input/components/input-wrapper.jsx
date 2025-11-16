import clsx from "clsx";
import PropTypes from "prop-types";
import { hawaiiColor } from "~/components/utils/color";
import { typeToIcon } from "~/components/utils/input";
import ColoredText from "~/components/data-displays/colored-text";

const propTypes = {
	type: PropTypes.string,
	color: PropTypes.oneOf(hawaiiColor),
	label: PropTypes.string,
	labelPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
	id: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};

function InputWrapper({
	type = "text",
	color = "blue",
	label,
	labelPosition = "top",
	id,
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
		"flex shrink-0 text-sm font-bold",
		"after:text-xs after:text-red-500 peer-required/wrapper:after:content-['*'] peer-has-required/wrapper:after:content-['*']",
		"-order-1",
	);

	return (
		<div className={wrapperClassName} {...attributes}>
			{children}
			{label && (
				<label htmlFor={id} className={labelClassName}>
					{type && (
						<ColoredText color={color} className="font-symbols pr-0.5">
							{typeToIcon(type)}
						</ColoredText>
					)}
					{label}
				</label>
			)}
		</div>
	);
}

InputWrapper.propTypes = propTypes;

export default InputWrapper;
