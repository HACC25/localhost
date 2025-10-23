import clsx from "clsx";
import PropTypes from "prop-types";
import Button from "~/components/inputs/button";
import BaseInput from "../components/base-input";
import InputWrapper from "../components/input-wrapper";

import { useRef, useState, useEffect } from "react";

const propTypes = {
	value: PropTypes.number,
	name: PropTypes.string,
	label: PropTypes.string,
	labelPosition: PropTypes.oneOf(["top", "left", "bottom", "right"]),
	required: PropTypes.bool,
	placeholder: PropTypes.string,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	step: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	onChange: PropTypes.func,
	className: PropTypes.string,
};

function NumberInput({
	value,
	name,
	label,
	labelPosition = "top",
	required = false,
	placeholder = "Input...",
	color = "blue",
	step = 1,
	min,
	max,
	onChange,
	className: additionalClassName,
	...attributes
}) {
	const [currentValue, setCurrentValue] = useState(value);
	const disableDecrement = currentValue === min;
	const disableIncrement = currentValue === max;
	const capNumber = (number) => {
		let newNumber = parseFloat(number);
		if (typeof min === "number") newNumber = Math.max(min, newNumber);
		if (typeof max === "number") newNumber = Math.min(max, newNumber);
		return newNumber;
	};

	useEffect(() => {
		setCurrentValue(capNumber(value));
	}, [value]);

	const internalOnChange = (e) => {
		if (onChange) onChange(e);
		setCurrentValue(
			e.target.value === "" ? e.target.value : capNumber(e.target.value),
		);
	};

	const timeoutRef = useRef(null);
	const activePointerId = useRef(null);
	const numberInputRef = useRef(null);

	const updateValue = (delta) => {
		const current =
			parseFloat(numberInputRef.current.value || currentValue) || 0;
		const next = capNumber(current + delta);

		setCurrentValue(next);
		onChange({ target: { name, value: next } });
	};

	const accelerate = (delta, delay = 300) => {
		updateValue(delta);
		timeoutRef.current = setTimeout(() => {
			const nextDelay = Math.max(50, delay * 0.75); // accelerate
			accelerate(delta, nextDelay);
		}, delay);
	};

	const stopAccelerate = (e) => {
		if (e.pointerId === activePointerId.current) {
			clearTimeout(timeoutRef.current);
			activePointerId.current = null;
		}
	};

	const handlePress = (delta) => ({
		onPointerDown: (e) => {
			if (activePointerId.current !== null) return;
			activePointerId.current = e.pointerId;
			e.target.setPointerCapture(e.pointerId);
			updateValue(delta);
			accelerate(delta);
		},
		onPointerUp: stopAccelerate,
		onPointerCancel: stopAccelerate,
		onKeyDown: (e) => {
			if (e.key === " " || e.key === "Enter") {
				updateValue(delta);
			}
		},
		tabIndex: 0,
		role: "button",
		"aria-label": delta > 0 ? "Increment" : "Decrement",
	});
	const numberInputClassName = clsx(
		"font-mono slashed-zero tabular-nums",
		additionalClassName,
	);
	const buttonClassName = clsx("px-2 py-1");
	return (
		<InputWrapper
			label={label}
			labelPosition={labelPosition}
			required={required}
		>
			<div className="flex flex-row gap-2">
				<Button
					topClassName={buttonClassName}
					color={color}
					disabled={disableDecrement}
					{...handlePress(-step)}
				>
					←
				</Button>
				<BaseInput
					ref={numberInputRef}
					type="number"
					value={currentValue}
					name={name}
					required={required}
					placeholder={placeholder}
					color={color}
					onChange={internalOnChange}
					onKeyDown={(e) => {
						if (e.key === "ArrowLeft") updateValue(-step);
						if (e.key === "ArrowRight") updateValue(step);
					}}
					className={numberInputClassName}
					{...attributes}
				/>
				<Button
					topClassName={buttonClassName}
					color={color}
					disabled={disableIncrement}
					{...handlePress(step)}
				>
					→
				</Button>
			</div>
		</InputWrapper>
	);
}
NumberInput.propTypes = propTypes;

export default NumberInput;
