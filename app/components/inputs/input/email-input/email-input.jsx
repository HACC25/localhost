import clsx from "clsx";
import PropTypes from "prop-types";
import BaseInput from "../components/base-input";
import InputWrapper from "../components/input-wrapper";

import { useState, useEffect } from "react";

const propTypes = {
	value: PropTypes.number,
	name: PropTypes.string,
	label: PropTypes.string,
	labelPosition: PropTypes.oneOf(["top", "left", "bottom", "right"]),
	required: PropTypes.bool,
	placeholder: PropTypes.string,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	onChange: PropTypes.func,
	className: PropTypes.string,
};

function EmailInput({
	value,
	name,
	label,
	labelPosition = "top",
	required = false,
	placeholder = "Input...",
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

	const emailInputClassName = clsx("", additionalClassName);
	return (
		<InputWrapper
			label={label}
			labelPosition={labelPosition}
			required={required}
		>
			<BaseInput
				type="email"
				value={currentValue}
				name={name}
				required={required}
				placeholder={placeholder}
				color={color}
				onChange={internalOnChange}
				className={emailInputClassName}
				{...attributes}
			/>
		</InputWrapper>
	);
}
EmailInput.propTypes = propTypes;

export default EmailInput;
