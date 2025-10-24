import UrlInput from "./url-input";

const meta = {
	component: UrlInput,
};

export default meta;

export const Default = {
	args: {
		label: "Url Input",
		labelPosition: "top",
		color: "blue",
		placeholder: "https://www.website.com",
		required: true,
		className: "w-full max-w-80",
		button: true,
	},
};
