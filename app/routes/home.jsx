import Home from "~/pages/home";

export function meta({}) {
	return [
		{ title: "Office of Enterprise Technology Services" },
		{ name: "description", content: "Welcome to ETS" },
	];
}

export default function HomeRoute() {
	return <Home />;
}
