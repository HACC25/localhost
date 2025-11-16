import clsx from "clsx";
import PropTypes from "prop-types";

const propTypes = {};

function Reports({ ...attributes }) {
	const reportsClassName = clsx(
		"flex size-full items-center justify-center text-xl font-black",
	);
	return (
		<div className={reportsClassName} {...attributes}>
			Reports Page
		</div>
	);
}
Reports.propTypes = propTypes;

export default Reports;
