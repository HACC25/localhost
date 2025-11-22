import TextareaInput from "./textarea-input";

const meta = {
	component: TextareaInput,
};

export default meta;

export const Default = {
	args: {
		label: "Textarea Input",
		labelPosition: "top",
		color: "blue",
		placeholder: "Enter text...",
		required: true,
		className: "w-full max-w-80",
	},
};
