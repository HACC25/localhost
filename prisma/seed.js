import { PrismaClient } from "../app/generated/prisma/client.ts";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
	accelerateUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());

async function main() {
	// Create admin
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
					username: `vendor${i + 1}`,
					email: `vendor${i + 1}@example.com`,
					name: `Vendor ${i + 1}`,
					password: await bcrypt.hash("Vendor123!", 10),
					type: "VENDOR",
				},
			}),
		),
	);

	// Create form
	const form = await prisma.form.create({
		data: {
			title: "Vendor Registration",
			description: "Collect vendor details, goals, and financials",
			createdBy: admin.id,
		},
	});

	// Sections
	const section1 = await prisma.section.create({
		data: { title: "Basic Information", position: 1, formId: form.id },
	});
	const section2 = await prisma.section.create({
		data: {
			title: "Vendor Purpose & Financials",
			position: 2,
			formId: form.id,
		},
	});

	// Rows (structured as requested)
	const row1 = await prisma.row.create({
		data: { position: 1, sectionId: section1.id }, // Company Name, Contact Email
	});
	const row2 = await prisma.row.create({
		data: { position: 2, sectionId: section1.id }, // Phone Number, Website
	});
	const row3 = await prisma.row.create({
		data: { position: 1, sectionId: section2.id }, // Purpose
	});
	const row4 = await prisma.row.create({
		data: { position: 2, sectionId: section2.id }, // Goals
	});
	const row5 = await prisma.row.create({
		data: { position: 3, sectionId: section2.id }, // Financial Success Level, Annual Budget, Currently Active
	});
	const row6 = await prisma.row.create({
		data: { position: 4, sectionId: section2.id }, // Revenue Breakdown
	});

	// Inputs
	await prisma.input.createMany({
		data: [
			// Row 1
			{
				label: "Company Name",
				type: "TEXT",
				required: true,
				position: 1,
				rowId: row1.id,
			},
			{
				label: "Contact Email",
				type: "EMAIL",
				required: true,
				position: 2,
				rowId: row1.id,
			},

			// Row 2
			{
				label: "Phone Number",
				type: "TEL",
				required: true,
				position: 1,
				rowId: row2.id,
			},
			{ label: "Website", type: "URL", position: 2, rowId: row2.id },

			// Row 3
			{
				label: "Purpose",
				type: "TEXTAREA",
				required: true,
				position: 1,
				rowId: row3.id,
			},

			// Row 4
			{
				label: "Goals",
				type: "TEXTAREA",
				required: true,
				position: 1,
				rowId: row4.id,
			},

			// Row 5
			{
				label: "Financial Success Level",
				type: "SELECT",
				required: true,
				position: 1,
				rowId: row5.id,
				options: JSON.stringify([
					{ value: "startup", label: "Startup" },
					{ value: "growing", label: "Growing" },
					{ value: "established", label: "Established" },
					{ value: "enterprise", label: "Enterprise" },
				]),
			},
			{
				label: "Annual Budget",
				type: "NUMBER",
				position: 2,
				required: true,
				rowId: row5.id,
			},
			{
				label: "Currently Active",
				type: "TOGGLE",
				position: 3,
				rowId: row5.id,
			},

			// Row 6
			{
				label: "Revenue Breakdown",
				type: "BAR",
				position: 1,
				rowId: row6.id,
				options: JSON.stringify({
					xAxis: { label: "Category", format: "default" },
					yAxis: { label: "Revenue", format: "currency" },
				}),
			},
		],
	});

	const allInputs = await prisma.input.findMany({
		where: {
			rowId: { in: [row1.id, row2.id, row3.id, row4.id, row5.id, row6.id] },
		},
	});
	const inputByLabel = Object.fromEntries(allInputs.map((i) => [i.label, i]));

	// Helpers
	function fakeCompany(i, vendorName) {
		return {
			company: `${vendorName} Co ${i}`,
			email: `contact${i}@${vendorName.toLowerCase()}.com`,
			phone: `808-555-${String(1000 + i).slice(-4)}`,
			website: `https://${vendorName.toLowerCase()}-${i}.com`,
			purpose: "Provide sustainable goods and services",
			goals: "Expand market reach and improve community impact",
		};
	}

	function randomBudget() {
		return Math.floor(50000 + Math.random() * 200000); // $50k–$250k
	}

	function randomRevenueBreakdown() {
		return [
			{ label: "Product A", value: Math.floor(20000 + Math.random() * 50000) },
			{ label: "Product B", value: Math.floor(15000 + Math.random() * 40000) },
			{ label: "Service C", value: Math.floor(10000 + Math.random() * 30000) },
		];
	}

	function randomSuccessLevel() {
		const levels = [
			{ value: "startup", label: "Startup" },
			{ value: "growing", label: "Growing" },
			{ value: "established", label: "Established" },
			{ value: "enterprise", label: "Enterprise" },
		];
		return levels[Math.floor(Math.random() * levels.length)];
	}

	function randomDateWithinPastYears(n) {
		const now = new Date();
		const past = new Date();
		past.setFullYear(now.getFullYear() - n);
		const start = past.getTime();
		const end = now.getTime();
		return new Date(start + Math.random() * (end - start));
	}

	// Generate reports tied to vendors
	for (const vendor of vendorUsers) {
		for (let i = 1; i <= 10; i++) {
			const data = fakeCompany(i, vendor.username);
			const date = randomDateWithinPastYears(5);
			await prisma.report.create({
				data: {
					title: data.company,
					formId: form.id,
					userId: vendor.id,
					status: i % 3 === 0 ? "APPROVED" : i % 2 === 0 ? "PENDING" : "DRAFT",
					createdAt: date,
					updatedAt: date,
					entries: {
						create: [
							{ inputId: inputByLabel["Company Name"].id, value: data.company },
							{ inputId: inputByLabel["Contact Email"].id, value: data.email },
							{ inputId: inputByLabel["Phone Number"].id, value: data.phone },
							{ inputId: inputByLabel["Website"].id, value: data.website },
							{ inputId: inputByLabel["Purpose"].id, value: data.purpose },
							{ inputId: inputByLabel["Goals"].id, value: data.goals },
							{
								inputId: inputByLabel["Financial Success Level"].id,
								value: JSON.stringify(randomSuccessLevel()), // react-select format
							},
							{
								inputId: inputByLabel["Annual Budget"].id,
								value: randomBudget().toString(),
							},
							{ inputId: inputByLabel["Currently Active"].id, value: "true" },
							{
								inputId: inputByLabel["Revenue Breakdown"].id,
								value: JSON.stringify(randomRevenueBreakdown()),
							},
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
