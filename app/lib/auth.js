import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findUserById, findUserByEmail, findUserByUsername } from "~/lib/user";
import { redirect } from "react-router";

export async function authenticate(request) {
	// cookies from request
	const cookieHeader = request.headers.get("Cookie");
	if (!cookieHeader) return null;

	const token = cookieHeader
		.split(";")
		.map((c) => c.trim())
		.find((c) => c.startsWith("token="))
		?.split("=")[1];

	if (!token) return null;

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		const user = await findUserById(payload.userId);
		if (!user) return null;

		console.log("Verified User", { id: user.id, name: user.name });
		return user;
	} catch (err) {
		console.error("JWT verification failed:", err);
		return null;
	}
}

export async function unauthenticate() {
	return redirect("/login", {
		headers: {
			"Set-Cookie":
				"token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0",
		},
	});
}

export async function authenticateUserByEmail(
	email,
	password,
	successRedirect = "/",
) {
	console.log("Login Attempt:", { email, password });

	const user = await findUserByEmail(email);
	if (!user) return { error: "Invalid login credentials" };

	const isValid = await bcrypt.compare(password, user.password);

	if (!isValid) return { error: "Invalid login credentials" };

	const token = jwt.sign(
		{ userId: user.id, role: user.type }, // payload
		process.env.JWT_SECRET, // secret key
		{ expiresIn: "1h" }, // expiry
	);

	return redirect(successRedirect, {
		headers: {
			"Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`,
		},
	});
}
