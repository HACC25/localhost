import clsx from "clsx";
import PropTypes from "prop-types";
import { Form } from "react-router";
import Input from "~/components/inputs/input/input";
import Button from "~/components/inputs/button";
import Link from "~/components/navigations/link";
import Alert from "~/components/data-displays/alert";
import ColoredText from "~/components/data-displays/colored-text";
import { useEffect } from "react";

const propTypes = {
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	error: PropTypes.string,
};

function Login({ color = "blue", error, ...attributes }) {
	const loginClassName = clsx(
		"flex size-full min-h-full items-center justify-center p-4",
	);

	return (
		<div className={loginClassName} {...attributes}>
			<Form method="post" className="flex w-full max-w-sm flex-col gap-3">
				<ColoredText
					tag="label"
					color={color}
					className="text-center text-lg font-bold"
				>
					Enter Account Information
				</ColoredText>
				{error && <Alert type="block">{error}</Alert>}
				<fieldset className="flex flex-col gap-1">
					<Input
						color={color}
						type="email"
						label="Email"
						name="email"
						autofill="email"
						required
					/>
					<Input
						color={color}
						type="password"
						name="password"
						label="Password"
						autofill="current-password"
						required
					/>
				</fieldset>
				<Button type="submit" color={color}>
					Login
				</Button>
				<span className="text-center">
					{"Dont have an account? "}
					<Link color={color} to="/signup">
						Signup
					</Link>
				</span>
			</Form>
		</div>
	);
}
Login.propTypes = propTypes;

export default Login;
