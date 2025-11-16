import clsx from "clsx";
import PropTypes from "prop-types";
import ColoredBlock from "~/components/surfaces/colored-block";

const propTypes = {
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	direction: PropTypes.oneOf(["up", "down", "left", "right"]),
	position: PropTypes.oneOf(["start", "middle", "end", "complete"]),
	fillType: PropTypes.oneOf(["fill", "border", "gap", "inverse"]),
	className: PropTypes.string,
	children: PropTypes.node,
};

function PuzzlePiece({
	color = "blue",
	direction = "down",
	position = "start",
	fillType = "gap",
	className: additionalClassName,
	children,
	...attributes
}) {
	const puzzlePieceClassName = clsx(
		"relative min-h-20 min-w-20 rounded-xl p-7",
		"flex items-center justify-center",
		{
			"after:bg-white dark:after:bg-black": ["up", "left"].includes(direction),
			"before:bg-white dark:before:bg-black": ["down", "right"].includes(
				direction,
			),
		},
		fillType !== "inverse" && [
			"text-black dark:text-white",
			color === "red" && [
				{
					"before:bg-hawaii-red": ["up", "left"].includes(direction),
					"after:bg-hawaii-red": ["down", "right"].includes(direction),
				},
			],
			color === "yellow" && [
				{
					"before:bg-hawaii-yellow": ["up", "left"].includes(direction),
					"after:bg-hawaii-yellow": ["down", "right"].includes(direction),
				},
			],
			color === "green" && [
				{
					"before:bg-hawaii-green": ["up", "left"].includes(direction),
					"after:bg-hawaii-green": ["down", "right"].includes(direction),
				},
			],
			color === "blue" && [
				{
					"before:bg-hawaii-blue": ["up", "left"].includes(direction),
					"after:bg-hawaii-blue": ["down", "right"].includes(direction),
				},
			],
		],
		fillType === "inverse" && [
			"bg-white dark:bg-black",
			{
				"before:bg-white dark:before:bg-black": ["up", "left"].includes(
					direction,
				),
				"after:bg-white dark:after:bg-black": ["down", "right"].includes(
					direction,
				),
			},
		],
		direction === "down" && [
			{
				"after:rounded-b-xl after:top-full after:w-10 after:h-5": [
					"start",
					"middle",
				].includes(position),
				"before:rounded-b-xl before:top-0 before:w-10 before:h-5": [
					"middle",
					"end",
				].includes(position),
			},
			fillType !== "fill" && {
				"after:border-x-2 after:border-b-2": ["start", "middle"].includes(
					position,
				),
				"before:border-x-2 before:border-b-2 before:-top-0.5!": [
					"middle",
					"end",
				].includes(position),
				"-mt-0.5": ["middle", "end"].includes(position),
			},
			fillType === "inverse" && [
				color === "red" && {
					"after:border-hawaii-red": ["start", "middle"].includes(position),
					"before:border-hawaii-red": ["middle", "end"].includes(position),
				},
				color === "yellow" && {
					"after:border-hawaii-yellow": ["start", "middle"].includes(position),
					"before:border-hawaii-yellow": ["middle", "end"].includes(position),
				},
				color === "green" && {
					"after:border-hawaii-green": ["start", "middle"].includes(position),
					"before:border-hawaii-green": ["middle", "end"].includes(position),
				},
				color === "blue" && {
					"after:border-hawaii-blue": ["start", "middle"].includes(position),
					"before:border-hawaii-blue": ["middle", "end"].includes(position),
				},
			],
		],
		direction === "up" && [
			{
				"before:rounded-t-xl before:bottom-full before:w-10 before:h-5": [
					"start",
					"middle",
				].includes(position),
				"after:rounded-t-xl after:bottom-0 after:w-10 after:h-5": [
					"middle",
					"end",
				].includes(position),
			},
			fillType !== "fill" && {
				"before:border-x-2 before:border-t-2": ["start", "middle"].includes(
					position,
				),
				"after:border-x-2 after:border-t-2 after:-bottom-0.5!": [
					"middle",
					"end",
				].includes(position),
				"-mb-0.5": ["middle", "end"].includes(position),
			},
			fillType === "inverse" && [
				color === "red" && {
					"before:border-hawaii-red": ["start", "middle"].includes(position),
					"after:border-hawaii-red": ["middle", "end"].includes(position),
				},
				color === "yellow" && {
					"before:border-hawaii-yellow": ["start", "middle"].includes(position),
					"after:border-hawaii-yellow": ["middle", "end"].includes(position),
				},
				color === "green" && {
					"before:border-hawaii-green": ["start", "middle"].includes(position),
					"after:border-hawaii-green": ["middle", "end"].includes(position),
				},
				color === "blue" && {
					"before:border-hawaii-blue": ["start", "middle"].includes(position),
					"after:border-hawaii-blue": ["middle", "end"].includes(position),
				},
			],
		],
		direction === "left" && [
			{
				"before:rounded-l-xl before:right-full before:w-5 before:h-10": [
					"start",
					"middle",
				].includes(position),
				"after:rounded-l-xl after:right-0 after:w-5 after:h-10": [
					"middle",
					"end",
				].includes(position),
			},
			fillType !== "fill" && {
				"before:border-y-2 before:border-l-2": ["start", "middle"].includes(
					position,
				),
				"after:border-y-2 after:border-l-2 after:-right-0.5!": [
					"middle",
					"end",
				].includes(position),
				"-mr-0.5": ["middle", "end"].includes(position),
			},
			fillType === "inverse" && [
				color === "red" && {
					"before:border-hawaii-red": ["start", "middle"].includes(position),
					"after:border-hawaii-red": ["middle", "end"].includes(position),
				},
				color === "yellow" && {
					"before:border-hawaii-yellow": ["start", "middle"].includes(position),
					"after:border-hawaii-yellow": ["middle", "end"].includes(position),
				},
				color === "green" && {
					"before:border-hawaii-green": ["start", "middle"].includes(position),
					"after:border-hawaii-green": ["middle", "end"].includes(position),
				},
				color === "blue" && {
					"before:border-hawaii-blue": ["start", "middle"].includes(position),
					"after:border-hawaii-blue": ["middle", "end"].includes(position),
				},
			],
		],
		direction === "right" && [
			{
				"after:rounded-r-xl after:left-full after:w-5 after:h-10": [
					"start",
					"middle",
				].includes(position),
				"before:rounded-r-xl before:left-0 before:w-5 before:h-10": [
					"middle",
					"end",
				].includes(position),
			},
			fillType !== "fill" && {
				"after:border-y-2 after:border-r-2": ["start", "middle"].includes(
					position,
				),
				"before:border-y-2 before:border-r-2 before:-left-0.5!": [
					"middle",
					"end",
				].includes(position),
				"-ml-0.5": ["middle", "end"].includes(position),
			},
			fillType === "inverse" && [
				color === "red" && {
					"after:border-hawaii-red": ["start", "middle"].includes(position),
					"before:border-hawaii-red": ["middle", "end"].includes(position),
				},
				color === "yellow" && {
					"after:border-hawaii-yellow": ["start", "middle"].includes(position),
					"before:border-hawaii-yellow": ["middle", "end"].includes(position),
				},
				color === "green" && {
					"after:border-hawaii-green": ["start", "middle"].includes(position),
					"before:border-hawaii-green": ["middle", "end"].includes(position),
				},
				color === "blue" && {
					"after:border-hawaii-blue": ["start", "middle"].includes(position),
					"before:border-hawaii-blue": ["middle", "end"].includes(position),
				},
			],
		],
		{
			"border-2": fillType !== "fill",
			"border-black dark:border-white after:border-black dark:after:border-white before:border-black dark:before:border-white":
				fillType === "border",
			"border-white dark:border-black after:border-white dark:after:border-black before:border-white dark:before:border-black":
				fillType === "gap",
		},
		"after:absolute",
		"before:absolute",
		additionalClassName,
	);
	const colorfillType = fillType === "inverse" ? "border" : "solid";
	return (
		<ColoredBlock
			color={color}
			fillType={colorfillType}
			className={puzzlePieceClassName}
			{...attributes}
		>
			{children}
		</ColoredBlock>
	);
}
PuzzlePiece.propTypes = propTypes;

export default PuzzlePiece;
