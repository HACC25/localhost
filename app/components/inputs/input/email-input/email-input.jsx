import clsx from "clsx";
import PropTypes from "prop-types";
import BaseInput from "../components/base-input";
import InputWrapper from "../components/input-wrapper";
import InputRow from "../components/input-row";
import Button from "~/components/inputs/button";
import { sizingRegex } from "~/components/utils/tailwind-regex";
import { emailRegex } from "~/components/utils/data-validation-regex";

import { useState, useEffect } from "react";

const propTypes = {
	value: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	labelPosition: PropTypes.oneOf(["top", "left", "bottom", "right"]),
	required: PropTypes.bool,
	placeholder: PropTypes.string,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	button: PropTypes.bool,
	onChange: PropTypes.func,
	className: PropTypes.string,
};

function EmailInput({
	value,
	name,
	label,
	labelPosition = "top",
	required = false,
	placeholder = "john.doe@email.com",
	color = "blue",
	button = false,
	onChange,
	className: additionalClassName,
	...attributes
}) {
	const [currentValue, setCurrentValue] = useState(value);
	const email = currentValue?.trim();
	const isValidEmail = !!currentValue?.match(emailRegex);
	useEffect(() => {
		setCurrentValue(value);
	}, [value]);

	const internalOnChange = (e) => {
		if (onChange) onChange(e);
		setCurrentValue(e.target.value);
	};

	const emailInputClassName = clsx(
		"",
		additionalClassName?.replace(sizingRegex, ""),
	);
	const emailInputWrapperClassName = clsx(
		"",
		additionalClassName?.match(sizingRegex),
	);

	const emailInputComponent = (
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
	);
	return (
		<InputWrapper
			label={label}
			labelPosition={labelPosition}
			required={required}
			className={emailInputWrapperClassName}
		>
			{button ? (
				<InputRow>
					{emailInputComponent}
					<Button
						type="link"
						topClassName="px-2 py-1 w-16"
						backgroundClassName="bg-[url(mail.svg)]"
						color={color}
						to={`mailto:${email}`}
						disabled={!isValidEmail}
					>
						Email
					</Button>
				</InputRow>
			) : (
				emailInputComponent
			)}
		</InputWrapper>
	);
}
EmailInput.propTypes = propTypes;

export default EmailInput;
