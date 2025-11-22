import prisma from "~/lib/prisma";
import bcrypt from "bcryptjs";

export async function findUserById(id) {
	return prisma.user.findUnique({
		where: { id },
	});
}

export async function findUserWithReportsById(id) {
	return prisma.user.findUnique({
		where: { id },
		include: {
			reports: {
				orderBy: { updatedAt: "desc" },
				select: {
					id: true,
					status: true,
					updatedAt: true,
					title: true,
					form: {
						select: {
							id: true,
							title: true,
							description: true,
						},
					},
				},
			},
		},
	});
}

export async function findUserByUsername(username) {
	return prisma.user.findUnique({
		where: { username },
	});
}

export async function findUserByEmail(email) {
	return prisma.user.findUnique({
		where: { email },
	});
}

export async function createUser({ username, email, name, password, type }) {
	console.log("User Creation Attempt:", { email, password });

	const userWithEmail = await findUserByEmail(email);
	if (userWithEmail) return { error: "Account may already exist" };

	const userWithUsername = await findUserByUsername(username);
	if (userWithUsername) return { error: "That username is already in use" };

	//a higher number is more secure but takes more time
	const hashedPassword = await bcrypt.hash(password, 10);
	return prisma.user.create({
		data: { username, email, name, password: hashedPassword, type },
	});
}

// possible functions for future development

export async function updateUserById(id, updates) {
	return prisma.user.update({
		where: { id },
		data: updates, // object of updates { username, email, name, type }
	});
}

export async function updateUserPasswordById(id, password) {
	const hashedPassword = await bcrypt.hash(password, 10);
	return prisma.user.update({
		where: { id },
		data: { password: hashedPassword },
	});
}

async function deleteUser(id) {
	return prisma.user.delete({
		where: { id },
	});
}

async function listUsers() {
	return prisma.user.findMany({
		orderBy: { createdAt: "desc" },
	});
}

//mainly to test admin or vendor
export async function isUserType(userId, type) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { type: true },
	});

	return user?.type === type;
}
