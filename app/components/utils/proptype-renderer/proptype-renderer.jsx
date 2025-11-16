import clsx from "clsx";
import PropTypes from "prop-types";
import Input from "~/components/inputs/input/input";
import InputWrapper from "~/components/inputs/input/components/input-wrapper";

const propTypes = {
	realPropTypes: PropTypes.bool,
	propTypes: PropTypes.object,
	className: PropTypes.string,
};
const propTypeToInput = (propType, label, realPropTypes) => {
	if (realPropTypes) {
		switch (propType) {
			case PropTypes.string:
				return <Input type="text" label={label} key={label} />;
			case PropTypes.number:
				return <Input type="number" label={label} key={label} />;
			case PropTypes.bool:
				return <Input type="toggle" label={label} key={label} />;
			case PropTypes.func:
				return <Input type="text" label={label} key={label} />;
			case PropTypes.array:
				return <Input type="array" label={label} key={label} />;
			/*case PropTypes.object:
	  return <ObjectInput valueType={PropTypes.any} />;*/
			default:
				break;
		}
		if (propType.$$typeof === PropTypes.oneOf.$$typeof) {
			return <Input type="select" options={[]} label={label} key={label} />;
		}
	}
	switch (propType) {
		case "string":
			return <Input type="text" label={label} key={label} />;
		case "number":
			return <Input type="number" label={label} key={label} />;
		case "bool":
			return <Input type="toggle" label={label} key={label} />;
		case "func":
			return <Input type="text" label={label} key={label} />;
		case "array":
			return <Input type="array" label={label} key={label} />;
		/*case PropTypes.object:
		return <ObjectInput valueType={PropTypes.any} />;*/
		default:
			break;
	}
	if (Array.isArray(propType)) {
		return (
			<Input
				type="select"
				options={propType?.map((label, i) => ({
					value: i,
					label: label,
				}))}
				label={label}
				key={label}
			/>
		);
	}
	if (typeof propType === "object") {
		return (
			<InputWrapper type="object" label={label}>
				<div className="flex flex-col gap-2 p-2">
					{Object.entries(propType)?.map(([key, value]) =>
						propTypeToInput(value, key, false),
					)}
				</div>
			</InputWrapper>
		);
	}
	/*if (propType.$$typeof === PropTypes.oneOfType.$$typeof) {
	return <OneOfTypeInput types={propType._propTypes} />;
  }
  if (propType.$$typeof === PropTypes.arrayOf.$$typeof) {
	return <Input type="array" arrayType={propType._propType}/>;
  }
  if (propType.$$typeof === PropTypes.objectOf.$$typeof) {
	return <ObjectInput valueType={propType._propType} />;
  }
  if (propType.$$typeof === PropTypes.shape.$$typeof) {
	return <ShapeInput shape={propType._propTypes} />;
  }*/

	return <Input type="text" label={label} key={label} />; // fallback
};

function PropTypeRenderer({
	realPropTypes = false,
	propTypes = {},
	className: additionalClassName,
	...attributes
}) {
	const propTypeRendererClassName = clsx(
		"flex flex-col gap-2",
		additionalClassName,
	);
	return (
		<div className={propTypeRendererClassName} {...attributes}>
			{Object.entries(propTypes)?.map(([key, value]) =>
				propTypeToInput(value, key, realPropTypes),
			)}
		</div>
	);
}
PropTypeRenderer.propTypes = propTypes;

export default PropTypeRenderer;
