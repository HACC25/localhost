//import prisma from "~/lib/prisma";
import Reports from "~/pages/reports";

export function meta({}) {
	return [
		{ title: "ETS | Reports" },
		{ name: "Reports", content: "Reports ETS" },
	];
}

export async function loader() {
	/*const users = await prisma.user.findMany();
  return { users };*/
}

export default function ReportsRoute(/*{ loaderData }*/) {
	/*const { users } = loaderData;*/
	return <Reports />;
}
