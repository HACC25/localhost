import News from "~/pages/news";

export function meta({}) {
	return [{ title: "ETS | News" }, { name: "News", content: "News ETS" }];
}

export default function NewsRoute() {
	return <News />;
}
