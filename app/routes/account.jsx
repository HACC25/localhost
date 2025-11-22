import Account from "~/pages/account";
import { authenticate, unauthenticate } from "~/lib/auth";
import { updateUserById, updateUserPasswordById } from "~/lib/user";
import { useActionData, useLoaderData, redirect } from "react-router";

export function meta({}) {
	return [
		{ title: "ETS | Account" },
		{ name: "description", content: "Account ETS" },
	];
}

export async function loader({ request }) {
	const user = await authenticate(request);
	if (!user) return redirect("/login");
	return { user };
}

export async function action({ request }) {
	const formData = await request.formData();
	const action = formData.get("action");
	if (action === "updateInfo") {
		const id = formData.get("id");
		const email = formData.get("email");
		const username = formData.get("username");
		const name = formData.get("name");
		await updateUserById(id, { email, username, name });
		return { success: { information: "Information Updated Successfully" } };
	}
	if (action === "updatePassword") {
		const id = formData.get("id");
		const password = formData.get("password");
		await updateUserPasswordById(id, password);
		return { success: { password: "Password Updated Successfully" } };
	}
	if (action === "unauthenticate") return unauthenticate();
}

export default function AccountRoute() {
	const { user } = useLoaderData();
	const actionData = useActionData();
	return <Account user={user} success={actionData?.success} />;
}
