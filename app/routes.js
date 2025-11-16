import { index } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default [
	index("routes/home.jsx"),
	...(await flatRoutes()).filter((r) => r.id !== "routes/home"),
];
