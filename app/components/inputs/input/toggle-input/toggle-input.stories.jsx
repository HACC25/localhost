import ToggleInput from "./toggle-input";

const meta = {
	component: ToggleInput,
};

export default meta;

export const Default = {
	args: {
		label: "Toggle Input",
		labelPosition: "top",
		color: "blue",
		placeholder: "Enter text...",
		required: true,
		className: "w-full max-w-80",
	},
};
