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

function TextareaInput({
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

	const textareaInputClassName = clsx(
		"",
		additionalClassName?.replace(sizingRegex, ""),
	);
	const textareaInputWrapperClassName = clsx(
		"",
		additionalClassName?.match(sizingRegex),
	);
	return (
		<InputWrapper
			type="textarea"
			label={label}
			labelPosition={labelPosition}
			color={color}
			className={textareaInputWrapperClassName}
		>
			<BaseInput
				tag="textarea"
				value={currentValue}
				name={name}
				required={required}
				placeholder={placeholder}
				color={color}
				onChange={internalOnChange}
				className={textareaInputClassName}
				{...attributes}
			/>
		</InputWrapper>
	);
}
TextareaInput.propTypes = propTypes;

export default TextareaInput;
