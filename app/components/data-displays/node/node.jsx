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
		"section",
		"row",
	]),
	className: PropTypes.string,
	children: PropTypes.node,
};

function Node({
	type = "text",
	className: additionalClassName,
	children,
	...attributes
}) {
	const nodeClassName = clsx("flex flex-row", additionalClassName);

	return (
		<div className={nodeClassName} {...attributes}>
			<span className="font-symbols pr-1">{typeToIcon(type)}</span>
			<span>{children}</span>
		</div>
	);
}
Node.propTypes = propTypes;

export default Node;
