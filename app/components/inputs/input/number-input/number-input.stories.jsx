import NumberInput from "./number-input";

const meta = {
	component: NumberInput,
};

export default meta;

let value = 0;
function increment(e) {
	value = e.target.value;
}

export const Default = {
	args: {
		label: "Number Input",
		labelPosition: "top",
		color: "blue",
		placeholder: "Placeholder...",
		onChange: increment,
		required: true,
		step: 1,
	},
	render: (args) => <NumberInput value={value} {...args} />,
};
