import clsx from "clsx";
import PropTypes from "prop-types";
import InputWrapper from "../components/input-wrapper";
import InputRow from "../components/input-row";
import Input from "~/components/inputs/input/input";
import Button from "~/components/inputs/button";
import { useState, useEffect } from "react";

const propTypes = {
	value: PropTypes.string, // JSON string of array
	defaultValue: PropTypes.string, // JSON string of array
	name: PropTypes.string,
	label: PropTypes.string,
	labelPosition: PropTypes.oneOf(["top", "left", "bottom", "right"]),
	required: PropTypes.bool,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	onChange: PropTypes.func,
	className: PropTypes.string,
};

function BarInput({
	value,
	defaultValue,
	name,
	label,
	labelPosition = "top",
	required = false,
	color = "blue",
	onChange,
	className: additionalClassName,
	...attributes
}) {
	// Parse initial items from value or defaultValue
	const initialItems = (() => {
		try {
			if (value) return JSON.parse(value);
			if (defaultValue) return JSON.parse(defaultValue);
			return [];
		} catch {
			return [];
		}
	})();

	const [items, setItems] = useState(initialItems);

	// Sync when value changes (controlled mode)
	useEffect(() => {
		if (value !== undefined) {
			try {
				setItems(value ? JSON.parse(value) : []);
			} catch {
				setItems([]);
			}
		}
	}, [value]);

	const addItem = () => {
		setItems((prev) => [...prev, { label: "", value: 0 }]);
	};

	const removeItem = (iToRemove) => {
		setItems((prev) => prev.filter((_, i) => i !== iToRemove));
	};

	const updateItem = (field, newValue, iToUpdate) => {
		const updated = items.map((item, i) =>
			i === iToUpdate ? { ...item, [field]: newValue } : item,
		);
		setItems(updated);
		if (onChange) {
			onChange({
				target: {
					name,
					value: JSON.stringify(updated),
				},
			});
		}
	};

	const barInputWrapperClassName = clsx("gap-2", additionalClassName);

	return (
		<InputWrapper
			type="array"
			label={label}
			labelPosition={labelPosition}
			color={color}
			className={barInputWrapperClassName}
		>
			{/* Hidden input with JSON string value */}
			<input
				tabIndex={-1}
				autoComplete="off"
				className="peer/wrapper sr-only"
				value={JSON.stringify(items)}
				name={name}
				required={required}
				readOnly
			/>

			{items?.length > 0 && (
				<div className="flex flex-col gap-2">
					{items.map((item, i) => (
						<InputRow key={i} className="items-center gap-2">
							<Input
								type="text"
								className="flex-1"
								color={color}
								value={item.label}
								onChange={(e) => updateItem("label", e.target.value, i)}
								placeholder={`Category ${i + 1}`}
								//name={`${name}-label-${i}`}
							/>
							<Input
								type="number"
								className="w-32"
								color={color}
								value={item.value}
								onChange={(e) => updateItem("value", Number(e.target.value), i)}
								placeholder="Value"
								//name={`${name}-value-${i}`}
							/>
							<Button
								className="h-6"
								topClassName="px-1 py-0 font-symbols"
								color={color}
								onClick={() => removeItem(i)}
							>
								remove
							</Button>
						</InputRow>
					))}
				</div>
			)}

			<Button topClassName="px-2 py-1 text-sm" color={color} onClick={addItem}>
				Add Category<span className="font-symbols">add</span>
			</Button>
		</InputWrapper>
	);
}

BarInput.propTypes = propTypes;

export default BarInput;
