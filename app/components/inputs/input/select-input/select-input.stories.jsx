import SelectInput from "./select-input";

const meta = {
	component: SelectInput,
};

export default meta;

export const Default = {
	args: {
		label: "Select Input",
		labelPosition: "top",
		color: "blue",
		placeholder: "Select...",
		required: true,
		className: "w-full max-w-80",
		value: {
			label: "Option 1",
			value: "1",
		},
		isMulti: true,
		options: [
			{
				label: "Option 1",
				value: "1",
			},
			{
				label: "Option 2",
				value: "2",
			},
			{
				label: "Option 3",
				value: "3",
			},
			{
				label: "Option 4",
				value: "4",
			},
		],
	},
};

export const WithCategories = {
	args: {
		label: "Select Input",
		labelPosition: "top",
		color: "blue",
		placeholder: "Select...",
		required: true,
		className: "w-full max-w-80",
		value: {
			label: "Option 1",
			value: "1a",
		},
		isMulti: true,
		options: [
			{
				label: "Category A",
				options: [
					{
						label: "Option 1",
						value: "1a",
					},
					{
						label: "Option 2",
						value: "2a",
					},
					{
						label: "Option 3",
						value: "3a",
					},
				],
			},
			{
				label: "Category B",
				options: [
					{
						label: "Option 1",
						value: "1b",
					},
					{
						label: "Option 2",
						value: "2b",
					},
					{
						label: "Option 3",
						value: "3b",
					},
				],
			},
			{
				label: "Category C",
				options: [
					{
						label: "Option 1",
						value: "1c",
					},
					{
						label: "Option 2",
						value: "2c",
					},
					{
						label: "Option 3",
						value: "3c",
					},
				],
			},
		],
	},
};
