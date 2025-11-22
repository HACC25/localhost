import clsx from "clsx";
import PropTypes from "prop-types";
import ArrayInput from "~/components/inputs/input/array-input";
import BarInput from "~/components/inputs/input/bar-input";
import CheckboxInput from "~/components/inputs/input/checkbox-input";
import EmailInput from "~/components/inputs/input/email-input";
import FileInput from "~/components/inputs/input/file-input";
import NumberInput from "~/components/inputs/input/number-input";
import PasswordInput from "~/components/inputs/input/password-input";
import PhoneInput from "~/components/inputs/input/phone-input";
import SearchInput from "~/components/inputs/input/search-input";
import SelectInput from "~/components/inputs/input/select-input";
import TextareaInput from "~/components/inputs/input/textarea-input";
import TextInput from "~/components/inputs/input/text-input";
import ToggleInput from "~/components/inputs/input/toggle-input";
import UrlInput from "~/components/inputs/input/url-input";
import { inputTypes } from "~/components/utils/input";

const propTypes = {
	type: PropTypes.oneOf(inputTypes),
};

function Input({ type = "text", ...attributes }) {
	if (type === "array") return <ArrayInput {...attributes} />;
	if (type === "bar") return <BarInput {...attributes} />;
	if (type === "checkbox") return <CheckboxInput {...attributes} />;
	if (type === "email") return <EmailInput {...attributes} />;
	if (type === "file") return <FileInput {...attributes} />;
	if (type === "number") return <NumberInput {...attributes} />;
	if (type === "password") return <PasswordInput {...attributes} />;
	if (type === "tel") return <PhoneInput {...attributes} />;
	if (type === "search") return <SearchInput {...attributes} />;
	if (type === "select") return <SelectInput {...attributes} />;
	if (type === "textarea") return <TextareaInput {...attributes} />;
	if (type === "text") return <TextInput {...attributes} />;
	if (type === "toggle") return <ToggleInput {...attributes} />;
	if (type === "url") return <UrlInput {...attributes} />;
}
Input.propTypes = propTypes;

export default Input;
