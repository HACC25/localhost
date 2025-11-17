import { Link as ReactLink, useNavigation } from "react-router";
import clsx from "clsx";
import PropTypes from "prop-types";
import ColoredText from "~/components/data-displays/colored-text";
import ColoredBlock from "~/components/surfaces/colored-block";

const propTypes = {
	to: PropTypes.string,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	animationType: PropTypes.oneOf([
		"inflate",
		"expand",
		"underline",
		"highlight",
	]),
	underlineType: PropTypes.oneOf(["sharp", "rounded"]),
	accessibility: PropTypes.oneOf(["loose", "strict"]),
	emphasize: PropTypes.bool,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node,
};

function Link({
	accessibility = "strict",
	underlineType = "rounded",
	animationType = "expand",
	to,
	color = "blue",
	emphasize = false,
	disabled: suggestedDisabled = false,
	className: additionalClassName,
	children,
	...attributes
}) {
	const navigation = useNavigation();
	const disabled =
		navigation?.state === "loading" ||
		navigation?.state === "submitting" ||
		suggestedDisabled;

	const onInternalClick = (e) => {
		if (disabled) {
			e.preventDefault();
			return;
		}
	};

	const linkClassName = clsx(
		"inline-flex flex-col items-center self-center",
		"relative h-fit w-fit select-text",
		disabled ? "cursor-not-allowed" : "group/link cursor-pointer",
		additionalClassName,
	);

	const underlineClassName = clsx(
		"pointer-events-none absolute bottom-0 duration-300 ease-in-out select-none",
		{
			"rounded-xs":
				underlineType === "rounded" && animationType !== "highlight",
			"h-0.5": animationType !== "highlight",
			"h-full rounded-md": animationType === "highlight",
			"w-0 group-hover/link:w-overflow": animationType !== "inflate",
			"w-overflow group-hover/link:h-full": animationType === "inflate",
			"transition-dimensions":
				animationType === "expand" || animationType === "underline",
			"-left-spill":
				animationType === "underline" || animationType === "highlight",
		},
		(animationType === "inflate" || animationType === "highlight") && [
			"transition-[height,width,opacity,background-color,border-radius]",
			"group-hover/link:rounded-md",
		],
	);

	const underlineTrackClassName = clsx(
		"w-overflow pointer-events-none absolute bottom-0 h-0.5 select-none",
		{
			"bg-hawaii-red-50 dark:bg-hawaii-red-950": color === "red",
			"bg-hawaii-yellow-50 dark:bg-hawaii-yellow-950": color === "yellow",
			"bg-hawaii-green-50 dark:bg-hawaii-green-950": color === "green",
			"bg-hawaii-blue-50 dark:bg-hawaii-blue-950": color === "blue",
			"rounded-xs": underlineType === "rounded",
		},
		animationType === "highlight" && [
			"transition-opacity duration-200 ease-in-out",
			"group-hover/link:opacity-0",
		],
	);

	const textClassName = clsx(
		"relative select-text",
		animationType === "expand"
			? [
					"bottom-0",
					"transition-button ease-build-follow duration-300 group-hover/link:bottom-0.5",
				]
			: "transition-colors duration-200 ease-in-out",
		(animationType === "inflate" || animationType === "highlight") && [
			"group-hover/link:text-white",
		],
		emphasize && "font-bold",
	);

	const Tag = to ? ReactLink : "a";

	return (
		<Tag
			type={Tag === "button" ? "button" : undefined}
			to={to}
			className={linkClassName}
			{...attributes}
		>
			{accessibility === "strict" && animationType !== "inflate" && (
				<span className={underlineTrackClassName} />
			)}
			<ColoredBlock color={color} className={underlineClassName} />
			<ColoredText
				className={textClassName}
				fillType={emphasize ? "full" : "select-only"}
				color={color}
			>
				{children}
			</ColoredText>
		</Tag>
	);
}

Link.propTypes = propTypes;

export default Link;
