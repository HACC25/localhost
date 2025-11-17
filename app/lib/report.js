import prisma from "~/lib/prisma";
// VENDOR FUNCTIONS
// Create a new report associated with latest form
export async function createReport(userId) {
	const latestForm = await prisma.form.findFirst({
		orderBy: { updatedAt: "desc" },
	});

	return prisma.report.create({
		data: {
			formId: latestForm.id,
			userId,
			status: "DRAFT",
		},
	});
}

// Update report entries on save
export async function updateReport(reportId, entries) {
	// entries = [{ inputId, value }]
	return prisma.report.update({
		where: { id: reportId },
		data: {
			entries: {
				upsert: entries.map((e) => ({
					where: { reportId_inputId: { reportId, inputId: e.inputId } },
					update: { value: e.value },
					create: { inputId: e.inputId, value: e.value },
				})),
			},
		},
	});
}

// Publish report (set to pending)
export async function publishReport(reportId) {
	return prisma.report.update({
		where: { id: reportId },
		data: { status: "PENDING" },
	});
}

// ADMIN FUNCTIONS
// Get most recent pending report
export async function getLatestPendingReport() {
	return prisma.report.findFirst({
		where: { status: "PENDING" },
		orderBy: { updatedAt: "desc" },
		include: { user: true, entries: { include: { input: true } } },
	});
}

// Approve report with PDF link
export async function approveReport(reportId, pdfLink) {
	return prisma.report.update({
		where: { id: reportId },
		data: { status: "APPROVED", certificate: pdfLink },
	});
}

// USER/PUBLIC FUNCTIONS
export async function listReportsByVendor() {
	return prisma.report.findMany({
		where: {
			user: {
				type: "VENDOR",
			},
			status: "APPROVED", // <-- only published reports
		},
		select: {
			id: true,
			status: true,
			updatedAt: true,
			form: {
				select: {
					id: true,
					title: true,
					description: true,
				},
			},
			user: {
				select: {
					id: true,
					username: true,
					name: true,
					email: true,
				},
			},
		},
		orderBy: { updatedAt: "desc" },
	});
}
export async function getReportsByVendor() {
	return prisma.report.findMany({
		where: {
			user: {
				type: "VENDOR",
			},
		},
		include: {
			user: true, // vendor details
			form: {
				include: {
					sections: {
						orderBy: { position: "asc" },
						include: {
							rows: {
								orderBy: { position: "asc" },
								include: {
									inputs: {
										orderBy: { position: "asc" },
									},
								},
							},
						},
					},
				},
			},
			entries: {
				include: { input: true },
			},
		},
		orderBy: { updatedAt: "desc" },
	});
}
export async function getReportById(reportId) {
	return prisma.report.findUnique({
		where: { id: reportId },
		include: {
			user: true, // who submitted the report
			form: {
				include: {
					sections: {
						orderBy: { position: "asc" },
						include: {
							rows: {
								orderBy: { position: "asc" },
								include: {
									inputs: {
										orderBy: { position: "asc" },
									},
								},
							},
						},
					},
				},
			},
			entries: {
				include: {
					input: true, // link back to input definition
				},
			},
		},
	});
}

// Compare two reports side by side
export async function compareReports(reportId1, reportId2) {
	const [r1, r2] = await Promise.all([
		prisma.report.findUnique({
			where: { id: reportId1 },
			include: { entries: { include: { input: true } } },
		}),
		prisma.report.findUnique({
			where: { id: reportId2 },
			include: { entries: { include: { input: true } } },
		}),
	]);

	return { report1: r1, report2: r2 };
}

// Compare one entry with all other entries for same input
export async function compareEntryAcrossReports(inputId) {
	const entries = await prisma.reportEntry.findMany({
		where: { inputId },
		include: { report: { select: { id: true, formId: true } } },
	});

	return entries.map((e) => ({
		reportId: e.report.id,
		formId: e.report.formId,
		value: e.value,
	}));
}
