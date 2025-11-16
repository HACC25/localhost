import Input from "./input";
import { inputTypes } from "~/components/utils/input";

const meta = {
	component: Input,
	argTypes: {
		type: {
			control: { type: "select" },
			options: inputTypes,
		},
	},
};

export default meta;

export const Default = {
	args: {
		type: "text",
		label: "Input",
		labelPosition: "top",
		color: "blue",
		required: true,
		className: "w-full max-w-80",
	},
};
