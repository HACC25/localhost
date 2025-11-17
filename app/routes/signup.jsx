import Signup from "~/pages/signup";
import { createUser } from "~/lib/user";
import { authenticateUserByEmail } from "~/lib/auth";
import { useActionData } from "react-router";

export function meta({}) {
	return [
		{ title: "ETS | Signup" },
		{ name: "description", content: "Signup ETS" },
	];
}

export async function loader() {}

export async function action({ request }) {
	const formData = await request.formData();
	const username = formData.get("username");
	const firstName = formData.get("firstname");
	const lastName = formData.get("lastname");
	const email = formData.get("email");
	const password = formData.get("password");

	const userCreationResult = await createUser({
		username,
		email,
		name: `${firstName} ${lastName}`,
		password,
		type: "USER",
	});
	if (userCreationResult?.error) return userCreationResult;

	return await authenticateUserByEmail(email, password, "/signup-success");
}

export default function SignupRoute() {
	const actionData = useActionData();
	return <Signup error={actionData?.error} />;
}
