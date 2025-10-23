import Button from "./button";

const meta = {
	component: Button,
};

export default meta;

export const Default = {
	args: {
		color: "blue",
		rounding: "md",
		type: "button",
		depth: true,
		children: "Button",
		background: true,
	},
};

export const Link = {
	args: {
		color: "blue",
		rounding: "md",
		type: "link",
		depth: true,
		children: "Button",
		to: "https://www.google.com",
		background: true,
	},
};

export const AllColors = {
	args: {
		color: "blue",
		rounding: "md",
		type: "button",
		depth: true,
		children: "Blue Button",
		background: true,
	},
	render: (args) => (
		<div className="flex flex-col items-stretch gap-3">
			<Button {...args} color="red">
				Red Button
			</Button>
			<Button {...args} color="yellow">
				Yellow Button
			</Button>
			<Button {...args} color="green">
				Green Button
			</Button>
			<Button {...args}>{args.children}</Button>
		</div>
	),
};
