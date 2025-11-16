import About from "~/pages/about";

export function meta({}) {
	return [{ title: "ETS | About" }, { name: "About", content: "About ETS" }];
}

export default function AboutRoute() {
	return <About />;
}
