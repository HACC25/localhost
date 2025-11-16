import ProptypeRenderer from "./proptype-renderer";
import CheckboxInput from "~/components/inputs/input/checkbox-input";

const meta = {
	component: ProptypeRenderer,
};

export default meta;

export const Default = {
	args: {
		propTypes: {
			value: "string",
			checked: "bool",
			name: "string",
			label: "string",
			labelPosition: ["top", "left", "bottom", "right"],
			required: "bool",
			color: ["red", "yellow", "green", "blue"],
			onChange: "func",
			className: "string",
		},
	},
};
