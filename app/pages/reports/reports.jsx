import clsx from "clsx";
import PropTypes from "prop-types";
import Button from "~/components/inputs/button";
import { format } from "date-fns"; // for date formatting
import Link from "~/components/navigations/link";
import ColoredText from "~/components/data-displays/colored-text";
import ColoredBlock from "~/components/surfaces/colored-block";
import ReportTile from "~/components/data-displays/report-tile";
import { useState } from "react";
import { Form } from "react-router";
import { statusToColor } from "~/components/utils/report";

const propTypes = {
	user: PropTypes.shape({
		type: PropTypes.oneOf(["ADMIN", "VENDOR", "USER"]),
	}),
	reports: PropTypes.object,
	reportsAwaitingApproval: PropTypes.object,
};

function Reports({
	user = {},
	reports,
	reportsAwaitingApproval,
	...attributes
}) {
	const reportsClassName = clsx(
		"flex size-full min-h-fit flex-col items-center justify-center gap-2 p-4",
	);
	const [selectedReports, setSelectedReports] = useState([]);
	const updateSelectedReports = (e) => {
		setSelectedReports((prev) => {
			const id = e.target.value;
			const indexOfId = prev.indexOf(id);
			const newArray = prev.filter((_, i) => i !== indexOfId);
			if (newArray.length >= 2) newArray.shift();
			if (e.target.checked) newArray.push(id);
			return newArray;
		});
	};
	return (
		<div className={reportsClassName} {...attributes}>
			<div className="flex flex-col gap-2">
				{user?.type === "ADMIN" && (
					<Button type="link" to="/form-builder">
						<span className="font-symbols">contract_edit</span>Edit Report Form
					</Button>
				)}
				{user?.type === "VENDOR" && (
					<>
						<Form method="post" className="w-full">
							<input type="hidden" name="userId" value={user?.id} />
							<Button
								color="green"
								type="submit"
								className="w-full"
								name="action"
								value="newReport"
							>
								<span className="font-symbols">add</span>New Report
							</Button>
						</Form>
					</>
				)}
				<Button
					color="yellow"
					type="link"
					to={`/report/${selectedReports[0]}?compare=${selectedReports[1]}`}
					disabled={selectedReports.length < 2}
				>
					<span className="font-symbols">flowsheet</span>Compare Reports
				</Button>
			</div>
			{}
			<div className="flex w-full flex-col gap-2 overflow-y-auto">
				{user?.type === "ADMIN" && reportsAwaitingApproval?.length > 0 && (
					<ColoredBlock
						fillType="border"
						color="yellow"
						className="flex flex-col gap-2 rounded-lg p-2"
					>
						<h2 className="inline-flex items-center gap-1 text-lg">
							<ColoredText color="yellow" className="font-symbols">
								pending_actions
							</ColoredText>
							Reports Awaiting Approval
						</h2>
						<ul className="flex snap-x flex-row gap-3 overflow-x-scroll overscroll-x-none p-2">
							{reportsAwaitingApproval?.map((r) => (
								<ReportTile
									key={r.id}
									id={r.id}
									status={r.status}
									updatedAt={r.updatedAt}
									title={r.title}
									checked={selectedReports.includes(r.id)}
									onChange={(e) => updateSelectedReports(e)}
									color="yellow"
									className="min-w-60 snap-center"
								/>
							))}
						</ul>
					</ColoredBlock>
				)}
				{user?.type === "VENDOR" && user?.reports?.length > 0 && (
					<ColoredBlock
						fillType="border"
						className="flex flex-col gap-2 rounded-lg p-2"
					>
						<h2 className="inline-flex items-center gap-1 text-lg">
							<ColoredText className="font-symbols">store</ColoredText>
							{user?.username}
						</h2>
						<ul className="flex snap-x flex-row gap-3 overflow-x-scroll overscroll-x-none p-2">
							{user?.reports?.map((r) => (
								<ReportTile
									key={r.id}
									id={r.id}
									status={r.status}
									updatedAt={r.updatedAt}
									title={r.title}
									editable={true}
									checked={selectedReports.includes(r.id)}
									onChange={(e) => updateSelectedReports(e)}
									color={statusToColor(r.status)}
									className="min-w-60 snap-center"
								/>
							))}
						</ul>
					</ColoredBlock>
				)}
				{Object.entries(reports).map(([username, vendorReports]) => (
					<ColoredBlock
						fillType="border"
						className="flex flex-col gap-2 rounded-lg p-2"
						key={username}
					>
						<h2 className="inline-flex items-center gap-1 text-lg">
							<ColoredText className="font-symbols">store</ColoredText>
							{username}
						</h2>
						<ul className="flex snap-x flex-row gap-3 overflow-x-scroll overscroll-x-none p-2">
							{vendorReports.map((r) => (
								<ReportTile
									key={r.id}
									id={r.id}
									updatedAt={r.updatedAt}
									title={r.title}
									editable={r.user.id === user?.id}
									checked={selectedReports.includes(r.id)}
									onChange={(e) => updateSelectedReports(e)}
									className="snap-center"
								/>
							))}
						</ul>
					</ColoredBlock>
				))}
			</div>
		</div>
	);
}
Reports.propTypes = propTypes;

export default Reports;
