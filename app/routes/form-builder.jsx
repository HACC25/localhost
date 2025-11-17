import FormBuilder from "~/pages/form-builder";

export function meta({}) {
	return [
		{ title: "ETS | FormBuilder" },
		{ name: "description", content: "FormBuilder ETS" },
	];
}

export default function FormBuilderRoute() {
	return <FormBuilder />;
}
