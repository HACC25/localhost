import clsx from "clsx";
import PropTypes from "prop-types";
import DataEntry from "~/components/data-displays/data-entry";
import ColoredText from "~/components/data-displays/colored-text";
import { format } from "date-fns"; // for date formatting
import { Form } from "react-router";
import Button from "~/components/inputs/button";
import { statusToIcon } from "~/components/utils/report";

const propTypes = {
	user: PropTypes.object,
	report: PropTypes.object,
	compareReport: PropTypes.object,
	className: PropTypes.string,
	children: PropTypes.node,
};

function Report({
	user,
	report,
	compareReport,
	className: additionalClassName,
	children,
	...attributes
}) {
	const reportClassName = clsx(
		"flex size-full min-h-fit items-center justify-center gap-2 p-4",
		additionalClassName,
	);
	const sectionClassName = clsx(
		"flex flex-col gap-2 rounded-xl bg-gray-100 p-4 dark:bg-gray-900",
	);
	const rowClassName = clsx("flex flex-wrap gap-2");
	const dateTime = new Date(report.updatedAt);
	const compareDateTime = new Date(compareReport?.updatedAt);
	return (
		<div className={reportClassName} {...attributes}>
			{/* Form title */}
			<div className="flex flex-row gap-2">
				<div className="flex flex-col gap-2">
					<div className="flex w-full justify-between gap-1 rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
						<div className="flex flex-col">
							<ColoredText
								tag="h1"
								className="inline-flex items-center gap-1 text-xl font-bold"
							>
								<span className="font-symbols">assignment</span>
								{report.title || report.form.title}
							</ColoredText>
							<time
								dateTime={dateTime}
								className="whitespace-nowrap text-gray-500"
							>
								{format(dateTime, "MMMM yyyy")}
							</time>
							<span className="text-gray-500">{report.user.username}</span>

							{["ADMIN", "VENDOR"].includes(user?.type) && (
								<span className="inline-flex gap-1 text-gray-500">
									<span className="font-symbols">
										{statusToIcon(report.status)}
									</span>
									{report.status}
								</span>
							)}
						</div>
						{!compareReport &&
							user?.type === "ADMIN" &&
							report.status === "PENDING" && (
								<Form method="post" className="flex flex-col gap-2">
									<Button
										type="submit"
										name="action"
										value="approveReport"
										color="green"
									>
										<span className="font-symbols">approval</span>
										Approve
									</Button>
									<Button
										type="submit"
										name="action"
										value="rejectReport"
										color="red"
									>
										<span className="font-symbols">cancel</span>
										Reject
									</Button>
								</Form>
							)}
						{compareReport && (
							<>
								<span className="text-gray-500">vs</span>
								<div className="flex flex-col items-end">
									<ColoredText
										color="yellow"
										className="inline-flex items-center gap-1 text-xl font-bold"
									>
										<span className="font-symbols">assignment</span>
										{compareReport.title}
									</ColoredText>
									<time
										dateTime={compareDateTime}
										className="whitespace-nowrap text-gray-500"
									>
										{format(compareDateTime, "MMMM yyyy")}
									</time>
									<span className="text-gray-500">
										{compareReport.user.username}
									</span>

									{["ADMIN", "VENDOR"].includes(user?.type) && (
										<span className="inline-flex gap-1 text-gray-500">
											<span className="font-symbols">
												{statusToIcon(compareReport.status)}
											</span>
											{compareReport.status}
										</span>
									)}
								</div>
							</>
						)}
					</div>
					{/* Sections */}
					{report.form.sections.map((section, si) => (
						<div key={section.id} className={sectionClassName}>
							<h2 className="text-lg font-bold">
								{section.title || "Untitled Section"}
							</h2>

							{/* Rows */}
							{section.rows.map((row, ri) => (
								<div key={row.id} className={rowClassName}>
									{/* Inputs */}
									{row.inputs.map((input, ii) => {
										// find matching entry for this input
										const entry = report.entries.find(
											(e) => e.inputId === input.id,
										);
										const compareInput =
											compareReport?.form?.sections[si]?.rows[ri]?.inputs[ii];
										const compareEntry = compareReport?.entries.find(
											(e) => e.inputId === compareInput?.id,
										);
										if (entry)
											return (
												<DataEntry
													key={input.id}
													id={input.id}
													type={input.type}
													label={input.label}
													value={entry.value}
													compareValue={compareEntry?.value}
												/>
											);
									})}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
Report.propTypes = propTypes;

export default Report;
