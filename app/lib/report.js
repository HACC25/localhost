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

export async function deleteReportById(reportId) {
	return await prisma.report.delete({
		where: { id: reportId },
	});
}

// Update report entries on save
export async function updateReport(
	reportId,
	entries,
	title,
	description,
	status,
) {
	// entries = [{ inputId, value }]
	return await prisma.report.update({
		where: { id: reportId },
		data: {
			status,
			title,
			description,
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
	return await prisma.report.update({
		where: { id: reportId },
		data: { status: "PENDING" },
	});
}

// ADMIN FUNCTIONS
// Get most recent pending report
export async function getLatestPendingReport() {
	return await prisma.report.findFirst({
		where: { status: "PENDING" },
		orderBy: { updatedAt: "desc" },
		include: { user: true, entries: { include: { input: true } } },
	});
}

// Approve report with PDF link
export async function approveReportWithLink(reportId, pdfLink) {
	return await prisma.report.update({
		where: { id: reportId },
		data: { status: "APPROVED", certificate: pdfLink },
	});
}

export async function approveReportById(reportId) {
	return await prisma.report.update({
		where: { id: reportId },
		data: { status: "APPROVED" },
	});
}

export async function rejectReportById(reportId) {
	return await prisma.report.update({
		where: { id: reportId },
		data: { status: "REJECTED" },
	});
}

// USER/PUBLIC FUNCTIONS
export async function listReportsByVendor() {
	const reports = await prisma.report.findMany({
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
			title: true,
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

	return reports?.reduce((acc, report) => {
		const username = report.user.username;
		if (!acc[username]) acc[username] = [];
		acc[username].push(report);
		return acc;
	}, {});
}

export async function listReportsAwaitingApproval() {
	return await prisma.report.findMany({
		where: {
			user: {
				type: "VENDOR",
			},
			status: "PENDING",
		},
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

export async function listUnownedReportsByVendor(userId) {
	const reports = await prisma.report.findMany({
		where: {
			user: {
				type: "VENDOR",
				NOT: {
					id: userId,
				},
			},
			status: "APPROVED", // <-- only published reports
		},
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

	return reports?.reduce((acc, report) => {
		const username = report.user.username;
		if (!acc[username]) acc[username] = [];
		acc[username].push(report);
		return acc;
	}, {});
}

export async function getReportsByVendor(userId) {
	return prisma.report.findMany({
		where: {
			user: {
				id: userId,
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
