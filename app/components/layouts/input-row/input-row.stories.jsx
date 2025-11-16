import InputRow from "./input-row";
import Input from "~/components/inputs/input/text-input";

const meta = {
	component: InputRow,
};

export default meta;

export const Default = {
	args: {
		children: (
			<>
				<Input />
				<Input />
				<Input />
			</>
		),
	},
};
