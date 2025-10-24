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
		backgroundClassName: "bg-[url(hawaii.svg)]",
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
		backgroundClassName: "bg-[url(hawaii.svg)]",
	},
};

export const AllColors = {
	args: {
		color: "blue",
		rounding: "md",
		type: "button",
		depth: true,
		children: "Blue Button",
		backgroundClassName: "bg-[url(hawaii.svg)]",
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
