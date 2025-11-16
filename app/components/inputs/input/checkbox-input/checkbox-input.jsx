import clsx from "clsx";
import PropTypes from "prop-types";
import BaseInput from "../components/base-input";
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

function CheckboxInput({
	value,
	checked,
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
		if (onChange) onChange(e);
	};

	const checkboxInputClassName = clsx(
		"h-11 w-11 p-0!",
		"not-disabled:cursor-pointer",
		color === "red" && [
			"checked:bg-hawaii-red!",
			"disabled:checked:bg-hawaii-red-50! dark:disabled:checked:bg-hawaii-red-950!",
			"inert:checked:bg-hawaii-red-50! dark:inert:checked:bg-hawaii-red-950!",
		],
		color === "yellow" && [
			"checked:bg-hawaii-yellow!",
			"disabled:checked:bg-hawaii-yellow-50! dark:disabled:checked:bg-hawaii-yellow-950!",
			"inert:checked:bg-hawaii-yellow-50! dark:inert:checked:bg-hawaii-yellow-950!",
		],
		color === "green" && [
			"checked:bg-hawaii-green!",
			"disabled:checked:bg-hawaii-green-50! dark:disabled:checked:bg-hawaii-green-950!",
			"inert:checked:bg-hawaii-green-50! dark:inert:checked:bg-hawaii-green-950!",
		],
		color === "blue" && [
			"checked:bg-hawaii-blue!",
			"disabled:checked:bg-hawaii-blue-50! dark:disabled:checked:bg-hawaii-blue-950!",
			"inert:checked:bg-hawaii-blue-50! dark:inert:checked:bg-hawaii-blue-950!",
		],
		additionalClassName?.replace(sizingRegex, ""),
	);
	const checkboxInputWrapperClassName = clsx(
		"",
		additionalClassName?.match(sizingRegex),
	);
	return (
		<InputWrapper
			type="checkbox"
			label={label}
			labelPosition={labelPosition}
			color={color}
			className={checkboxInputWrapperClassName}
		>
			<div className="peer/wrapper relative flex h-11 w-11 items-center justify-center">
				<BaseInput
					type="checkbox"
					showMeta={false}
					value={value}
					checked={isChecked}
					name={name}
					required={required}
					color={color}
					onChange={internalOnChange}
					className={checkboxInputClassName}
					{...attributes}
				/>
				<div className="font-symbols pointer-events-none absolute text-3xl font-bold text-white dark:text-black">
					check
				</div>
			</div>
		</InputWrapper>
	);
}
CheckboxInput.propTypes = propTypes;

export default CheckboxInput;
