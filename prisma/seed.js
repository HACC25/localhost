import { PrismaClient } from "../app/generated/prisma/client.ts";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
	// Create admin (still needed to own the form)
	const admin = await prisma.user.create({
		data: {
			username: "novyboy",
			email: "novakaiisland@gmail.com",
			name: "Nova Sonomura",
			password: await bcrypt.hash("Admin123!", 10),
			type: "ADMIN",
		},
	});

	// Create multiple vendors
	const vendorUsers = await Promise.all(
		Array.from({ length: 5 }).map(async (_, i) =>
			prisma.user.create({
				data: {
					username: `vendor_${i + 1}`,
					email: `vendor${i + 1}@example.com`,
					name: `Vendor ${i + 1}`,
					password: await bcrypt.hash("Vendor123!", 10),
					type: "VENDOR",
				},
			}),
		),
	);

	// Create a form
	const form = await prisma.form.create({
		data: {
			title: "Vendor Registration",
			description: "Collect vendor details and documents",
			createdBy: admin.id,
		},
	});

	// Sections
	const section1 = await prisma.section.create({
		data: { title: "Basic Information", position: 1, formId: form.id },
	});
	const section2 = await prisma.section.create({
		data: { title: "Documents", position: 2, formId: form.id },
	});

	// Rows
	const row1 = await prisma.row.create({
		data: { position: 1, sectionId: section1.id },
	});
	const row2 = await prisma.row.create({
		data: { position: 2, sectionId: section1.id },
	});
	const row3 = await prisma.row.create({
		data: { position: 1, sectionId: section2.id },
	});

	// Inputs
	await prisma.input.createMany({
		data: [
			{ label: "Company Name", type: "TEXT", position: 1, rowId: row1.id },
			{ label: "Contact Email", type: "TEXT", position: 2, rowId: row1.id },
			{ label: "Phone Number", type: "TEXT", position: 1, rowId: row2.id },
			{ label: "Business License", type: "FILE", position: 1, rowId: row3.id },
			{ label: "Tax Certificate", type: "FILE", position: 2, rowId: row3.id },
		],
	});

	const allInputs = await prisma.input.findMany({
		where: { rowId: { in: [row1.id, row2.id, row3.id] } },
	});
	const inputByLabel = Object.fromEntries(allInputs.map((i) => [i.label, i]));

	// Helper to generate random company data
	function fakeCompany(i, vendorName) {
		return {
			company: `${vendorName} Co ${i}`,
			email: `contact${i}@${vendorName.toLowerCase()}.com`,
			phone: `808-555-${String(1000 + i).slice(-4)}`,
			license: `/uploads/${vendorName.toLowerCase()}-${i}-license.pdf`,
			tax: `/uploads/${vendorName.toLowerCase()}-${i}-tax.pdf`,
		};
	}

	// Generate lots of reports tied to vendors
	for (const vendor of vendorUsers) {
		for (let i = 1; i <= 10; i++) {
			const data = fakeCompany(i, vendor.username);
			await prisma.report.create({
				data: {
					formId: form.id,
					userId: vendor.id,
					status: i % 3 === 0 ? "APPROVED" : i % 2 === 0 ? "PENDING" : "DRAFT",
					entries: {
						create: [
							{ inputId: inputByLabel["Company Name"].id, value: data.company },
							{ inputId: inputByLabel["Contact Email"].id, value: data.email },
							{ inputId: inputByLabel["Phone Number"].id, value: data.phone },
							{
								inputId: inputByLabel["Business License"].id,
								value: data.license,
							},
							{ inputId: inputByLabel["Tax Certificate"].id, value: data.tax },
						],
					},
				},
			});
		}
	}
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
