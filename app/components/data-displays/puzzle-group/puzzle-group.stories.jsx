import PuzzleGroup from "./puzzle-group";
import InputNode from "~/components/data-displays/nodes/input-node";

const meta = {
	component: PuzzleGroup,
};

export default meta;

export const Default = {
	args: {
		children: [1, 2, 3, 4, 5],
		color: "alternating",
		direction: "right",
		fillType: "gap",
	},
};

export const Nested = {
	args: {
		children: [
			<PuzzleGroup color="red" key={1}>
				<InputNode color="red" />
				<span>2</span>
				<span>3</span>
				<span>4</span>
			</PuzzleGroup>,
			<PuzzleGroup color="yellow" key={2}>
				<span>1</span>
				<span>2</span>
				<span>3</span>
				<span>4</span>
			</PuzzleGroup>,
			<PuzzleGroup color="green" key={3}>
				<span>1</span>
				<span>2</span>
				<span>3</span>
				<span>4</span>
			</PuzzleGroup>,
			<PuzzleGroup color="blue" key={4}>
				<span>1</span>
				<span>2</span>
				<span>3</span>
				<span>4</span>
			</PuzzleGroup>,
		],
		color: "alternating",
		direction: "down",
		fillType: "inverse",
	},
};
