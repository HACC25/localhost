export const typeIcons = {
	text: "text_fields",
	textarea: "short_text",
	number: "numbers",
	password: "password",
	file: "attach_file",
	email: "email",
	url: "link",
	tel: "call",
	search: "search",
	date: "event",
	datetime: "event_note",
	"datetime-local": "event_note",
	month: "date_range",
	week: "date_range",
	time: "schedule",
	color: "palette",
	checkbox: "check_box",
	radio: "radio_button_checked",
	range: "tune",
	hidden: "visibility_off",
	image: "image",
	reset: "restart_alt",
	submit: "send",
	button: "smart_button",
	//custom types
	select: "menu_open",
	toggle: "toggle_on",
	array: "data_array",
	object: "data_object",
	section: "dataset",
	row: "splitscreen_add",
	bar: "bar_chart",
};

export const inputTypes = [
	"array",
	"checkbox",
	"email",
	"file",
	"number",
	"password",
	"tel",
	"search",
	"select",
	"text",
	"toggle",
	"url",
];

export const typeToFields = {
	most: {
		id: "string", //readonly, generated automatically
		label: "string", //make name generated automatically from label?
		defaultValue: "string",
		placeholder: "string",
		required: "bool",
	},
	text: {
		pattern: "string", //advanced
		autocomplete: "string", //advanced
	},
	number: {
		min: "number",
		max: "number",
		step: "number",
	},
	email: {
		multiple: "bool",
		pattern: "string", //advanced
	},
	file: {
		multiple: "bool",
		accept: "select",
	},
	url: {
		pattern: "string", //advanced
	},
	checkbox: {
		value: "string",
		defaultChecked: "bool",
	},
};

export const typeToIcon = (type) => typeIcons[type];
