import clsx from "clsx";
import PropTypes from "prop-types";
import { inputTypes } from "~/components/utils/input";
import InputWrapper from "../components/input-wrapper";
import InputRow from "../components/input-row";
import Input from "~/components/inputs/input/input";
import Button from "~/components/inputs/button";

import { useState, useEffect } from "react";

const propTypes = {
	value: PropTypes.number,
	name: PropTypes.string,
	label: PropTypes.string,
	labelPosition: PropTypes.oneOf(["top", "left", "bottom", "right"]),
	required: PropTypes.bool,
	arrayType: PropTypes.oneOf(inputTypes),
	items: PropTypes.array,
	newItemLabel: PropTypes.string,
	newItemLabelPosition: PropTypes.string,
	newItemPlaceholder: PropTypes.string,
	newItemName: PropTypes.string,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	onChange: PropTypes.func,
	className: PropTypes.string,
};

function ArrayInput({
	value,
	name,
	label,
	labelPosition = "top",
	required = false,
	arrayType = "text",
	items,
	newItemLabel = "",
	newItemLabelPosition = "left",
	newItemPlaceholder = "Item",
	newItemName = "item",
	color = "blue",
	onChange,
	className: additionalClassName,
	...attributes
}) {
	const [currentItems, setCurrentItems] = useState(items || []);

	useEffect(() => {
		setCurrentItems(items || []);
	}, [items]);

	const addItem = () => {
		setCurrentItems((prev) => [
			...prev,
			{
				type: arrayType,
				required: required,
				value: "",
				checked: arrayType === "checkbox" ? false : undefined,
				...attributes,
			},
		]);
	};
	const removeItem = (iToRemove) => {
		setCurrentItems((prev) => prev.filter((_, i) => i !== iToRemove));
	};
	const updateItem = (e, iToUpdate) => {
		if (onChange) onChange(e);
		setCurrentItems((prev) =>
			prev.map((item, i) =>
				i === iToUpdate
					? {
							...item,
							checked: e?.target?.checked,
							value: e?.target?.value || e?.target?.checked,
						}
					: item,
			),
		);
	};

	const arrayInputWrapperClassName = clsx(
		currentItems?.length <= 0 && "gap-2",
		additionalClassName,
	);

	return (
		<InputWrapper
			type="array"
			label={label}
			labelPosition={labelPosition}
			color={color}
			className={arrayInputWrapperClassName}
		>
			<input
				tabIndex={-1}
				autoComplete="off"
				className="peer/wrapper sr-only"
				value={value}
				name={name}
				required={required}
			/>
			{currentItems?.length > 0 && (
				<div className="relative flex flex-col">
					<div className="absolute top-0 left-0 z-1 h-1 w-full bg-linear-to-b from-white dark:from-black" />
					<div className="flex max-h-50 snap-y flex-col gap-2 overflow-y-auto px-1 py-1.5">
						{currentItems?.map((item, i) => (
							<InputRow key={i} className="items-center">
								<Input
									className="w-full snap-center"
									color={color}
									onChange={(e) => updateItem(e, i)}
									{...item}
									label={newItemLabel ? `${newItemLabel} ${i + 1}` : undefined}
									labelPosition={newItemLabelPosition}
									placeholder={
										newItemPlaceholder
											? `${newItemPlaceholder} ${i + 1}`
											: undefined
									}
									name={newItemName ? `${newItemName}-${i + 1}` : undefined}
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
					<div className="absolute bottom-0 h-1 w-full bg-linear-to-t from-white dark:from-black" />
				</div>
			)}
			<Button topClassName="px-2 py-1 text-sm" color={color} onClick={addItem}>
				Add Item<span className="font-symbols">add</span>
			</Button>
		</InputWrapper>
	);
}
ArrayInput.propTypes = propTypes;

export default ArrayInput;
