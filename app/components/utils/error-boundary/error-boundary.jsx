import { Component } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Alert from "~/components/data-displays/alert";
import ColoredBlock from "~/components/surfaces/colored-block";
import { isRouteErrorResponse } from "react-router";

const propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	error: PropTypes.any, // manual override
};

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		// React sets this when a child throws
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		// Optional logging
		console.error("Caught by ErrorBoundary:", error, errorInfo);
	}

	render() {
		const {
			className: additionalClassName,
			children,
			error: propError,
			...attributes
		} = this.props;
		const { hasError, error: stateError } = this.state;

		// 🔑 Hybrid logic: prefer propError if passed, else use caught stateError
		const error = propError || stateError;

		// If no error, just render children
		if (!error) {
			return children;
		}

		const errorBoundaryClassName = clsx(
			"flex size-full min-h-fit flex-col items-center justify-center p-4",
			additionalClassName,
		);

		let message = "Oops!";
		let details = "An unexpected error occurred.";
		let stack;

		if (isRouteErrorResponse(error)) {
			message = error.status === 404 ? "404" : "Error";
			details =
				error.status === 404
					? error.data || "The requested page could not be found."
					: error.statusText || details;
		} else if (import.meta.env.DEV && error instanceof Error) {
			details = error.message;
			stack = error.stack;
		}

		return (
			<div className={errorBoundaryClassName}>
				<ColoredBlock
					fillType="border"
					color="red"
					tag="main"
					className="shadow-hawaii-red flex max-h-full max-w-full flex-col gap-2 rounded-xl p-4 shadow-xl"
					{...attributes}
				>
					<Alert severity="error" type="block" className="w-full">
						{message}
					</Alert>
					<p>{details}</p>
					{stack && (
						<pre className="w-full overflow-x-auto p-4">
							<code>{stack}</code>
						</pre>
					)}
				</ColoredBlock>
			</div>
		);
	}
}

ErrorBoundary.propTypes = propTypes;

export default ErrorBoundary;
