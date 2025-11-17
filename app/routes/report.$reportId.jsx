import Report from "~/pages/report";
import { getReportById } from "~/lib/report";
import { useActionData, useLoaderData } from "react-router";

export function meta({}) {
	return [
		{ title: "ETS | Reports" },
		{ name: "description", content: "Reports ETS" },
	];
}

export async function loader({ params, request }) {
	const { reportId } = params;
	const url = new URL(request.url);
	const compareId = url.searchParams.get("compare");
	const report = await getReportById(reportId);
	if (!report) {
		throw new Response("Report not found", { status: 404 });
	}
	if (compareId) {
		const compareReport = await getReportById(compareId);
		return { report, compareReport };
		if (!compareReport) {
			throw new Response("Comparison report not found", { status: 404 });
		}
	}

	return { report };
}

export default function ReportsRoute() {
	const { report, compareReport } = useLoaderData();
	return <Report report={report} compareReport={compareReport} />;
}
