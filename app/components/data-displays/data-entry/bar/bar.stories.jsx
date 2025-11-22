import Bar from "./bar";

const meta = {
	component: Bar,
};

export default meta;

export const Default = {
	args: {
		xAxis: {
			label: "Month",
			format: "default",
		},
		yAxis: {
			label: "Money",
			format: "currency",
		},
		data: [
			{ label: "January", value: 42 },
			{ label: "February", value: 55 },
			{ label: "March", value: 30 },
		],
	},
};
