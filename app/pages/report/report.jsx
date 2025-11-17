import clsx from "clsx";
import PropTypes from "prop-types";
import DataEntry from "~/components/data-displays/data-entry";
import ColoredText from "~/components/data-displays/colored-text";

const propTypes = {
	report: PropTypes.object,
	compareReport: PropTypes.object,
	className: PropTypes.string,
	children: PropTypes.node,
};

function Report({
	report,
	compareReport,
	className: additionalClassName,
	children,
	...attributes
}) {
	const reportClassName = clsx(
		"flex size-full min-h-full items-center justify-center gap-2 p-4",
		additionalClassName,
	);
	const sectionClassName = clsx("flex flex-col gap-2");
	const rowClassName = clsx("flex flex-row gap-2");
	return (
		<div className={reportClassName} {...attributes}>
			{/* Form title */}
			<div className="flex flex-row gap-2">
				<div className="flex flex-col gap-2">
					<ColoredText
						tag="h1"
						className="inline-flex items-center gap-1 text-xl font-bold"
					>
						<span className="font-symbols">assignment</span>
						{report.form.title}
					</ColoredText>
					<p>Submitted by: {report.user.name}</p>

					{/* Sections */}
					{report.form.sections.map((section) => (
						<div key={section.id} className={sectionClassName}>
							<h2 className="text-lg font-bold">
								{section.title || "Untitled Section"}
							</h2>

							{/* Rows */}
							{section.rows.map((row) => (
								<div key={row.id} className={rowClassName}>
									{/* Inputs */}
									{row.inputs.map((input) => {
										// find matching entry for this input
										const entry = report.entries.find(
											(e) => e.inputId === input.id,
										);
										if (entry)
											return (
												<DataEntry
													key={input.id}
													id={input.id}
													type={input.type}
													label={input.label}
													value={entry.value}
												/>
											);
									})}
								</div>
							))}
						</div>
					))}
				</div>
				{compareReport && (
					<div className="flex flex-col gap-2">
						<ColoredText
							tag="h1"
							className="inline-flex items-center gap-1 text-xl font-bold"
						>
							<span className="font-symbols">assignment</span>
							{compareReport?.form.title}
						</ColoredText>
						<p>Submitted by: {compareReport?.user.name}</p>

						{/* Sections */}
						{compareReport?.form.sections.map((section) => (
							<div key={section.id} className={sectionClassName}>
								<h2 className="text-lg font-bold">
									{section.title || "Untitled Section"}
								</h2>

								{/* Rows */}
								{section.rows.map((row) => (
									<div key={row.id} className={rowClassName}>
										{/* Inputs */}
										{row.inputs.map((input) => {
											// find matching entry for this input
											const entry = compareReport?.entries.find(
												(e) => e.inputId === input.id,
											);
											if (entry)
												return (
													<DataEntry
														key={input.id}
														id={input.id}
														type={input.type}
														label={input.label}
														value={entry.value}
													/>
												);
										})}
									</div>
								))}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
Report.propTypes = propTypes;

export default Report;
