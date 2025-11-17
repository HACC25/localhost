import Link from "./link";

const meta = {
	component: Link,
};

export default meta;

export const Default = {
	args: {
		children: "Link",
		color: "blue",
		to: "/",
		animationType: "highlight",
		underlineType: "rounded",
		accessibility: "loose",
		emphasize: true,
	},
};
