import Account from "./account";

const meta = {
	component: Account,
};

export default meta;

export const Default = {
	args: {
		user: {
			id: "1",
			username: "Johnny",
			email: "john.doe@gmail.com",
			name: "John Doe",
		},
	},
};
