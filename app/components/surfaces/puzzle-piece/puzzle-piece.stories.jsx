import PuzzlePiece from "./puzzle-piece";
import clsx from "clsx";

const meta = {
	component: PuzzlePiece,
};

export default meta;

export const Default = {
	args: {
		direction: "down",
		children: "Puzzle Piece",
		color: "blue",
		position: "middle",
		fillType: "gap",
	},
};
export const AllColors = {
	args: {
		direction: "down",
		children: "adipiscing elit",
		color: "blue",
		position: "middle",
		fillType: "gap",
	},
	render: (args) => (
		<div
			className={clsx("flex", {
				"flex-col": args.direction === "down",
				"flex-col-reverse": args.direction === "up",
				"flex-row": args.direction === "right",
				"flex-row-reverse": args.direction === "left",
			})}
		>
			<PuzzlePiece {...args} color="red" position="start" className="z-3">
				Lorem ipsum
			</PuzzlePiece>
			<PuzzlePiece {...args} color="yellow" position="middle" className="z-2">
				dolor sit
			</PuzzlePiece>
			<PuzzlePiece {...args} color="green" position="middle" className="z-1">
				amet, consectetur
			</PuzzlePiece>
			<PuzzlePiece {...args}>{args.children}</PuzzlePiece>
		</div>
	),
};
