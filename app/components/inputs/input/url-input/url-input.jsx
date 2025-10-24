import clsx from "clsx";
import PropTypes from "prop-types";
import BaseInput from "../components/base-input";
import InputWrapper from "../components/input-wrapper";
import InputRow from "../components/input-row";
import Button from "~/components/inputs/button";
import { sizingRegex } from "~/components/utils/tailwind-regex";
import {
	urlRegex,
	urlWithSchemeRegex,
} from "~/components/utils/data-validation-regex";

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

function UrlInput({
	value,
	name,
	label,
	labelPosition = "top",
	required = false,
	placeholder = "https://www.website.com",
	color = "blue",
	button = false,
	onChange,
	className: additionalClassName,
	...attributes
}) {
	const [currentValue, setCurrentValue] = useState(value);
	const rawUrl = currentValue?.trim()?.match(urlRegex);
	const url = rawUrl ? "https://" + rawUrl : currentValue?.trim();
	const isValidUrl = url?.match(urlWithSchemeRegex);

	useEffect(() => {
		setCurrentValue(value);
	}, [value]);

	const internalOnChange = (e) => {
		if (onChange) onChange(e);
		setCurrentValue(e.target.value);
	};

	const urlInputClassName = clsx(
		"",
		additionalClassName?.replace(sizingRegex, ""),
	);
	const urlInputWrapperClassName = clsx(
		"",
		additionalClassName?.match(sizingRegex),
	);

	const urlInputComponent = (
		<BaseInput
			type="url"
			value={currentValue}
			name={name}
			required={required}
			placeholder={placeholder}
			color={color}
			onChange={internalOnChange}
			className={urlInputClassName}
			{...attributes}
		/>
	);
	return (
		<InputWrapper
			label={label}
			labelPosition={labelPosition}
			required={required}
			className={urlInputWrapperClassName}
		>
			{button ? (
				<InputRow>
					{urlInputComponent}
					<Button
						type="link"
						topClassName="px-2 py-1 w-16"
						backgroundClassName="bg-[url(link.svg)]"
						color={color}
						to={url}
						disabled={!isValidUrl}
					>
						Go
					</Button>
				</InputRow>
			) : (
				urlInputComponent
			)}
		</InputWrapper>
	);
}
UrlInput.propTypes = propTypes;

export default UrlInput;
