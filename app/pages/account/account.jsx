import clsx from "clsx";
import PropTypes from "prop-types";
import { Form } from "react-router";
import Input from "~/components/inputs/input/input";
import Button from "~/components/inputs/button";
import Alert from "~/components/data-displays/alert";
import ColoredText from "~/components/data-displays/colored-text";
import { useState } from "react";

const propTypes = {
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	user: PropTypes.shape({
		id: PropTypes.string,
		username: PropTypes.string,
		name: PropTypes.string,
		email: PropTypes.string,
	}).isRequired,
	success: PropTypes.shape({
		information: PropTypes.string,
		password: PropTypes.string,
	}),
};

function Account({ color = "blue", user = {}, success = {}, ...attributes }) {
	const accountClassName = clsx(
		"flex size-full min-h-fit flex-col items-center justify-center gap-2 p-4",
	);

	const [password, setPassword] = useState();

	const updatePassword = (e) => {
		setPassword(e?.target?.value);
	};
	return (
		<div className={accountClassName} {...attributes}>
			<Form method="post" className="flex w-full max-w-sm flex-col gap-3">
				<ColoredText
					tag="label"
					color={color}
					className="text-center text-lg font-bold"
				>
					Change Account Information
				</ColoredText>
				{success?.information && (
					<Alert severity="success" type="block">
						{success.information}
					</Alert>
				)}
				<fieldset className="flex flex-col gap-1">
					<input name="id" type="hidden" value={user.id} />
					<Input
						color={color}
						type="text"
						label="Username"
						name="username"
						autofill="username"
						placeholder="Username"
						defaultValue={user.username}
						required
					/>
					<Input
						color={color}
						type="text"
						label="Name"
						placeholder="Name"
						name="name"
						autofill="full-name"
						defaultValue={user.name}
						required
					/>
					<Input
						color={color}
						type="email"
						label="Email"
						name="email"
						defaultValue={user.email}
						autofill="email"
						required
					/>
				</fieldset>
				<Button type="submit" name="action" value="updateInfo" color={color}>
					Update
				</Button>
			</Form>

			<Form
				method="post"
				className="flex w-full max-w-sm flex-col justify-center gap-3"
			>
				<ColoredText
					tag="label"
					color={color}
					className="text-center text-lg font-bold"
				>
					Change Password
				</ColoredText>
				{success?.password && (
					<Alert severity="success" type="block">
						{success.password}
					</Alert>
				)}
				<fieldset className="flex flex-col gap-1">
					<input name="id" type="hidden" value={user.id} />
					<Input
						color={color}
						type="password"
						name="password"
						label="New Password"
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
						label="Confirm New Password"
						pattern={password}
						title="Password must be an exact match."
						required
					/>
				</fieldset>
				<Button
					type="submit"
					color={color}
					name="action"
					value="updatePassword"
				>
					Update
				</Button>
			</Form>

			<Form
				method="post"
				className="flex w-full max-w-sm flex-col justify-center gap-3"
			>
				<ColoredText
					tag="label"
					color={color}
					className="text-center text-lg font-bold"
				>
					Other Options
				</ColoredText>
				<Button
					type="submit"
					color={color}
					name="action"
					value="unauthenticate"
				>
					Logout
				</Button>
			</Form>
		</div>
	);
}
Account.propTypes = propTypes;

export default Account;
