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
	button: PropTypes.bool,
	onChange: PropTypes.func,
	className: PropTypes.string,
};

function SearchInput({
	value,
	name,
	label,
	labelPosition = "top",
	required = false,
	placeholder = "Search...",
	color = "blue",
	button = true,
	onChange,
	className: additionalClassName,
	...attributes
}) {
	const [currentValue, setCurrentValue] = useState(value);
	const hasValue = currentValue?.trim();

	useEffect(() => {
		setCurrentValue(value);
	}, [value]);

	const internalOnChange = (e) => {
		if (onChange) onChange(e);
		setCurrentValue(e.target.value);
	};

	const searchInputClassName = clsx(
		"",
		additionalClassName?.replace(sizingRegex, ""),
	);
	const searchInputWrapperClassName = clsx(
		"",
		additionalClassName?.match(sizingRegex),
	);

	const searchInputComponent = (
		<BaseInput
			type="url"
			value={currentValue}
			name={name}
			required={required}
			placeholder={placeholder}
			color={color}
			onChange={internalOnChange}
			className={searchInputClassName}
			{...attributes}
		/>
	);
	return (
		<InputWrapper
			label={label}
			labelPosition={labelPosition}
			required={required}
			className={searchInputWrapperClassName}
		>
			{button ? (
				<InputRow>
					{searchInputComponent}
					<Button
						type="button"
						topClassName="px-2 py-1 w-16"
						backgroundClassName="bg-[url(search.svg)]"
						color={color}
						disabled={!hasValue}
					>
						Search
					</Button>
				</InputRow>
			) : (
				searchInputComponent
			)}
		</InputWrapper>
	);
}
SearchInput.propTypes = propTypes;

export default SearchInput;
