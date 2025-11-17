import News from "~/pages/news";

export function meta({}) {
	return [
		{ title: "ETS | News" },
		{ name: "description", content: "News ETS" },
	];
}

export default function NewsRoute() {
	return <News />;
}
