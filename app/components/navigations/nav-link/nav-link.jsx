import clsx from "clsx";
import PropTypes from "prop-types";
import { NavLink as BaseNavLink, useNavigation } from "react-router";

const propTypes = {
	to: PropTypes.string,
	icon: PropTypes.string,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	disabled: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node,
};

function NavLink({
	to,
	color = "blue",
	icon = "link",
	disabled: suggestedDisabled = false,
	className: additionalClassName,
	children,
	...attributes
}) {
	const navigation = useNavigation();
	const disabled =
		["loading", "submitting"].includes(navigation?.state) || suggestedDisabled;

	const onInternalClick = (e) => {
		if (disabled) {
			e.preventDefault();
			return;
		}
	};

	const navLinkClassName = ({ isActive }) =>
		clsx(
			"flex items-center justify-center px-2",
			"font-bold transition outline-none",
			"sm:text-xl",
			"sm:h-full",
			"max-sm:flex-col sm:flex-row",
			"max-sm:-translate-y-5",
			"max-sm:text-md",
			"max-sm:aspect-1/1 max-sm:hover:-translate-y-7 max-sm:hover:scale-105",
			"max-sm:rounded-2xl max-sm:shadow-lg",
			color == "red" && [
				"max-sm:shadow-hawaii-red-200 max-sm:dark:shadow-hawaii-red-800",
				!isActive && [
					"text-hawaii-red-950 dark:text-hawaii-red-50",
					"sm:hover:bg-hawaii-red-950 sm:hover:text-hawaii-red-50",
					"sm:hover:dark:bg-hawaii-red-50 sm:hover:dark:text-hawaii-red-950",
					"max-sm:bg-hawaii-red-50 max-sm:dark:bg-hawaii-red-950",
				],
				isActive && [
					"bg-hawaii-red-950 text-hawaii-red-50",
					"dark:bg-hawaii-red-50 dark:text-hawaii-red-950",
				],
			],
			color == "yellow" && [
				"max-sm:shadow-hawaii-yellow-200 max-sm:dark:shadow-hawaii-yellow-800",
				!isActive && [
					"text-hawaii-yellow-950 dark:text-hawaii-yellow-50",
					"sm:hover:bg-hawaii-yellow-950 sm:hover:text-hawaii-yellow-50",
					"sm:hover:dark:bg-hawaii-yellow-50 sm:hover:dark:text-hawaii-yellow-950",
					"max-sm:bg-hawaii-yellow-50 max-sm:dark:bg-hawaii-yellow-950",
				],
				isActive && [
					"bg-hawaii-yellow-950 text-hawaii-yellow-50",
					"dark:bg-hawaii-yellow-50 dark:text-hawaii-yellow-950",
				],
			],
			color == "green" && [
				"max-sm:shadow-hawaii-green-200 max-sm:dark:shadow-hawaii-green-800",
				!isActive && [
					"text-hawaii-green-950 dark:text-hawaii-green-50",
					"sm:hover:bg-hawaii-green-950 sm:hover:text-hawaii-green-50",
					"sm:hover:dark:bg-hawaii-green-50 sm:hover:dark:text-hawaii-green-950",
					"max-sm:bg-hawaii-green-50 max-sm:dark:bg-hawaii-green-950",
				],
				isActive && [
					"bg-hawaii-green-950 text-hawaii-green-50",
					"dark:bg-hawaii-green-50 dark:text-hawaii-green-950",
				],
			],
			color == "blue" && [
				"max-sm:shadow-hawaii-blue-200 max-sm:dark:shadow-hawaii-blue-800",
				!isActive && [
					"text-hawaii-blue-950 dark:text-hawaii-blue-50",
					"sm:hover:bg-hawaii-blue-950 sm:hover:text-hawaii-blue-50",
					"sm:hover:dark:bg-hawaii-blue-50 sm:hover:dark:text-hawaii-blue-950",
					"max-sm:bg-hawaii-blue-50 max-sm:dark:bg-hawaii-blue-950",
				],
				isActive && [
					"bg-hawaii-blue-950 text-hawaii-blue-50",
					"dark:bg-hawaii-blue-50 dark:text-hawaii-blue-950",
				],
			],
			additionalClassName,
		);
	const iconClassName = clsx("font-symbols", "max-sm:text-4xl");
	const Tag = to ? BaseNavLink : "a";
	return (
		<Tag
			to={to}
			className={navLinkClassName}
			onClick={onInternalClick}
			{...attributes}
		>
			{icon && <span className={iconClassName}>{icon}</span>}
			{children}
		</Tag>
	);
}
NavLink.propTypes = propTypes;

export default NavLink;
