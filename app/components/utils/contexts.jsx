import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const HeaderContext = createContext();

export function HeaderProvider({ children }) {
	const [color, setColor] = useState("blue");
	return (
		<HeaderContext.Provider value={{ color, setColor }}>
			{children}
		</HeaderContext.Provider>
	);
}
HeaderProvider.propTypes = {
	children: PropTypes.node,
};
