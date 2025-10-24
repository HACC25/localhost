import clsx from "clsx";
import PropTypes from "prop-types";
import BaseInput from "../components/base-input";
import InputWrapper from "../components/input-wrapper";
import InputRow from "../components/input-row";
import Button from "~/components/inputs/button";
import { sizingRegex } from "~/components/utils/tailwind-regex";
import { phoneNumberRegex } from "~/components/utils/data-validation-regex";

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

function PhoneInput({
	value,
	name,
	label,
	labelPosition = "top",
	required = false,
	placeholder = "(###) ###-####",
	color = "blue",
	button = false,
	onChange,
	className: additionalClassName,
	...attributes
}) {
	const [currentValue, setCurrentValue] = useState(value);
	const isValidNumber = !!`${currentValue}`.match(phoneNumberRegex);
	const phoneNumber = `${currentValue}`.replace(/[^0-9+-]/, "");
	useEffect(() => {
		setCurrentValue(value);
	}, [value]);

	const internalOnChange = (e) => {
		if (onChange) onChange(e);
		setCurrentValue(e.target.value);
	};

	const phoneInputClassName = clsx(
		"",
		additionalClassName?.replace(sizingRegex, ""),
	);
	const phoneInputWrapperClassName = clsx(
		"",
		additionalClassName?.match(sizingRegex),
	);

	const phoneInputComponent = (
		<BaseInput
			type="tel"
			value={currentValue}
			name={name}
			required={required}
			placeholder={placeholder}
			color={color}
			onChange={internalOnChange}
			className={phoneInputClassName}
			{...attributes}
		/>
	);
	return (
		<InputWrapper
			label={label}
			labelPosition={labelPosition}
			required={required}
			className={phoneInputWrapperClassName}
		>
			{button ? (
				<InputRow>
					{phoneInputComponent}
					<Button
						type="link"
						topClassName="px-2 py-1 w-16"
						backgroundClassName="bg-[url(phone.svg)]"
						color={color}
						to={`tel:${phoneNumber}`}
						disabled={!isValidNumber}
					>
						Call
					</Button>
				</InputRow>
			) : (
				phoneInputComponent
			)}
		</InputWrapper>
	);
}
PhoneInput.propTypes = propTypes;

export default PhoneInput;
