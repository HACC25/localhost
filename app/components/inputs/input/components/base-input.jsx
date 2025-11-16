import clsx from "clsx";
import PropTypes from "prop-types";

const propTypes = {
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	showMeta: PropTypes.bool,
	className: PropTypes.string,
};

function BaseInput({
	color = "blue",
	showMeta = true,
	className: additionalClassName,
	...attributes
}) {
	const baseInputClassName = clsx(
		"w-full rounded-lg border-2 p-2",
		"transition-all",
		"bg-white not-disabled:focus:bg-white",
		"dark:bg-black dark:not-disabled:focus:bg-black",
		"selection:text-black dark:selection:text-white",
		"autofill:ring-9999 autofill:ring-inset", //fill input on autofill
		color === "red" && [
			"placeholder:text-hawaii-red",
			"border-hawaii-red outline-hawaii-red",
			"disabled:border-hawaii-red-50 dark:disabled:border-hawaii-red-950",
			"disabled:placeholder:text-hawaii-red-50 dark:disabled:placeholder:text-hawaii-red-950",
			"disabled:text-hawaii-red-300 dark:disabled:text-hawaii-red-700",
			"inert:border-hawaii-red-50 dark:inert:border-hawaii-red-950",
			"inert:placeholder:text-hawaii-red-50 dark:inert:placeholder:text-hawaii-red-950",
			"inert:text-hawaii-red-300 dark:inert:text-hawaii-red-700",
			"not-disabled:hover:bg-hawaii-red-50 not-disabled:active:bg-hawaii-red-100",
			"dark:not-disabled:hover:bg-hawaii-red-950 dark:not-disabled:active:bg-hawaii-red-900",
			"selection:bg-hawaii-red caret-hawaii-red",
			"autofill:ring-hawaii-red-50 dark:autofill:ring-hawaii-red-950",
		],
		color === "yellow" && [
			"placeholder:text-hawaii-yellow",
			"border-hawaii-yellow outline-hawaii-yellow",
			"disabled:border-hawaii-yellow-50 dark:disabled:border-hawaii-yellow-950",
			"disabled:placeholder:text-hawaii-yellow-50 dark:disabled:placeholder:text-hawaii-yellow-950",
			"disabled:text-hawaii-yellow-300 dark:disabled:text-hawaii-yellow-700",
			"inert:border-hawaii-yellow-50 dark:inert:border-hawaii-yellow-950",
			"inert:placeholder:text-hawaii-yellow-50 dark:inert:placeholder:text-hawaii-yellow-950",
			"inert:text-hawaii-yellow-300 dark:inert:text-hawaii-yellow-700",
			"not-disabled:hover:bg-hawaii-yellow-50 not-disabled:active:bg-hawaii-yellow-100",
			"dark:not-disabled:hover:bg-hawaii-yellow-950 dark:not-disabled:active:bg-hawaii-yellow-900",
			"selection:bg-hawaii-yellow caret-hawaii-yellow",
			"autofill:ring-hawaii-yellow-50 dark:autofill:ring-hawaii-yellow-950",
		],
		color === "green" && [
			"placeholder:text-hawaii-green",
			"border-hawaii-green outline-hawaii-green",
			"disabled:border-hawaii-green-50 dark:disabled:border-hawaii-green-950",
			"disabled:placeholder:text-hawaii-green-50 dark:disabled:placeholder:text-hawaii-green-950",
			"disabled:text-hawaii-green-300 dark:disabled:text-hawaii-green-700",
			"inert:border-hawaii-green-50 dark:inert:border-hawaii-green-950",
			"inert:placeholder:text-hawaii-green-50 dark:inert:placeholder:text-hawaii-green-950",
			"inert:text-hawaii-green-300 dark:inert:text-hawaii-green-700",
			"not-disabled:hover:bg-hawaii-green-50 not-disabled:active:bg-hawaii-green-100",
			"dark:not-disabled:hover:bg-hawaii-green-950 dark:not-disabled:active:bg-hawaii-green-900",
			"selection:bg-hawaii-green caret-hawaii-green",
			"autofill:ring-hawaii-green-50 dark:autofill:ring-hawaii-green-950",
		],
		color === "blue" && [
			"placeholder:text-hawaii-blue",
			"border-hawaii-blue outline-hawaii-blue",
			"disabled:border-hawaii-blue-50 dark:disabled:border-hawaii-blue-950",
			"disabled:placeholder:text-hawaii-blue-50 dark:disabled:placeholder:text-hawaii-blue-950",
			"disabled:text-hawaii-blue-300 dark:disabled:text-hawaii-blue-700",
			"inert:border-hawaii-blue-50 dark:inert:border-hawaii-blue-950",
			"inert:placeholder:text-hawaii-blue-50 dark:inert:placeholder:text-hawaii-blue-950",
			"inert:text-hawaii-blue-300 dark:inert:text-hawaii-blue-700",
			"not-disabled:hover:bg-hawaii-blue-50 not-disabled:active:bg-hawaii-blue-100",
			"dark:not-disabled:hover:bg-hawaii-blue-950 dark:not-disabled:active:bg-hawaii-blue-900",
			"selection:bg-hawaii-blue caret-hawaii-blue",
			"autofill:ring-hawaii-blue-50 dark:autofill:ring-hawaii-blue-950",
		],
		"placeholder:not-italic",
		"user-invalid:border-red-500 user-invalid:outline-red-500",
		"user-invalid:caret-red-500",
		"user-invalid:hover:bg-red-50 dark:user-invalid:hover:bg-red-950",
		"user-invalid:active:bg-red-100 dark:user-invalid:active:bg-red-900",
		"user-invalid:selection:bg-red-500",
		"user-invalid:placeholder:text-red-500",
		"user-invalid:autofill:ring-red-50",
		"dark:user-invalid:autofill:ring-red-950",
		"user-invalid:pr-11",
		"user-valid:pr-11",
		"read-only:pr-11",
		"peer/input",
		additionalClassName,
	);

	const metaClassName = clsx(
		"pointer-events-none select-none",
		"absolute right-2.5 w-7 py-0.5 text-center",
		"rounded-md text-white",
		"opacity-0 transition-opacity",
		"after:font-symbols",
		"peer-user-invalid/input:opacity-100",
		"peer-user-invalid/input:bg-red-500",
		"peer-user-invalid/input:after:content-['exclamation']",
		"peer-read-only/input:opacity-100",
		"peer-read-only/input:after:content-['edit\\_off']",
		"peer-user-valid/input:opacity-100",
		"peer-user-valid/input:after:content-['check']",
		"peer-autofill/input:opacity-100",
		"peer-autofill/input:after:content-['wand\\_stars']",
		color === "red" && [
			"peer-read-only/input:bg-hawaii-red",
			"peer-user-valid/input:bg-hawaii-red",
			"peer-autofill/input:bg-hawaii-red",
		],
		color === "yellow" && [
			"peer-read-only/input:bg-hawaii-yellow",
			"peer-user-valid/input:bg-hawaii-yellow",
			"peer-autofill/input:bg-hawaii-yellow",
		],
		color === "green" && [
			"peer-read-only/input:bg-hawaii-green",
			"peer-user-valid/input:bg-hawaii-green",
			"peer-autofill/input:bg-hawaii-green",
		],
		color === "blue" && [
			"peer-read-only/input:bg-hawaii-blue",
			"peer-user-valid/input:bg-hawaii-blue",
			"peer-autofill/input:bg-hawaii-blue",
		],
	);

	return (
		<div className="peer/wrapper relative flex w-full flex-row items-center justify-center">
			<input className={baseInputClassName} {...attributes} />
			{showMeta && <span className={metaClassName} />}
		</div>
	);
}

BaseInput.propTypes = propTypes;

export default BaseInput;
