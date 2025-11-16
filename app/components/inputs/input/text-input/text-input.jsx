import clsx from "clsx";
import PropTypes from "prop-types";
import BaseInput from "../components/base-input";
import InputWrapper from "../components/input-wrapper";
import { sizingRegex } from "~/components/utils/tailwind-regex";

import { useState, useEffect } from "react";

const propTypes = {
	value: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	labelPosition: PropTypes.oneOf(["top", "left", "bottom", "right"]),
	required: PropTypes.bool,
	placeholder: PropTypes.string,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	onChange: PropTypes.func,
	className: PropTypes.string,
};

function TextInput({
	value,
	name,
	label,
	labelPosition = "top",
	required = false,
	placeholder = "Enter text...",
	color = "blue",
	onChange,
	className: additionalClassName,
	...attributes
}) {
	const [currentValue, setCurrentValue] = useState(value);
	useEffect(() => {
		setCurrentValue(value);
	}, [value]);

	const internalOnChange = (e) => {
		if (onChange) onChange(e);
		setCurrentValue(e.target.value);
	};

	const textInputClassName = clsx(
		"",
		additionalClassName?.replace(sizingRegex, ""),
	);
	const textInputWrapperClassName = clsx(
		"",
		additionalClassName?.match(sizingRegex),
	);
	return (
		<InputWrapper
			type="text"
			label={label}
			labelPosition={labelPosition}
			color={color}
			className={textInputWrapperClassName}
		>
			<BaseInput
				type="text"
				value={currentValue}
				name={name}
				required={required}
				placeholder={placeholder}
				color={color}
				onChange={internalOnChange}
				className={textInputClassName}
				{...attributes}
			/>
		</InputWrapper>
	);
}
TextInput.propTypes = propTypes;

export default TextInput;
