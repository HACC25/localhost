import BarInput from "./bar-input";

const meta = {
	component: BarInput,
};

export default meta;

export const Default = {
	args: {
		label: "Text Input",
		labelPosition: "top",
		color: "blue",
		placeholder: "Enter text...",
		required: true,
		className: "w-full max-w-80",
	},
};
