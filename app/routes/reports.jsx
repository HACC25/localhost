import Reports from "~/pages/reports";
import { authenticate } from "~/lib/auth";
import { useLoaderData } from "react-router";
import { listReportsByVendor } from "~/lib/report";

export function meta({}) {
	return [
		{ title: "ETS | Reports" },
		{ name: "description", content: "Reports ETS" },
	];
}

export async function loader({ request }) {
	const user = await authenticate(request);
	const reports = await listReportsByVendor();
	return { user, reports };
}

export default function ReportsRoute() {
	const { user, reports } = useLoaderData();
	const grouped = reports?.reduce((acc, report) => {
		const username = report.user.username;
		if (!acc[username]) acc[username] = [];
		acc[username].push(report);
		return acc;
	}, {});
	return <Reports user={user} reports={grouped} />;
}
