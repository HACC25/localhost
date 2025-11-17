import clsx from "clsx";
import PropTypes from "prop-types";
import PuzzlePiece from "~/components/surfaces/puzzle-piece";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object,
	dragOverlay: PropTypes.bool,
	children: PropTypes.node,
};

function SortablePuzzlePiece({
	id,
	dragOverlay = false,
	className: additionalClassName,
	style: additionalStyle,
	children,
	...attributes
}) {
	const {
		attributes: dragAttributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		...additionalStyle,
		transform: dragOverlay ? undefined : CSS.Transform.toString(transform),
		transition: dragOverlay ? undefined : transition,
		zIndex: isDragging ? 1000 : additionalStyle?.zIndex,
		opacity: dragOverlay && isDragging ? 0.5 : additionalStyle?.opacity,
	};

	const sortablePuzzlePieceClassName = clsx("cursor-move", additionalClassName);
	return (
		<PuzzlePiece
			className={sortablePuzzlePieceClassName}
			id={id}
			ref={setNodeRef}
			style={style}
			{...dragAttributes}
			{...listeners}
			{...attributes}
		>
			{children}
		</PuzzlePiece>
	);
}
SortablePuzzlePiece.propTypes = propTypes;

export default SortablePuzzlePiece;
