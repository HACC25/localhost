import clsx from "clsx";
import PropTypes from "prop-types";
import { typeToIcon } from "~/components/utils/input";

const propTypes = {
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
	]),
	className: PropTypes.string,
	children: PropTypes.node,
};

function InputNode({
	type = "text",
	className: additionalClassName,
	...attributes
}) {
	const inputNodeClassName = clsx("flex flex-row", additionalClassName);

	return (
		<div className={inputNodeClassName} {...attributes}>
			<span className="font-symbols pr-1">{typeToIcon(type)}</span>
			<span>Income</span>
		</div>
	);
}
InputNode.propTypes = propTypes;

export default InputNode;
