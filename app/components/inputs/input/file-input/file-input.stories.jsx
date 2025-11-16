import FileInput from "./file-input";

const meta = {
	component: FileInput,
};

export default meta;

export const Default = {
	args: {
		label: "File Input",
		labelPosition: "top",
		color: "blue",
		required: true,
		step: 1,
		className: "w-full max-w-80",
	},
	render: (args) => <FileInput {...args} />,
};
