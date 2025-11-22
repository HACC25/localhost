import prisma from "~/lib/prisma";

// ESSENTIAL FUNCTIONS
// Create a new form immediately
export async function createForm(adminId, { title, description }) {
	return prisma.form.create({
		data: { title, description, createdBy: adminId },
	});
}

// Create a section associated with a form
export async function createSection(formId, { title, order }) {
	return prisma.section.create({
		data: { title, order, formId },
	});
}

// Delete a section (cascade rows + inputs)
export async function deleteSection(sectionId) {
	return prisma.section.delete({
		where: { id: sectionId },
	});
}

// Create a row associated with a section
export async function createRow(sectionId, { order }) {
	return prisma.row.create({
		data: { order, sectionId },
	});
}

// Delete a row (cascade inputs)
export async function deleteRow(rowId) {
	return prisma.row.delete({
		where: { id: rowId },
	});
}

// Create an input associated with a row
export async function createInput(rowId, { label, type, order }) {
	return prisma.input.create({
		data: { label, type, order, rowId },
	});
}

// Delete an input
export async function deleteInput(inputId) {
	return prisma.input.delete({
		where: { id: inputId },
	});
}

// Save button: create a new form version but reuse sections/rows/inputs
export async function saveFormVersion(formId, createdBy) {
	const oldForm = await prisma.form.findUnique({
		where: { id: formId },
		include: {
			sections: {
				include: {
					rows: { include: { inputs: true } },
				},
			},
		},
	});

	const newForm = await prisma.form.create({
		data: {
			title: oldForm.title,
			description: oldForm.description,
			createdBy,
			sections: {
				connect: oldForm.sections.map((s) => ({ id: s.id })),
			},
		},
	});

	return newForm;
}

// Get most recently edited form
export async function getLatestForm() {
	return prisma.form.findFirst({
		orderBy: { updatedAt: "desc" },
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
	});
}

// UNESSENTIAL FUNCTIONS
// Find all inputs not connected to current form
export async function findUnattachedInputs(formId) {
	const attachedInputIds = (
		await prisma.form.findUnique({
			where: { id: formId },
			include: {
				sections: { include: { rows: { include: { inputs: true } } } },
			},
		})
	).sections.flatMap((s) => s.rows.flatMap((r) => r.inputs.map((i) => i.id)));

	return prisma.input.findMany({
		where: { id: { notIn: attachedInputIds } },
	});
}

// Version history: find all forms
export async function getFormHistory() {
	return prisma.form.findMany({
		orderBy: { updatedAt: "desc" },
	});
}

// Select a form version to edit (update its updatedAt)
export async function selectFormVersion(formId) {
	return prisma.form.update({
		where: { id: formId },
		data: { updatedAt: new Date() },
	});
}
