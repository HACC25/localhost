import clsx from "clsx";
import PropTypes from "prop-types";
import Button from "~/components/inputs/button";
import { format } from "date-fns"; // for date formatting
import Link from "~/components/navigations/link";
import ColoredText from "~/components/data-displays/colored-text";
import ColoredBlock from "~/components/surfaces/colored-block";

const propTypes = {
	user: PropTypes.shape({
		type: PropTypes.oneOf(["ADMIN", "VENDOR", "USER"]),
	}),
	reports: PropTypes.object,
};

function Reports({ user = {}, reports, ...attributes }) {
	const reportsClassName = clsx(
		"flex size-full min-h-full flex-col items-center justify-center gap-2 p-4",
	);
	return (
		<div className={reportsClassName} {...attributes}>
			<div className="flex flex-col gap-2">
				{user?.type === "ADMIN" && (
					<Button type="link" to="/form-builder">
						<span className="font-symbols">contract_edit</span>Edit Report Form
					</Button>
				)}
				{user?.type === "VENDOR" && (
					<Button type="link" to="/report-builder">
						<span className="font-symbols">draw</span>Report Builder
					</Button>
				)}
				<Button color="yellow" type="link" to="/compare-reports">
					<span className="font-symbols">flowsheet</span>Compare Reports
				</Button>
			</div>
			<div className="flex gap-2 overflow-x-auto">
				{Object.entries(reports).map(([username, vendorReports]) => (
					<ColoredBlock
						fillType="border"
						className="flex flex-col gap-2 rounded-lg p-2"
						key={username}
					>
						<h2 className="inline-flex items-center text-lg">
							<ColoredText className="font-symbols">store</ColoredText>
							{username}
						</h2>
						<ul>
							{vendorReports.map((r) => (
								<li key={r.id}>
									<Link to={`/report/${r.id}`}>
										{format(new Date(r.updatedAt), "MMMM yyyy")}
									</Link>
								</li>
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
