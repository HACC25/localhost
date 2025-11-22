import clsx from "clsx";
import PropTypes from "prop-types";
import ColoredBlock from "~/components/surfaces/colored-block";
import Button from "~/components/inputs/button";
import { format } from "date-fns"; // for date formatting
import { useState, useEffect } from "react";
import { statusToIcon } from "~/components/utils/report";
import { Form } from "react-router";

const propTypes = {
	id: PropTypes.string,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	title: PropTypes.string,
	status: PropTypes.string,
	updatedAt: PropTypes.string,
	className: PropTypes.string,
	onChange: PropTypes.func,
	checked: PropTypes.bool,
	editable: PropTypes.bool,
};

function ReportTile({
	id,
	color = "blue",
	title = "Report",
	status,
	updatedAt,
	className: additionalClassName,
	onChange,
	checked,
	editable,
	...attributes
}) {
	const reportTileClassName = clsx(
		"relative flex w-full flex-col gap-2 rounded-xl p-4",
		"transition-all has-checked:outline-2 has-checked:outline-offset-2",
		additionalClassName,
	);
	const dateTime = new Date(updatedAt);

	const [isChecked, setIsChecked] = useState(checked);

	useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

	const internalOnChange = (e) => {
		const nextChecked = e.target.checked;
		setIsChecked(nextChecked);

		if (onChange) onChange(e);
	};

	return (
		<ColoredBlock
			tag="li"
			color={color}
			fillType="border"
			className={reportTileClassName}
		>
			<input
				type="checkbox"
				name="report"
				value={id}
				className="z absolute inset-0 size-full cursor-copy outline-0 checked:cursor-not-allowed"
				onChange={internalOnChange}
				checked={checked}
				{...attributes}
			/>
			<div className="flex flex-col text-center">
				<div className="flex items-center justify-center gap-1 text-center font-bold">
					<span className="font-symbols">assignment</span>
					<span>{title}</span>
				</div>
				{updatedAt && (
					<time dateTime={dateTime} className="whitespace-nowrap">
						{format(dateTime, "MMMM yyyy")}
					</time>
				)}
				{status && (
					<span className="inline-flex items-center justify-center gap-1 text-gray-500">
						<span className="font-symbols">{statusToIcon(status)}</span>
						{status}
					</span>
				)}
			</div>
			<Button color="blue" type="link" to={`/report/${id}`}>
				<span className="font-symbols">visibility</span>
				View
			</Button>
			{editable && (
				<>
					<Button color="yellow" type="link" to={`/report-builder/${id}`}>
						<span className="font-symbols">edit</span>
						Edit
					</Button>
					<Form method="post" className="w-full">
						<input type="hidden" name="reportId" value={id} />
						<Button
							color="red"
							type="submit"
							name="action"
							value="deleteReport"
							className="w-full"
						>
							<span className="font-symbols">delete</span>
							Delete
						</Button>
					</Form>
				</>
			)}
		</ColoredBlock>
	);
}
ReportTile.propTypes = propTypes;

export default ReportTile;
