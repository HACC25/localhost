import Login from "~/pages/login";
import { authenticateUserByEmail } from "~/lib/auth";
import { useActionData } from "react-router";

export function meta({}) {
	return [
		{ title: "ETS | Login" },
		{ name: "description", content: "Login ETS" },
	];
}

export async function loader() {}

export async function action({ request }) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");

	return await authenticateUserByEmail(email, password);
}

export default function LoginRoute() {
	const actionData = useActionData();
	return <Login error={actionData?.error} />;
}
