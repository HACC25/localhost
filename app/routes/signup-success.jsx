import SignupSuccess from "~/pages/signup-success";

export const handle = {
	appColor: "green", // 👈 your metadata
};

export function meta({}) {
	return [
		{ title: "ETS | Signup" },
		{ name: "description", content: "Signup ETS" },
	];
}

export async function loader() {}

export default function SignupSuccessRoute() {
	return <SignupSuccess />;
}
