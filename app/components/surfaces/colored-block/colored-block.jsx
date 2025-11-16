import clsx from "clsx";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import ColoredText from "~/components/data-displays/colored-text";
import { tagPropType } from "~/components/utils/prop-types";

const propTypes = {
	tag: tagPropType,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	fillType: PropTypes.oneOf(["solid", "border"]),
	dynamic: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
};

const ColoredBlock = forwardRef(
	(
		{
			dynamic = false,
			fillType = "solid",
			color = "blue",
			tag = "div",
			className: additionalClassName,
			children,
			...attributes
		},
		ref,
	) => {
		const coloredBlockClassName = clsx(
			{
				"outline-hawaii-red": color === "red",
				"outline-hawaii-yellow": color === "yellow",
				"outline-hawaii-green": color === "green",
				"outline-hawaii-blue": color === "blue",
			},
			fillType === "border" && [
				"border-2",
				color === "red" && ["border-hawaii-red"],
				color === "yellow" && ["border-hawaii-yellow"],
				color === "green" && ["border-hawaii-green"],
				color === "blue" && ["border-hawaii-blue"],
			],
			fillType === "solid" && [
				color === "red" && ["bg-hawaii-red"],
				color === "yellow" && ["bg-hawaii-yellow"],
				color === "green" && ["bg-hawaii-green"],
				color === "blue" && ["bg-hawaii-blue"],
			],
			additionalClassName,
		);
		let coloredTextFillType = "select-invert";
		if (fillType !== "solid") coloredTextFillType = "full";
		return (
			<ColoredText
				fillType={coloredTextFillType}
				tag={tag}
				ref={ref}
				className={coloredBlockClassName}
				color={color}
				dynamic={dynamic}
				{...attributes}
			>
				{children}
			</ColoredText>
		);
	},
);

ColoredBlock.displayName = "Colored Block";
ColoredBlock.propTypes = propTypes;

export default ColoredBlock;
