import clsx from "clsx";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { tagPropType } from "~/components/utils/prop-types";

const propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	tag: tagPropType,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	fillType: PropTypes.oneOf(["full", "select-only", "select-invert"]),
	dynamic: PropTypes.bool,
};

const ColoredText = forwardRef(
	(
		{
			dynamic = false,
			fillType = "full",
			color = "blue",
			tag: Tag = "span",
			className: additionalClassName,
			children,
			...attributes
		},
		ref,
	) => {
		const coloredTextClassName = clsx(
			"select-text",
			fillType === "full" && {
				"text-hawaii-red": color === "red",
				"text-hawaii-yellow": color === "yellow",
				"text-hawaii-green": color === "green",
				"text-hawaii-blue": color === "blue",
			},
			fillType !== "full" && ["text-black dark:text-white"],
			fillType === "select-invert" && [
				"selection:bg-black dark:selection:bg-white",
				{
					"selection:text-hawaii-red": color === "red",
					"selection:text-hawaii-yellow": color === "yellow",
					"selection:text-hawaii-green": color === "green",
					"selection:text-hawaii-blue": color === "blue",
				},
			],
			["full", "select-only"].includes(fillType) && [
				"selection:text-black dark:selection:text-white",
				{
					"selection:bg-hawaii-red": color === "red",
					"selection:bg-hawaii-yellow": color === "yellow",
					"selection:bg-hawaii-green": color === "green",
					"selection:bg-hawaii-blue": color === "blue",
				},
			],
			additionalClassName,
		);
		return (
			<Tag ref={ref} className={coloredTextClassName} {...attributes}>
				{children}
			</Tag>
		);
	},
);
ColoredText.displayName = "Colored Text";
ColoredText.propTypes = propTypes;

export default ColoredText;
