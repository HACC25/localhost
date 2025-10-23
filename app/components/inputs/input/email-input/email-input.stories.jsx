import EmailInput from "./email-input";

const meta = {
	component: EmailInput,
};

export default meta;

export const Default = {
	args: {
		label: "Email Input",
		labelPosition: "top",
		color: "blue",
		placeholder: "john.doe@gmail.com",
		required: true,
	},
};
