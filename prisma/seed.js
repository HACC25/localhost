import { PrismaClient } from "../app/generated/prisma/client.ts";

const prisma = new PrismaClient();

async function main() {
	// Create admin
	const admin = await prisma.user.create({
		data: {
			username: "admin1",
			email: "admin@example.com",
			name: "System Admin",
			password: "hashedpassword123", // replace with actual hash
			type: "ADMIN",
		},
	});

	// Create standard user
	const user = await prisma.user.create({
		data: {
			username: "user1",
			email: "user@example.com",
			name: "Regular User",
			password: "hashedpassword456",
			type: "USER",
		},
	});

	// Create vendor
	const vendor = await prisma.user.create({
		data: {
			username: "vendor1",
			email: "vendor@example.com",
			name: "Vendor",
			password: "hashedpassword456",
			type: "VENDOR",
		},
	});

	// Create a form
	const form = await prisma.form.create({
		data: {
			title: "Monthly Performance Report",
			description: "Collects key metrics for monthly review",
			createdBy: admin.id,
			inputs: {
				create: [
					{ label: "Revenue", type: "NUMBER" },
					{ label: "Notes", type: "TEXT" },
					{ label: "Supporting Document", type: "FILE" },
					{ label: "Sales Trend", type: "LINE_GRAPH" },
				],
			},
		},
		include: { inputs: true },
	});

	// User submits a report
	const report = await prisma.report.create({
		data: {
			formId: form.id,
			userId: user.id,
			entries: {
				create: [
					{ inputId: form.inputs[0].id, value: 50000 },
					{
						inputId: form.inputs[1].id,
						value: "Strong month, exceeded targets",
					},
					{ inputId: form.inputs[2].id, value: "/uploads/report1.pdf" },
					{ inputId: form.inputs[3].id, value: { points: [10, 20, 30, 40] } },
				],
			},
		},
	});

	console.log({ admin, user, vendor, form, report });
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
