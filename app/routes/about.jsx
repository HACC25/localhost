import About from "~/pages/about";

export function meta({}) {
	return [
		{ title: "ETS | About" },
		{ name: "description", content: "About ETS" },
	];
}

export default function AboutRoute() {
	return <About />;
}
