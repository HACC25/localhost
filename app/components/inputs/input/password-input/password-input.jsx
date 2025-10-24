import clsx from "clsx";
import PropTypes from "prop-types";
import BaseInput from "../components/base-input";
import InputWrapper from "../components/input-wrapper";
import InputRow from "../components/input-row";
import Button from "~/components/inputs/button";
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

function PasswordInput({
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
	const [showPassword, setShowPassword] = useState(false);
	useEffect(() => {
		setCurrentValue(value);
	}, [value]);

	const internalOnChange = (e) => {
		if (onChange) onChange(e);
		setCurrentValue(e.target.value);
	};

	const passwordInputClassName = clsx(
		"font-mono slashed-zero tabular-nums placeholder:font-sans",
		additionalClassName?.replace(sizingRegex, ""),
	);
	const passwordInputWrapperClassName = clsx(
		"",
		additionalClassName?.match(sizingRegex),
	);

	return (
		<InputWrapper
			label={label}
			labelPosition={labelPosition}
			required={required}
			className={passwordInputWrapperClassName}
		>
			<InputRow>
				<BaseInput
					type={showPassword ? "text" : "password"}
					value={currentValue}
					name={name}
					required={required}
					placeholder={placeholder}
					color={color}
					onChange={internalOnChange}
					className={passwordInputClassName}
					{...attributes}
				/>
				<Button
					topClassName="px-2 py-1 w-16"
					backgroundClassName={
						showPassword ? "bg-[url(show.svg)]" : "bg-[url(hide.svg)]"
					}
					color={color}
					onClick={() => setShowPassword((prev) => !prev)}
				>
					{showPassword ? "Hide" : "Show"}
				</Button>
			</InputRow>
		</InputWrapper>
	);
}
PasswordInput.propTypes = propTypes;

export default PasswordInput;
