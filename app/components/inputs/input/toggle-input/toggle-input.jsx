import clsx from "clsx";
import PropTypes from "prop-types";
import InputWrapper from "../components/input-wrapper";
import { sizingRegex } from "~/components/utils/tailwind-regex";
import { useState, useEffect } from "react";

const propTypes = {
	value: PropTypes.any, // string or number value
	checked: PropTypes.bool,
	name: PropTypes.string,
	label: PropTypes.string,
	labelPosition: PropTypes.oneOf(["top", "left", "bottom", "right"]),
	required: PropTypes.bool,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	onChange: PropTypes.func,
	className: PropTypes.string,
};

function ToggleInput({
	value,
	checked = false,
	name,
	label,
	labelPosition = "top",
	required = false,
	color = "blue",
	onChange,
	className: additionalClassName,
	...attributes
}) {
	const [isChecked, setIsChecked] = useState(checked);

	useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

	const internalOnChange = (e) => {
		const nextChecked = e.target.checked;
		setIsChecked(nextChecked);

		// Pass both the boolean and the value upward
		if (onChange) onChange(nextChecked, value, e);
	};

	const toggleInputWrapperClassName = clsx(
		"",
		additionalClassName?.match(sizingRegex),
	);

	const toggleInputClassName = clsx(
		"relative flex h-6 w-10 rounded-full border-2",
		"after:absolute after:left-0 after:transition-all",
		"after:h-5 after:w-5 after:rounded-full",
		"after:border-2 after:border-white dark:after:border-black",
		isChecked && "after:left-[calc(100%-1.25rem)]",
		color === "red" && [
			"border-hawaii-red",
			"peer-inert/input:border-hawaii-red-50 dark:peer-inert/input:border-hawaii-red-950",
			"peer-inert/input:after:bg-hawaii-red-50 dark:peer-inert/input:after:bg-hawaii-red-950",
			"peer-disabled/input:border-hawaii-red-50 dark:peer-disabled/input:border-hawaii-red-950",
			"peer-disabled/input:after:bg-hawaii-red-50 dark:peer-disabled/input:after:bg-hawaii-red-950",
			"after:bg-hawaii-red",
		],
		color === "yellow" && [
			"border-hawaii-yellow",
			"peer-inert/input:border-hawaii-yellow-50 dark:peer-inert/input:border-hawaii-yellow-950",
			"peer-inert/input:after:bg-hawaii-yellow-50 dark:peer-inert/input:after:bg-hawaii-yellow-950",
			"peer-disabled/input:border-hawaii-yellow-50 dark:peer-disabled/input:border-hawaii-yellow-950",
			"peer-disabled/input:after:bg-hawaii-yellow-50 dark:peer-disabled/input:after:bg-hawaii-yellow-950",
			"after:bg-hawaii-yellow",
		],
		color === "green" && [
			"border-hawaii-green",
			"peer-inert/input:border-hawaii-green-50 dark:peer-inert/input:border-hawaii-green-950",
			"peer-inert/input:after:bg-hawaii-green-50 dark:peer-inert/input:after:bg-hawaii-green-950",
			"peer-disabled/input:border-hawaii-green-50 dark:peer-disabled/input:border-hawaii-green-950",
			"peer-disabled/input:after:bg-hawaii-green-50 dark:peer-disabled/input:after:bg-hawaii-green-950",
			"after:bg-hawaii-green",
		],
		color === "blue" && [
			"border-hawaii-blue",
			"peer-inert/input:border-hawaii-blue-50 dark:peer-inert/input:border-hawaii-blue-950",
			"peer-inert/input:after:bg-hawaii-blue-50 dark:peer-inert/input:after:bg-hawaii-blue-950",
			"peer-disabled/input:border-hawaii-blue-50 dark:peer-disabled/input:border-hawaii-blue-950",
			"peer-disabled/input:after:bg-hawaii-blue-50 dark:peer-disabled/input:after:bg-hawaii-blue-950",
			"after:bg-hawaii-blue",
		],
		additionalClassName?.replace(sizingRegex, ""),
	);

	return (
		<InputWrapper
			type="toggle"
			label={label}
			labelPosition={labelPosition}
			color={color}
			className={toggleInputWrapperClassName}
		>
			<div className="peer/wrapper relative flex h-6 w-10 rounded-full">
				<input
					type="checkbox"
					name={name}
					required={required}
					checked={isChecked}
					value={value} // keep value for form submissions
					onChange={internalOnChange}
					className="peer/input absolute z-1 h-full w-full opacity-0 not-disabled:cursor-pointer"
					{...attributes}
				/>
				<div className={toggleInputClassName} />
			</div>
		</InputWrapper>
	);
}

ToggleInput.propTypes = propTypes;

export default ToggleInput;
