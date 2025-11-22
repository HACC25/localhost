export const statusIcons = {
	DRAFT: "draft",
	PENDING: "pending",
	APPROVED: "assignment_turned_in",
	REJECTED: "assignment_late",
};

export const statusToIcon = (status) => statusIcons[status];

export const statusColors = {
	DRAFT: "blue",
	PENDING: "yellow",
	APPROVED: "green",
	REJECTED: "red",
};

export const statusToColor = (status) => statusColors[status];
