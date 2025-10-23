import { withThemeByClassName } from "@storybook/addon-themes";
import { withRouter } from "./withRouter";
import { withFullScreen } from "./withFullScreen";
import "../app/app.css";

const preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		layout: "fullscreen",

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: "todo",
		},
	},
};

export const decorators = [
	withRouter,
	withFullScreen,
	withThemeByClassName({
		themes: {
			light: "light",
			dark: "dark",
		},
		defaultTheme: "light",
	}),
];

export default preview;
