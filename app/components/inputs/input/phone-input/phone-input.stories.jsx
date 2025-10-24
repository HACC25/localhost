import PhoneInput from "./phone-input";

const meta = {
	component: PhoneInput,
};

export default meta;

export const Default = {
	args: {
		label: "Phone Input",
		labelPosition: "top",
		color: "blue",
		placeholder: "(###) ###-####",
		required: true,
		className: "w-full max-w-80",
		button: true,
	},
};
