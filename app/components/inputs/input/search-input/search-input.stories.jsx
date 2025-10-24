import SearchInput from "./search-input";

const meta = {
	component: SearchInput,
};

export default meta;

export const Default = {
	args: {
		label: "Search Input",
		labelPosition: "top",
		color: "blue",
		placeholder: "Search...",
		required: true,
		className: "w-full max-w-80",
		button: true,
	},
};
