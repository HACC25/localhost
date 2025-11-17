import clsx from "clsx";
import PropTypes from "prop-types";
import ColoredBlock from "~/components/surfaces/colored-block";
import ColoredText from "~/components/data-displays/colored-text";

const propTypes = {
	type: PropTypes.oneOf(["text", "block", "notification"]),
	severity: PropTypes.oneOf(["error", "warning", "success", "info"]),
	className: PropTypes.string,
	children: PropTypes.node,
};

function Alert({
	type = "text",
	severity = "error",
	className: additionalClassName,
	children,
	...attributes
}) {
	const alertClassName = clsx(
		"text-lg font-bold",
		"flex-row items-center justify-center",
		type === "text" && ["inline-flex"],
		type !== "text" && ["flex rounded-lg p-2 text-white"],
		type === "notification" && ["absolute top-5 left-5"],
		additionalClassName,
	);
	const iconBySeverity = {
		error: "error",
		warning: "warning",
		success: "check",
		info: "info",
	};
	const colorBySeverity = {
		error: "red",
		warning: "yellow",
		success: "green",
		info: "blue",
	};
	const Tag = type === "text" ? ColoredText : ColoredBlock;

	return (
		<Tag
			color={colorBySeverity[severity]}
			className={alertClassName}
			{...attributes}
		>
			<span className="font-symbols">{iconBySeverity[severity]}</span>
			{children}
		</Tag>
	);
}
Alert.propTypes = propTypes;

export default Alert;
