import clsx from "clsx";
import PropTypes from "prop-types";
import BaseInput from "../components/base-input";
import InputWrapper from "../components/input-wrapper";
import { sizingRegex } from "~/components/utils/tailwind-regex";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { useState, useEffect } from "react";

const propTypes = {
	value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	name: PropTypes.string,
	label: PropTypes.string,
	labelPosition: PropTypes.oneOf(["top", "left", "bottom", "right"]),
	required: PropTypes.bool,
	placeholder: PropTypes.string,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	options: PropTypes.array,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	isLoading: PropTypes.bool,
	isClearable: PropTypes.bool,
	isSearchable: PropTypes.bool,
	isMulti: PropTypes.bool,
	className: PropTypes.string,
};

function SelectInput({
	value,
	defaultValue,
	name,
	label,
	labelPosition = "top",
	required = false,
	placeholder = "Select...",
	color = "blue",
	options,
	onChange,
	disabled,
	isLoading,
	isClearable,
	isSearchable,
	isMulti,
	className: additionalClassName,
	...attributes
}) {
	const [currentValue, setCurrentValue] = useState(
		JSON.parse(value || defaultValue || "[]") ?? null,
	);

	useEffect(() => {
		if (value !== undefined) {
			setCurrentValue(JSON.parse(value || "[]"));
		}
	}, [value]);

	const internalOnChange = (option) => {
		if (onChange) onChange(option);
		setCurrentValue(option);
	};

	const animatedComponents = makeAnimated();

	// Predeclared color variants
	const colorVariants = {
		red: {
			border: "border-hawaii-red! outline-hawaii-red!",
			borderDisabled: "border-hawaii-red-50! dark:border-hawaii-red-950!",
			hover: [
				"hover:bg-hawaii-red-50! active:bg-hawaii-red-100!",
				"dark:hover:bg-hawaii-red-950! dark:active:bg-hawaii-red-900!",
			],
			inert: [
				"inert:border-hawaii-red-50! dark:inert:border-hawaii-red-950!",
				"autofill:ring-hawaii-red-50! dark:autofill:ring-hawaii-red-950!",
			],
			text: "text-hawaii-red!",
			textDisabled: "text-hawaii-red-50! dark:text-hawaii-red-950!",
			inertText: "inert:text-hawaii-red-50! dark:inert:text-hawaii-red-950!",
			bg: "bg-hawaii-red!",
			bgDisabled: "bg-hawaii-red-50! dark:bg-hawaii-red-950!",
			inertBg: "inert:bg-hawaii-red-50! dark:inert:bg-hawaii-red-950!",
			selection: "selection:bg-hawaii-red! caret-hawaii-red!",
			optionSelected: "bg-hawaii-red!",
			optionHover: [
				"hover:bg-hawaii-red-50! active:bg-hawaii-red-100!",
				"dark:hover:bg-hawaii-red-950! dark:active:bg-hawaii-red-900!",
			],
			inertOption: "inert:text-hawaii-red-300! dark:inert:text-hawaii-red-700!",
			singleValueInert:
				"inert:text-hawaii-red-300! dark:inert:text-hawaii-red-700!",
			singleValueDisabled: "text-hawaii-red-300! dark:text-hawaii-red-700!",
			multiValueInert: "inert:bg-hawaii-red-50! dark:inert:bg-hawaii-red-950!",
			multiValueDisabled: "bg-hawaii-red-50! dark:bg-hawaii-red-950!",
			multiValueLabelInert:
				"inert:text-hawaii-red-300! dark:inert:text-hawaii-red-700!",
			multiValueLabelDisabled: "text-hawaii-red-300! dark:text-hawaii-red-700!",
			multiValueRemoveHover:
				"hover:bg-hawaii-red-300! dark:hover:bg-hawaii-red-700!",
			multiValueRemoveInert:
				"inert:text-hawaii-red-300! dark:inert:text-hawaii-red-700!",
			multiValueRemoveDisabled:
				"text-hawaii-red-300! dark:text-hawaii-red-700!",
			indicatorSeparator: "bg-hawaii-red!",
			indicatorSeparatorDisabled: "bg-hawaii-red-50! dark:bg-hawaii-red-950!",
			indicatorSeparatorInert:
				"inert:bg-hawaii-red-50! dark:inert:bg-hawaii-red-950!",
			menuBorder: "border-hawaii-red",
		},
		yellow: {
			border: "border-hawaii-yellow! outline-hawaii-yellow!",
			borderDisabled: "border-hawaii-yellow-50! dark:border-hawaii-yellow-950!",
			hover: [
				"hover:bg-hawaii-yellow-50! active:bg-hawaii-yellow-100!",
				"dark:hover:bg-hawaii-yellow-950! dark:active:bg-hawaii-yellow-900!",
			],
			inert: [
				"inert:border-hawaii-yellow-50! dark:inert:border-hawaii-yellow-950!",
				"autofill:ring-hawaii-yellow-50! dark:autofill:ring-hawaii-yellow-950!",
			],
			text: "text-hawaii-yellow!",
			textDisabled: "text-hawaii-yellow-50! dark:text-hawaii-yellow-950!",
			inertText:
				"inert:text-hawaii-yellow-50! dark:inert:text-hawaii-yellow-950!",
			bg: "bg-hawaii-yellow!",
			bgDisabled: "bg-hawaii-yellow-50! dark:bg-hawaii-yellow-950!",
			inertBg: "inert:bg-hawaii-yellow-50! dark:inert:bg-hawaii-yellow-950!",
			selection: "selection:bg-hawaii-yellow! caret-hawaii-yellow!",
			optionSelected: "bg-hawaii-yellow!",
			optionHover: [
				"hover:bg-hawaii-yellow-50! active:bg-hawaii-yellow-100!",
				"dark:hover:bg-hawaii-yellow-950! dark:active:bg-hawaii-yellow-900!",
			],
			inertOption:
				"inert:text-hawaii-yellow-300! dark:inert:text-hawaii-yellow-700!",
			singleValueInert:
				"inert:text-hawaii-yellow-300! dark:inert:text-hawaii-yellow-700!",
			singleValueDisabled:
				"text-hawaii-yellow-300! dark:text-hawaii-yellow-700!",
			multiValueInert:
				"inert:bg-hawaii-yellow-50! dark:inert:bg-hawaii-yellow-950!",
			multiValueDisabled: "bg-hawaii-yellow-50! dark:bg-hawaii-yellow-950!",
			multiValueLabelInert:
				"inert:text-hawaii-yellow-300! dark:inert:text-hawaii-yellow-700!",
			multiValueLabelDisabled:
				"text-hawaii-yellow-300! dark:text-hawaii-yellow-700!",
			multiValueRemoveHover:
				"hover:bg-hawaii-yellow-300! dark:hover:bg-hawaii-yellow-700!",
			multiValueRemoveInert:
				"inert:text-hawaii-yellow-300! dark:inert:text-hawaii-yellow-700!",
			multiValueRemoveDisabled:
				"text-hawaii-yellow-300! dark:text-hawaii-yellow-700!",
			indicatorSeparator: "bg-hawaii-yellow!",
			indicatorSeparatorDisabled:
				"bg-hawaii-yellow-50! dark:bg-hawaii-yellow-950!",
			indicatorSeparatorInert:
				"inert:bg-hawaii-yellow-50! dark:inert:bg-hawaii-yellow-950!",
			menuBorder: "border-hawaii-yellow",
		},
		green: {
			border: "border-hawaii-green! outline-hawaii-green!",
			borderDisabled: "border-hawaii-green-50! dark:border-hawaii-green-950!",
			hover: [
				"hover:bg-hawaii-green-50! active:bg-hawaii-green-100!",
				"dark:hover:bg-hawaii-green-950! dark:active:bg-hawaii-green-900!",
			],
			inert: [
				"inert:border-hawaii-green-50! dark:inert:border-hawaii-green-950!",
				"autofill:ring-hawaii-green-50! dark:autofill:ring-hawaii-green-950!",
			],
			text: "text-hawaii-green!",
			textDisabled: "text-hawaii-green-50! dark:text-hawaii-green-950!",
			inertText:
				"inert:text-hawaii-green-50! dark:inert:text-hawaii-green-950!",
			bg: "bg-hawaii-green!",
			bgDisabled: "bg-hawaii-green-50! dark:bg-hawaii-green-950!",
			inertBg: "inert:bg-hawaii-green-50! dark:inert:bg-hawaii-green-950!",
			selection: "selection:bg-hawaii-green! caret-hawaii-green!",
			optionSelected: "bg-hawaii-green!",
			optionHover: [
				"hover:bg-hawaii-green-50! active:bg-hawaii-green-100!",
				"dark:hover:bg-hawaii-green-950! dark:active:bg-hawaii-green-900!",
			],
			inertOption:
				"inert:text-hawaii-green-300! dark:inert:text-hawaii-green-700!",
			singleValueInert:
				"inert:text-hawaii-green-300! dark:inert:text-hawaii-green-700!",
			singleValueDisabled: "text-hawaii-green-300! dark:text-hawaii-green-700!",
			multiValueInert:
				"inert:bg-hawaii-green-50! dark:inert:bg-hawaii-green-950!",
			multiValueDisabled: "bg-hawaii-green-50! dark:bg-hawaii-green-950!",
			multiValueLabelInert:
				"inert:text-hawaii-green-300! dark:inert:text-hawaii-green-700!",
			multiValueLabelDisabled:
				"text-hawaii-green-300! dark:text-hawaii-green-700!",
			multiValueRemoveHover:
				"hover:bg-hawaii-green-300! dark:hover:bg-hawaii-green-700!",
			multiValueRemoveInert:
				"inert:text-hawaii-green-300! dark:inert:text-hawaii-green-700!",
			multiValueRemoveDisabled:
				"text-hawaii-green-300! dark:text-hawaii-green-700!",
			indicatorSeparator: "bg-hawaii-green!",
			indicatorSeparatorDisabled:
				"bg-hawaii-green-50! dark:bg-hawaii-green-950!",
			indicatorSeparatorInert:
				"inert:bg-hawaii-green-50! dark:inert:bg-hawaii-green-950!",
			menuBorder: "border-hawaii-green",
		},
		blue: {
			border: "border-hawaii-blue! outline-hawaii-blue!",
			borderDisabled: "border-hawaii-blue-50! dark:border-hawaii-blue-950!",
			hover: [
				"hover:bg-hawaii-blue-50! active:bg-hawaii-blue-100!",
				"dark:hover:bg-hawaii-blue-950! dark:active:bg-hawaii-blue-900!",
			],
			inert: [
				"inert:border-hawaii-blue-50! dark:inert:border-hawaii-blue-950!",
				"autofill:ring-hawaii-blue-50! dark:autofill:ring-hawaii-blue-950!",
			],
			text: "text-hawaii-blue!",
			textDisabled: "text-hawaii-blue-50! dark:text-hawaii-blue-950!",
			inertText: "inert:text-hawaii-blue-50! dark:inert:text-hawaii-blue-950!",
			bg: "bg-hawaii-blue!",
			bgDisabled: "bg-hawaii-blue-50! dark:bg-hawaii-blue-950!",
			inertBg: "inert:bg-hawaii-blue-50! dark:inert:bg-hawaii-blue-950!",
			selection: "selection:bg-hawaii-blue! caret-hawaii-blue!",
			optionSelected: "bg-hawaii-blue!",
			optionHover: [
				"hover:bg-hawaii-blue-50! active:bg-hawaii-blue-100!",
				"dark:hover:bg-hawaii-blue-950! dark:active:bg-hawaii-blue-900!",
			],
			inertOption:
				"inert:text-hawaii-blue-300! dark:inert:text-hawaii-blue-700!",
			singleValueInert:
				"inert:text-hawaii-blue-300! dark:inert:text-hawaii-blue-700!",
			singleValueDisabled: "text-hawaii-blue-300! dark:text-hawaii-blue-700!",
			multiValueInert:
				"inert:bg-hawaii-blue-50! dark:inert:bg-hawaii-blue-950!",
			multiValueDisabled: "bg-hawaii-blue-50! dark:bg-hawaii-blue-950!",
			multiValueLabelInert:
				"inert:text-hawaii-blue-300! dark:inert:text-hawaii-blue-700!",
			multiValueLabelDisabled:
				"text-hawaii-blue-300! dark:text-hawaii-blue-700!",
			multiValueRemoveHover:
				"hover:bg-hawaii-blue-300! dark:hover:bg-hawaii-blue-700!",
			multiValueRemoveInert:
				"inert:text-hawaii-blue-300! dark:inert:text-hawaii-blue-700!",
			multiValueRemoveDisabled:
				"text-hawaii-blue-300! dark:text-hawaii-blue-700!",
			indicatorSeparator: "bg-hawaii-blue!",
			indicatorSeparatorDisabled: "bg-hawaii-blue-50! dark:bg-hawaii-blue-950!",
			indicatorSeparatorInert:
				"inert:bg-hawaii-blue-50! dark:inert:bg-hawaii-blue-950!",
			menuBorder: "border-hawaii-blue",
		},
	};

	// Helper
	const cv = (color) => colorVariants[color] || {};

	const selectControlClassName = (state) =>
		clsx(
			"w-full cursor-text! rounded-lg! border-2! p-2!",
			"bg-white! transition-all dark:bg-black!",
			"autofill:ring-9999 autofill:ring-inset",
			"not-autofill:ring-0!",
			state.isFocused
				? "outline-2! outline-offset-1!"
				: "outline-0! outline-offset-0!",
			!state.isDisabled && cv(color).border,
			state.isDisabled && cv(color).borderDisabled,
			!state.isFocused && !state.isDisabled && cv(color).hover,
			cv(color).inert,
			additionalClassName?.replace(sizingRegex, ""),
		);

	const selectPlaceholderClassName = (state) =>
		clsx(
			"m-0!",
			cv(color).text,
			state.isDisabled && cv(color).textDisabled,
			cv(color).inertText,
		);

	const selectInputClassName = (state) =>
		clsx("m-0! p-0! text-black! dark:text-white!", cv(color).selection);

	const selectClearIndicatorClassName = (state) =>
		clsx("cursor-pointer! p-0!", cv(color).text);

	const selectLoadingIndicatorClassName = (state) =>
		clsx(
			cv(color).text,
			state.isDisabled && cv(color).textDisabled,
			cv(color).inertText,
		);

	const selectDropdownIndicatorClassName = (state) =>
		clsx(
			"cursor-pointer! p-0!",
			cv(color).text,
			state.isDisabled && cv(color).textDisabled,
			cv(color).inertText,
		);

	const selectIndicatorSeparatorClassName = (state) =>
		clsx(
			"mx-1.5! my-0! w-0.5! rounded-lg",
			cv(color).indicatorSeparator,
			state.isDisabled && cv(color).indicatorSeparatorDisabled,
			cv(color).indicatorSeparatorInert,
		);

	const selectMenuClassName = (state) =>
		clsx(
			"overflow-hidden rounded-lg! border-2 bg-white! dark:bg-black!",
			cv(color).menuBorder,
		);

	const selectOptionClassName = (state) =>
		clsx(
			"m-0! cursor-pointer! transition-all",
			!state.isSelected && "bg-white! dark:bg-black!",
			state.isSelected && cv(color).optionSelected,
			!state.isSelected && cv(color).optionHover,
		);

	const selectMessageClassName = (state) => clsx(cv(color).text);

	const selectSingleValueClassName = (state) =>
		clsx(
			!state.isDisabled && "text-black! dark:text-white!",
			cv(color).singleValueInert,
			state.isDisabled && cv(color).singleValueDisabled,
		);

	const selectMultiValueClassName = (state) =>
		clsx(
			"rounded-md! p-0!",
			!state.isDisabled && cv(color).bg,
			cv(color).multiValueInert,
			state.isDisabled && cv(color).multiValueDisabled,
		);

	const selectMultiValueLabelClassName = (state) =>
		clsx(
			"py-0!",
			!state.isDisabled && "text-white!",
			cv(color).multiValueLabelInert,
			state.isDisabled && cv(color).multiValueLabelDisabled,
		);

	const selectMultiValueRemoveClassName = (state) =>
		clsx(
			"rounded-md!",
			!state.isDisabled && "cursor-pointer text-white! transition-all",
			cv(color).multiValueRemoveHover,
			cv(color).multiValueRemoveInert,
			state.isDisabled && cv(color).multiValueRemoveDisabled,
		);

	const selectGroupClassName = (state) =>
		clsx("border-dashed p-0! not-last:border-b-2!", cv(color).borderDisabled);

	const selectGroupHeadingClassName = (state) =>
		clsx("m-0! pt-2! pb-1! font-bold!", cv(color).text);

	const selectInputWrapperClassName = clsx(
		"",
		additionalClassName?.match(sizingRegex),
	);
	return (
		<InputWrapper
			type="select"
			label={label}
			labelPosition={labelPosition}
			color={color}
			className={selectInputWrapperClassName}
		>
			<input
				tabIndex={-1}
				autoComplete="off"
				className="peer/wrapper sr-only"
				value={currentValue ? JSON.stringify(currentValue) : ""}
				name={name}
				required={required}
			/>
			<Select
				options={options}
				value={currentValue}
				defaultValue={defaultValue}
				components={animatedComponents}
				placeholder={placeholder}
				onChange={internalOnChange}
				isDisabled={disabled}
				isLoading={isLoading}
				isClearable={isClearable}
				isSearchable={isSearchable}
				isMulti={isMulti}
				classNames={{
					control: (state) => selectControlClassName(state),
					placeholder: (state) => selectPlaceholderClassName(state),
					valueContainer: () => "p-0!",
					input: (state) => selectInputClassName(state),
					singleValue: (state) => selectSingleValueClassName(state),
					multiValue: (state) => selectMultiValueClassName(state),
					multiValueLabel: (state) => selectMultiValueLabelClassName(state),
					multiValueRemove: (state) => selectMultiValueRemoveClassName(state),
					indicatorSeparator: (state) =>
						selectIndicatorSeparatorClassName(state),
					dropdownIndicator: (state) => selectDropdownIndicatorClassName(state),
					loadingIndicator: (state) => selectLoadingIndicatorClassName(state),
					clearIndicator: (state) => selectClearIndicatorClassName(state),
					menu: (state) => selectMenuClassName(state),
					menuList: () => "p-0!",
					option: (state) => selectOptionClassName(state),
					loadingMessage: (state) => selectMessageClassName(state),
					noOptionsMessage: (state) => selectMessageClassName(state),
					group: (state) => selectGroupClassName(state),
					groupHeading: (state) => selectGroupHeadingClassName(state),
				}}
				{...attributes}
			/>
		</InputWrapper>
	);
}
SelectInput.propTypes = propTypes;

export default SelectInput;
