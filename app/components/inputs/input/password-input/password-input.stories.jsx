import PasswordInput from "./password-input";

const meta = {
	component: PasswordInput,
};

export default meta;

export const Default = {
	args: {
		label: "Password Input",
		labelPosition: "top",
		color: "blue",
		placeholder: "Password...",
		required: true,
		className: "w-full max-w-80",
	},
};
