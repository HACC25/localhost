import clsx from "clsx";
import PropTypes from "prop-types";
import { Form } from "react-router";
import Input from "~/components/inputs/input/input";
import Button from "~/components/inputs/button";
import Link from "~/components/navigations/link";
import Alert from "~/components/data-displays/alert";
import ColoredText from "~/components/data-displays/colored-text";
import { useState, useEffect } from "react";

const propTypes = {
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	error: PropTypes.string,
};

function Signup({ color = "blue", error, ...attributes }) {
	const signupClassName = clsx(
		"flex size-full min-h-fit items-center justify-center p-4",
	);

	const [password, setPassword] = useState();

	const updatePassword = (e) => {
		setPassword(e?.target?.value);
	};

	return (
		<div className={signupClassName} {...attributes}>
			<Form method="post" className="flex w-full max-w-sm flex-col gap-3">
				<ColoredText
					tag="label"
					color={color}
					className="text-center text-lg font-bold"
				>
					Create a New Account
				</ColoredText>
				{error && <Alert type="block">{error}</Alert>}
				<fieldset className="flex flex-col gap-1">
					<Input
						color={color}
						type="text"
						label="Username"
						name="username"
						autofill="username"
						placeholder="Username"
						required
					/>
					<div className="flex flex-row gap-2">
						<Input
							color={color}
							type="text"
							label="First Name"
							placeholder="First Name"
							name="firstname"
							autofill="given-name"
							required
						/>
						<Input
							color={color}
							type="text"
							label="Last Name"
							placeholder="Last Name"
							name="lastname"
							autofill="family-name"
							required
						/>
					</div>
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
						value={password}
						pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$"
						autofill="new-password"
						title="Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character."
						onChange={updatePassword}
						required
					/>
					<Input
						color={color}
						type="password"
						name="confirmpassword"
						label="Confirm Password"
						pattern={password}
						title="Password must be an exact match."
						required
					/>
				</fieldset>
				<Button type="submit" color={color}>
					Signup
				</Button>
				<span className="text-center">
					Already have an account?{" "}
					<Link color={color} to="/login">
						Login
					</Link>
				</span>
			</Form>
		</div>
	);
}
Signup.propTypes = propTypes;

export default Signup;
