import Report from "~/pages/report";
import {
	getReportById,
	approveReportById,
	rejectReportById,
} from "~/lib/report";
import { authenticate } from "~/lib/auth";
import {
	redirect,
	useActionData,
	useLoaderData,
	useRouteError,
	data,
} from "react-router";
import ReportErrorBoundary from "~/components/utils/error-boundary";

export function meta({}) {
	return [
		{ title: "ETS | Report" },
		{ name: "description", content: "Report ETS" },
	];
}

export async function loader({ params, request }) {
	const user = await authenticate(request);

	const { reportId } = params;
	const url = new URL(request.url);
	const compareId = url.searchParams.get("compare");
	const report = await getReportById(reportId);
	if (!report)
		throw data("The requested report could not be found.", { status: 404 });

	if (
		report.status !== "APPROVED" &&
		!(user?.type === "ADMIN" || user?.id === report.user.id)
	)
		return redirect("/login");
	if (compareId) {
		const compareReport = await getReportById(compareId);
		if (!compareReport)
			throw data("The requested comparison report could not be found.", {
				status: 404,
			});
		return { user, report, compareReport };
	}

	return { user, report };
}

export async function action({ params, request }) {
	const formData = await request.formData();
	const action = formData.get("action");

	const { reportId } = params;

	if (action === "approveReport") return await approveReportById(reportId);
	if (action === "rejectReport") return await rejectReportById(reportId);
}

export default function ReportRoute() {
	const { user, report, compareReport } = useLoaderData();
	return <Report user={user} report={report} compareReport={compareReport} />;
}

export function ErrorBoundary() {
	const error = useRouteError();
	return <ReportErrorBoundary error={error} />;
}
