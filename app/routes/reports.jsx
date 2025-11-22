import Reports from "~/pages/reports";
import { authenticate } from "~/lib/auth";
import { useLoaderData, redirect } from "react-router";
import { findUserWithReportsById } from "~/lib/user";
import {
	listUnownedReportsByVendor,
	listReportsAwaitingApproval,
	createReport,
	deleteReportById,
} from "~/lib/report";

export function meta({}) {
	return [
		{ title: "ETS | Reports" },
		{ name: "description", content: "Reports ETS" },
	];
}

export async function loader({ request }) {
	const user = await authenticate(request);

	const finalUser =
		user?.type === "VENDOR" ? await findUserWithReportsById(user?.id) : user;
	const reports = await listUnownedReportsByVendor(user?.id);
	const reportsAwaitingApproval =
		user?.type === "ADMIN" ? await listReportsAwaitingApproval() : undefined;
	return { user: finalUser, reports, reportsAwaitingApproval };
}

export async function action({ request }) {
	const formData = await request.formData();
	const action = formData.get("action");

	if (action === "newReport") {
		const userId = formData.get("userId");
		const report = await createReport(userId);
		return redirect(`/report-builder/${report?.id}`);
	}
	if (action === "deleteReport") {
		const reportId = formData.get("reportId");
		return await deleteReportById(reportId);
	}
}

export default function ReportsRoute() {
	const { user, reports, reportsAwaitingApproval } = useLoaderData();
	return (
		<Reports
			user={user}
			reports={reports}
			reportsAwaitingApproval={reportsAwaitingApproval}
		/>
	);
}
