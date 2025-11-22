import ReportBuilder from "~/pages/report-builder";
import { authenticate } from "~/lib/auth";
import { useLoaderData, redirect } from "react-router";
import { getReportById, updateReport, publishReport } from "~/lib/report";

export function meta({}) {
	return [
		{ title: "ETS | Report Builder" },
		{ name: "description", content: "Report Builder ETS" },
	];
}

export async function loader({ params, request }) {
	const user = await authenticate(request);
	if (!user || user?.type !== "VENDOR") return redirect("/login");

	const { reportId } = params;
	const report = await getReportById(reportId);

	if (!report || user?.id !== report.user.id) return redirect("/reports");

	const url = new URL(request.url);
	const pageNumber = parseInt(url.searchParams.get("page")) || 1;

	return { user, report, pageNumber };
}

export async function action({ params, request }) {
	const formData = await request.formData();
	const action = formData.get("action");

	const { reportId } = params;
	const url = new URL(request.url);
	const pageNumber = parseInt(url.searchParams.get("page")) || 1;

	if (["save", "back", "next", "publish"].includes(action)) {
		// to do: add value parsing for different input types (number needs to parseInt)
		const hasChanges = formData.get("hasChanges") === "true";
		if (hasChanges) {
			const title = formData.get("title") || undefined;
			const description = formData.get("description") || undefined;
			const status = action === "publish" ? "PENDING" : "DRAFT";
			const entries = Array.from(formData.entries())
				.filter(
					([key]) =>
						!["action", "title", "description", "hasChanges"].includes(key),
				)
				.map(([key, value]) => ({ inputId: key, value }));
			const updatedReport = await updateReport(
				reportId,
				entries,
				title,
				description,
				status,
			);
		}
		if (!hasChanges && action === "publish") return publishReport(reportId);
		if (action === "back")
			return redirect(`/report-builder/${reportId}?page=${pageNumber - 1}`);
		if (action === "next")
			return redirect(`/report-builder/${reportId}?page=${pageNumber + 1}`);
		return;
	}
}

export default function ReportBuilderRoute() {
	const { user, report, pageNumber } = useLoaderData();
	return <ReportBuilder user={user} report={report} pageNumber={pageNumber} />;
}
