import clsx from "clsx";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router";

const propTypes = {
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	type: PropTypes.oneOf(["button", "submit", "reset", "link", "nav"]),
	rounding: PropTypes.oneOf(["none", "sm", "md", "lg"]),
	backgroundClassName: PropTypes.string,
	disabled: PropTypes.bool,
	depth: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	topClassName: PropTypes.string,
};

function Button({
	color = "blue",
	type = "button",
	rounding = "md",
	backgroundClassName = false,
	disabled = false,
	depth = true,
	className: additionalClassName,
	topClassName: additionalTopClassName,
	children,
	...attributes
}) {
	const roundingClassNames = {
		none: "",
		sm: "rounded-sm",
		md: "rounded-lg",
		lg: "rounded-full",
	};
	const buttonClassName = clsx(
		"flex font-bold",
		"items-center justify-center text-center",
		"transition-all",
		"select-none",
		roundingClassNames[rounding],
		color === "red" && "focus:outline-hawaii-red",
		color === "yellow" && "focus:outline-hawaii-yellow",
		color === "green" && "focus:outline-hawaii-green",
		color === "blue" && "focus:outline-hawaii-blue",
		disabled
			? [
					"pointer-events-none",
					color === "red" && "text-hawaii-red",
					color === "yellow" && "text-hawaii-yellow",
					color === "green" && "text-hawaii-green",
					color === "blue" && "text-hawaii-blue",
				]
			: [
					color === "red" && "text-hawaii-red-950 dark:text-hawaii-red-50",
					color === "yellow" &&
						"text-hawaii-yellow-950 dark:text-hawaii-yellow-50",
					color === "green" &&
						"text-hawaii-green-950 dark:text-hawaii-green-50",
					color === "blue" && "text-hawaii-blue-950 dark:text-hawaii-blue-50",
					"group/button hover:cursor-pointer active:transition-none",
				],
		depth
			? [
					color === "red" && "bg-hawaii-red-100 dark:bg-hawaii-red-900",
					color === "yellow" &&
						"bg-hawaii-yellow-100 dark:bg-hawaii-yellow-900",
					color === "green" && "bg-hawaii-green-100 dark:bg-hawaii-green-900",
					color === "blue" && "bg-hawaii-blue-100 dark:bg-hawaii-blue-900",
					!disabled && [
						color === "red" && [
							"hover:bg-hawaii-red-200 active:bg-hawaii-red-300",
							"dark:hover:bg-hawaii-red-800 dark:active:bg-hawaii-red-700",
						],
						color === "yellow" && [
							"hover:bg-hawaii-yellow-200 active:bg-hawaii-yellow-300",
							"dark:hover:bg-hawaii-yellow-800 dark:active:bg-hawaii-yellow-700",
						],
						color === "green" && [
							"hover:bg-hawaii-green-200 active:bg-hawaii-green-300",
							"dark:hover:bg-hawaii-green-800 dark:active:bg-hawaii-green-700",
						],
						color === "blue" && [
							"hover:bg-hawaii-blue-200 active:bg-hawaii-blue-300",
							"dark:hover:bg-hawaii-blue-800 dark:active:bg-hawaii-blue-700",
						],
					],
				]
			: [
					"p-4",
					backgroundClassName,
					color === "red" && "bg-hawaii-red-50 dark:bg-hawaii-red-950",
					color === "yellow" && "bg-hawaii-yellow-50 dark:bg-hawaii-yellow-950",
					color === "green" && "bg-hawaii-green-50 dark:bg-hawaii-green-950",
					color === "blue" && "bg-hawaii-blue-50 dark:bg-hawaii-blue-950",
					!disabled && [
						color === "red" && [
							"hover:bg-hawaii-red-100 active:bg-hawaii-red-200",
							"dark:hover:bg-hawaii-red-900 dark:active:bg-hawaii-red-800",
						],
						color === "yellow" && [
							"hover:bg-hawaii-yellow-100 active:bg-hawaii-yellow-200",
							"dark:hover:bg-hawaii-yellow-900 dark:active:bg-hawaii-yellow-800",
						],
						color === "green" && [
							"hover:bg-hawaii-green-100 active:bg-hawaii-green-200",
							"dark:hover:bg-hawaii-green-900 dark:active:bg-hawaii-green-800",
						],
						color === "blue" && [
							"hover:bg-hawaii-blue-100 active:bg-hawaii-blue-200",
							"dark:hover:bg-hawaii-blue-900 dark:active:bg-hawaii-blue-800",
						],
					],
				],
		additionalClassName,
	);
	const buttonTopClassName = clsx(
		roundingClassNames[rounding],
		backgroundClassName,
		"flex items-center justify-center",
		"size-fit min-h-full min-w-full p-4",
		"relative",
		"transition-all",
		color === "red" && "bg-hawaii-red-50 dark:bg-hawaii-red-950",
		color === "yellow" && "bg-hawaii-yellow-50 dark:bg-hawaii-yellow-950",
		color === "green" && "bg-hawaii-green-50 dark:bg-hawaii-green-950",
		color === "blue" && "bg-hawaii-blue-50 dark:bg-hawaii-blue-950",
		disabled
			? ["bottom-0"]
			: [
					"bottom-1",
					"group-hover/button:bottom-1.5 group-hover/button:cursor-pointer",
					"group-active/button:bottom-0 group-active/button:transition-none",
					color === "red" && [
						"group-hover/button:bg-hawaii-red-100 group-active/button:bg-hawaii-red-200",
						"dark:group-hover/button:bg-hawaii-red-900 dark:group-active/button:bg-hawaii-red-800",
					],
					color === "yellow" && [
						"group-hover/button:bg-hawaii-yellow-100 group-active/button:bg-hawaii-yellow-200",
						"dark:group-hover/button:bg-hawaii-yellow-900 dark:group-active/button:bg-hawaii-yellow-800",
					],
					color === "green" && [
						"group-hover/button:bg-hawaii-green-100 group-active/button:bg-hawaii-green-200",
						"dark:group-hover/button:bg-hawaii-green-900 dark:group-active/button:bg-hawaii-green-800",
					],
					color === "blue" && [
						"group-hover/button:bg-hawaii-blue-100 group-active/button:bg-hawaii-blue-200",
						"dark:group-hover/button:bg-hawaii-blue-900 dark:group-active/button:bg-hawaii-blue-800",
					],
				],
		additionalTopClassName,
	);
	const isNormalButton = ["button", "submit", "reset"].includes(type);
	const LinkTag = type === "link" ? Link : NavLink;
	const Tag = isNormalButton ? "button" : LinkTag;
	return (
		<Tag
			type={isNormalButton && type}
			disabled={disabled}
			className={buttonClassName}
			onContextMenu={(e) => e.preventDefault()}
			{...attributes}
		>
			{depth ? (
				<span className={buttonTopClassName}>{children}</span>
			) : (
				children
			)}
		</Tag>
	);
}
Button.propTypes = propTypes;

export default Button;
