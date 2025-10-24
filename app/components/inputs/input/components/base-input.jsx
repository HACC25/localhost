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
		"w-full rounded-lg border-2 p-2",
		"transition-all active:transition-none",
		"bg-white focus:bg-white",
		"dark:bg-black dark:focus:bg-black",
		"autofill:ring-9999 autofill:ring-inset", //fill input on autofill
		color === "red" && [
			"border-hawaii-red outline-hawaii-red",
			"hover:bg-hawaii-red-50 active:bg-hawaii-red-100",
			"dark:hover:bg-hawaii-red-950 dark:active:bg-hawaii-red-900",
			"selection:bg-hawaii-red caret-hawaii-red",
			"autofill:ring-hawaii-red-50 dark:autofill:ring-hawaii-red-950",
		],
		color === "yellow" && [
			"border-hawaii-yellow outline-hawaii-yellow",
			"hover:bg-hawaii-yellow-50 active:bg-hawaii-yellow-100",
			"dark:hover:bg-hawaii-yellow-950 dark:active:bg-hawaii-yellow-900",
			"selection:bg-hawaii-yellow caret-hawaii-yellow",
			"autofill:ring-hawaii-yellow-50 dark:autofill:ring-hawaii-yellow-950",
		],
		color === "green" && [
			"border-hawaii-green outline-hawaii-green",
			"hover:bg-hawaii-green-50 active:bg-hawaii-green-100",
			"dark:hover:bg-hawaii-green-950 dark:active:bg-hawaii-green-900",
			"selection:bg-hawaii-green caret-hawaii-green",
			"autofill:ring-hawaii-green-50 dark:autofill:ring-hawaii-green-950",
		],
		color === "blue" && [
			"border-hawaii-blue outline-hawaii-blue",
			"hover:bg-hawaii-blue-50 active:bg-hawaii-blue-100",
			"dark:hover:bg-hawaii-blue-950 dark:active:bg-hawaii-blue-900",
			"selection:bg-hawaii-blue caret-hawaii-blue",
			"autofill:ring-hawaii-blue-50 dark:autofill:ring-hawaii-blue-950",
		],
		additionalClassName,
	);

	return <input className={baseInputClassName} {...attributes} />;
}

BaseInput.propTypes = propTypes;

export default BaseInput;
