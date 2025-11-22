import Contact from "~/pages/contact";

export const handle = {
	appColor: "green",
};

export function meta({}) {
	return [
		{ title: "ETS | Contact" },
		{ name: "description", content: "Contact ETS" },
	];
}

export default function ContactRoute() {
	return <Contact />;
}
