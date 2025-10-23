import path from "path";

const config = {
	stories: ["../app/**/*.mdx", "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
		"@storybook/addon-a11y",
		"@storybook/addon-vitest",
		"@storybook/addon-themes",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {
			builder: {
				viteConfigPath: ".storybook/sb-vite.config.js",
				useSWC: true, // Ensure SWC builder is enabled
			},
		},
	},
	viteFinal: async (config) => {
		config.resolve = config.resolve || {};
		config.resolve.alias = config.resolve.alias || {};
		config.esbuild = {
			jsx: "automatic",
		};
		config.resolve.alias["~"] = path.resolve(__dirname, "..", "app");
		return config;
	},
	swc: () => ({
		jsc: {
			transform: {
				react: {
					runtime: "automatic", // This is the crucial setting
				},
			},
		},
	}),
};
export default config;
