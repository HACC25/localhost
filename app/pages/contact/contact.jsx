import clsx from "clsx";
import PropTypes from "prop-types";

const propTypes = {};

function Contact({ ...attributes }) {
	const contactClassName = clsx(
		"flex size-full items-center justify-center text-xl font-black",
	);
	return (
		<div className={contactClassName} {...attributes}>
			Contact Page
		</div>
	);
}
Contact.propTypes = propTypes;

export default Contact;
