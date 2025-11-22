import clsx from "clsx";
import PropTypes from "prop-types";
import Alert from "~/components/data-displays/alert";
import ColoredBlock from "~/components/surfaces/colored-block";
import Link from "~/components/navigations/link";

const propTypes = {};

function SignupSuccess({ ...attributes }) {
	const signupSuccessClassName = clsx(
		"flex size-full min-h-fit items-center justify-center p-4",
	);
	return (
		<div className={signupSuccessClassName} {...attributes}>
			<ColoredBlock
				color="green"
				fillType="border"
				className="flex flex-col gap-2 rounded-xl p-4"
			>
				<Alert severity="success" type="block">
					Successfully Registered!
				</Alert>
				<Link color="green" to="/">
					Go to Home Page
				</Link>
			</ColoredBlock>
		</div>
	);
}
SignupSuccess.propTypes = propTypes;

export default SignupSuccess;
