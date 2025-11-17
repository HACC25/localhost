import clsx from "clsx";
import PropTypes from "prop-types";
import SortablePuzzlePiece from "~/components/surfaces/sortable-puzzle-piece";
import { Children, useId, useState } from "react";
import { intToHawaiiColor } from "~/components/utils/color";
import { DndContext } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
	horizontalListSortingStrategy,
	arrayMove,
} from "@dnd-kit/sortable";

const propTypes = {
	id: PropTypes.string,
	color: PropTypes.oneOf(["red", "yellow", "green", "blue", "alternating"]),
	direction: PropTypes.oneOf(["left", "right", "up", "down"]),
	fillType: PropTypes.oneOf(["fill", "border", "gap", "inverse"]),
	className: PropTypes.string,
	children: PropTypes.node,
};

function PuzzleGroup({
	id,
	color = "blue",
	direction = "right",
	fillType = "gap",
	className: additionalClassName,
	children,
	...attributes
}) {
	const puzzleId = useId();
	const numOfChildren = Children.count(children);
	const [items, setItems] = useState(
		Array.from({ length: numOfChildren }, (_, i) => ({
			i: i,
			id: `${puzzleId}-${i}`,
		})),
	);

	const puzzleGroupClassName = clsx(
		"flex",
		{
			"flex-col": direction === "down",
			"flex-col-reverse": direction === "up",
			"flex-row": direction === "right",
			"flex-row-reverse": direction === "left",
		},
		additionalClassName,
	);
	const indexToPosition = (i, length) => {
		if (length === 1) return "complete";
		if (i === 0) return "start";
		if (i === length - 1) return "end";
		return "middle";
	};
	/*function handleDragEnd(event) {
		const { active, over } = event;
		if (active.id !== over?.id) {
			setItems((items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);
				return arrayMove(items, oldIndex, newIndex);
			});
		}
	}*/
	return (
		<>
			{/*<DndContext onDragEnd={handleDragEnd}>*/}
			<div id={id} className={puzzleGroupClassName} {...attributes}>
				<SortableContext
					id={id}
					items={items}
					strategy={
						["down", "up"].includes(direction)
							? verticalListSortingStrategy
							: horizontalListSortingStrategy
					}
				>
					{items.map(({ id, i }, n) => (
						<SortablePuzzlePiece
							key={id}
							id={id}
							color={color === "alternating" ? intToHawaiiColor(i) : color}
							direction={direction}
							fillType={fillType}
							position={indexToPosition(n, numOfChildren)}
							style={{
								zIndex: numOfChildren - n,
							}}
						>
							{Children.toArray(children)[i]}
						</SortablePuzzlePiece>
					))}
				</SortableContext>
			</div>
			{/*</DndContext>*/}
		</>
	);
}
PuzzleGroup.propTypes = propTypes;

export default PuzzleGroup;
