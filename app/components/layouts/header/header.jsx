import clsx from "clsx";
import PropTypes from "prop-types";
import NavLink from "~/components/navigations/nav-link";

const propTypes = {
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	className: PropTypes.string,
	children: PropTypes.node,
};

function Header({
	color = "blue",
	className: additionalClassName,
	children,
	...attributes
}) {
	const headerClassName = clsx(
		"flex flex-row justify-between px-4",
		"h-20 w-full max-w-screen-lg transition-colors",
		color === "red" && [
			"sm:bg-hawaii-red-50 sm:dark:bg-hawaii-red-950",
			"max-sm:bg-hawaii-red-50/50 max-sm:dark:bg-hawaii-red-950/50",
		],
		color === "yellow" && [
			"sm:bg-hawaii-yellow-50 sm:dark:bg-hawaii-yellow-950",
			"max-sm:bg-hawaii-yellow-50/50 max-sm:dark:bg-hawaii-yellow-950/50",
		],
		color === "green" && [
			"sm:bg-hawaii-green-50 sm:dark:bg-hawaii-green-950",
			"max-sm:bg-hawaii-green-50/50 max-sm:dark:bg-hawaii-green-950/50",
		],
		color === "blue" && [
			"sm:bg-hawaii-blue-50 sm:dark:bg-hawaii-blue-950",
			"max-sm:bg-hawaii-blue-50/50 max-sm:dark:bg-hawaii-blue-950/50",
		],
		additionalClassName,
	);
	return (
		<header className={headerClassName} {...attributes}>
			<img
				src="ets-logo.png"
				className="h-full object-cover object-center py-1.5 max-sm:hidden"
			/>
			<div className="flex w-full flex-row items-center justify-center max-sm:gap-2">
				<NavLink
					to="/"
					end
					icon="home"
					color={color}
					className="max-sm:order-3 max-sm:w-22"
				>
					Home
				</NavLink>
				<NavLink
					to="/about"
					icon="info"
					color={color}
					className="max-sm:order-1 max-sm:w-18"
				>
					About
				</NavLink>
				<NavLink
					to="/reports"
					icon="assignment"
					color={color}
					className="max-sm:order-2 max-sm:w-18"
				>
					Reports
				</NavLink>
				<NavLink
					to="/news"
					icon="newspaper"
					color={color}
					className="max-sm:order-4 max-sm:w-18"
				>
					News
				</NavLink>
				<NavLink
					to="/contact"
					icon="call"
					color={color}
					className="max-sm:order-5 max-sm:w-18"
				>
					Contact
				</NavLink>
			</div>
			<div className="font-symbols flex items-center justify-center text-2xl max-sm:hidden">
				menu
			</div>
		</header>
	);
}
Header.propTypes = propTypes;

export default Header;
