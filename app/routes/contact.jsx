import Contact from "~/pages/contact";

export function meta({}) {
	return [
		{ title: "ETS | Contact" },
		{ name: "Contact", content: "Contact ETS" },
	];
}

export default function ContactRoute() {
	return <Contact />;
}
