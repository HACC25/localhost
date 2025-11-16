import ArrayInput from "./array-input";
import { inputTypes } from "~/components/utils/input";

const meta = {
	component: ArrayInput,
	argTypes: {
		arrayType: {
			control: { type: "select" },
			options: inputTypes,
		},
	},
};

export default meta;

export const Default = {
	args: {
		items: [
			{
				type: "text",
				required: true,
				value: "",
			},
		],
		label: "Array Input",
		labelPosition: "top",
		color: "blue",
		required: true,
		arrayType: "text",
		className: "w-full max-w-80",
	},
};
