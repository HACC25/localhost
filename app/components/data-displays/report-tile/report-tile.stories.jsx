import ReportTile from "./report-tile";

const meta = {
	component: ReportTile,
};

export default meta;

export const Default = {
	args: {
		updatedAt: new Date().toISOString(),
		title: "Report",
		color: "blue",
	},
};
