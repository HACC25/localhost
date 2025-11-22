import clsx from "clsx";
import PropTypes from "prop-types";
import { typeToIcon } from "~/components/utils/input";
import ColoredText from "~/components/data-displays/colored-text";
import Bar from "~/components/data-displays/data-entry/bar";

const propTypes = {
	label: PropTypes.string,
	color: PropTypes.oneOf("red", "yellow", "green", "blue"),
	type: PropTypes.oneOf([
		"text",
		"number",
		"password",
		"file",
		"email",
		"url",
		"tel",
		"search",
		"date",
		"datetime",
		"datetime-local",
		"month",
		"week",
		"time",
		"color",
		"checkbox",
		"radio",
		"range",
		"hidden",
		"image",
		"reset",
		"submit",
		"button",
		"section",
		"row",
	]),
	className: PropTypes.string,
	value: PropTypes.any,
	compareValue: PropTypes.any,
};

function DataEntry({
	type = "text",
	color = "blue",
	label,
	value,
	compareValue,
	className: additionalClassName,
	...attributes
}) {
	const dataEntryClassName = clsx(
		"flex flex-col",
		type === "BAR" && "w-full",
		additionalClassName,
	);

	const renderType = (entryType, entryValue, entryColor, compareEntryValue) => {
		if (entryType === "TOGGLE") {
			return (
				<span className="font-symbols">
					{entryValue === "true" ? "check_box" : "check_box_outline"}
				</span>
			);
		}

		if (entryType === "SELECT") {
			try {
				return JSON.parse(entryValue || "[]")?.label;
			} catch {
				return null;
			}
		}

		if (entryType === "BAR") {
			let baseData = [];
			let compareData = [];

			try {
				baseData = JSON.parse(entryValue || "[]").map((entry) => ({
					...entry,
					color: entryColor,
					series: "base",
				}));
			} catch {}

			try {
				if (compareEntryValue) {
					compareData = JSON.parse(compareEntryValue || "[]").map((entry) => ({
						...entry,
						color: "yellow",
						series: "compare",
					}));
				}
			} catch {}

			const combinedData = [...baseData, ...compareData];

			return <Bar className="h-50 w-full" data={combinedData} />;
		}

		return entryValue;
	};

	return (
		<div className={dataEntryClassName} {...attributes}>
			<div className="flex flex-row">
				{" "}
				<ColoredText color={color} className="font-symbols pr-1">
					{typeToIcon(type?.toLowerCase())}
				</ColoredText>
				<label className="font-bold">{label}</label>
			</div>
			<ColoredText color={color} className="pl-6">
				{renderType(
					type,
					value,
					compareValue ? color : undefined,
					compareValue,
				)}
			</ColoredText>
			{compareValue && compareValue !== value && type !== "BAR" && (
				<ColoredText color="yellow" className="pl-6">
					{renderType(type, compareValue, "yellow")}
				</ColoredText>
			)}
		</div>
	);
}
DataEntry.propTypes = propTypes;

export default DataEntry;
