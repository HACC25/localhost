import clsx from "clsx";
import PropTypes from "prop-types";
import BaseInput from "../components/base-input";
import InputWrapper from "../components/input-wrapper";
import InputRow from "../components/input-row";
import { sizingRegex } from "~/components/utils/tailwind-regex";

import { useState, useEffect } from "react";

const propTypes = {
	value: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	labelPosition: PropTypes.oneOf(["top", "left", "bottom", "right"]),
	required: PropTypes.bool,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue"]),
	onChange: PropTypes.func,
	className: PropTypes.string,
};

function FileInput({
	value,
	name,
	label,
	labelPosition = "top",
	required = false,
	color = "blue",
	onChange,
	className: additionalClassName,
	...attributes
}) {
	const [currentValue, setCurrentValue] = useState(value);
	const [previewImage, setPreviewImage] = useState();
	useEffect(() => {
		setCurrentValue(value);
	}, [value]);

	const internalOnChange = (e) => {
		if (onChange) onChange(e);
		setCurrentValue(e.target.value);
		const firstFile = e.target.files[0];
		const firstFileUrl = URL.createObjectURL(firstFile);

		if (!firstFile) return;

		const isImage = firstFile.type.includes("image");
		const isVideo = firstFile.type.includes("video");

		if (isImage) setPreviewImage(firstFileUrl);
		if (isVideo) {
			const video = document.createElement("video");
			video.preload = "metadata";
			video.src = firstFileUrl;
			video.muted = true;
			video.playsInline = true;
			video.crossOrigin = "anonymous"; // Optional: for CORS-safe canvas

			video.addEventListener("loadeddata", () => {
				video.currentTime = 1; // Seek to 1s for thumbnail
			});

			video.addEventListener("seeked", () => {
				const canvas = document.createElement("canvas");
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;

				const ctx = canvas.getContext("2d");
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

				const thumbnail = canvas.toDataURL("image/png");
				setPreviewImage(thumbnail);
				canvas.remove();
				video.remove();
			});
		}
		if (!isImage && !isVideo) setPreviewImage(null);
	};

	const fileInputClassName = clsx(
		"border-dashed",
		"file:hidden",
		additionalClassName?.replace(sizingRegex, ""),
	);
	const fileInputWrapperClassName = clsx(
		additionalClassName?.match(sizingRegex),
	);
	const filePreviewImageClassName = clsx(
		"h-12 w-12 shrink-0 rounded-md object-cover",
	);
	return (
		<InputWrapper
			type="file"
			label={label}
			labelPosition={labelPosition}
			color={color}
			className={fileInputWrapperClassName}
		>
			<InputRow>
				<BaseInput
					type="file"
					value={currentValue}
					name={name}
					required={required}
					color={color}
					onChange={internalOnChange}
					className={fileInputClassName}
					{...attributes}
				/>
				{previewImage && (
					<img
						src={previewImage}
						onLoad={() => URL.revokeObjectURL(previewImage)}
						className={filePreviewImageClassName}
					/>
				)}
			</InputRow>
		</InputWrapper>
	);
}
FileInput.propTypes = propTypes;

export default FileInput;
