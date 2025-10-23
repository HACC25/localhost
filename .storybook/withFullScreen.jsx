export const withFullScreen = (Story) => {
	return (
		<div className="m-0 flex h-screen w-screen flex-col items-center justify-center overflow-scroll p-0">
			<Story />
		</div>
	);
};
