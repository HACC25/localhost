import clsx from "clsx";
import PropTypes from "prop-types";
import {
	BarChart,
	Cell,
	Bar as BarComponent,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";
import { colorToHawaiiHex, intToHawaiiHex } from "~/components/utils/color";

function CustomTooltip({
	active,
	payload,
	label,
	xFormat,
	yFormat,
	className,
}) {
	if (!active || !payload?.length) return null;

	return (
		<div className={clsx("rounded-md p-3 shadow-md", className)}>
			<div className="mb-2 font-semibold">
				{xFormat ? xFormat(label) : label}
			</div>
			{payload.map((entry, index) => (
				<div key={`item-${index}`} className="text-sm">
					{yFormat ? yFormat(entry.value) : entry.value}
				</div>
			))}
		</div>
	);
}

CustomTooltip.propTypes = {
	active: PropTypes.bool,
	payload: PropTypes.any,
	label: PropTypes.string,
	xFormat: PropTypes.func,
	yFormat: PropTypes.func,
	className: PropTypes.string,
};

const propTypes = {
	xAxis: PropTypes.shape({
		label: PropTypes.string,
		format: PropTypes.oneOf(["default", "currency", "date", "percent"]),
	}),
	yAxis: PropTypes.shape({
		label: PropTypes.string,
		format: PropTypes.oneOf(["default", "currency", "date", "percent"]),
	}),
	data: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired, // category name
			value: PropTypes.number.isRequired, // numeric value
			id: PropTypes.string, // optional unique key
			color: PropTypes.string,
		}),
	).isRequired,
	className: PropTypes.string,
};

function formatValue(value, type = "default", options = {}) {
	switch (type) {
		case "currency":
			return value.toLocaleString(options.locale || "en-US", {
				style: "currency",
				currency: options.currency || "USD",
				minimumFractionDigits: options.minimumFractionDigits ?? 2,
			});
		case "date":
			return new Date(value).toLocaleDateString(options.locale || "en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			});
		case "percent":
			return `${(value * 100).toFixed(options.decimals ?? 1)}%`;
		default:
			return value.toString();
	}
}

function Bar({
	xAxis,
	yAxis,
	data,
	className: additionalClassName,
	...attributes
}) {
	const barClassName = clsx("size-full", additionalClassName);

	return (
		<div className={barClassName} {...attributes}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={data}
					margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="label"
						label={{
							value: xAxis?.label,
							position: "insideBottom",
							offset: -5,
						}}
						tickFormatter={(value) => formatValue(value, xAxis?.format)}
					/>
					<YAxis
						label={{
							value: yAxis?.label,
							angle: -90,
							position: "insideLeft",
							offset: -5,
						}}
						tickFormatter={(value) => formatValue(value, yAxis?.format)}
					/>
					<Tooltip
						cursor={{ fill: "#1f2937", opacity: 0 }}
						content={
							<CustomTooltip
								xFormat={(val) => formatValue(val, xAxis?.format)}
								yFormat={(val) => formatValue(val, yAxis?.format)}
								className="bg-gray-200 dark:bg-gray-800 dark:text-gray-100" // pass dark classes here
							/>
						}
					/>
					<BarComponent
						dataKey="value"
						fill="#3182CE"
						// dynamic color per bar
						// Recharts lets you render cells for per-bar styling
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={colorToHawaiiHex(entry.color) || intToHawaiiHex(index)}
							/>
						))}
					</BarComponent>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}

Bar.propTypes = propTypes;

export default Bar;
