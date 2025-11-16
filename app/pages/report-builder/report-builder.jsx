import clsx from "clsx";
import PropTypes from "prop-types";

const propTypes = {
	metadata: PropTypes.shape({
		//essential information that needs to be rendered specially
		id: PropTypes.string,
		name: PropTypes.string,
		title: PropTypes.string,
		subtitle: PropTypes.string,
		company: PropTypes.string,
		description: PropTypes.string,
		theme: PropTypes.string,
		logo: PropTypes.string,
	}),
	form: PropTypes.arrayOf(
		PropTypes.shape({
			//section
			id: PropTypes.string,
			type: PropTypes.string, //"page" render as separate page, "section" render on same page with break (in order), "step" render as step in multi-part form (will continue to be linked step until next non-step type)
			title: PropTypes.string,
			subtitle: PropTypes.string,
			description: PropTypes.string,
			image: PropTypes.string,
			structure: PropTypes.arrayOf(
				PropTyes.shape({
					//rows
					id: PropTypes.string,
					type: PropTypes.string,
					label: PropTypes.string,
					description: PropTypes.string,
					content: PropTypes.arrayOf(
						PropTypes.shape({
							//inputs, buttons, charts, tables, images etc
							id: PropTypes.string,
							type: PropTypes.string,
							label: PropTypes.string,
							required: PropTypes.bool,
							placeholder: PropTypes.any,
							value: PropTypes.any,
							defaultValue: PropTypes.any,
							validation: PropTypes.object,
						}),
					),
				}),
			),
		}),
	),
	className: PropTypes.string,
	children: PropTypes.node,
};

function ReportBuilder({
	className: additionalClassName,
	children,
	...attributes
}) {
	const componentClassName = clsx("", additionalClassName);

	return (
		<div className={componentClassName} {...attributes}>
			{children}
		</div>
	);
}
ReportBuilder.propTypes = propTypes;

export default ReportBuilder;
