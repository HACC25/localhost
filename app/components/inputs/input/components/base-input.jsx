import clsx from "clsx";
import PropTypes from "prop-types";

const propTypes = {
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	className: PropTypes.string,
};

function BaseInput({
	color = "blue",
	className: additionalClassName,
	...attributes
}) {
	const baseInputClassName = clsx(
		"rounded-lg border-2 p-2",
		"transition-all active:transition-none",
		"bg-white focus:bg-white",
		"dark:bg-black dark:focus:bg-black",
		color === "red" && [
			"border-hawaii-red focus:ring-hawaii-red",
			"hover:bg-hawaii-red-50 active:bg-hawaii-red-100",
			"dark:hover:bg-hawaii-red-950 dark:active:bg-hawaii-red-900",
			"selection:bg-hawaii-red caret-hawaii-red",
		],
		color === "yellow" && [
			"border-hawaii-yellow focus:ring-hawaii-yellow",
			"hover:bg-hawaii-yellow-50 active:bg-hawaii-yellow-100",
			"dark:hover:bg-hawaii-yellow-950 dark:active:bg-hawaii-yellow-900",
			"selection:bg-hawaii-yellow caret-hawaii-yellow",
		],
		color === "green" && [
			"border-hawaii-green focus:ring-hawaii-green",
			"hover:bg-hawaii-green-50 active:bg-hawaii-green-100",
			"dark:hover:bg-hawaii-green-950 dark:active:bg-hawaii-green-900",
			"selection:bg-hawaii-green caret-hawaii-green",
		],
		color === "blue" && [
			"border-hawaii-blue focus:ring-hawaii-blue",
			"hover:bg-hawaii-blue-50 active:bg-hawaii-blue-100",
			"dark:hover:bg-hawaii-blue-950 dark:active:bg-hawaii-blue-900",
			"selection:bg-hawaii-blue caret-hawaii-blue",
		],
		additionalClassName,
	);

	return <input className={baseInputClassName} {...attributes} />;
}

BaseInput.propTypes = propTypes;

export default BaseInput;
