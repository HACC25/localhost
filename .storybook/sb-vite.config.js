import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	process.env = { ...process.env, ...env };
	return {
		// No Remix Vite plugin here
		plugins: [tailwindcss()],
	};
});
