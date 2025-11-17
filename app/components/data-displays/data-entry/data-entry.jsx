import clsx from "clsx";
import PropTypes from "prop-types";
import { typeToIcon } from "~/components/utils/input";
import ColoredText from "~/components/data-displays/colored-text";

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
};

function DataEntry({
	type = "text",
	label,
	value,
	className: additionalClassName,
	...attributes
}) {
	const dataEntryClassName = clsx("flex flex-col", additionalClassName);

	return (
		<div className={dataEntryClassName} {...attributes}>
			<div className="flex flex-row">
				{" "}
				<ColoredText className="font-symbols pr-1">
					{typeToIcon(type?.toLowerCase())}
				</ColoredText>
				<label className="font-bold">{label}</label>
			</div>
			<div className="pl-6">{value}</div>
		</div>
	);
}
DataEntry.propTypes = propTypes;

export default DataEntry;
