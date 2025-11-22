import clsx from "clsx";
import PropTypes from "prop-types";
import { Form } from "react-router";
import ColoredText from "~/components/data-displays/colored-text";
import InputRow from "~/components/layouts/input-row";
import Input from "~/components/inputs/input/input";
import Button from "~/components/inputs/button";
import { statusToIcon } from "~/components/utils/report";
import { useState } from "react";

const propTypes = {
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	pageNumber: PropTypes.number,
	user: PropTypes.object.isRequired,
	report: PropTypes.object.isRequired,
};

function ReportBuilder({
	color = "blue",
	pageNumber = 1,
	user,
	report,
	...attributes
}) {
	const reportBuilderClassName = clsx(
		"flex size-full min-h-fit flex-col items-center justify-center gap-2 p-4",
	);

	const notFirstPage = pageNumber > 1;
	const notFinalPage = pageNumber < report.form.sections.length + 1;

	const navigationClassName = clsx(
		"flex gap-2",
		notFirstPage && notFinalPage && "justify-between",
		notFirstPage && !notFinalPage && "justify-start",
		!notFirstPage && notFinalPage && "justify-end",
	);

	const [hasChanges, setHasChanges] = useState(false);

	const updateEdited = () => {
		setHasChanges(true);
	};

	return (
		<div className={reportBuilderClassName} {...attributes}>
			<Form method="post" className="flex w-full max-w-lg flex-col gap-4">
				<div className="flex flex-col gap-2 rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
					<div className="flex justify-between gap-2">
						<input type="hidden" name="hasChanges" value={hasChanges} />
						<ColoredText
							tag="label"
							className="inline-flex items-center gap-1 text-xl font-bold"
						>
							<span className="font-symbols">contract_edit</span>
							{report.form.title}
						</ColoredText>
						<div className="flex gap-2">
							<Button color="green" type="submit" name="action" value="save">
								<span className="font-symbols">save</span>
								Save
							</Button>
							<Button
								color="yellow"
								type="submit"
								name="action"
								value="publish"
							>
								<span className="font-symbols">draw</span>
								Publish
							</Button>
						</div>
					</div>
					<span className="inline-flex items-center gap-1 text-gray-500">
						<span className="font-symbols">{statusToIcon(report.status)}</span>
						{report.status}
					</span>
					<p className="whitespace-pre-wrap">{report.form.description}</p>
				</div>
				<div className="flex flex-col gap-2 rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
					{pageNumber === 1 && (
						<>
							<Input
								color={color}
								label="Title"
								name="title"
								defaultValue={report.title}
								required
								onChange={updateEdited}
							/>
							<Input
								color={color}
								type="textarea"
								label="Description"
								name="description"
								defaultValue={report.description}
								onChange={updateEdited}
							/>
						</>
					)}
					{report.form.sections[pageNumber - 2]?.rows.map((row) => (
						<InputRow key={row.id} className="w-full">
							{row.inputs.map(({ id, type, label, required, options }) => {
								// find matching entry for this input
								const entry = report.entries?.find((e) => e.inputId === id);
								return (
									<Input
										key={id}
										id={id}
										color={color}
										type={type?.toLowerCase()}
										label={label}
										defaultValue={entry?.value}
										defaultChecked={
											type === "TOGGLE" && entry?.value === "true"
										}
										name={id}
										required={required}
										onChange={updateEdited}
										options={
											type === "SELECT" ? JSON.parse(options) : undefined
										}
									/>
								);
							})}
						</InputRow>
					))}
				</div>

				<div className={navigationClassName}>
					{pageNumber > 1 && (
						<Button type="submit" name="action" value="back">
							<span className="font-symbols">arrow_back</span>
							Back
						</Button>
					)}
					{pageNumber < report.form.sections.length + 1 && (
						<Button type="submit" name="action" value="next">
							Next
							<span className="font-symbols">arrow_forward</span>
						</Button>
					)}
				</div>
			</Form>
		</div>
	);
}
ReportBuilder.propTypes = propTypes;

export default ReportBuilder;
